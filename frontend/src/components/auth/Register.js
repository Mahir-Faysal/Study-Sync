import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaGraduationCap, 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaUserCheck,
  FaUserTie,
  FaEye,
  FaEyeSlash,
  FaUserPlus
} from 'react-icons/fa';
import AuthService from '../../services/AuthService';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'STUDENT'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await AuthService.register(
        formData.username,
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.role
      );
      setSuccess('Registration successful! You can now login.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setError(error.response?.data || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <Container>
        <div className="auth-card animate-fade-in">
          <div className="auth-header">
            <div className="d-flex justify-content-center mb-3">
              <FaGraduationCap size={48} className="text-primary" />
            </div>
            <h1 className="text-gradient">Join StudySync</h1>
            <p>Create your account to start learning</p>
          </div>
          
          {error && (
            <Alert variant="danger" className="mb-4">
              <strong>Error:</strong> {error}
            </Alert>
          )}
          
          {success && (
            <Alert variant="success" className="mb-4">
              <strong>Success!</strong> {success}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label className="d-flex align-items-center">
                    <FaUser className="me-2" />
                    First Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    size="lg"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label className="d-flex align-items-center">
                    <FaUser className="me-2" />
                    Last Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    size="lg"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-4">
              <Form.Label className="d-flex align-items-center">
                <FaUserCheck className="me-2" />
                Username
              </Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a unique username"
                size="lg"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label className="d-flex align-items-center">
                <FaEnvelope className="me-2" />
                Email Address
              </Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                size="lg"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label className="d-flex align-items-center">
                {formData.role === 'STUDENT' ? <FaUser className="me-2" /> : <FaUserTie className="me-2" />}
                Account Type
              </Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                size="lg"
                required
              >
                <option value="STUDENT">Student - Take exams and track progress</option>
                <option value="QUESTION_SETTER">Question Setter - Create and manage questions</option>
              </Form.Select>
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label className="d-flex align-items-center">
                    <FaLock className="me-2" />
                    Password
                  </Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create a secure password"
                      size="lg"
                      required
                    />
                    <Button
                      variant="link"
                      className="position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent"
                      style={{ zIndex: 10 }}
                      onClick={() => setShowPassword(!showPassword)}
                      type="button"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </div>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label className="d-flex align-items-center">
                    <FaLock className="me-2" />
                    Confirm Password
                  </Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      size="lg"
                      required
                    />
                    <Button
                      variant="link"
                      className="position-absolute end-0 top-50 translate-middle-y border-0 bg-transparent"
                      style={{ zIndex: 10 }}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      type="button"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </div>
                </Form.Group>
              </Col>
            </Row>
            
            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 mb-4"
              size="lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <FaUserPlus className="me-2" />
                  Create Account
                </>
              )}
            </Button>
          </Form>
          
          <div className="text-center">
            <p className="mb-0">
              Already have an account? {' '}
              <Link to="/login" className="text-decoration-none fw-semibold">
                Sign In
              </Link>
            </p>
          </div>
          
          <div className="text-center mt-4 pt-4 border-top">
            <small className="text-muted">
              StudySync - Your Learning Management System
            </small>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
