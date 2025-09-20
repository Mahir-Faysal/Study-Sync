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




## 🏃‍♂️ Getting Started


### Manual Setup

#### Backend Setup
```bash
cd backend

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

---


## 📄 License

This project is licensed under the MIT License.