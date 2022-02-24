import React from 'react';
import Home from '../home/home.jsx';
import './inventory.css';
import { MODULE_INVENTORY } from '../../constant/constants.js'
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import LocationOnOutlined from '@material-ui/icons/LocationOnOutlined';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core'
import InventoryPopUpMenu from './inventory-pop-up/inventory-pop-up.js';
import InventoryCreatePopUp from './inventory-create-pop-up/inventory-create-pop-up.js';
import UpdateIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { deleteInventoryById, fetchInventory, fetch } from '../../actions/posts.js'
import { inventoryFetchAll } from '../../api/api-call.js';
import { URL_INVENTORY_FETCH_ALL } from '../../constant/endpoints';
import axios from 'axios';

function Inventory() {
  const [openPopUp, setOpenPopup] = useState(false);
  const [openCreatePopUp, setCreatePopUp] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [result, setResult] = useState([]);
  const [mappedValue, setMappedValue] = useState({});
  const dispatch = useDispatch();
  const handleOnDelete = () => {
    setOpenDelete(false);
    dispatch(deleteInventoryById(deleteId));
  }

  useEffect(() => {
    inventoryFetchAll().then((response) => {
      setResult(response.data.data.content);
    });
  }, [])

  const onConfirm = (value) => {
    setOpenDelete(true);
    setDeleteId(value.businessId);
  }

  const Popup = (value) => {
    setOpenPopup(true);
    setMappedValue(value);
  }

  const createPopup = () => { setCreatePopUp(true); }

  const handleClose = () => {
    setOpenDelete(false);
  }

  return (
    <div className="all__container" id="inventorycontainer"  >
      <Home module={MODULE_INVENTORY} />
      <Grid container spacing={5} style={{ padding: "50px 90px" }}>
        <Grid item xs={12}>
          <Card variant="outlined" style={{ height: "175vh", borderRadius: "8px", overflowX: "hidden" }} >
            <div className="all__news__popup close">
              <InventoryPopUpMenu openPopUp={openPopUp} setOpenPopup={setOpenPopup} mappedValue={mappedValue} />
              <InventoryCreatePopUp openPopUp={openCreatePopUp} setCreatePopUp={setCreatePopUp} />
              <Dialog
                open={openDelete}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Do you want to delete this item?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    This contact item would be deleted permanently from the database.
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
                <h2>Contacts</h2>
              </div>
            </div>
            <div class="all__news__search">
              <div className="search__bar">
                <input
                  variant="outlined"
                  placeholder="Search Contacts..."
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
              <div className="add__news__icon" onClick={() => createPopup()}>
                <div className="add__news_inven">
                  <div className="add__icon">
                    <AddIcon fontSize="medium" />
                  </div>
                  <div className="add__news__title" >
                    <h3>Add&nbsp;Contact</h3>
                  </div>
                </div>
              </div>
            </div>
            {
              !result ?
                <div className="circular__progress">
                  <CircularProgress />
                </div> :
                <div class="all__news__databar">
                  {
                    result.map((value) => (
                      // <div className="news__data__bar">
                      <div className="news__data__bar" key={value.businessId}>
                        <div className="news__image__div">
                          <img
                            src={value.businessLogoUrl}
                            className="news__image" alt="image"></img>
                        </div>
                        <div className="contact__info__div">
                          <div className="contact__name__div">
                            <h4>{value.businessName}</h4>
                          </div >
                          <div className="contact__address__div">
                            <div className="address__icon__div">
                              <LocationOnOutlined fontSize="small"></LocationOnOutlined>
                            </div>
                            <h4>{value.businessState + ", " + value.businessCity + ", " + value.businessPinCode}</h4>
                          </div>
                        </div>
                        <div className="contact__date__div">
                          <h4>{value.businessOwner}</h4>
                        </div>
                        <div className="icon__contact__container">
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

export default Inventory;