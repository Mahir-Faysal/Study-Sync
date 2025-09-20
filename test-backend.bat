@echo off
echo Testing StudySync Backend Connection...

echo.
echo Testing backend connection to http://localhost:8080/api/auth/test
curl -s http://localhost:8080/api/auth/test 2>nul

if %errorlevel% == 0 (
    echo Backend is responding!
) else (
    echo Backend is not responding. Check if it's running on port 8080.
)

echo.
echo Testing H2 Console availability...
curl -s http://localhost:8080/h2-console 2>nul

if %errorlevel% == 0 (
    echo H2 Console is available!
) else (
    echo H2 Console is not available.
)

echo.
pause
