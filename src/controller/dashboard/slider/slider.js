import React, { Component, useState } from 'react';
import "slick-carousel/slick/slick.css";
import moment from 'moment';
import "slick-carousel/slick/slick-theme.css";
import makeStyles from './styles.js';
import { Card, CardMedia, Typography, CardContent } from '@material-ui/core';

const Slide = ({ value }) => {
  const classes = makeStyles();

  return (
         <Card className={classes.card} raised elevation={6} >
           <CardMedia className={classes.media} image={value.imageUrl} title={value.newsMasterEnglish.headlines} />
          <div className={classes.overlay}>
            <Typography variant="h6">{value.sourceName}</Typography>
            <Typography variant="body2">{moment(value.createDate).fromNow()}</Typography>
          </div>
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary">{`#${value.newsCategory}`}</Typography>
          </div>
          <div className={classes.details}>
            <Typography variant="h7" >{value.newsMasterHindi.hindiHeadlines}</Typography>
          </div>
        </Card>

  )
}
export default Slide;
