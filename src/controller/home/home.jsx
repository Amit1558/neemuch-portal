// import React, { useEffect, useRef, useState } from 'react';
// import './home.css';
// import { Link } from 'react-router-dom';
// import Auth from '../../authentication/auth.jsx';
// import { useHistory } from 'react-router';
// import { fetch } from '../../actions/posts.js'
// import { useDispatch } from 'react-redux';
// import SlideDrawer from '../drawer/drawer';

// function Home(props) {
//   const dispatch = useDispatch();
//   const history = useHistory();
//   const drawer = useRef(null);
//   function getAllNews() {
//     dispatch(fetch());
//   }

//   const handleLoginClick = (data) => {
//     Auth.logout();
//     history.push({
//       pathname: '/',
//       state: data
//     });
//   }

//   // useEffect(() => {
//   //   const myBar = document.getElementById("dashboard");
//   //   const allNews = document.getElementById("allnews");
//   //   const createNews = document.getElementById("createnews");
//   //   const inventory = document.getElementById("inventory");
//   //   if (props.module == 'dashboard') {
//   //     myBar.classList.add('underline');
//   //     allNews.classList.remove('underline');
//   //     inventory.classList.remove('underline');
//   //     createNews.classList.remove('underline');
//   //   } else if (props.module == 'allnews') {
//   //     allNews.classList.add('underline');
//   //     myBar.classList.remove('underline');
//   //     inventory.classList.remove('underline');
//   //     createNews.classList.remove('underline');
//   //   } else if (props.module == 'createnews') {
//   //     createNews.classList.add('underline');
//   //     allNews.classList.remove('underline');
//   //     myBar.classList.remove('underline');
//   //     inventory.classList.remove('underline');
//   //   } else if (props.module == 'inventory') {
//   //     inventory.classList.add('underline');
//   //     createNews.classList.remove('underline');
//   //     allNews.classList.remove('underline');
//   //     myBar.classList.remove('underline');
//   //   }
//   // }, [props.module]);

//   return (
//     <div>
//       <nav className="navbar">
//         <div className="title__div">
//           <div className="navbar__drawer">
//             <SlideDrawer  drawer/>
//           </div>
//           <h1 className="home__title1">ADMIN</h1>
//           <h1 className="home__title2">PORTAL </h1>
//         </div>
//         {/* <div className="home__functions">
//           <Link to="/neemuchnews/dashboard"
//             className="home__dailydashboard"
//             id="dashboard"
//             onClick={()=>getAllNews()}>Dashboard</Link>
//           <Link to="/neemuchnews/allnews"
//             className="home__allnews"
//             id="allnews"
//             onClick={()=>getAllNews()}>All&nbsp;News</Link>
//           <Link to="/neemuchnews/createnews"
//             className="home__createnews"
//             id="createnews"> Create&nbsp;News</Link>
//           <Link to="/neemuchnews/inventory"
//             className="home__inventory"
//             id="inventory">Services</Link>
//         </div> */}
//         <div className="logout__button">
//           <button className="home__button"
//             type="submit"
//             onClick={() => { handleLoginClick() }}>
//             Log out
//           </button>
//         </div>
//       </nav>
//     </div>
//   );
// }


// export default Home;

import React, { Component } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './header.scss';
import SlideDrawer from '../drawer/drawer.js'
import { withStyles } from '@material-ui/core';

const useStyles = (theme) => ({
  appBar: {
    // zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#0080ffed',
    height: '65px',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  slideDrawer:{
    backgroundColor: '#123f6c',
  }
})

class Home extends Component {
  constructor(props) {
    super(props);
    this.drawer = React.createRef();
  }
  render() {
    const { classes } = this.props;
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar variant="dense" className="app-header-toolbar">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 3, marginLeft: "10  px" }} onClick={() => { this.drawer.current() }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              News Zone
            </Typography>
          </Toolbar>
        </AppBar>
        <SlideDrawer drawer={this.drawer}  className={classes.slideDrawer}/>
      </Box>
    );
  }
}


export default withStyles(useStyles)(Home)