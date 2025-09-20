@echo off
echo Testing JWT Login Fix...

echo.
echo ================================
echo      JWT Login Test
echo ================================
echo.

echo Testing login with the user that was failing...
echo Username: Testuser
echo.

curl -X POST http://localhost:8080/api/auth/signin ^
     -H "Content-Type: application/json" ^
     -d "{\"username\":\"Testuser\",\"password\":\"TestPass123!\"}"

echo.
echo.
echo If you see a JWT token in the response, the login is now working!
echo If you see an error, there might be another issue.
echo.
pause
