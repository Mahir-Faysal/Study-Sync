import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import AuthService from './services/AuthService';
import NavigationBar from './components/NavigationBar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/Dashboard';
import QuestionManager from './components/questions/QuestionManager';
import ExamManager from './components/exams/ExamManager';
import ExamTaking from './components/exams/ExamTaking';
import ExamResults from './components/exams/ExamResults';
import Forum from './components/forum/Forum';
import Analytics from './components/analytics/Analytics';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    AuthService.logout();
    setCurrentUser(null);
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        {currentUser && (
          <NavigationBar currentUser={currentUser} logout={logout} />
        )}
        
        <Container className="mt-4">
          <Routes>
            <Route 
              path="/login" 
              element={
                !currentUser ? 
                <Login setCurrentUser={setCurrentUser} /> : 
                <Navigate to="/dashboard" />
              } 
            />
            <Route 
              path="/register" 
              element={
                !currentUser ? 
                <Register /> : 
                <Navigate to="/dashboard" />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                currentUser ? 
                <Dashboard currentUser={currentUser} /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/questions" 
              element={
                currentUser && currentUser.role === 'QUESTION_SETTER' ? 
                <QuestionManager /> : 
                <Navigate to="/dashboard" />
              } 
            />
            <Route 
              path="/exams" 
              element={
                currentUser && currentUser.role === 'QUESTION_SETTER' ? 
                <ExamManager /> : 
                <Navigate to="/dashboard" />
              } 
            />
            <Route 
              path="/exams/active" 
              element={
                currentUser && currentUser.role === 'STUDENT' ? 
                <ExamTaking /> : 
                <Navigate to="/dashboard" />
              } 
            />
            <Route 
              path="/results" 
              element={
                currentUser && currentUser.role === 'STUDENT' ? 
                <ExamResults /> : 
                <Navigate to="/dashboard" />
              } 
            />
            <Route 
              path="/forum" 
              element={
                currentUser ? 
                <Forum currentUser={currentUser} /> : 
                <Navigate to="/login" />
              } 
            />
            <Route 
              path="/analytics" 
              element={
                currentUser && currentUser.role === 'QUESTION_SETTER' ? 
                <Analytics /> : 
                <Navigate to="/dashboard" />
              } 
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;
