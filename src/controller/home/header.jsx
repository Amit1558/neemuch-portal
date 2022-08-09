import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from 'a@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import './Header.scss';
import SlideDrawer from '../Drawer/Drawer.js'
import { makeStyles } from '@mui/styles';
import SRNSearch from '../SRNSearch/SRNSearch';

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#123f6c',
        height: '65px',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    search: {
            position: 'relative',
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
              marginLeft: theme.spacing(85),
              width: 'auto',
            },
    }
}))

export default function Header({ drawer }) {

    const classes = useStyles();


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar variant="dense" className="app-header-toolbar">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => { drawer.current() }}>
                        <MenuIcon />
                    </IconButton>

                    <Typography variant="h6" color="inherit" component="div">
                        Philips - MoS Eye
                    </Typography>
                    <IconButton edge="end" color="inherit" className={classes.search} sx={{ mr: 2 }}>
                        <span className="nav-links">
                            <SRNSearch />
                        </span>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <SlideDrawer drawer={drawer} />
        </Box>
    );
}
	