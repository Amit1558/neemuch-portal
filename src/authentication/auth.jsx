
class Auth {
  constructor() {
    this.authenticated = false;
  }

  logout() {
    this.authenticated = false;
    localStorage.clear();
    localStorage.removeItem('admin');
  }

  isAuthenticated() {
    return this.authenticated;
  }

}

export default new Auth();
