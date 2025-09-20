# StudySync - Interactive Learning Platform

StudySync is a comprehensive web-based educational platform that enables effective self-assessment and collaborative learning. The platform features question and exam management, student assessment tools, and a Q&A forum for peer-to-peer knowledge exchange.

## 🚀 Features

### For Question Setters (Educators)
- **Question Management**: Create, edit, and manage multiple-choice questions
- **Exam Creation**: Design exams by selecting from question bank
- **Exam Control**: Activate, deactivate, and mark exams as completed
- **Analytics Dashboard**: View detailed performance analytics and question-wise statistics
- **Pattern Analysis**: Identify common student misconceptions through visual charts

### For Students
- **Exam Taking**: Attempt active exams with real-time submission
- **Results Tracking**: View scores, pass/fail status, and performance history
- **Q&A Forum**: Post questions, provide answers, and collaborate with peers
- **Performance Insights**: Track progress across multiple exams

### General Features
- **User Authentication**: Secure registration and login with JWT tokens
- **Role-based Access**: Different interfaces for students and question setters
- **Responsive Design**: Modern Bootstrap-based UI that works on all devices
- **Real-time Updates**: Dynamic content updates without page refresh

## 🛠️ Technology Stack

### Backend
- **Java 17** with **Spring Boot 3.2.0**
- **Spring Security** for authentication and authorization
- **Spring Data JPA** with Hibernate ORM
- **PostgreSQL** (production) / **H2** (development/testing)
- **JWT** for stateless authentication
- **Maven** for dependency management

### Frontend
- **React 18** with functional components and hooks
- **React Router** for navigation
- **React Bootstrap** for UI components
- **Axios** for API communication
- **Chart.js** for data visualization
- **React Icons** for modern iconography
- **Bootstrap 5** for responsive styling

## � Project Structure

```
StudySync/
├── 📂 backend/                    # Spring Boot Backend
│   ├── 📄 pom.xml                # Maven dependencies
│   ├── 📂 src/main/
│   │   ├── 📂 java/com/studysync/
│   │   │   ├── 📄 StudySyncApplication.java    # Main application
│   │   │   ├── 📂 config/         # Configuration classes
│   │   │   ├── 📂 controller/     # REST API endpoints
│   │   │   ├── 📂 dto/            # Data Transfer Objects
│   │   │   ├── 📂 model/          # Database entities
│   │   │   ├── 📂 repository/     # Data access layer
│   │   │   ├── 📂 security/       # JWT & Authentication
│   │   │   └── 📂 service/        # Business logic
│   │   └── 📂 resources/
│   │       ├── 📄 application.properties      # PostgreSQL config
│   │       └── 📄 application-h2.properties   # H2 config
│   └── 📂 target/                 # Compiled classes & JAR
│
├── 📂 frontend/                   # React Frontend
│   ├── 📄 package.json           # NPM dependencies
│   ├── 📂 public/
│   ├── 📂 src/
│   │   ├── 📄 App.js             # Main React component
│   │   ├── 📄 index.css          # Global styles
│   │   ├── 📂 components/
│   │   │   ├── 📂 auth/          # Authentication components
│   │   │   ├── 📂 questions/     # Question management
│   │   │   ├── 📂 exams/         # Exam functionality
│   │   │   ├── 📂 forum/         # Q&A Forum
│   │   │   └── 📂 analytics/     # Performance analytics
│   │   └── 📂 services/          # API communication
│   └── 📂 build/                 # Production build
│
├── 📄 .gitignore                 # Git ignore rules
├── 📄 README.md                  # Project documentation
├── 📄 start.bat                  # PostgreSQL startup (Windows)
├── 📄 start-h2.bat              # H2 startup (Windows)
├── 📄 start.sh                   # PostgreSQL startup (Linux/Mac)
└── 📄 start-h2.sh               # H2 startup (Linux/Mac)
```

### Backend Architecture
```
CLIENT REQUESTS
       ↓
CONTROLLERS LAYER (REST API endpoints)
       ↓
SECURITY LAYER (JWT Authentication & Authorization)
       ↓
SERVICES LAYER (Business logic)
       ↓
REPOSITORIES LAYER (Data access)
       ↓
DATABASE LAYER (PostgreSQL/H2)
```

### Frontend Architecture
```
BROWSER
   ↓
APP.JS (Main Router)
   ↓
COMPONENTS LAYER (Auth, Questions, Exams, Forum, Analytics)
   ↓
SERVICES LAYER (AuthService, ApiService)
   ↓
BACKEND API (http://localhost:8080)
```

## 🏃‍♂️ Getting Started

### Quick Start (No Database Installation Required)

```bash
# Windows
start-h2.bat

# Linux/Mac
chmod +x start-h2.sh
./start-h2.sh
```

This will start StudySync with H2 in-memory database - **no PostgreSQL installation needed!**

### Option A: H2 Database (Recommended for Testing)
**✅ No installation required - works out of the box!**

```bash
# Windows
start-h2.bat

# Linux/Mac
chmod +x start-h2.sh
./start-h2.sh
```

- **Pros**: Zero setup, perfect for development/testing
- **Cons**: Data is lost when application stops
- **Access**: H2 Console at http://localhost:8080/h2-console

### Option B: PostgreSQL Database (Production Ready)
**🔧 Requires PostgreSQL installation**

