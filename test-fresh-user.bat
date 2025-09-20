@echo off
echo Testing Fresh User Registration and Login...

echo.
echo ================================
echo    Fresh Registration Test
echo ================================
echo.

set timestamp=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set timestamp=%timestamp: =0%

set testuser=testuser_%timestamp%
set testpass=TestPass123!

echo Creating test user: %testuser%
echo Password: %testpass%
echo.

echo Registering user...
curl -X POST http://localhost:8080/api/auth/signup ^
     -H "Content-Type: application/json" ^
     -d "{\"username\":\"%testuser%\",\"email\":\"%testuser%@test.com\",\"password\":\"%testpass%\",\"firstName\":\"Test\",\"lastName\":\"User\",\"role\":\"STUDENT\"}"

echo.
echo.
echo Waiting 2 seconds...
timeout /t 2 /nobreak > nul

echo.
echo Testing login for the new user...
curl -X POST http://localhost:8080/api/auth/signin ^
     -H "Content-Type: application/json" ^
     -d "{\"username\":\"%testuser%\",\"password\":\"%testpass%\"}"

echo.
echo.
echo If login works for test user but not for 'mahir', the issue is with the 'mahir' user data.
echo Solution: Re-register the 'mahir' user.
echo.
pause
