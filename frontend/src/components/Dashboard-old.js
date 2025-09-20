import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, ProgressBar, Badge } from 'react-bootstrap';
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
        const [examsResponse, attemptsResponse] = await Promise.all([
          ApiService.getActiveExams(),
          ApiService.getMyExamAttempts()
        ]);
        setStats({
          availableExams: examsResponse.data.length,
          completedExams: attemptsResponse.data.length,
          avgScore: attemptsResponse.data.length > 0 
            ? Math.round(attemptsResponse.data.reduce((sum, attempt) => sum + attempt.score, 0) / attemptsResponse.data.length)
            : 0,
          passedExams: attemptsResponse.data.filter(attempt => attempt.passed).length
        });
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, subtitle, color, icon, progress }) => (
    <Col md={6} lg={3} className="mb-4">
      <Card className="stat-card fade-in-up h-100">
        <Card.Body className="text-center">
          <div className="stat-icon mb-3">
            <i className={`fas ${icon} fa-3x`} style={{ color }}></i>
          </div>
          <div className="stat-number">{value}</div>
          <div className="stat-label">{title}</div>
          {subtitle && <small className="text-muted">{subtitle}</small>}
          {progress !== undefined && (
            <ProgressBar 
              variant="primary" 
              now={progress} 
              className="mt-2"
              style={{ height: '8px', borderRadius: '4px' }}
            />
          )}
        </Card.Body>
      </Card>
    </Col>
  );

  const WelcomeCard = () => (
    <Col xs={12} className="mb-4">
      <Card className="border-0 slide-in-left" style={{ 
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
        backdropFilter: 'blur(10px)'
      }}>
        <Card.Body className="py-4">
          <Row className="align-items-center">
            <Col md={8}>
              <h2 className="mb-2">
                Welcome back, <span style={{ 
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>{currentUser.firstName}!</span>
              </h2>
              <p className="text-muted mb-0">
                {currentUser.role === 'QUESTION_SETTER' 
                  ? 'Manage your questions and exams from your dashboard.'
                  : 'Take exams, track your progress, and engage with the community.'}
              </p>
            </Col>
            <Col md={4} className="text-end">
              <Badge 
                bg="primary" 
                className="px-3 py-2"
                style={{ 
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  fontSize: '0.9rem',
                  borderRadius: '20px'
                }}
              >
                {currentUser.role.replace('_', ' ')}
              </Badge>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );

  const QuickActionsCard = () => (
    <Col xs={12} className="mb-4">
      <Card className="fade-in-up">
        <Card.Header>
          <h5 className="mb-0">
            <i className="fas fa-bolt text-warning me-2"></i>
            Quick Actions
          </h5>
        </Card.Header>
        <Card.Body>
          <Row>
            {currentUser.role === 'QUESTION_SETTER' ? (
              <>
                <Col md={3} className="mb-2">
                  <Button 
                    as={Link} 
                    to="/questions" 
                    variant="primary" 
                    className="w-100"
                    style={{ borderRadius: '15px' }}
                  >
                    <i className="fas fa-question-circle me-2"></i>
                    Manage Questions
                  </Button>
                </Col>
                <Col md={3} className="mb-2">
                  <Button 
                    as={Link} 
                    to="/exams" 
                    variant="success" 
                    className="w-100"
                    style={{ borderRadius: '15px' }}
                  >
                    <i className="fas fa-clipboard-list me-2"></i>
                    Manage Exams
                  </Button>
                </Col>
                <Col md={3} className="mb-2">
                  <Button 
                    as={Link} 
                    to="/analytics" 
                    variant="info" 
                    className="w-100"
                    style={{ borderRadius: '15px' }}
                  >
                    <i className="fas fa-chart-bar me-2"></i>
                    View Analytics
                  </Button>
                </Col>
                <Col md={3} className="mb-2">
                  <Button 
                    as={Link} 
                    to="/forum" 
                    variant="warning" 
                    className="w-100"
                    style={{ borderRadius: '15px' }}
                  >
                    <i className="fas fa-comments me-2"></i>
                    Forum
                  </Button>
                </Col>
              </>
            ) : (
              <>
                <Col md={3} className="mb-2">
                  <Button 
                    as={Link} 
                    to="/exams" 
                    variant="primary" 
                    className="w-100"
                    style={{ borderRadius: '15px' }}
                  >
                    <i className="fas fa-play me-2"></i>
                    Take Exam
                  </Button>
                </Col>
                <Col md={3} className="mb-2">
                  <Button 
                    as={Link} 
                    to="/results" 
                    variant="success" 
                    className="w-100"
                    style={{ borderRadius: '15px' }}
                  >
                    <i className="fas fa-trophy me-2"></i>
                    View Results
                  </Button>
                </Col>
                <Col md={3} className="mb-2">
                  <Button 
                    as={Link} 
                    to="/forum" 
                    variant="info" 
                    className="w-100"
                    style={{ borderRadius: '15px' }}
                  >
                    <i className="fas fa-question me-2"></i>
                    Ask Questions
                  </Button>
                </Col>
                <Col md={3} className="mb-2">
                  <Button 
                    as={Link} 
                    to="/analytics" 
                    variant="warning" 
                    className="w-100"
                    style={{ borderRadius: '15px' }}
                  >
                    <i className="fas fa-chart-line me-2"></i>
                    My Progress
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Card.Body>
      </Card>
    </Col>
  );

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="text-center">
          <div className="loading-spinner mb-3"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <Row>
        <WelcomeCard />
        
        {currentUser.role === 'QUESTION_SETTER' ? (
          <>
            <StatCard 
              title="Total Questions" 
              value={stats.totalQuestions || 0}
              subtitle="In your question bank"
              color="#667eea"
              icon="fa-question-circle"
            />
            <StatCard 
              title="Total Exams" 
              value={stats.totalExams || 0}
              subtitle="Created by you"
              color="#764ba2"
              icon="fa-clipboard-list"
            />
            <StatCard 
              title="Active Exams" 
              value={stats.activeExams || 0}
              subtitle="Currently running"
              color="#56CCF2"
              icon="fa-play-circle"
            />
            <StatCard 
              title="Completed Exams" 
              value={stats.completedExams || 0}
              subtitle="Finished exams"
              color="#FF6B6B"
              icon="fa-check-circle"
            />
          </>
        ) : (
          <>
            <StatCard 
              title="Available Exams" 
              value={stats.availableExams || 0}
              subtitle="Ready to take"
              color="#667eea"
              icon="fa-book-open"
            />
            <StatCard 
              title="Completed Exams" 
              value={stats.completedExams || 0}
              subtitle="Exams taken"
              color="#56CCF2"
              icon="fa-check-circle"
            />
            <StatCard 
              title="Average Score" 
              value={`${stats.avgScore || 0}%`}
              subtitle="Overall performance"
              color="#4ECDC4"
              icon="fa-chart-line"
              progress={stats.avgScore || 0}
            />
            <StatCard 
              title="Passed Exams" 
              value={stats.passedExams || 0}
              subtitle="Successfully completed"
              color="#FF6B6B"
              icon="fa-trophy"
            />
          </>
        )}
        
        <QuickActionsCard />
      </Row>
    </div>
  );
};
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
