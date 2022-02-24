import Dashboard from './controller/dashboard/dashboard.jsx';
import AllNews from './controller/all-news/all-news.jsx';
import CreateNews from './controller/create-news/create-news.jsx';
import Login from './controller/log-in/login.jsx';
import Inventory from './controller/inventory/inventory.jsx';
import { useState } from 'react';
import './App.css'
import { Route, Redirect, Switch, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from './protected-routes/protectedroutes.jsx';
function App() {
const [isAuth, setIsAuth] = useState(localStorage.getItem('admin'));
  return (
    <Router>
      <ProtectedRoute isAuth={isAuth} path="/neemuchnews/createnews" exact component={CreateNews} />
      <ProtectedRoute isAuth={isAuth} path="/neemuchnews/allnews" exact component={AllNews} />
      <ProtectedRoute isAuth={isAuth} path="/neemuchnews/dashboard" exact component={Dashboard} />
      <ProtectedRoute isAuth={isAuth} path="/neemuchnews/inventory" exact component={Inventory} />
      <Route path="/" exact component={Login} />
    </Router>
  )
}

export default App;