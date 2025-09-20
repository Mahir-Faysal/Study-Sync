import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Row, Col, Alert, Badge } from 'react-bootstrap';
import ApiService from '../../services/ApiService';

const Forum = ({ currentUser }) => {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [newQuestion, setNewQuestion] = useState({
    title: '',
    description: '',
    tag: ''
  });

  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    loadForumQuestions();
  }, []);

  const loadForumQuestions = async () => {
    try {
      const response = await ApiService.getForumQuestions();
      setQuestions(response.data);
    } catch (error) {
      setError('Failed to load forum questions');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    try {
      await ApiService.postForumQuestion(newQuestion);
      setSuccess('Question posted successfully');
      setNewQuestion({ title: '', description: '', tag: '' });
      setShowNewQuestionForm(false);
      loadForumQuestions();
    } catch (error) {
      setError('Failed to post question');
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    try {
      await ApiService.postForumAnswer(selectedQuestion.id, newAnswer);
      setSuccess('Answer posted successfully');
      setNewAnswer('');
      loadQuestionDetails(selectedQuestion.id);
    } catch (error) {
      setError('Failed to post answer');
    }
  };

  const loadQuestionDetails = async (questionId) => {
    try {
      const response = await ApiService.getForumQuestion(questionId);
      setSelectedQuestion(response.data);
    } catch (error) {
      setError('Failed to load question details');
    }
  };

  const handleChange = (e) => {
    setNewQuestion({
      ...newQuestion,
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

  if (selectedQuestion) {
    return (
      <div>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Button variant="outline-primary" onClick={() => setSelectedQuestion(null)}>
            ← Back to Forum
          </Button>
        </div>

        {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
        {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

        <Card className="forum-question mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h3>{selectedQuestion.title}</h3>
              {selectedQuestion.tag && (
                <Badge bg="primary">{selectedQuestion.tag}</Badge>
              )}
            </div>
            <p className="mb-3">{selectedQuestion.description}</p>
            <small className="text-muted">
              Posted by {selectedQuestion.postedByUsername} on{' '}
              {new Date(selectedQuestion.createdAt).toLocaleDateString()}
            </small>
          </Card.Body>
        </Card>

        <Card className="mb-4">
          <Card.Header>
            <h5>Answers ({selectedQuestion.answers ? selectedQuestion.answers.length : 0})</h5>
          </Card.Header>
          <Card.Body>
            {selectedQuestion.answers && selectedQuestion.answers.length > 0 ? (
              selectedQuestion.answers.map(answer => (
                <div key={answer.id} className="forum-answer mb-3">
                  <p>{answer.content}</p>
                  <small className="text-muted">
                    Answered by {answer.answeredByUsername} on{' '}
                    {new Date(answer.createdAt).toLocaleDateString()}
                  </small>
                </div>
              ))
            ) : (
              <p className="text-muted">No answers yet. Be the first to help!</p>
            )}
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <h5>Post Your Answer</h5>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmitAnswer}>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Write your answer here..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Post Answer
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Q&A Forum</h1>
        <Button 
          variant="primary" 
          onClick={() => setShowNewQuestionForm(!showNewQuestionForm)}
        >
          {showNewQuestionForm ? 'Cancel' : 'Ask Question'}
        </Button>
      </div>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

      {showNewQuestionForm && (
        <Card className="mb-4">
          <Card.Header>
            <h5>Ask a New Question</h5>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmitQuestion}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={newQuestion.title}
                  onChange={handleChange}
                  placeholder="What's your question about?"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="description"
                  value={newQuestion.description}
                  onChange={handleChange}
                  placeholder="Provide more details about your question..."
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tag (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  name="tag"
                  value={newQuestion.tag}
                  onChange={handleChange}
                  placeholder="e.g., Math, Science, Programming"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Post Question
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      <Row>
        {questions.length === 0 ? (
          <Col>
            <Card>
              <Card.Body className="text-center py-4">
                <p>No questions found. Be the first to ask a question!</p>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          questions.map(question => (
            <Col md={6} lg={4} key={question.id} className="mb-3">
              <Card 
                className="exam-card h-100" 
                style={{ cursor: 'pointer' }}
                onClick={() => loadQuestionDetails(question.id)}
              >
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title className="h6">{question.title}</Card.Title>
                    {question.tag && (
                      <Badge bg="primary" className="ms-2">{question.tag}</Badge>
                    )}
                  </div>
                  <Card.Text className="text-muted small">
                    {question.description.length > 100 
                      ? question.description.substring(0, 100) + '...'
                      : question.description
                    }
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                      by {question.postedByUsername}
                    </small>
                    <Badge bg="info">{question.answersCount} answers</Badge>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default Forum;
