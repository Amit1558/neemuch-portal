import React from 'react';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';


function ProtectedRoute({isAuth, component: Component, ...rest}) {
  return (
    <Route {...rest} render={() => {
      if (isAuth) {
        return <Component />;
      } else {
        return <Redirect to="/" />;
      }
    }} />
  )
}

export default ProtectedRoute;