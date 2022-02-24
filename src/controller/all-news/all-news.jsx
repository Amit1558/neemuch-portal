import React, { Component } from 'react';
import Home from '../home/home.jsx';
import './all-news.css';
import { MODULE_ALL_NEWS } from '../../constant/constants.js'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core'
import PopUpMenu from './popup-menu/popup-menu.js';
import UpdateIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { deletePost, fetch } from '../../actions/posts.js'
import axiosAuth from '../../authentication/jwtauthentication.js';
import { URL_DELETE_NEWS } from '../../constant/endpoints.js';


function AllNews() {
  const history = useHistory();
  const [openPopUp, setOpenPopup] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [res, setRes] = useState([]);
  const fetchedValue = useSelector(state => state.postReducer);
  const [mappedValue, setMappedValue] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetchedValue.data != [] && fetchedValue) {
      setRes(fetchedValue.data);
      console.log(res);
    }
  }, [fetchedValue])

  const openCreateNews = () => {
    history.push({
      pathname: '/neemuchnews/createnews',
    })
  }

  const handleOnDelete = () => {
    setOpenDelete(false);
    dispatch(deletePost(deleteId));
    // axiosAuth(URL_DELETE_NEWS,deleteId);
  }

  const onConfirm = (value) => {
    setOpenDelete(true);
    setDeleteId(value.newsId);
  }

  const Popup = (value) => {
    setOpenPopup(true);
    setMappedValue(value);
  }

  const handleClose = () => {
    setOpenDelete(false);
  }

  return (
    <div className="all__container">
      <Home module={MODULE_ALL_NEWS} />
      <Grid container spacing={5} style={{ padding: "50px 90px" }}>
        <Grid item xs={12}>
          <Card variant="outlined" style={{ height: "175vh", borderRadius: "8px", overflowX: "hidden" }}>
            <div className="all__news__popup close">
              <PopUpMenu openPopUp={openPopUp} setOpenPopup={setOpenPopup} mappedValue={mappedValue} />
              <Dialog
                open={openDelete}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Do you want to delete this item?"}</DialogTitle>
                 <DialogContent>
                   <DialogContentText id="alert-dialog-description">
                     This news item would be deleted permanently from the database.
                   </DialogContentText>
                 </DialogContent>
                <DialogActions>
                  <Button onClick={handleOnDelete} color="primary">
                    Confirm
                  </Button>
                  <Button onClick={handleClose} color="secondary" autoFocus>
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <div className="all__news__container">
              <div className="all__news__title">
                <h2>All News</h2>
              </div>
            </div>
            <div class="all__news__search">
              <div className="search__bar">
                <input
                  variant="outlined"
                  placeholder="Search News..."
                  name="search-news"
                  style={{
                    width: "100%",
                    padding: "20px",
                    fontSize: "15px",
                    fontStyle: "italic",
                    color: "grey",
                    border: "2px solid #dadce0",
                    borderRadius: "4px"
                  }}></input>
                <div className="search__icon__div">
                  <div className="search__icon">
                    <SearchIcon fontSize="large" />
                  </div>
                </div>
              </div>
              <div className="add__news__icon">
                <div className="add__news">
                  <div className="add__icon">
                    <AddIcon fontSize="medium" onClick={openCreateNews} />
                  </div>
                  <div className="add__news__title">
                    <h3>Add&nbsp;News</h3>
                  </div>
                </div>
              </div>
            </div>
            {
              !res ?
                <div className="circular__progress">
                  <CircularProgress />
                </div> :
                <div class="all__news__databar">
                  {
                    res.map((value) => (
                      <div className="news__data__bar" key={value.newsId}>
                        <div className="news__image__div">
                          <img
                            src={value.imageUrl}
                            className="news__image" alt="image"></img>
                        </div>
                        <div className="news__topic__div">
                          <h4>{value.sourceName}</h4>
                        </div>
                        <div className="news__date__div">
                          <h4>{moment(value.createDate).fromNow()}</h4>
                        </div>
                        <div className="icon__div__container">
                          <div className="update__icon__div">
                            <UpdateIcon fontSize="medium" name="update" onClick={() => { Popup(value) }} />
                          </div>
                          <div className="delete__icon__div">
                            <DeleteIcon fontSize="medium" onClick={() => { onConfirm(value) }} />
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
            }
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default AllNews;
