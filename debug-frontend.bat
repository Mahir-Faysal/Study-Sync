@echo off
echo Debugging Frontend vs Script Registration...

echo.
echo ================================
echo    Frontend Debug Test
echo ================================
echo.

REM Test the exact same data that frontend would send
set username=frontendtest
set email=frontendtest@test.com
set password=TestPass123!
set firstName=Frontend
set lastName=Test
set role=STUDENT

echo Testing with frontend-style data...
echo Username: %username%
echo Email: %email%
echo Password: %password%
echo First Name: %firstName%
echo Last Name: %lastName%
echo Role: %role%
echo.

echo [1/2] Registering user (frontend style)...
curl -X POST http://localhost:8080/api/auth/signup ^
     -H "Content-Type: application/json" ^
     -H "Accept: application/json" ^
     -d "{\"username\":\"%username%\",\"email\":\"%email%\",\"password\":\"%password%\",\"firstName\":\"%firstName%\",\"lastName\":\"%lastName%\",\"role\":\"%role%\"}"

echo.
echo.
echo Waiting 3 seconds...
timeout /t 3 /nobreak > nul

echo.
echo [2/2] Testing login (frontend style)...
curl -X POST http://localhost:8080/api/auth/signin ^
     -H "Content-Type: application/json" ^
     -H "Accept: application/json" ^
     -d "{\"username\":\"%username%\",\"password\":\"%password%\"}"

echo.
echo.
echo ================================
echo Now test the EXACT same credentials in the frontend:
echo Go to: http://localhost:3000/register
echo Username: %username%
echo Email: %email%
echo Password: %password%
echo First Name: %firstName%
echo Last Name: %lastName%
echo Role: %role%
echo ================================
echo.
pause
