import './login.css';
import newsIcon from '../../icons/newsIcon.svg';
import { useHistory } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import { URL_LOGIN, URL_DELETE_NEWS } from '../../constant/endpoints.js';
import { CREDS_ERROR } from '../../constant/constants.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Box, Container } from '@material-ui/core';

function Login() {
  const history = useHistory();
  const [details, setDetails] = useState({ username: "", password: "" });
  const [message, setMessage] = useState('')

  async function handleLoginClick(details) {
    await axios.post(URL_LOGIN, details).then((response) => {
      localStorage.setItem("admin", response.data);
      localStorage.setItem("access-token", response.data.data.accessToken);
      console.log(response.data.data.accessToken);
      history.push({
        pathname: '/neemuchnews/createnews',
      })
      axios.interceptors.request.use(
        config => {
          config.headers.authorization = `Bearer ${response.data.data.accessToken}`;
          return config;
        },
        error => {
          return Promise.reject(error);
        }
      )
    })
      .catch(err => {
        if (err) {
          setMessage(CREDS_ERROR);
          setInterval(function setTime() {
            setMessage('');
          }, 2000)
        }
      });
  }

  return (
    <div className="login">
      <div className="container">
        {/* <div className="progress">
          <Container component={Box} py={3}>
            <LinearProgress  size="wide"/>
          </Container>
        </div> */}
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
  );
}

export default Login;