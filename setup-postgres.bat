@echo off
echo Setting up PostgreSQL Database for StudySync...

echo.
echo ================================
echo   PostgreSQL Database Setup
echo ================================
echo.

echo Checking if PostgreSQL is running...
echo.

REM Check if PostgreSQL service is running
sc query postgresql-x64-15 | find "RUNNING" >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ PostgreSQL service is running
) else (
    sc query postgresql-x64-14 | find "RUNNING" >nul 2>&1
    if %errorlevel% == 0 (
        echo ✓ PostgreSQL service is running
    ) else (
        sc query postgresql-x64-13 | find "RUNNING" >nul 2>&1
        if %errorlevel% == 0 (
            echo ✓ PostgreSQL service is running
        ) else (
            echo ❌ PostgreSQL service is not running
            echo.
            echo Starting PostgreSQL service...
            net start postgresql-x64-15 2>nul || net start postgresql-x64-14 2>nul || net start postgresql-x64-13 2>nul
            if %errorlevel__ neq 0 (
                echo ❌ Failed to start PostgreSQL service automatically
                echo Please start PostgreSQL manually:
                echo 1. Press Win+R, type "services.msc"
                echo 2. Find "postgresql-x64-XX" service
                echo 3. Right-click and select "Start"
                echo 4. Or run this script as Administrator
                echo.
                pause
                exit /b 1
            ) else (
                echo ✓ PostgreSQL service started successfully
            )
        )
    )
)

echo.
echo Checking if PostgreSQL is listening on port 5432...
netstat -an | find "5432" | find "LISTENING" >nul 2>&1
if %errorlevel__ == 0 (
    echo ✓ PostgreSQL is listening on port 5432
) else (
    echo ❌ PostgreSQL is not listening on port 5432
    echo Please check your PostgreSQL installation
    echo.
    pause
    exit /b 1
)

echo.
echo Testing basic PostgreSQL connection...
pg_isready -h localhost -p 5432 >nul 2>&1
if %errorlevel__ == 0 (
    echo ✓ PostgreSQL connection test successful
) else (
    echo ❌ Cannot connect to PostgreSQL
    echo Please ensure PostgreSQL is properly installed and configured
    echo.
    pause
    exit /b 1
)

echo.
echo All checks passed! Creating database and user...
echo You will be prompted for the PostgreSQL password.
echo.

psql -U postgres -h localhost -p 5432 -c "CREATE DATABASE studysync;" 2>nul
if %errorlevel% neq 0 (
    echo Database might already exist or PostgreSQL connection failed.
    echo Please check your PostgreSQL installation and ensure it's running.
) else (
    echo Database 'studysync' created successfully!
)

echo.
echo Testing database connection...
psql -U postgres -h localhost -p 5432 -d studysync -c "SELECT version();" 2>nul
if %errorlevel% neq 0 (
    echo Connection test failed. Please check your PostgreSQL setup.
) else (
    echo Database connection test successful!
)

echo.
echo Setup complete! 
echo Make sure to update your application.properties with the correct:
echo - Database URL: jdbc:postgresql://localhost:5432/studysync
echo - Username: postgres
echo - Password: [your postgres password]
echo.
pause
