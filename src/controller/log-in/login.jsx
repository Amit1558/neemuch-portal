import './login.css';
import newsIcon from '../../icons/newsIcon.svg';
import { useHistory } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import { URL_LOGIN } from '../../constant/endpoints.js';
import { CREDS_ERROR } from '../../constant/constants.js';
import { LinearProgress } from '@material-ui/core';
function Login() {
  const history = useHistory();
  const [details, setDetails] = useState({ username: "", password: "" });
  const [message, setMessage] = useState('')
  const [loader, setLoader] = useState(false);

  async function handleLoginClick(details) {
    setLoader(true);
    await axios.post(URL_LOGIN, details).then((response) => {
      if (response) {
        setLoader(false);
        localStorage.setItem("admin", response.data);
        localStorage.setItem("access-token", response.data.data.accessToken);
        console.log(response.data.data.accessToken);
        // Auth.isAuthenticated();
        history.push({
          pathname: '/neemuchnews/createnews',
        })
      }
    })
      .catch(err => {
        if (err) {
          setLoader(false);
          setMessage(CREDS_ERROR);
          setInterval(function setTime() {
            setMessage('');
          }, 2000)
        }
      });
  }

  return (
    <div className='login__conatiner'>
      <div className="login">
        <div className="container">
          <div className="loader">
            {loader && <LinearProgress />}
          </div>
          <div className="container__items">
            <div className="icon-container">
              <img src={newsIcon} className="icon"></img>
            </div>
            <h1 className="title">News Zone</h1>
            <h3 className="login-title">Login</h3>
            <div className="login-form">
              <form className="form" >
                <div className="email-container">
                  <input
                    type="email"
                    name="username"
                    className="email"
                    placeholder="Username"
                    onChange={(e) => { setDetails({ ...details, username: e.target.value }) }}
                    value={details.username}
                  ></input>
                </div>
                <div className="password-container">
                  <input type="password"
                    name="password"
                    className="password"
                    placeholder="Password"
                    onChange={(e) => { setDetails({ ...details, password: e.target.value }) }}
                    value={details.password}
                  ></input>
                </div>
              </form>
            </div>
            <div className="button-container">
              <button
                className="button"
                type="submit"
                onClick={() => {
                  handleLoginClick(details);
                }}>
                Log in
              </button>
            </div>
            <div className="login__authentication">
              <h5>{message}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;