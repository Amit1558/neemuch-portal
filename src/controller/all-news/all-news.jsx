import React from 'react';
import Home from '../home/home.jsx';
import './all-news.css';
import { MODULE_ALL_NEWS } from '../../constant/constants.js'
import Card from '@material-ui/core/Card';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import Paginate from '../pagination/pagination.jsx';
import { feedBack, deletePost } from '../../api/api-call.js';
import { useSnackbar } from 'notistack';

function AllNews() {
  const history = useHistory();
  const [openPopUp, setOpenPopup] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [post, setPost] = useState([]);
  const [mappedValue, setMappedValue] = useState({});
  const [postPerPage, setPostPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const [res, setRes] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    feedBack().then((response) => {
      setPost(response.data.data);
    });
  }, [])

  useEffect(() => {
    setRes(post.slice(indexOfFirstPost, indexOfLastPost));
  }, [post, indexOfFirstPost, indexOfLastPost])

  const page = (value) => {
    setCurrentPage(value)
  };

  const setData = () => {
    feedBack().then((response) => {
      setPost(response.data.data);
    });
  };

  const openCreateNews = () => {
    history.push({
      pathname: '/neemuchnews/createnews',
    })
  }

  const handleOnDelete = () => {
    setOpenDelete(false);
    deletePost(deleteId).then((status) => {
      console.log(status);
      feedBack().then((response) => {
        const res = response.data.data
        setPost(
          res.filter(post => {
            return post.newsId !== deleteId;
          }))
        enqueueSnackbar('News Deleted Successfully.', { variant: "success" });
      })
    }).catch((error) => {
      enqueueSnackbar('Error Deleting news!', { variant: "error" });
      console.log(error);
    })
  }

  const onSearch = (event) => {
    setSearchTerm(event.target.value);
    feedBack().then((response) => {
      const res = response.data.data
      setPost(
        res.filter(post => {
          if (event.target.value === "") {
            return post;
          } else {
            if (post.newsMasterEnglish.headlines.toLowerCase().includes(searchTerm.toLowerCase()))
              return post;
          }
        }))
    }).catch((error) => {
      console.log(error);
    });
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
      <div className="__box">
        <Home module={MODULE_ALL_NEWS} />
            <Card variant="outlined" style={{ height: "165vh", overflowX: "hidden" }}>
              <div className="all__news__popup close">
                <PopUpMenu openPopUp={openPopUp} setOpenPopup={setOpenPopup} mappedValue={mappedValue} setData={setData} />
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
                    onChange={(event) => { onSearch(event) }}
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
                (post.length === 0) ?
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
                            <h4>{value.newsMasterEnglish.headlines}</h4>
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
              <div className='pagination'>
                <div>
                  <Paginate postPerPage={postPerPage} totalPosts={post.length} page={page} />
                </div>
              </div>
            </Card>
      </div>
    </div>
  )
}

export default AllNews;
