import React, { useEffect, useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import Auth from '../../authentication/auth.jsx';
import { useHistory } from 'react-router';
import { fetch, fetchInventory } from '../../actions/posts.js'
import { useDispatch } from 'react-redux';
import { inventoryFetchAll } from '../../api/api-call.js';
function Home(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  // const [result, setResult] = useState([]);

  function getAllNews() {
    dispatch(fetch());
  }

  // function getInventoryData(){
  //   dispatch(fetchInventory());
  // }


  const handleLoginClick = (data) => {
    Auth.logout();
    history.push({
      pathname: '/',
      state: data
    });
  }


  useEffect(() => {
    const myBar = document.getElementById("dashboard");
    const allNews = document.getElementById("allnews");
    const createNews = document.getElementById("createnews");
    const inventory = document.getElementById("inventory");
    if (props.module == 'dashboard') {
      myBar.classList.add('underline');
      allNews.classList.remove('underline');
      inventory.classList.remove('underline');
      createNews.classList.remove('underline');
    } else if (props.module == 'allnews') {
      allNews.classList.add('underline');
      myBar.classList.remove('underline');
      inventory.classList.remove('underline');
      createNews.classList.remove('underline');
    } else if (props.module == 'createnews') {
      createNews.classList.add('underline');
      allNews.classList.remove('underline');
      myBar.classList.remove('underline');
      inventory.classList.remove('underline');
    } else if (props.module == 'inventory') {
      inventory.classList.add('underline');
      createNews.classList.remove('underline');
      allNews.classList.remove('underline');
      myBar.classList.remove('underline');
    }
  }, [props.module]);


  return (
    <div>
      <nav className="navbar">
        <div className="title__div">
          <h1 className="home__title1">ADMIN</h1>
          <h1 className="home__title2">PORTAL </h1>
        </div>
        <div className="home__functions">
          <Link to="/neemuchnews/dashboard"
            className="home__dailydashboard"
            id="dashboard"
            onClick={()=>getAllNews()}>Dashboard</Link>
          <Link to="/neemuchnews/allnews"
            className="home__allnews"
            id="allnews"
            onClick={()=>getAllNews()}>All&nbsp;News</Link>
          <Link to="/neemuchnews/createnews"
            className="home__createnews"
            id="createnews"> Create&nbsp;News</Link>
          <Link to="/neemuchnews/inventory"
            className="home__inventory"
            id="inventory">Inventory</Link>
        </div>
        <div className="logout__button">
          <button className="home__button"
            type="submit"
            onClick={() => { handleLoginClick() }}>
            Log out
        </button>
        </div>
      </nav>
    </div>
  );
}


export default Home;