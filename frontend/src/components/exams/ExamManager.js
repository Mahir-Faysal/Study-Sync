import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Modal, Form, Alert, Badge } from 'react-bootstrap';
import ApiService from '../../services/ApiService';

const ExamManager = () => {
  const [exams, setExams] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    questionIds: []
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [examsResponse, questionsResponse] = await Promise.all([
        ApiService.getMyExams(),
        ApiService.getMyQuestions()
      ]);
      setExams(examsResponse.data);
      setQuestions(questionsResponse.data);
    } catch (error) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ApiService.createExam(formData);
      setSuccess('Exam created successfully');
      handleCloseModal();
      loadData();
    } catch (error) {
      setError('Failed to create exam');
    }
  };

  const updateExamStatus = async (examId, status) => {
    try {
      await ApiService.updateExamStatus(examId, status);
      setSuccess(`Exam ${status.toLowerCase()} successfully`);
      loadData();
    } catch (error) {
      setError('Failed to update exam status');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      title: '',
      description: '',
      questionIds: []
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleQuestionSelection = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
    setFormData({
      ...formData,
      questionIds: selectedOptions
    });
  };

  const getStatusBadge = (status) => {
    const variants = {
      'DRAFT': 'secondary',
      'ACTIVE': 'success',
      'COMPLETED': 'warning'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
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
        <h1>Exam Manager</h1>
        <Button 
          variant="primary" 
          onClick={() => setShowModal(true)}
          disabled={questions.length === 0}
        >
          Create New Exam
        </Button>
      </div>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

      {questions.length === 0 && (
        <Alert variant="warning">
          You need to create questions before you can create exams. 
          <Button variant="link" href="/questions">Go to Questions</Button>
        </Alert>
      )}

      <Card>
        <Card.Body>
          {exams.length === 0 ? (
            <div className="text-center py-4">
              <p>No exams found. Create your first exam!</p>
            </div>
          ) : (
            <Table responsive>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Questions</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {exams.map(exam => (
                  <tr key={exam.id}>
                    <td>
                      <strong>{exam.title}</strong>
                      <br />
                      <small className="text-muted">{exam.description}</small>
                    </td>
                    <td>{exam.totalQuestions}</td>
                    <td>{getStatusBadge(exam.status)}</td>
                    <td>{new Date(exam.createdAt).toLocaleDateString()}</td>
                    <td>
                      {exam.status === 'DRAFT' && (
                        <Button 
                          variant="outline-success" 
                          size="sm" 
                          className="me-2"
                          onClick={() => updateExamStatus(exam.id, 'ACTIVE')}
                        >
                          Activate
                        </Button>
                      )}
                      {exam.status === 'ACTIVE' && (
                        <Button 
                          variant="outline-warning" 
                          size="sm" 
                          className="me-2"
                          onClick={() => updateExamStatus(exam.id, 'COMPLETED')}
                        >
                          Complete
                        </Button>
                      )}
                      {exam.status === 'COMPLETED' && (
                        <Button 
                          variant="outline-info" 
                          size="sm"
                          onClick={() => window.location.href = `/analytics?examId=${exam.id}`}
                        >
                          View Analytics
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Exam</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Exam Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Questions</Form.Label>
              <Form.Control
                as="select"
                multiple
                size={8}
                onChange={handleQuestionSelection}
                required
              >
                {questions.map(question => (
                  <option key={question.id} value={question.id}>
                    {question.questionText.substring(0, 100)}...
                  </option>
                ))}
              </Form.Control>
              <Form.Text className="text-muted">
                Hold Ctrl/Cmd to select multiple questions
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Exam
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ExamManager;
