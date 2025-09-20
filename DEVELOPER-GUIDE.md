# StudySync - Developer Quick Reference

## 🚀 Quick Start Commands

### **Start Application**
```bash
# No PostgreSQL needed (Recommended for beginners)
./start-h2.bat        # Windows
./start-h2.sh         # Linux/Mac

# With PostgreSQL (Production setup)
./start.bat           # Windows  
./start.sh            # Linux/Mac
```

### **Development Commands**
```bash
# Backend only
cd backend
mvn spring-boot:run                    # PostgreSQL mode
mvn spring-boot:run -Dspring-boot.run.profiles=h2  # H2 mode

# Frontend only  
cd frontend
npm start

# Build for production
cd frontend && npm run build
cd backend && mvn clean package
```

## 🛠️ Development Setup

### **Prerequisites**
- Java 17+
- Node.js 16+
- Maven 3.6+
- PostgreSQL (optional - H2 available)

### **First Time Setup**
1. Clone repository
2. Install dependencies: `cd frontend && npm install`
3. Choose database option and run startup script
4. Access application at http://localhost:3000

## 📂 Key File Locations

### **Configuration Files**
```
backend/src/main/resources/
├── application.properties         # PostgreSQL config
└── application-h2.properties      # H2 config

frontend/
├── package.json                   # Dependencies
└── src/index.css                  # Global styles
```

### **Important Components**
```
backend/src/main/java/com/studysync/
├── controller/                    # REST endpoints
├── service/                       # Business logic
├── model/                         # Database entities
├── repository/                    # Data access
└── security/                      # Authentication

frontend/src/
├── components/                    # React components
├── services/                      # API calls
└── App.js                        # Main app component
```

## 🔑 Default Credentials

### **Test Users**
Create these users through registration:
- **Student**: Any username with STUDENT role
- **Question Setter**: Any username with QUESTION_SETTER role

### **H2 Database Console**
- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:studysync`
- Username: `sa`
- Password: (empty)

## 🎯 Feature Checklist

### **Core Features**
- [x] User Registration & Login
- [x] JWT Authentication
- [x] Role-based Access Control
- [x] Question Management
- [x] Exam Creation & Management
- [x] Exam Taking System
- [x] Results & Analytics
- [x] Q&A Forum
- [x] Professional UI Design

### **Database Options**
- [x] H2 In-Memory (Development)
- [x] PostgreSQL (Production)
- [x] Easy switching between databases

## 🐛 Common Issues & Solutions

### **Port Already in Use**
```bash
# Kill process on port 8080 (Backend)
npx kill-port 8080

# Kill process on port 3000 (Frontend)  
npx kill-port 3000
```

### **Database Connection Issues**
```bash
# Use H2 instead of PostgreSQL
mvn spring-boot:run -Dspring-boot.run.profiles=h2

# Or use the H2 startup script
./start-h2.bat
```

### **NPM/Node Issues**
```bash
# Clear cache and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📝 Adding New Features

### **Backend - Add New Entity**
1. Create model in `model/` package
2. Create repository in `repository/` package  
3. Create service in `service/` package
4. Create controller in `controller/` package
5. Add DTOs in `dto/` package

### **Frontend - Add New Component**
1. Create component in appropriate `components/` subfolder
2. Add routing in `App.js`
3. Create service methods in `services/`
4. Add navigation in `NavigationBar.js`

## 🔍 Testing Endpoints

### **Authentication**
```bash
# Register user
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"password","firstName":"Test","lastName":"User","role":"STUDENT"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"password"}'
```

### **Protected Endpoints**
```bash
# Get questions (requires JWT token)
curl -X GET http://localhost:8080/api/questions \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📊 Project Statistics

- **Backend Files**: ~25 Java classes
- **Frontend Components**: ~15 React components  
- **API Endpoints**: ~20 REST endpoints
- **Database Tables**: ~7 main entities
- **Authentication**: JWT-based with roles
- **UI Framework**: React Bootstrap + Custom CSS