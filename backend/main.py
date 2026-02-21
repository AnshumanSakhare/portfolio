from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import httpx
import os
import uuid
from datetime import datetime
from dotenv import load_dotenv
from database import init_db, save_message, get_messages, clear_messages
from resume_data import RESUME_CONTEXT

load_dotenv()

app = FastAPI(title="Portfolio AI Chat API", version="1.0.0")

# CORS — allows the Vite dev server and any hosted domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY", "")
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"
# Free models to try in order (falls back if one is rate-limited).
# Only models that support system prompts are listed.
FREE_MODELS = [
    "arcee-ai/trinity-large-preview:free",
    "upstage/solar-pro-3:free",
    "mistralai/mistral-small-3.1-24b-instruct:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "nousresearch/hermes-3-llama-3.1-405b:free",
    "meta-llama/llama-3.2-3b-instruct:free",
]
MODEL = os.getenv("AI_MODEL", FREE_MODELS[0])


@app.on_event("startup")
async def startup_event():
    await init_db()
    print("✅ Database initialized")
    if not OPENROUTER_API_KEY:
        print("⚠️  WARNING: OPENROUTER_API_KEY is not set. Set it in backend/.env")


# ── Schemas ──────────────────────────────────────────────────────────────────

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None


class ChatResponse(BaseModel):
    response: str
    session_id: str


class MessageOut(BaseModel):
    role: str
    content: str
    created_at: str


# ── Endpoints ─────────────────────────────────────────────────────────────────

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "model": MODEL}


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Main chat endpoint — takes a user message and returns AI response."""
    if not OPENROUTER_API_KEY:
        raise HTTPException(
            status_code=503,
            detail="AI service is not configured. Please set OPENROUTER_API_KEY in backend/.env",
        )

    session_id = request.session_id or str(uuid.uuid4())

    # Persist user message
    await save_message(session_id, "user", request.message)

    # Load conversation history (last 12 messages to stay within token budget)
    history = await get_messages(session_id)
    context_messages = history[-13:-1]  # all except the message we just added

    messages = [{"role": "system", "content": RESUME_CONTEXT}]
    for msg in context_messages:
        messages.append({"role": msg["role"], "content": msg["content"]})
    messages.append({"role": "user", "content": request.message})

    # Call OpenRouter — try each free model in order until one succeeds
    last_error = ""
    ai_message = None
    async with httpx.AsyncClient(timeout=60.0) as client:
        models_to_try = [MODEL] if MODEL not in FREE_MODELS else FREE_MODELS
        for model_id in models_to_try:
            try:
                api_response = await client.post(
                    f"{OPENROUTER_BASE_URL}/chat/completions",
                    headers={
                        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                        "Content-Type": "application/json",
                        "HTTP-Referer": "https://anshuman-portfolio.pages.dev",
                        "X-Title": "Anshuman Portfolio AI Chat",
                    },
                    json={
                        "model": model_id,
                        "messages": messages,
                        "max_tokens": 800,
                        "temperature": 0.7,
                    },
                )
            except httpx.TimeoutException:
                last_error = f"Model {model_id} timed out."
                continue

            if api_response.status_code in (400, 429, 503):
                last_error = api_response.text[:200]
                continue

            if api_response.status_code != 200:
                last_error = api_response.text[:200]
                continue

            data = api_response.json()
            ai_message = data["choices"][0]["message"]["content"]
            break  # success

    if ai_message is None:
        raise HTTPException(status_code=502, detail=f"All models failed or are rate-limited. Last error: {last_error}")

    # Persist assistant reply
    await save_message(session_id, "assistant", ai_message)

    return ChatResponse(response=ai_message, session_id=session_id)


@app.get("/api/chat/history/{session_id}", response_model=List[MessageOut])
async def get_chat_history(session_id: str):
    """Retrieve full conversation history for a session."""
    msgs = await get_messages(session_id)
    return msgs


@app.delete("/api/chat/history/{session_id}")
async def delete_chat_history(session_id: str):
    """Clear conversation history for a session."""
    await clear_messages(session_id)
    return {"message": "Chat history cleared successfully."}
