import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Badge, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/ApiService';

const ExamTaking = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [examResult, setExamResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadActiveExams();
  }, []);

  const loadActiveExams = async () => {
    try {
      const response = await ApiService.getActiveExams();
      setExams(response.data);
    } catch (error) {
      setError('Failed to load active exams');
    } finally {
      setLoading(false);
    }
  };

  const startExam = async (exam) => {
    try {
      const response = await ApiService.getExam(exam.id);
      setSelectedExam(response.data);
      setCurrentQuestionIndex(0);
      setAnswers({});
    } catch (error) {
      setError('Failed to load exam details');
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < selectedExam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const submitExam = async () => {
    if (Object.keys(answers).length !== selectedExam.questions.length) {
      setError('Please answer all questions before submitting');
      return;
    }

    setSubmitting(true);
    try {
      const response = await ApiService.submitExam(selectedExam.id, answers);
      setExamResult(response.data);
      setSelectedExam(null);
    } catch (error) {
      setError('Failed to submit exam');
    } finally {
      setSubmitting(false);
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

  if (examResult) {
    return (
      <div>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>Exam Completed!</Card.Title>
            <h2 className={examResult.passed ? 'text-success' : 'text-danger'}>
              {examResult.score}/{examResult.totalQuestions}
            </h2>
            <p className="lead">
              Percentage: {examResult.percentage.toFixed(1)}%
            </p>
            <Badge bg={examResult.passed ? 'success' : 'danger'} className="mb-3">
              {examResult.passed ? 'PASSED' : 'FAILED'}
            </Badge>
            <div>
              <Button variant="primary" onClick={() => navigate('/results')}>
                View All Results
              </Button>
              <Button 
                variant="secondary" 
                className="ms-2"
                onClick={() => {
                  setExamResult(null);
                  loadActiveExams();
                }}
              >
                Take Another Exam
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }

  if (selectedExam) {
    const currentQuestion = selectedExam.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedExam.questions.length) * 100;

    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>{selectedExam.title}</h1>
          <Button 
            variant="outline-secondary"
            onClick={() => setSelectedExam(null)}
          >
            Exit Exam
          </Button>
        </div>

        {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

        <Card>
          <Card.Header>
            <div className="d-flex justify-content-between align-items-center">
              <span>Question {currentQuestionIndex + 1} of {selectedExam.questions.length}</span>
              <div className="progress" style={{ width: '200px' }}>
                <div 
                  className="progress-bar" 
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <h5 className="mb-4">{currentQuestion.questionText}</h5>
            
            <div className="mb-4">
              {['A', 'B', 'C', 'D'].map(option => (
                <div 
                  key={option}
                  className={`question-option ${answers[currentQuestion.id] === option ? 'selected' : ''}`}
                  onClick={() => handleAnswerChange(currentQuestion.id, option)}
                >
                  <strong>{option}:</strong> {currentQuestion[`option${option}`]}
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-between">
              <Button 
                variant="outline-primary"
                onClick={prevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              
              {currentQuestionIndex === selectedExam.questions.length - 1 ? (
                <Button 
                  variant="success"
                  onClick={submitExam}
                  disabled={submitting}
                >
                  {submitting ? 'Submitting...' : 'Submit Exam'}
                </Button>
              ) : (
                <Button 
                  variant="primary"
                  onClick={nextQuestion}
                  disabled={currentQuestionIndex === selectedExam.questions.length - 1}
                >
                  Next
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>

        <Card className="mt-3">
          <Card.Body>
            <h6>Answer Summary:</h6>
            <div className="d-flex flex-wrap">
              {selectedExam.questions.map((q, index) => (
                <Button
                  key={q.id}
                  variant={answers[q.id] ? 'success' : 'outline-secondary'}
                  size="sm"
                  className="me-2 mb-2"
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <h1>Active Exams</h1>
      
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      {exams.length === 0 ? (
        <Card>
          <Card.Body className="text-center py-4">
            <p>No active exams available at this time.</p>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {exams.map(exam => (
            <Col md={6} lg={4} key={exam.id} className="mb-3">
              <Card className="exam-card h-100">
                <Card.Body>
                  <Card.Title>{exam.title}</Card.Title>
                  <Card.Text>{exam.description}</Card.Text>
                  <div className="mb-3">
                    <Badge bg="info">{exam.totalQuestions} Questions</Badge>
                    <Badge bg="success" className="ms-2">{exam.status}</Badge>
                  </div>
                  <Button 
                    variant="primary" 
                    onClick={() => startExam(exam)}
                    className="w-100"
                  >
                    Start Exam
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default ExamTaking;
