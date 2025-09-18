@echo off
echo Checking PostgreSQL Status...

echo.
echo ================================
echo    PostgreSQL Status Check
echo ================================
echo.

REM Check PostgreSQL service status
echo [1/4] Checking PostgreSQL service status...
sc query postgresql-x64-15 | find "RUNNING" >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ PostgreSQL 15 service is running
    goto :port_check
)

sc query postgresql-x64-14 | find "RUNNING" >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ PostgreSQL 14 service is running
    goto :port_check
)

sc query postgresql-x64-13 | find "RUNNING" >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ PostgreSQL 13 service is running
    goto :port_check
)

sc query postgresql-x64-12 | find "RUNNING" >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ PostgreSQL 12 service is running
    goto :port_check
)

echo ❌ PostgreSQL service is not running
echo.
echo To start PostgreSQL:
echo 1. Method 1 - Windows Services:
echo    - Press Win+R, type "services.msc"
echo    - Find "postgresql-x64-XX" service
echo    - Right-click and select "Start"
echo.
echo 2. Method 2 - Command Line (as Administrator):
echo    - net start postgresql-x64-15
echo.
echo 3. Method 3 - PostgreSQL Application:
echo    - Look for "Start PostgreSQL Server" in Start Menu
goto :end

:port_check
echo.
echo [2/4] Checking if PostgreSQL is listening on port 5432...
netstat -an | find "5432" | find "LISTENING" >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ PostgreSQL is listening on port 5432
) else (
    echo ❌ PostgreSQL is not listening on port 5432
    echo This might indicate a configuration issue
    goto :end
)

echo.
echo [3/4] Testing PostgreSQL connection...
pg_isready -h localhost -p 5432 >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ PostgreSQL connection test successful
) else (
    echo ❌ Cannot connect to PostgreSQL
    echo Trying alternative connection test...
    
    REM Alternative test using psql
    echo SELECT 1; | psql -U postgres -h localhost -p 5432 -q >nul 2>&1
    if %errorlevel% == 0 (
        echo ✓ PostgreSQL connection successful (via psql)
    ) else (
        echo ❌ Cannot connect to PostgreSQL
        echo Please check your PostgreSQL installation and configuration
    )
)

echo.
echo [4/4] Checking if studysync database exists...
psql -U postgres -h localhost -p 5432 -l | find "studysync" >nul 2>&1
if %errorlevel% == 0 (
    echo ✓ StudySync database already exists
) else (
    echo ℹ StudySync database does not exist yet (this is normal for first setup)
)

:end
echo.
echo Status check complete!
echo.
echo Quick Actions:
echo - To create StudySync database: run setup-postgres.bat
echo - To start application with PostgreSQL: run restart.bat
echo.
pause
