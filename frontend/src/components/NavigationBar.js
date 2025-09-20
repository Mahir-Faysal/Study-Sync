import React from 'react';
import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { 
  FaGraduationCap, 
  FaHome, 
  FaQuestionCircle, 
  FaClipboardList, 
  FaComments, 
  FaChartBar, 
  FaSignOutAlt,
  FaUser,
  FaUserGraduate,
  FaTasks
} from 'react-icons/fa';

const NavigationBar = ({ currentUser, logout }) => {
  return (
    <Navbar bg="light" variant="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/dashboard" className="d-flex align-items-center">
          <FaGraduationCap className="me-2" size={24} />
          <span className="text-gradient fw-bold">StudySync</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard" className="d-flex align-items-center">
              <FaHome className="me-2" />
              Dashboard
            </Nav.Link>
            
            {currentUser.role === 'QUESTION_SETTER' && (
              <>
                <Nav.Link as={Link} to="/questions" className="d-flex align-items-center">
                  <FaQuestionCircle className="me-2" />
                  Questions
                </Nav.Link>
                <Nav.Link as={Link} to="/exams" className="d-flex align-items-center">
                  <FaClipboardList className="me-2" />
                  Exams
                </Nav.Link>
                <Nav.Link as={Link} to="/analytics" className="d-flex align-items-center">
                  <FaChartBar className="me-2" />
                  Analytics
                </Nav.Link>
              </>
            )}
            
            {currentUser.role === 'STUDENT' && (
              <>
                <Nav.Link as={Link} to="/exams/active" className="d-flex align-items-center">
                  <FaTasks className="me-2" />
                  Take Exams
                </Nav.Link>
                <Nav.Link as={Link} to="/results" className="d-flex align-items-center">
                  <FaChartBar className="me-2" />
                  My Results
                </Nav.Link>
              </>
            )}
            
            <Nav.Link as={Link} to="/forum" className="d-flex align-items-center">
              <FaComments className="me-2" />
              Forum
            </Nav.Link>
          </Nav>
          
          <Nav className="align-items-center">
            <div className="d-flex align-items-center me-3">
              {currentUser.role === 'QUESTION_SETTER' ? (
                <FaUserGraduate className="me-2 text-primary" />
              ) : (
                <FaUser className="me-2 text-primary" />
              )}
              <div>
                <div className="fw-semibold text-dark">
                  {currentUser.firstName} {currentUser.lastName}
                </div>
                <Badge 
                  bg={currentUser.role === 'QUESTION_SETTER' ? 'primary' : 'success'}
                  className="small"
                >
                  {currentUser.role === 'QUESTION_SETTER' ? 'Instructor' : 'Student'}
                </Badge>
              </div>
            </div>
            
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={logout}
              className="d-flex align-items-center"
            >
              <FaSignOutAlt className="me-2" />
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
