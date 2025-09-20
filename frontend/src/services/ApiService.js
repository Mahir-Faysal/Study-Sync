import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:8080/api';

class ApiService {
  // Questions
  createQuestion(questionData) {
    return axios.post(API_URL + '/questions', questionData, {
      headers: AuthService.getAuthHeader()
    });
  }

  getMyQuestions() {
    return axios.get(API_URL + '/questions', {
      headers: AuthService.getAuthHeader()
    });
  }

  getQuestion(id) {
    return axios.get(API_URL + '/questions/' + id, {
      headers: AuthService.getAuthHeader()
    });
  }

  updateQuestion(id, questionData) {
    return axios.put(API_URL + '/questions/' + id, questionData, {
      headers: AuthService.getAuthHeader()
    });
  }

  deleteQuestion(id) {
    return axios.delete(API_URL + '/questions/' + id, {
      headers: AuthService.getAuthHeader()
    });
  }

  // Exams
  createExam(examData) {
    return axios.post(API_URL + '/exams', examData, {
      headers: AuthService.getAuthHeader()
    });
  }

  getMyExams() {
    return axios.get(API_URL + '/exams/my', {
      headers: AuthService.getAuthHeader()
    });
  }

  getActiveExams() {
    return axios.get(API_URL + '/exams/active', {
      headers: AuthService.getAuthHeader()
    });
  }

  getExam(id) {
    return axios.get(API_URL + '/exams/' + id, {
      headers: AuthService.getAuthHeader()
    });
  }

  updateExamStatus(id, status) {
    return axios.put(API_URL + '/exams/' + id + '/status', { status }, {
      headers: AuthService.getAuthHeader()
    });
  }

  submitExam(id, answers) {
    return axios.post(API_URL + '/exams/' + id + '/submit', { answers }, {
      headers: AuthService.getAuthHeader()
    });
  }

  getMyResults() {
    return axios.get(API_URL + '/exams/results', {
      headers: AuthService.getAuthHeader()
    });
  }

  // Forum
  postForumQuestion(questionData) {
    return axios.post(API_URL + '/forum/questions', questionData, {
      headers: AuthService.getAuthHeader()
    });
  }

  getForumQuestions(sortBy = 'recent') {
    return axios.get(API_URL + '/forum/questions?sortBy=' + sortBy, {
      headers: AuthService.getAuthHeader()
    });
  }

  getForumQuestion(id) {
    return axios.get(API_URL + '/forum/questions/' + id, {
      headers: AuthService.getAuthHeader()
    });
  }

  postForumAnswer(questionId, content) {
    return axios.post(API_URL + '/forum/questions/' + questionId + '/answers', { content }, {
      headers: AuthService.getAuthHeader()
    });
  }

  getForumQuestionsByTag(tag) {
    return axios.get(API_URL + '/forum/questions/tag/' + tag, {
      headers: AuthService.getAuthHeader()
    });
  }

  // Analytics
  getExamAnalytics(id) {
    return axios.get(API_URL + '/analytics/exams/' + id, {
      headers: AuthService.getAuthHeader()
    });
  }

  getMyExamAnalytics() {
    return axios.get(API_URL + '/analytics/exams', {
      headers: AuthService.getAuthHeader()
    });
  }
}

const apiService = new ApiService();
export default apiService;
