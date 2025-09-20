import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + '/auth/signin', {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(username, email, password, firstName, lastName, role) {
    return axios.post(API_URL + '/auth/signup', {
      username,
      email,
      password,
      firstName,
      lastName,
      role
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getAuthHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      return { Authorization: 'Bearer ' + user.token };
    } else {
      return {};
    }
  }
}

const authService = new AuthService();
export default authService;
