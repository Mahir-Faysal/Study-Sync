import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaGraduationCap, FaUser, FaLock, FaSignInAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import AuthService from '../../services/AuthService';

const Login = ({ setCurrentUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await AuthService.login(username, password);
      setCurrentUser(response);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid username or password');
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
            <h1 className="text-gradient">Welcome Back</h1>
            <p>Sign in to your StudySync account</p>
          </div>
          
          {error && (
            <Alert variant="danger" className="mb-4">
              <strong>Error:</strong> {error}
            </Alert>
          )}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className="d-flex align-items-center">
                <FaUser className="me-2" />
                Username
              </Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                size="lg"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label className="d-flex align-items-center">
                <FaLock className="me-2" />
                Password
              </Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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
                  Signing in...
                </>
              ) : (
                <>
                  <FaSignInAlt className="me-2" />
                  Sign In
                </>
              )}
            </Button>
          </Form>
          
          <div className="text-center">
            <p className="mb-0">
              Don't have an account? {' '}
              <Link to="/register" className="text-decoration-none fw-semibold">
                Create Account
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

export default Login;
