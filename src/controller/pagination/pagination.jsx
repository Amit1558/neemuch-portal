import React, { useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { Box, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    ul: {
        "& .MuiLinearProgress-root": {
            color: "#4BCAEE",
            fontSize: "16px",
            fontFamily: 'Nunito'
        }
    }
}));

function Paginate({ postPerPage, totalPosts, page }) {

    const pageNumber = Math.ceil(totalPosts / postPerPage);
    const classes = useStyles();

    const checkPostCapacity = () => {
        return (postPerPage < totalPosts) ? true : false;
    };
    return (
        <div>
            {
                checkPostCapacity() ?
                <Container component={Box} py={3}>
                    <Pagination classes={{ ul: classes.ul }} count={pageNumber}
                        onChange={(event, value) => page(value)}
                        size='large'
                        color="standard"
                    />
                </Container>:
                <div></div>
            }
        </div>
    )
}

export default Paginate;