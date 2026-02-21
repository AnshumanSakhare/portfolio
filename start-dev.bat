@echo off
echo ================================================
echo  Anshuman's Portfolio — Full Stack Dev Server
echo ================================================
echo.
echo Starting Python backend on  http://localhost:8000
echo Starting React frontend on  http://localhost:5173
echo.

:: Start backend in new window
start "Portfolio Backend" cmd /k "cd /d backend && start.bat"

:: Brief pause so the backend can begin initialising
timeout /t 2 /nobreak >nul

:: Start frontend
echo Starting Vite dev server...
npm run dev
