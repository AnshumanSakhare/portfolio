# Anshuman Sakhare — Portfolio with AI Chat

A personal portfolio website featuring an **AI-powered chat assistant** that lets visitors ask questions about Anshuman's resume, skills, projects, and experience.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19 + **TypeScript**, Vite, Tailwind CSS v4 |
| Backend | **Python** — FastAPI + Uvicorn |
| Database | **SQLite** (via `aiosqlite`) — stores chat sessions & history |
| AI / Chat Engine | **OpenRouter** (`meta-llama/llama-3.1-8b-instruct:free`) |

---

## Project Structure

```
portfolio-main/
├── src/                        # React TypeScript frontend
│   ├── App.tsx                 # Root component (includes ChatWidget)
│   ├── main.tsx                # Entry point
│   ├── types/chat.ts           # TypeScript types for chat
│   ├── Components/
│   │   └── ChatWidget.tsx      # ✨ AI chat floating widget
│   ├── sections/               # Hero, About, Projects, Skills, Contact …
│   └── layout/                 # Navbar, Footer
│
├── backend/                    # Python FastAPI backend
│   ├── main.py                 # FastAPI app + OpenRouter integration
│   ├── database.py             # SQLite helpers (aiosqlite)
│   ├── resume_data.py          # System prompt / resume context
│   ├── requirements.txt
│   ├── .env.example            # ← copy to .env and add your API key
│   └── start.bat               # Windows convenience script
│
├── vite.config.js              # Dev proxy: /api → localhost:8000
├── tsconfig.json
└── start-dev.bat               # Starts both servers (Windows)
```

---

## Quick Start

### 1. Install frontend dependencies

```bash
npm install
```

### 2. Install Python backend dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3. Configure the AI API key

```bash
# in the backend/ folder:
copy .env.example .env
# Now open .env and paste your OpenRouter key
```

Get a **free** key at <https://openrouter.ai/keys> — no credit card required.

### 4. Run both servers

**Option A — one script (Windows)**

```bat
start-dev.bat
```

**Option B — two terminals**

```bash
# Terminal 1 — backend
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2 — frontend
npm run dev
```

Open <http://localhost:5173> — the teal chat button appears in the bottom-right corner.

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | Health check |
| `POST` | `/api/chat` | Send a message, receive AI reply |
| `GET` | `/api/chat/history/{session_id}` | Fetch conversation history |
| `DELETE` | `/api/chat/history/{session_id}` | Clear conversation history |

---

## Deployment

### Frontend (Cloudflare Pages / Vercel)

```bash
npm run build          # outputs to dist/
```
Point `VITE_API_URL` environment variable to your deployed backend URL.

### Backend Options

- **Cloudflare Tunnel** — `cloudflared tunnel --url http://localhost:8000`
- **Railway / Render / Fly.io** — free Python hosting tiers
- **VPS** — run with `uvicorn main:app --host 0.0.0.0 --port 8000`

Set the `OPENROUTER_API_KEY` environment variable on whichever platform you deploy to.
