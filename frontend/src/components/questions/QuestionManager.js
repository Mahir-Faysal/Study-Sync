import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Modal, Form, Alert, Badge } from 'react-bootstrap';
import ApiService from '../../services/ApiService';

const QuestionManager = () => {
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 'A'
  });

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const response = await ApiService.getMyQuestions();
      setQuestions(response.data);
    } catch (error) {
      setError('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingQuestion) {
        await ApiService.updateQuestion(editingQuestion.id, formData);
        setSuccess('Question updated successfully');
      } else {
        await ApiService.createQuestion(formData);
        setSuccess('Question created successfully');
      }
      handleCloseModal();
      loadQuestions();
    } catch (error) {
      setError('Failed to save question');
    }
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    setFormData({
      questionText: question.questionText,
      optionA: question.optionA,
      optionB: question.optionB,
      optionC: question.optionC,
      optionD: question.optionD,
      correctAnswer: question.correctAnswer
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await ApiService.deleteQuestion(id);
        setSuccess('Question deleted successfully');
        loadQuestions();
      } catch (error) {
        setError('Failed to delete question');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingQuestion(null);
    setFormData({
      questionText: '',
      optionA: '',
      optionB: '',
      optionC: '',
      optionD: '',
      correctAnswer: 'A'
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
        <h1>Question Manager</h1>
        <Button variant="primary" onClick={() => setShowModal(true)}>
          Add New Question
        </Button>
      </div>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

      <Card>
        <Card.Body>
          {questions.length === 0 ? (
            <div className="text-center py-4">
              <p>No questions found. Create your first question!</p>
            </div>
          ) : (
            <Table responsive>
              <thead>
                <tr>
                  <th>Question</th>
                  <th>Correct Answer</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.map(question => (
                  <tr key={question.id}>
                    <td>{question.questionText.substring(0, 100)}...</td>
                    <td>
                      <Badge bg="success">{question.correctAnswer}</Badge>
                    </td>
                    <td>{new Date(question.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="me-2"
                        onClick={() => handleEdit(question)}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDelete(question.id)}
                      >
                        Delete
                      </Button>
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
          <Modal.Title>
            {editingQuestion ? 'Edit Question' : 'Add New Question'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Question Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="questionText"
                value={formData.questionText}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Option A</Form.Label>
              <Form.Control
                type="text"
                name="optionA"
                value={formData.optionA}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Option B</Form.Label>
              <Form.Control
                type="text"
                name="optionB"
                value={formData.optionB}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Option C</Form.Label>
              <Form.Control
                type="text"
                name="optionC"
                value={formData.optionC}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Option D</Form.Label>
              <Form.Control
                type="text"
                name="optionD"
                value={formData.optionD}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correct Answer</Form.Label>
              <Form.Select
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleChange}
                required
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingQuestion ? 'Update Question' : 'Create Question'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default QuestionManager;
