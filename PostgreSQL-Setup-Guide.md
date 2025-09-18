# How to Check if PostgreSQL is Running

## Quick Methods:

### Method 1: Use Our Status Checker (Recommended)
```bash
check-postgres.bat
```

### Method 2: Windows Services
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Look for services named like:
   - `postgresql-x64-15`
   - `postgresql-x64-14` 
   - `postgresql-x64-13`
4. Check if the status is "Running"

### Method 3: Command Line Check
```bash
# Check if PostgreSQL is listening on port 5432
netstat -an | find "5432"

# Test PostgreSQL connection
pg_isready -h localhost -p 5432

# Alternative connection test
psql -U postgres -h localhost -p 5432 -c "SELECT version();"
```

### Method 4: Task Manager
1. Press `Ctrl + Shift + Esc`
2. Go to "Services" tab
3. Look for `postgresql-x64-XX`
4. Status should be "Running"

## How to Start PostgreSQL:

### Option 1: Windows Services
1. Press `Win + R`
2. Type `services.msc`
3. Find "postgresql-x64-XX"
4. Right-click → Start

### Option 2: Command Line (Run as Administrator)
```bash
net start postgresql-x64-15
```

### Option 3: Start Menu
Look for "Start PostgreSQL Server" in your Start Menu

## Common Issues:

### PostgreSQL Not Installed
- Download from: https://www.postgresql.org/download/windows/
- Install with default settings
- Remember the password you set for 'postgres' user

### PostgreSQL Installed but Not Starting
- Check Windows Event Viewer for errors
- Verify installation path
- Try reinstalling PostgreSQL

### Different Port
- Check your PostgreSQL configuration file (postgresql.conf)
- Default port is 5432, but might be different

## Our Setup Scripts:

1. **check-postgres.bat** - Check if PostgreSQL is running
2. **setup-postgres.bat** - Setup database (runs checks first)
3. **restart.bat** - Start the StudySync application

Run these in order for a smooth setup experience!
