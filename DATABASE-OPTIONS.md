# StudySync Database Setup Options

## Option 1: PostgreSQL (Recommended for Production)

If you have PostgreSQL installed, use the default configuration:
```bash
# Windows
start.bat

# Linux/Mac
./start.sh
```

## Option 2: H2 Database (No PostgreSQL Required)

If you don't have PostgreSQL installed, you can run the project with H2 in-memory database:

```bash
# Windows
start-h2.bat

# Linux/Mac
chmod +x start-h2.sh
./start-h2.sh
```

### H2 Database Features:
- ✅ **No Installation Required** - H2 runs in-memory
- ✅ **Zero Configuration** - Works out of the box
- ✅ **Web Console** - Access database at http://localhost:8080/h2-console
- ✅ **Full Functionality** - All StudySync features work
- ⚠️ **Data Loss** - Data is lost when application stops (in-memory)

### H2 Console Access:
- **URL**: http://localhost:8080/h2-console
- **JDBC URL**: `jdbc:h2:mem:studysync`
- **Username**: `sa`
- **Password**: (leave empty)

## Switching Between Databases

### To Use PostgreSQL:
1. Install PostgreSQL
2. Create database named `studysync`
3. Update `backend/src/main/resources/application.properties` with your PostgreSQL credentials
4. Run `start.bat` or `./start.sh`

### To Use H2:
1. No installation required
2. Run `start-h2.bat` or `./start-h2.sh`

## Development Notes

- **H2 Profile**: The project automatically uses H2 configuration when run with `-Dspring-boot.run.profiles=h2`
- **Data Persistence**: H2 data is in-memory and will be lost on restart
- **Production**: Use PostgreSQL for production deployments
- **Testing**: H2 is perfect for development and testing