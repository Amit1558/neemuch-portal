import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from '../authentication/auth.jsx';


function ProtectedRoute({isAuth,isAuthenticate, component: Component, ...rest}) {

  return (
    <Route {...rest} render={() => {
      if (Auth.isAuthenticated()) {
        return <Component />;
      } else {
        return <Redirect to="/" />;
      }
    }} />
  )
}

export default ProtectedRoute;