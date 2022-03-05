
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
    if(localStorage.getItem("access-token"))
       {
         this.authenticated = true;
       }
      return this.authenticated;
  }

}

export default new Auth();
