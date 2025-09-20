# StudySync - Project Structure Overview

## 📁 Repository Structure

```
StudySync/
├── 📂 backend/                    # Spring Boot Backend
│   ├── 📄 pom.xml                # Maven dependencies
│   ├── 📂 src/main/
│   │   ├── 📂 java/com/studysync/
│   │   │   ├── 📄 StudySyncApplication.java    # Main application
│   │   │   ├── 📂 config/         # Configuration classes
│   │   │   │   └── 📄 SecurityConfig.java
│   │   │   ├── 📂 controller/     # REST API endpoints
│   │   │   │   ├── 📄 AuthController.java
│   │   │   │   ├── 📄 QuestionController.java
│   │   │   │   ├── 📄 ExamController.java
│   │   │   │   ├── 📄 ForumController.java
│   │   │   │   └── 📄 AnalyticsController.java
│   │   │   ├── 📂 dto/            # Data Transfer Objects
│   │   │   │   ├── 📄 LoginRequest.java
│   │   │   │   ├── 📄 RegisterRequest.java
│   │   │   │   ├── 📄 QuestionRequest.java
│   │   │   │   ├── 📄 ExamRequest.java
│   │   │   │   └── 📄 JwtResponse.java
│   │   │   ├── 📂 model/          # Database entities
│   │   │   │   ├── 📄 User.java
│   │   │   │   ├── 📄 Question.java
│   │   │   │   ├── 📄 Exam.java
│   │   │   │   ├── 📄 Answer.java
│   │   │   │   ├── 📄 ExamAttempt.java
│   │   │   │   ├── 📄 ForumQuestion.java
│   │   │   │   └── 📄 ForumAnswer.java
│   │   │   ├── 📂 repository/     # Data access layer
│   │   │   │   ├── 📄 UserRepository.java
│   │   │   │   ├── 📄 QuestionRepository.java
│   │   │   │   ├── 📄 ExamRepository.java
│   │   │   │   └── 📄 ExamAttemptRepository.java
│   │   │   ├── 📂 security/       # JWT & Authentication
│   │   │   │   ├── 📄 JwtTokenProvider.java
│   │   │   │   ├── 📄 JwtAuthenticationFilter.java
│   │   │   │   ├── 📄 CustomUserDetailsService.java
│   │   │   │   └── 📄 UserPrincipal.java
│   │   │   └── 📂 service/        # Business logic
│   │   │       ├── 📄 AuthService.java
│   │   │       ├── 📄 QuestionService.java
│   │   │       ├── 📄 ExamService.java
│   │   │       ├── 📄 ForumService.java
│   │   │       └── 📄 AnalyticsService.java
│   │   └── 📂 resources/
│   │       ├── 📄 application.properties      # PostgreSQL config
│   │       └── 📄 application-h2.properties   # H2 config
│   └── 📂 target/                 # Compiled classes & JAR
│
├── 📂 frontend/                   # React Frontend
│   ├── 📄 package.json           # NPM dependencies
│   ├── 📂 public/
│   │   └── 📄 index.html
│   ├── 📂 src/
│   │   ├── 📄 App.js             # Main React component
│   │   ├── 📄 index.js           # Application entry point
│   │   ├── 📄 index.css          # Global styles
│   │   ├── 📂 components/
│   │   │   ├── 📄 Dashboard.js
│   │   │   ├── 📄 NavigationBar.js
│   │   │   ├── 📂 auth/          # Authentication components
│   │   │   │   ├── 📄 Login.js
│   │   │   │   └── 📄 Register.js
│   │   │   ├── 📂 questions/     # Question management
│   │   │   │   └── 📄 QuestionManager.js
│   │   │   ├── 📂 exams/         # Exam functionality
│   │   │   │   ├── 📄 ExamManager.js
│   │   │   │   ├── 📄 ExamTaking.js
│   │   │   │   └── 📄 ExamResults.js
│   │   │   ├── 📂 forum/         # Q&A Forum
│   │   │   │   └── 📄 Forum.js
│   │   │   └── 📂 analytics/     # Performance analytics
│   │   │       └── 📄 Analytics.js
│   │   └── 📂 services/          # API communication
│   │       ├── 📄 AuthService.js
│   │       └── 📄 ApiService.js
│   └── 📂 build/                 # Production build
│
├── 📄 .gitignore                 # Git ignore rules
├── 📄 README.md                  # Project documentation
├── 📄 DATABASE-OPTIONS.md        # Database setup guide
├── 📄 start.bat                  # PostgreSQL startup (Windows)
├── 📄 start-h2.bat              # H2 startup (Windows)
├── 📄 start.sh                   # PostgreSQL startup (Linux/Mac)
└── 📄 start-h2.sh               # H2 startup (Linux/Mac)
```

