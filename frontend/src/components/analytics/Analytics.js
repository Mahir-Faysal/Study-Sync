import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Alert } from 'react-bootstrap';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ApiService from '../../services/ApiService';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [analytics, setAnalytics] = useState([]);
  const [selectedExamAnalytics, setSelectedExamAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const response = await ApiService.getMyExamAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      setError('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const loadExamAnalytics = async (examId) => {
    try {
      const response = await ApiService.getExamAnalytics(examId);
      setSelectedExamAnalytics(response.data);
    } catch (error) {
      setError('Failed to load detailed analytics');
    }
  };

  const getChartData = () => {
    if (!selectedExamAnalytics || !selectedExamAnalytics.questionAnalytics) {
      return null;
    }

    return {
      labels: selectedExamAnalytics.questionAnalytics.map((q, index) => `Q${index + 1}`),
      datasets: [
        {
          label: 'Correct Answers (%)',
          data: selectedExamAnalytics.questionAnalytics.map(q => q.correctPercentage),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Question-wise Performance Analysis',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      },
    },
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
      <h1>Exam Analytics</h1>
      
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      {analytics.length === 0 ? (
        <Card>
          <Card.Body className="text-center py-4">
            <p>No completed exams found. Complete some exams to view analytics!</p>
          </Card.Body>
        </Card>
      ) : (
        <>
          <Row className="mb-4">
            {analytics.map(exam => (
              <Col md={6} lg={4} key={exam.examId} className="mb-3">
                <Card 
                  className="exam-card h-100" 
                  style={{ cursor: 'pointer' }}
                  onClick={() => loadExamAnalytics(exam.examId)}
                >
                  <Card.Body>
                    <Card.Title>{exam.examTitle}</Card.Title>
                    <div className="mb-2">
                      <strong>Total Attempts:</strong> {exam.totalAttempts}
                    </div>
                    <div className="mb-2">
                      <strong>Average Score:</strong> {exam.averageScore ? exam.averageScore.toFixed(1) : 'N/A'}
                    </div>
                    <div className="text-center">
                      <small className="text-muted">Click to view detailed analytics</small>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {selectedExamAnalytics && (
            <Card>
              <Card.Header>
                <h3>{selectedExamAnalytics.examTitle} - Detailed Analytics</h3>
              </Card.Header>
              <Card.Body>
                <Row className="mb-4">
                  <Col md={4}>
                    <div className="text-center">
                      <h4 className="text-primary">{selectedExamAnalytics.totalAttempts}</h4>
                      <p>Total Attempts</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center">
                      <h4 className="text-success">
                        {selectedExamAnalytics.averageScore ? selectedExamAnalytics.averageScore.toFixed(1) : 'N/A'}
                      </h4>
                      <p>Average Score</p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="text-center">
                      <h4 className="text-info">
                        {selectedExamAnalytics.questionAnalytics ? selectedExamAnalytics.questionAnalytics.length : 0}
                      </h4>
                      <p>Total Questions</p>
                    </div>
                  </Col>
                </Row>

                {selectedExamAnalytics.questionAnalytics && selectedExamAnalytics.questionAnalytics.length > 0 && (
                  <>
                    <div className="chart-container mb-4">
                      <Bar data={getChartData()} options={chartOptions} />
                    </div>

                    <Card>
                      <Card.Header>
                        <h5>Question Performance Details</h5>
                      </Card.Header>
                      <Card.Body>
                        {selectedExamAnalytics.questionAnalytics.map((question, index) => (
                          <div key={question.questionId} className="mb-3 p-3 border rounded">
                            <h6>Question {index + 1}</h6>
                            <p className="mb-2">{question.questionText}</p>
                            <div className="row">
                              <div className="col-md-4">
                                <strong>Correct Answers:</strong> {question.correctAnswers}/{question.totalAnswers}
                              </div>
                              <div className="col-md-4">
                                <strong>Success Rate:</strong> {question.correctPercentage.toFixed(1)}%
                              </div>
                              <div className="col-md-4">
                                {question.correctPercentage < 50 ? (
                                  <span className="badge bg-danger">Challenging Question</span>
                                ) : question.correctPercentage > 80 ? (
                                  <span className="badge bg-success">Easy Question</span>
                                ) : (
                                  <span className="badge bg-warning">Moderate Question</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </>
                )}
              </Card.Body>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default Analytics;
