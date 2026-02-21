@echo off
echo Starting Portfolio AI Backend (FastAPI)...
echo.
cd /d "%~dp0"

if not exist .env (
    echo [WARN] .env file not found. Copying from .env.example...
    copy .env.example .env
    echo [ACTION REQUIRED] Open backend\.env and add your OPENROUTER_API_KEY
    echo Get a free key at: https://openrouter.ai/keys
    echo.
)

C:/Users/anshu/AppData/Local/Python/pythoncore-3.14-64/python.exe -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
