import React, { useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CrossIcon from '@material-ui/icons/Close';
import { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core'
import { Dialog, DialogContent } from '@material-ui/core';
import { URL_BUSINESS_CATEGORY_FETCH } from '../../../constant/endpoints.js';
import axios from 'axios';
import { URL_CREATE_INVENTORY } from '../../../constant/endpoints.js';


const InventoryCreatePopUp = ({ openPopUp, setCreatePopUp }) => {
const [formData, setFormData] = useState({
    businessName: "",
    businessMsisdn: "",
    businessOwner:"",
    businessCategoryId: "",
    businessCity: "",
    businessPinCode: "",
    businessState: "",
    businessInfo: "",
    businessLogoUrl: "",
  });

  const closePopUp = () => {
    setCreatePopUp(false);
  }
  const [file, setFile] = useState();

  const [suggestionName, setSuggestionName] = useState([]);
  const [suggestionResponse, setSuggestionResponse] = useState({});
  const [suggestionData, setSuggestionData] = useState([{
    id: "",
    suggestionName: ""
  }]);

    async function  handleUpdate (e) {
      e.preventDefault();
      const input = document.getElementById("inpFile");
      const data = new FormData();
      const newsRequest = new Blob([JSON.stringify(formData)], {
        type: 'application/json'
      });
      data.append("file", input.files[0]);
      data.append("businessRequest", newsRequest);
      console.log(formData);
      console.log(file);
      await axios.post(URL_CREATE_INVENTORY, data)
        .catch((err) => {
          console.log(err);
        })
    }

    function mappedId(value) {
      for (var i = 0; i <= value; i++) {
        if (i == value) {
          return suggestionData[0].id[i];
        }
      }
      return value;
    }

    useEffect(() => {
      if (suggestionResponse.response) {
        const data = suggestionResponse.response.data.data;
        setSuggestionData([{
          id: data.map((data) => (data.businessCategoryId)),
          suggestionsName: data.map((data) => (data.businessCategoryName))
        }]);
        setSuggestionName(data.map((data) => (data.businessCategoryName)))
      }
    }, [suggestionResponse]);

    async function onClickSuggestion() {
      await axios.get(URL_BUSINESS_CATEGORY_FETCH).then((response) => {
        setSuggestionResponse({ response });
      }).catch((err) => {
        console.log(err);
      })
    }

    return (
      <Dialog open={openPopUp}>
        <DialogContent dividers>
          <form type="get" onSubmit={handleUpdate}>
            <div className="popup__container" id="popupcontainer">
              <div className="popup__cross__div">
                <CrossIcon fontSize="large" onClick={() => { closePopUp() }} />
              </div>
              {
                !formData ?
                  <div className="circular__progress">
                    <CircularProgress />
                  </div> :

                  <div className="popup__form__div">
                    <div className="popup__update__div">
                      <h2>Create Services</h2>
                    </div>

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
                            onChange={(e) => { setFormData({ ...formData, businessName: e.target.value  }) }}
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
                            onChange={(e) => { setFormData({ ...formData, businessMsisdn: e.target.value  }) }}
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
                      onClick={() => { onClickSuggestion() }}
                      onChange={(e) => { setFormData({ ...formData, businessCategoryId: mappedId(e.target.value) }) }}>
                      {
                        suggestionName.map((suggestionName,id) =>
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
                            onChange={(e) => { setFormData({ ...formData, businessCity: e.target.value }) }}/>
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
                            onChange={(e) => { setFormData({ ...formData,businessInfo: e.target.value }) }}
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
                          onChange={(e) => { setFile({ file: e.target.value })  }}
                        />
                      </div>
                    </div>

                    <div className="inner-div-popup">
                      <div className="inner__pop__button">
                        <div className="button_container">
                          <button
                            className="update__button"
                            type="submit">
                            Create
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

  export default InventoryCreatePopUp;