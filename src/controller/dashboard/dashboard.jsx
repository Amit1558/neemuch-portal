import React, { Component, useState, useEffect } from 'react';
import './dashboard.css';
import Home from '../home/home.jsx';
import { MODULE_DASHBOARD } from '../../constant/constants.js'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Slide from '../dashboard/slider/slider.js';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core'
import makeStyles from '../dashboard/slider/styles.js';

function Dashboard() {
  var settings = {
    axis: "horizontal",
    infinite: false,
    interval:500,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    showArrows: true,
    dots:true
  };
  const classes = makeStyles();
  const [res, setRes] = useState([]);
  const fetchedValue = useSelector(state => state.postReducer);
  useEffect(() => {
    if (fetchedValue && fetchedValue.data != []) {
      setRes(fetchedValue.data);
    }
  }, [fetchedValue])

  return (
    <div className="dashboard_container">
      <Home module={MODULE_DASHBOARD} />
      <Grid container spacing={12} style={{ padding: "50px 90px" }}>
        <Grid item xs={12}>
          <Card variant="outlined" style={{ height: "230vh", borderRadius: "8px", overflow: "hidden" }}>
            {
              !res ?
                <div className="circular__progress">
                  <CircularProgress />
                </div> :
                <Grid className={classes.mainContainer} container alignItems="stretch">
                    {
                      res.map((value) => (
                        <Grid className={classes.gridInner} item sm={12} lg={3}>
                          <Slide value={value} />
                        </Grid>
                      ))
                    }
                  </Grid>
            }
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
export default Dashboard;
