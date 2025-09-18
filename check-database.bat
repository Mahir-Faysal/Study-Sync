@echo off
echo Checking StudySync Database Content...

echo.
echo ================================
echo    Database Content Check
echo ================================
echo.

echo Connecting to PostgreSQL database to check users...
echo You will be prompted for PostgreSQL password.
echo.

psql -U postgres -h localhost -p 5432 -d studysync -c "SELECT id, username, email, first_name, last_name, role, LEFT(password, 20) as password_start FROM users;"

echo.
echo Above shows all users with partial password hash.
echo If your user is not there, you need to register again with PostgreSQL.
echo.
pause
