import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useState, useEffect } from 'react';
import { Drawer } from '@mui/material';
import { makeStyles, styled, useTheme } from "@material-ui/core/styles";
import { BrowserRouter as Link, useHistory } from "react-router-dom";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: "#fff",
  },
  paper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerPaper: {
    "&&": {
      width: drawerWidth,
      zIndex: 0,
      marginTop: '70px',
      backgroundColor: '#1976d2'
    }
  }
}))

export default function SlideDrawer({ drawer }) {
  const [open, setOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(true);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    drawer.current = setOpenDrawer
  }, [])

  function setOpenDrawer() {
    setOpen(true);
  }
  return (
    <div setOpenDrawer={setOpenDrawer} >
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        className={classes.paper}
        classes={{ paper: classes.drawerPaper, root: classes.drawerRoot }}
        anchor='left' open={open} onClose={() => { setOpen(false) }}>
        <div>
          <Box>
            <List>
              <Link>
                <ListItemButton
                  onClick={() => { history.push({ pathname: "/neemuchnews/dashboard", }) }}
                  sx={{ color: "#fff" }}>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </Link>
              <ListItemButton onClick={() => { setOpenDropdown(!openDropdown) }} sx={{ color: "#fff" }}>
                <ListItemText primary="News" />
                {openDropdown ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openDropdown} timeout="auto" unmountOnExit>
                <List onClic className={classes.link}>
                  <ListItemButton
                    onClick={() => { history.push({ pathname: "/neemuchnews/createnews", }) }}
                    sx={{ pl: 4 }}>
                    <ListItemText primary="Create News" sx={{ color: "#fff" }} />
                  </ListItemButton>
                </List>
                <List onClic className={classes.link}>
                  <ListItemButton
                    onClick={() => { history.push({ pathname: "/neemuchnews/allnews", }) }}
                    sx={{ pl: 4 }}>
                    <ListItemText primary="View News" sx={{ color: "#fff" }} />
                  </ListItemButton>
                </List>
              </Collapse>

              <ListItemButton onClick={() => { setOpenDropdown(!openDropdown) }} sx={{ color: "#fff" }}>
                <ListItemText primary="Services" />
                {openDropdown ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openDropdown} timeout="auto" unmountOnExit>
                <List to="/neemuchnews/inventory" className={classes.link}>
                  <ListItemButton
                    onClick={() => { history.push({ pathname: "/neemuchnews/createservice", }) }}
                    sx={{ pl: 4 }}>
                    <ListItemText primary="Create Services" sx={{ color: "#fff" }} />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => { history.push({ pathname: "/neemuchnews/inventory", }) }}
                    sx={{ pl: 4 }}>
                    <ListItemText primary="View Services" sx={{ color: "#fff" }} />
                  </ListItemButton>
                </List>
              </Collapse>

              <ListItemButton onClick={() => { setOpenDropdown(!openDropdown) }} sx={{ color: "#fff" }}>
                <ListItemText primary="Goods" />
                {openDropdown ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openDropdown} timeout="auto" unmountOnExit>
                <List to="/neemuchnews/goods" className={classes.link}>
                  <ListItemButton
                    onClick={() => { history.push({ pathname: "/neemuchnews/goods", }) }}
                    sx={{ pl: 4 }}>
                    <ListItemText primary="Create Goods" sx={{ color: "#fff" }} />
                  </ListItemButton>
                  <ListItemButton
                    onClick={() => { history.push({ pathname: "/neemuchnews/viewgoods", }) }}
                    sx={{ pl: 4 }}>
                    <ListItemText primary="View Goods" sx={{ color: "#fff" }} />
                  </ListItemButton>
                </List>
              </Collapse>
            </List>
          </Box>
        </div>
      </Drawer>
    </div>
  );
}
