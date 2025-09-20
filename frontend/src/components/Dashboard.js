import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ApiService from '../services/ApiService';

const Dashboard = ({ currentUser }) => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      if (currentUser.role === 'QUESTION_SETTER') {
        const [examsResponse, questionsResponse] = await Promise.all([
          ApiService.getMyExams(),
          ApiService.getMyQuestions()
        ]);
        setStats({
          totalExams: examsResponse.data.length,
          totalQuestions: questionsResponse.data.length,
          activeExams: examsResponse.data.filter(e => e.status === 'ACTIVE').length,
          completedExams: examsResponse.data.filter(e => e.status === 'COMPLETED').length
        });
      } else {
        const [activeExamsResponse, resultsResponse] = await Promise.all([
          ApiService.getActiveExams(),
          ApiService.getMyResults()
        ]);
        setStats({
          availableExams: activeExamsResponse.data.length,
          completedExams: resultsResponse.data.length,
          passedExams: resultsResponse.data.filter(r => r.passed).length,
          averageScore: resultsResponse.data.length > 0 
            ? (resultsResponse.data.reduce((sum, r) => sum + r.percentage, 0) / resultsResponse.data.length).toFixed(1)
            : 0
        });
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
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
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Dashboard</h1>
        <div className="text-muted">
          Welcome back, {currentUser.firstName}!
        </div>
      </div>

      {currentUser.role === 'QUESTION_SETTER' ? (
        <QuestionSetterDashboard stats={stats} />
      ) : (
        <StudentDashboard stats={stats} />
      )}
    </div>
  );
};

const QuestionSetterDashboard = ({ stats }) => (
  <>
    <Row className="mb-4">
      <Col md={3}>
        <Card className="text-center">
          <Card.Body>
            <h3 className="text-primary">{stats.totalQuestions || 0}</h3>
            <p className="mb-0">Total Questions</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center">
          <Card.Body>
            <h3 className="text-info">{stats.totalExams || 0}</h3>
            <p className="mb-0">Total Exams</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center">
          <Card.Body>
            <h3 className="text-success">{stats.activeExams || 0}</h3>
            <p className="mb-0">Active Exams</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center">
          <Card.Body>
            <h3 className="text-warning">{stats.completedExams || 0}</h3>
            <p className="mb-0">Completed Exams</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row>
      <Col md={4}>
        <Card className="exam-card h-100">
          <Card.Body className="text-center">
            <Card.Title>Manage Questions</Card.Title>
            <Card.Text>Create and manage your question bank</Card.Text>
            <Button as={Link} to="/questions" variant="primary">
              Go to Questions
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="exam-card h-100">
          <Card.Body className="text-center">
            <Card.Title>Manage Exams</Card.Title>
            <Card.Text>Create, schedule and activate exams</Card.Text>
            <Button as={Link} to="/exams" variant="success">
              Go to Exams
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="exam-card h-100">
          <Card.Body className="text-center">
            <Card.Title>View Analytics</Card.Title>
            <Card.Text>Analyze exam performance and patterns</Card.Text>
            <Button as={Link} to="/analytics" variant="info">
              View Analytics
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </>
);

const StudentDashboard = ({ stats }) => (
  <>
    <Row className="mb-4">
      <Col md={3}>
        <Card className="text-center">
          <Card.Body>
            <h3 className="text-primary">{stats.availableExams || 0}</h3>
            <p className="mb-0">Available Exams</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center">
          <Card.Body>
            <h3 className="text-info">{stats.completedExams || 0}</h3>
            <p className="mb-0">Completed Exams</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center">
          <Card.Body>
            <h3 className="text-success">{stats.passedExams || 0}</h3>
            <p className="mb-0">Passed Exams</p>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card className="text-center">
          <Card.Body>
            <h3 className="text-warning">{stats.averageScore || 0}%</h3>
            <p className="mb-0">Average Score</p>
          </Card.Body>
        </Card>
      </Col>
    </Row>

    <Row>
      <Col md={4}>
        <Card className="exam-card h-100">
          <Card.Body className="text-center">
            <Card.Title>Take Exams</Card.Title>
            <Card.Text>View and attempt available exams</Card.Text>
            <Button as={Link} to="/exams/active" variant="primary">
              Take Exams
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="exam-card h-100">
          <Card.Body className="text-center">
            <Card.Title>My Results</Card.Title>
            <Card.Text>View your exam scores and performance</Card.Text>
            <Button as={Link} to="/results" variant="success">
              View Results
            </Button>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="exam-card h-100">
          <Card.Body className="text-center">
            <Card.Title>Q&A Forum</Card.Title>
            <Card.Text>Ask questions and help your peers</Card.Text>
            <Button as={Link} to="/forum" variant="info">
              Go to Forum
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </>
);

export default Dashboard;
