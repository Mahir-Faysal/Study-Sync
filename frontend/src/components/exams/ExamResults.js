import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Alert } from 'react-bootstrap';
import ApiService from '../../services/ApiService';

const ExamResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadResults();
  }, []);

  const loadResults = async () => {
    try {
      const response = await ApiService.getMyResults();
      setResults(response.data);
    } catch (error) {
      setError('Failed to load exam results');
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
      <h1>My Exam Results</h1>
      
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}

      <Card>
        <Card.Body>
          {results.length === 0 ? (
            <div className="text-center py-4">
              <p>No exam results found. Take some exams to see your results here!</p>
            </div>
          ) : (
            <Table responsive>
              <thead>
                <tr>
                  <th>Exam Title</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Status</th>
                  <th>Completed Date</th>
                </tr>
              </thead>
              <tbody>
                {results.map(result => (
                  <tr key={result.id}>
                    <td>{result.examTitle}</td>
                    <td>{result.score}/{result.totalQuestions}</td>
                    <td>{result.percentage.toFixed(1)}%</td>
                    <td>
                      <Badge bg={result.passed ? 'success' : 'danger'}>
                        {result.passed ? 'PASSED' : 'FAILED'}
                      </Badge>
                    </td>
                    <td>{new Date(result.completedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {results.length > 0 && (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Performance Summary</Card.Title>
            <div className="row">
              <div className="col-md-3">
                <div className="text-center">
                  <h4 className="text-primary">{results.length}</h4>
                  <p>Total Exams</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <h4 className="text-success">{results.filter(r => r.passed).length}</h4>
                  <p>Passed</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <h4 className="text-danger">{results.filter(r => !r.passed).length}</h4>
                  <p>Failed</p>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center">
                  <h4 className="text-info">
                    {(results.reduce((sum, r) => sum + r.percentage, 0) / results.length).toFixed(1)}%
                  </h4>
                  <p>Average Score</p>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ExamResults;
