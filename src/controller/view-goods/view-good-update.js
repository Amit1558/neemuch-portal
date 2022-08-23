import React, { useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CrossIcon from '@material-ui/icons/Close';
import { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core'
import { Dialog, DialogContent } from '@material-ui/core';
import MenuProps from '../../icons/MenuProps.js';
import { fetchService, updateInventory } from '../../api/api-call.js';
import { useForm } from 'react-hook-form';
import { REQUIRED } from '../../constant/constants';
import { useSnackbar } from 'notistack';

const InventoryPopUpMenu = ({ openPopUp, setOpenPopup, mappedValue, setData }) => {
  const [formData, setFormData] = useState({
    businessId: "",
    businessName: "",
    businessMsisdn: "",
    businessOwner: "",
    businessCategoryId: "",
    businessCity: "",
    businessPinCode: "",
    businessState: "",
    businessInfo: "",
    businessLogoUrl: "",
  });

  const closePopUp = () => {
    setOpenPopup(false);
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

  useEffect(() => {
    if (mappedValue.businessId) {
      setFormData({
        businessId: mappedValue.businessId,
        businessName: mappedValue.businessName,
        businessMsisdn: mappedValue.businessMsisdn,
        businessOwner: mappedValue.businessOwner,
        businessCategoryName: mappedValue.businessCategoryName,
        businessCategoryId: mappedValue.businessCategoryId,
        businessCity: mappedValue.businessCity,
        businessPinCode: mappedValue.businessPinCode,
        businessState: mappedValue.businessState,
        businessInfo: mappedValue.businessInfo,
        businessLogoUrl: mappedValue.businessLogoUrl,
      })
    }
  }, [mappedValue])

  function handleUpdate() {
    const input = document.getElementById("inpFile");
    const data = new FormData();
    const newsRequest = new Blob([JSON.stringify(formData)], {
      type: 'application/json'
    });
    data.append("file", input.files[0]);
    data.append("businessUpdate", newsRequest);
    setLoader(true);
    updateInventory(data).then((response) => {
      if (response) {
        setData();
        closePopUp();
        enqueueSnackbar('Service updated successfully.', { variant: "success" });
        setLoader(false);
      }
    }).catch((err) => {
      enqueueSnackbar('Error updating service!', { variant: "error" });
      console.log(err);
      setLoader(false);
    })
  }

  function mappedId(value) {
    const arr = suggestionData.map((data)=>{ return data.businessCategoryId});
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
    <Dialog open={openPopUp}>
      <DialogContent dividers>
        <div className="popup__cross__div">
          <CrossIcon fontSize="large" onClick={() => { closePopUp() }} />
        </div>
        <form type="get" onSubmit={handleSubmit(handleUpdate)}>
          <div className="popup__container" id="popupcontainer">
            {
              !formData ?
                <div className="circular__progress">
                  <CircularProgress />
                </div> :

                <div className="popup__form__div">
                  <div className="popup__update__div">
                    <h2>Update Goods</h2>
                  </div>

                  <div className="hindi__news" id="hindi">
                    <div className="inner-div-popup">
                      <div className="inner__item">
                        <h4>Goods Info:</h4>
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
                        className="textFeild__popup__inner"
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
                        className="textFeild__inventory__inner"
                        value={formData.businessCity}
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
                      <div className="inner__link">
                        <a href={mappedValue.businessLogoUrl} style={{ fontStyle: "italic" }}>Current Image</a>
                      </div>
                      <TextField
                        variant="outlined"
                        type="file"
                        className="textFeild__popup__inner"
                        id="inpFile"
                        name="file"
                        id="inpFile"
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
                          {!loader && 'Update'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
            }
          </div>
        </form>
      </DialogContent>
    </Dialog>

  );
}

export default InventoryPopUpMenu;