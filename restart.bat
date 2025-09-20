@echo off
echo Restarting StudySync Application...

echo.
echo ================================
echo    Restarting StudySync
echo ================================
echo.

echo Killing existing processes...
taskkill /f /im java.exe 2>nul
taskkill /f /im node.exe 2>nul

echo Waiting for processes to stop...
timeout /t 5 /nobreak > nul

echo Clearing any remaining Java processes...
wmic process where "name='java.exe'" delete 2>nul

echo.
echo [1/2] Starting Backend Server...
cd backend
start "StudySync Backend" cmd /k "mvn spring-boot:run"

echo Waiting for backend to start...
timeout /t 20 /nobreak > nul

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
