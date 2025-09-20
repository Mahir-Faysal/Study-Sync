@echo off
echo Testing Question Creation API...

echo.
echo ================================
echo    Question Creation Test
echo ================================
echo.

REM First, let's get a JWT token by logging in
echo Step 1: Logging in to get JWT token...
set /p username="Enter username (must be QUESTION_SETTER): "
set /p password="Enter password: "

echo.
echo Logging in...
for /f "tokens=*" %%i in ('curl -s -X POST http://localhost:8080/api/auth/signin -H "Content-Type: application/json" -d "{\"username\":\"%username%\",\"password\":\"%password%\"}"') do set login_response=%%i

echo Login response: %login_response%

REM Extract JWT token (this is a simplified approach)
echo.
echo Step 2: Creating a test question...

REM Use the JWT token for the request (you'll need to manually extract it)
echo Please copy the JWT token from above and paste it below:
set /p jwt_token="JWT Token: "

echo.
echo Creating question with JWT token...
curl -X POST http://localhost:8080/api/questions ^
     -H "Content-Type: application/json" ^
     -H "Authorization: Bearer %jwt_token%" ^
     -d "{\"questionText\":\"What is 2 + 2?\",\"optionA\":\"3\",\"optionB\":\"4\",\"optionC\":\"5\",\"optionD\":\"6\",\"correctAnswer\":\"B\"}"

echo.
echo.
echo Check the backend console for detailed logs.
echo.
pause