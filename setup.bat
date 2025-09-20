@echo off
echo Setting up StudySync project...

echo.
echo ================================
echo    StudySync Project Setup
echo ================================
echo.

echo [1/4] Installing Frontend Dependencies...
cd frontend
call npm install
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to install frontend dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Building Frontend...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to build frontend
    pause
    exit /b 1
)

echo.
echo [3/4] Setting up Backend...
cd ..\backend
call mvn clean install -DskipTests
if %ERRORLEVEL% neq 0 (
    echo Error: Failed to build backend
    pause
    exit /b 1
)

echo.
echo [4/4] Setup Complete!
echo.
echo To start the application:
echo 1. Backend: Run 'mvn spring-boot:run' in the backend directory
echo 2. Frontend: Run 'npm start' in the frontend directory
echo.
echo Access the application at: http://localhost:3000
echo Backend API available at: http://localhost:8080
echo H2 Database Console: http://localhost:8080/h2-console
echo.
pause
