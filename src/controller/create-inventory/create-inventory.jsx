import React, { useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl, Card } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CrossIcon from '@material-ui/icons/Close';
import { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core'
import { Dialog, DialogContent } from '@material-ui/core';
import { createInventory, fetchService } from '../../api/api-call.js';
import { useForm } from 'react-hook-form';
import { MODULE_CREATE_NEWS, REQUIRED } from '../../constant/constants';
import MenuProps from '../../icons/MenuProps.js';
import { useSnackbar } from 'notistack';
import Home from '../home/home.jsx';
import { Grid } from '@mui/material';
import './create-inventory.css'


const InventoryCreate = ({ openPopUp, setCreatePopUp, setData }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessMsisdn: "",
    businessOwner: "",
    businessCategoryId: "",
    businessCity: "",
    businessPinCode: "",
    businessState: "",
    businessInfo: "",
    businessLogoUrl: "",
    longitude: "",
    latitude: ""
  });

  const closePopUp = () => {
    setCreatePopUp(false);
  }
  const [file, setFile] = useState();

  const [suggestionName, setSuggestionName] = useState([]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { enqueueSnackbar } = useSnackbar();
  const [loader, setLoader] = useState(false);
  const [suggestionData, setSuggestionData] = useState([{
    id: "",
    suggestionName: ""
  }]);

  function handleUpdate() {
    const input = document.getElementById("inpFile");
    const data = new FormData();
    const newsRequest = new Blob([JSON.stringify(formData)], {
      type: 'application/json'
    });
    data.append("file", input.files[0]);
    data.append("businessRequest", newsRequest);
    setLoader(true);
    createInventory(data).then((response) => {
      if (response) {
        setData();
        closePopUp();
        enqueueSnackbar('Service created successfully.', { variant: "success" });
        setLoader(false);
      }
    }).catch((err) => {
      enqueueSnackbar('Error creating service!', { variant: "error" });
      console.log(err.message);
      setLoader(false);
    })
  }

  function mappedId(value) {
    const arr = suggestionData.map((data) => { return data.businessCategoryId });
    for (var i = 0; i <= value; i++) {
      if (arr[i] == value) {
        return suggestionData[i].businessCategoryId;
      }
    }
    return value;
  }

  useEffect(() => {
    fetchService().then((response) => {
      if (response) {
        const data = response.data.data;
        setSuggestionData([{
          id: data.map((data) => (data.businessCategoryId)),
          suggestionsName: data.map((data) => (data.businessCategoryName))
        }]);
        setSuggestionName(data.map((data) => (data.businessCategoryName)))
      }
    }).catch((err) => {
      console.log(err);
    })
  }, []);


  return (
    <>
      <div className="create__contianer">
        <Home module={MODULE_CREATE_NEWS} />
        <Grid container spacing={5} style={{ padding: "50px 90px" }}>
          <Grid item xs={12}>

            <Card variant="outlined">
              <div className="create__inventory__container">
              <div className="create_title">
                <h2 >Create Service</h2>
              </div>

              <form type="get" onSubmit={handleSubmit(handleUpdate)}>
                <div className="popup__container" id="popupcontainer">
                  {
                    !formData ?
                      <div className="circular__progress">
                        <CircularProgress />
                      </div> :

                      <div className="popup__form__div">

                        <div className="hindi__news" id="hindi">
                          <div className="inner-div-popup">
                            <div className="inner__item">
                              <h4>Business Info:</h4>
                            </div>
                          </div>

                          <div className="inner-div-popup">
                            <div className="inner__item">
                              <TextField
                                variant="outlined"
                                label="Bussiness Name"
                                name="businessName"
                                className="textFeild__inventory__inner"
                                value={formData.businessName}
                                id="businessName"
                                {...register("businessName", {
                                  required: REQUIRED
                                })}
                                error={Boolean(errors.businessName)}
                                helperText={errors.businessName?.message}
                                onChange={(e) => { setFormData({ ...formData, businessName: e.target.value }) }}
                              />
                            </div>
                          </div>

                          <div className="inner-div-popup">
                            <div className="inner__item">
                              <TextField
                                variant="outlined"
                                label="Phone Number"
                                name="businessMsisdn"
                                className="textFeild__inventory__inner"
                                value={formData.businessMsisdn}
                                id="businessMsisdn"
                                {...register("businessMsisdn", {
                                  required: REQUIRED
                                })}
                                error={Boolean(errors.businessMsisdn)}
                                helperText={errors.businessMsisdn?.message}
                                onChange={(e) => { setFormData({ ...formData, businessMsisdn: e.target.value }) }}
                              />
                            </div>
                          </div>

                          <div className="inner-div-popup">
                            <TextField
                              variant="outlined"
                              name="businessOwner"
                              label="Business Owner"
                              value={formData.businessOwner}
                              className="textFeild__inventory__inner"
                              id="businessOwner"
                              {...register("businessOwner", {
                                required: REQUIRED
                              })}
                              error={Boolean(errors.businessOwner)}
                              helperText={errors.businessOwner?.message}
                              onChange={(e) => { setFormData({ ...formData, businessOwner: e.target.value }) }}
                            />
                          </div>
                        </div>

                        <div className="inner-div-popup">
                          <FormControl variant="outlined" className="fromcontrol">
                            <InputLabel className="label">&nbsp;Bussiness Category&nbsp;</InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              placeholder="Bussiness Category"
                              label="Bussiness Category"
                              name="businessCategoryId"
                              value={formData.businessCategoryId}
                              MenuProps={MenuProps}
                              id="businessCategoryId"
                              {...register("businessCategoryId", {
                                required: REQUIRED
                              })}
                              error={Boolean(errors.businessCategoryId)}
                              helperText={errors.businessCategoryId?.message}
                              onChange={(e) => { setFormData({ ...formData, businessCategoryId: mappedId(e.target.value) }) }}>
                              {
                                suggestionName.map((suggestionName, id) =>
                                  <MenuItem value={id}>{suggestionName}</MenuItem>
                                )
                              }
                            </Select>
                          </FormControl>
                        </div>

                        <div className="inner-div-popup">
                          <div className="inner__item">
                            <TextField
                              variant="outlined"
                              label="City"
                              name="businessCity"
                              value={formData.businessCity}
                              className="textFeild__inventory__inner"
                              id="businessCity"
                              {...register("businessCity", {
                                required: REQUIRED
                              })}
                              error={Boolean(errors.businessCity)}
                              helperText={errors.businessCity?.message}
                              onChange={(e) => { setFormData({ ...formData, businessCity: e.target.value }) }} />
                          </div>
                        </div>
                        <div className="inner-div-popup">
                          <h2 className="create_metadata"></h2>
                        </div>
                        <div className="inner-div-popup">
                          <div className="inner__item">
                            <TextField
                              variant="outlined"
                              className="textFeild__inventory__inner"
                              label="Pin Code"
                              name="businessPinCode"
                              value={formData.businessPinCode}
                              id="businessPinCode"
                              {...register("businessPinCode", {
                                required: REQUIRED
                              })}
                              error={Boolean(errors.businessPinCode)}
                              helperText={errors.businessPinCode?.message}
                              onChange={(e) => { setFormData({ ...formData, businessPinCode: e.target.value }) }}
                            />
                          </div>
                        </div>

                        <div className="inner-div-popup">
                          <div className="inner__item">
                            <TextField
                              variant="outlined"
                              label="State"
                              className="textFeild__inventory__inner"
                              name="businessState"
                              value={formData.businessState}
                              id="businessState"
                              {...register("businessState", {
                                required: REQUIRED
                              })}
                              error={Boolean(errors.businessState)}
                              helperText={errors.businessState?.message}
                              onChange={(e) => { setFormData({ ...formData, businessState: e.target.value }) }}
                            />
                          </div>
                        </div>

                        <div className="inner-div-popup">
                          <TextField
                            variant="outlined"
                            label="Longitude"
                            className="textFeild__popup__inner"
                            value={formData.longitude}
                            name="longitude"
                            id="longitude"
                            {...register("longitude", {
                              required: REQUIRED
                            })}
                            error={Boolean(errors.longitude)}
                            helperText={errors.longitude?.message}
                            onChange={(e) => { setFormData({ ...formData, longitude: e.target.value }) }}
                          />
                        </div>

                        <div className="inner-div-popup">
                          <TextField
                            variant="outlined"
                            label="Latitude"
                            className="textFeild__popup__inner"
                            value={formData.latitude}
                            name="latitude"
                            id="latitude"
                            {...register("latitude", {
                              required: REQUIRED
                            })}
                            error={Boolean(errors.latitude)}
                            helperText={errors.latitude?.message}
                            onChange={(e) => { setFormData({ ...formData, latitude: e.target.value }) }}
                          />
                        </div>

                        <div className="inner-div-popup">
                          <TextField
                            variant="outlined"
                            multiline
                            rows={10}
                            rowsMax={10}
                            label="Business Info"
                            className="textFeild__popup__inner"
                            value={formData.businessInfo}
                            name="businessInfo"
                            id="businessInfo"
                            {...register("businessInfo", {
                              required: REQUIRED
                            })}
                            error={Boolean(errors.businessInfo)}
                            helperText={errors.businessInfo?.message}
                            onChange={(e) => { setFormData({ ...formData, businessInfo: e.target.value }) }}
                          />
                        </div>

                        <div className="inner-div-popup">
                          <div className="inner__item">
                            <h4>Business Image URL:</h4>
                          </div>
                        </div>

                        <div className="inner-div-popup">
                          <div className="inner__item">
                            <TextField
                              variant="outlined"
                              type="file"
                              className="textFeild__popup__inner"
                              id="inpFile"
                              name="file"
                              {...register("inpFile", {
                                required: REQUIRED
                              })}
                              error={Boolean(errors.inpFile)}
                              helperText={errors.inpFile?.message}
                              onChange={(e) => { setFile({ file: e.target.value }) }}
                            />
                          </div>
                        </div>

                        <div className="inner-div-popup">
                          <div className="inner__pop__button">
                            <div className="button_container">
                              <button
                                className="update__button"
                                type="submit">
                                {loader && <CircularProgress size={25} color="secondary" />}
                                {!loader && 'Create'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                  }
                </div>
              </form>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default InventoryCreate;