## 🏗️ Architecture Overview

### **Backend Architecture (Spring Boot)**
```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT REQUESTS                        │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                 CONTROLLERS LAYER                           │
│  ┌─────────────┐ ┌──────────────┐ ┌─────────────────────┐   │
│  │AuthController│ │QuestionController│ │ExamController  │   │
│  └─────────────┘ └──────────────┘ └─────────────────────┘   │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                 SECURITY LAYER                              │
│     ┌──────────────────┐    ┌─────────────────────────┐     │
│     │JWT Authentication│    │Role-based Authorization │     │
│     └──────────────────┘    └─────────────────────────┘     │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                 SERVICES LAYER                              │
│  ┌────────────┐ ┌─────────────┐ ┌──────────────────────┐    │
│  │AuthService │ │QuestionService│ │ExamService         │    │
│  └────────────┘ └─────────────┘ └──────────────────────┘    │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                REPOSITORIES LAYER                           │
│    ┌─────────────┐ ┌──────────────┐ ┌─────────────────┐     │
│    │UserRepository│ │QuestionRepository│ │ExamRepository │  │
│    └─────────────┘ └──────────────┘ └─────────────────┘     │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                 DATABASE LAYER                              │
│              ┌──────────────┐  ┌─────────────┐              │
│              │ PostgreSQL   │  │ H2 Database │              │
│              │ (Production) │  │ (Development)│              │
│              └──────────────┘  └─────────────┘              │
└─────────────────────────────────────────────────────────────┘
```

### **Frontend Architecture (React)**
```
┌─────────────────────────────────────────────────────────────┐
│                      BROWSER                                │
└─────────────────────┬───────────────────────────────────────┘
                     │
┌─────────────────────▼───────────────────────────────────────┐
│                    APP.JS                                   │
│                 Main Router                                 │
└─────────────────────┬───────────────────────────────────────┘
                     │
┌─────────────────────▼──────────────────────────────────────┐
│                 COMPONENTS LAYER                           │
│                                                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │    Auth     │  │  Questions  │  │       Exams         │ │
│  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────────────┐ │ │
│  │ │ Login   │ │  │ │Question │ │  │ │  ExamManager    │ │ │
│  │ │Register │ │  │ │Manager  │ │  │ │  ExamTaking     │ │ │
│  │ └─────────┘ │  │ └─────────┘ │  │ │  ExamResults    │ │ │
│  └─────────────┘  └─────────────┘  │ └─────────────────┘ │ │
│                                    └─────────────────────┘ │
│                                                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Forum     │  │ Analytics   │  │     Dashboard       │ │
│  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────────────┐ │ │
│  │ │Forum.js │ │  │ │Analytics│ │  │ │   Statistics    │ │ │
│  │ └─────────┘ │  │ │.js      │ │  │ │   Overview      │ │ │
│  └─────────────┘  │ └─────────┘ │  │ └─────────────────┘ │ │
│                   └─────────────┘  └─────────────────────┘ │
└─────────────────────┬──────────────────────────────────────┘
                     │
┌─────────────────────▼───────────────────────────────────────┐
│                 SERVICES LAYER                              │
│     ┌──────────────┐         ┌─────────────────────────┐    │
│     │ AuthService  │         │     ApiService          │    │
│     │              │         │                         │    │
│     │ - login()    │         │ - HTTP requests         │    │
│     │ - register() │         │ - Error handling        │    │
│     │ - logout()   │         │ - Response processing   │    │
│     └──────────────┘         └─────────────────────────┘    │
└─────────────────────┬───────────────────────────────────────┘
                     │
┌─────────────────────▼───────────────────────────────────────┐
│                 BACKEND API                                 │
│              http://localhost:8080                          │
└─────────────────────────────────────────────────────────────┘
```