```bash
# Windows
start.bat

# Linux/Mac
./start.sh
```

**PostgreSQL Setup:**
1. Install and start PostgreSQL
2. Create a database named `studysync`
3. Update credentials in `backend/src/main/resources/application.properties`

### Manual Setup (If needed)

#### Backend Setup
```bash
cd backend
# For H2 database
mvn spring-boot:run -Dspring-boot.run.profiles=h2

# For PostgreSQL database
mvn spring-boot:run
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **H2 Console**: http://localhost:8080/h2-console (H2 mode only)

---

**StudySync** - Empowering education through interactive assessment and collaboration! 🎓
   - Enter question text, options (A-D), and correct answer
   - Save the question

2. **Create Exams**:
   - Go to "Exams" section
   - Click "Create New Exam"
   - Add title, description, and select questions
   - Save as draft

3. **Activate Exams**:
   - Find your exam in the list
   - Click "Activate" to make it available to students
   - Mark as "Completed" when exam period ends

4. **View Analytics**:
   - Navigate to "Analytics"
   - Select a completed exam
   - View overall statistics and question-wise performance

### For Students

1. **Take Exams**:
   - Go to "Take Exams"
   - Select an active exam
   - Answer all questions
   - Submit to see results

2. **View Results**:
   - Check "My Results" for all completed exams
   - See scores, percentages, and pass/fail status

3. **Use Forum**:
   - Navigate to "Forum"
   - Post questions or confusions
   - Answer other students' questions
   - Browse by tags or recent activity

## 🗄️ Database Schema

### Key Entities
- **Users**: Store user information with roles
- **Questions**: Multiple-choice questions with options
- **Exams**: Collections of questions with status
- **ExamAttempts**: Student attempts with scores
- **Answers**: Individual question responses
- **ForumQuestions**: Q&A forum posts
- **ForumAnswers**: Responses to forum questions

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Questions (Question Setters Only)
- `GET /api/questions` - Get my questions
- `POST /api/questions` - Create new question
- `PUT /api/questions/{id}` - Update question
- `DELETE /api/questions/{id}` - Delete question

### Exams
- `POST /api/exams` - Create exam (Question Setters)
- `GET /api/exams/my` - Get my exams (Question Setters)
- `GET /api/exams/active` - Get active exams (Students)
- `PUT /api/exams/{id}/status` - Update exam status
- `POST /api/exams/{id}/submit` - Submit exam (Students)

### Forum
- `GET /api/forum/questions` - Get all forum questions
- `POST /api/forum/questions` - Post new question
- `POST /api/forum/questions/{id}/answers` - Post answer

### Analytics (Question Setters Only)
- `GET /api/analytics/exams/{id}` - Get exam analytics
- `GET /api/analytics/exams` - Get all exam analytics

## 🔒 Security Features

- **JWT Authentication**: Stateless token-based authentication
- **Role-based Access Control**: Different permissions for students and question setters
- **Password Encryption**: BCrypt hashing for secure password storage
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Input Validation**: Server-side validation for all inputs

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Interactive Charts**: Visual analytics using Chart.js
- **Real-time Feedback**: Immediate exam results and scoring
- **Modern Interface**: Clean, professional Bootstrap-based design
- **Accessibility**: Proper ARIA labels and keyboard navigation

## 🚀 Deployment

### Backend Deployment
1. Package the application: `mvn clean package`
2. Run the JAR: `java -jar target/studysync-backend-0.0.1-SNAPSHOT.jar`

### Frontend Deployment
1. Build for production: `npm run build`
2. Serve the `build` directory with a web server

### Production Considerations
- Configure PostgreSQL database
- Set up environment variables for sensitive data
- Enable HTTPS
- Configure proper CORS origins
- Set up monitoring and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation above
- Review the code comments
- Open an issue on GitHub

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. User Registration/Login Not Working
- **Check Backend Status**: Run `test-backend.bat` to verify backend is running
- **Database Issues**: Ensure H2 database is properly configured in `application.properties`
- **CORS Errors**: Verify `cors.allowed-origins=http://localhost:3000` is set correctly

#### 2. Frontend Build Warnings/Errors
- **ESLint Warnings**: These are non-blocking warnings that don't prevent functionality
- **Proxy Errors**: Backend must be running before starting frontend
- **Dependencies**: Run `npm install` in frontend directory if modules are missing

#### 3. Backend Won't Start
- **Port 8080 Busy**: Kill existing Java processes or change server port
- **Database Connection**: Check if H2 database configuration is valid
- **Dependencies**: Run `mvn clean install` to rebuild dependencies

#### 4. Frontend Won't Start
- **Port 3000 Busy**: React will offer to run on a different port
- **Node Modules**: Delete `node_modules` and run `npm install` fresh
- **Build Issues**: Try `npm run build` to check for compilation errors

### Quick Restart
If you encounter any issues, use the restart script:
```bash
# Windows
restart.bat

# This will:
# 1. Kill any existing Java/Node processes
# 2. Start backend server
# 3. Start frontend development server
```

### Testing Backend Connectivity
```bash
# Windows
test-backend.bat

# Manual test
curl http://localhost:8080/api/auth/test
```

---

**StudySync** - Empowering education through interactive assessment and collaboration! 🎓
=======
# Study-Sync
>>>>>>> 88c555b544b8b0c607528e2a86c5357c8ec9ea90
