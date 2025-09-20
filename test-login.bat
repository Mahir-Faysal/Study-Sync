@echo off
echo Testing StudySync Login Credentials...

echo.
echo ================================
echo    Credential Debug Test
echo ================================
echo.

set /p username="Enter username to test: "
set /p password="Enter password to test: "

echo.
echo Testing password verification for user: %username%
echo.

curl -X POST http://localhost:8080/api/auth/test-password ^
     -H "Content-Type: application/json" ^
     -d "{\"username\":\"%username%\",\"rawPassword\":\"%password%\"}"

echo.
echo.
echo If passwordMatches is true, the issue is elsewhere.
echo If passwordMatches is false, there's a password hashing problem.
echo.
pause
