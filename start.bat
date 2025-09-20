@echo off
echo Starting StudySync Application...

echo.
echo ================================
echo    Starting StudySync
echo ================================
echo.

echo [1/2] Starting Backend Server...
cd backend
start "StudySync Backend" cmd /k "mvn spring-boot:run"

echo Waiting for backend to start...
timeout /t 10 /nobreak > nul

echo.
echo [2/2] Starting Frontend Development Server...
cd ..\frontend
start "StudySync Frontend" cmd /k "npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
