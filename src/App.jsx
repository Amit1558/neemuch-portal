import Dashboard from './controller/dashboard/dashboard.jsx';
import AllNews from './controller/all-news/all-news.jsx';
import CreateNews from './controller/create-news/create-news.jsx';
import Login from './controller/log-in/login.jsx';
import Inventory from './controller/inventory/inventory.jsx';
import './App.css'
import { Route, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from './protected-routes/protectedroutes.jsx';

function App() {
  return (
    <Router>
      <ProtectedRoute  path="/neemuchnews/createnews" exact component={CreateNews} />
      <ProtectedRoute  path="/neemuchnews/allnews" exact component={AllNews} />
      <ProtectedRoute  path="/neemuchnews/dashboard" exact component={Dashboard} />
      <ProtectedRoute  path="/neemuchnews/inventory" exact component={Inventory} />
      <Route path="/" exact component={Login} />
    </Router> 
  )
}

export default App;