import React, { useState } from 'react';
import "./popup-menu.css";
import { Select, MenuItem, InputLabel, FormControl, Container, LinearProgress, Box } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import CrossIcon from '@material-ui/icons/Close';
import { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core'
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import { URL_SUGGESTION_FETCH } from '../../../constant/endpoints.js';
import axios from 'axios';
import { URL_UPDATE_NEWS } from '../../../constant/endpoints.js';
import { updatePost } from '../../../api/api-call.js';

const PopUpMenu = ({ openPopUp, setOpenPopup, mappedValue, setData }) => {
  const [formData, setFormData] = useState({
    newsId: "",
    createDate: "",
    publishDate: "",
    newsPlace: "",
    newsTopic: "",
    newsCategory: "",
    sourceName: "",
    sourceUrl: "",
    suggestions: "",
    newsMasterEnglish: {
      englishNewsIid: "",
      headlines: "",
      shortDescription: "",
      content: ""
    },
    newsMasterHindi: {
      hindiNewsIid: "",
      hindiHeadlines: "",
      hindiShortDescription: "",
      hindiContent: ""
    },
    imageUrl: "",
  }
  );
  const [file, setFile] = useState();
  const [suggestionName, setSuggestionName] = useState([]);
  const [suggestionResponse, setSuggestionResponse] = useState({});
  const [ loader, setLoader] = useState(false);
  const [suggestionData, setSuggestionData] = useState([{
    id: "",
    suggestionName: ""
  }]);
  const closePopUp = () => {
    setOpenPopup(false);
  }

  useEffect(() => {
    if (mappedValue.newsId) {
      setFormData({
        newsId: mappedValue.newsId,
        createDate: mappedValue.createDate,
        publishDate: mappedValue.createDate,
        newsPlace: mappedValue.newsPlace,
        newsTopic: mappedValue.newsTopic,
        newsCategory: mappedValue.newsCategory,
        sourceName: mappedValue.sourceName,
        sourceUrl: mappedValue.sourceUrl,
        suggestions: 1,
        newsMasterEnglish: {
          englishNewsIid: mappedValue.newsMasterEnglish.englishNewsIid,
          headlines: mappedValue.newsMasterEnglish.headlines,
          shortDescription: mappedValue.newsMasterEnglish.shortDescription,
          content: mappedValue.newsMasterEnglish.content
        },
        newsMasterHindi: {
          hindiNewsIid: mappedValue.newsMasterHindi.hindiNewsIid,
          hindiHeadlines: mappedValue.newsMasterHindi.hindiHeadlines,
          hindiShortDescription: mappedValue.newsMasterHindi.hindiShortDescription,
          hindiContent: mappedValue.newsMasterHindi.hindiContent
        },
        imageUrl: mappedValue.imageUrl
      })
    }
  }, [mappedValue])

  async function handleUpdate(e) {
    e.preventDefault();
    const input = document.getElementById("inpFile");
    const data = new FormData();
    const newsRequest = new Blob([JSON.stringify(formData)], {
      type: 'application/json'
    });
    data.append("file", input.files[0]);
    data.append("newsUpdate", newsRequest);
    console.log(formData);
    console.log(file);
    setLoader(true);
    updatePost(data).then((res) => {
      if (res) {
        setData();
        closePopUp();
        setLoader(false);
      }
    });
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
        id: data.map((data) => (data.id)),
        suggestionsName: data.map((data) => (data.suggestionsName))
      }]);
      setSuggestionName(data.map((data) => (data.suggestionsName)))
    }
  }, [suggestionResponse]);

  async function onClickSuggestion() {
    await axios.get(URL_SUGGESTION_FETCH).then((response) => {
      setSuggestionResponse({ response });
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <Dialog open={openPopUp}>
      <DialogContent dividers>
        <div className="popup__cross__div">
          <CrossIcon fontSize="large" onClick={() => { closePopUp() }} />
        </div>

        <form type="get" onSubmit={handleUpdate}>
          <div className="popup__container" id="popupcontainer">
            {
              !formData ?
                <div className="circular__progress">
                  <CircularProgress />
                </div> :

                <div className="popup__form__div">
                  <div className="popup__update__div">
                    <h2>Update News</h2>
                  </div>

                  <div className="hindi__news" id="hindi">
                    <div className="inner-div-popup">
                      <div className="inner__item">
                        <h4>Hindi News</h4>
                      </div>
                    </div>

                    <div className="inner-div-popup">
                      {/* <div className="inner__item"> */}
                      <TextField
                        variant="outlined"
                        label="Headline (हिंदी)"
                        name="hindiHeadlines"
                        className="textFeild__popup__inner"
                        value={formData.newsMasterHindi.hindiHeadlines}
                        onChange={(e) => { setFormData({ ...formData, newsMasterHindi: { ...formData.newsMasterHindi, hindiHeadlines: e.target.value } }) }}
                      />
                      {/* </div> */}
                    </div>
                    <div className="inner-div-popup">
                      {/* <div className="inner__item"> */}
                      <TextField
                        variant="outlined"
                        multiline
                        rows={10}
                        rowsMax={10}
                        label="Short Description (हिंदी)"
                        className="textFeild__popup__inner"
                        value={formData.newsMasterHindi.hindiShortDescription}
                        name="hindiShortDescription"
                        onChange={(e) => { setFormData({ ...formData, newsMasterHindi: { ...formData.newsMasterHindi, hindiShortDescription: e.target.value } }) }}
                      />
                      {/* </div> */}
                    </div>
                    <div className="inner-div-popup">
                      <TextField
                        variant="outlined"
                        multiline
                        rows={10}
                        rowsMax={10}
                        name="hindiContent"
                        label="Content (हिंदी)"
                        value={formData.newsMasterHindi.hindiContent}
                        className="textFeild__popup__inner"
                        onChange={(e) => { setFormData({ ...formData, newsMasterHindi: { ...formData.newsMasterHindi, hindiContent: e.target.value } }) }}
                      />
                    </div>
                  </div>

                  <div className="english__news" id="english">
                    <div className="inner-div-popup">
                      <div className="inner__item">
                        <h4>English News:</h4>
                      </div>
                    </div>


                    <div className="inner-div-popup">
                      {/* <div className="inner__item"> */}
                      <TextField
                        variant="outlined"
                        label="Headlines"
                        name="headlines"
                        className="textFeild__popup__inner"
                        value={formData.newsMasterEnglish.headlines}
                        onChange={(e) => { setFormData({ ...formData, newsMasterEnglish: { ...formData.newsMasterEnglish, headlines: e.target.value } }) }}
                      />
                    </div>
                    <div className="inner-div-popup">
                      <TextField
                        variant="outlined"
                        multiline
                        rows={10}
                        rowsMax={10}
                        label="Short Description"
                        className="textFeild__popup__inner"
                        name="shortDescription"
                        value={formData.newsMasterEnglish.shortDescription}
                        onChange={(e) => { setFormData({ ...formData, newsMasterEnglish: { ...formData.newsMasterEnglish, shortDescription: e.target.value } }) }}
                      />
                    </div>
                    <div className="inner-div-popup">
                      <TextField
                        variant="outlined"
                        multiline
                        rows={10}
                        rowsMax={10}
                        label="Content"
                        className="textFeild__popup__inner"
                        name="content"
                        value={formData.newsMasterEnglish.content}
                        onChange={(e) => { setFormData({ ...formData, newsMasterEnglish: { ...formData.newsMasterEnglish, content: e.target.value } }) }}
                      />
                    </div>
                  </div>
                  <div className="inner-div-popup">
                    <h2 className="create_metadata">News&nbsp;Metadata</h2>
                  </div>
                  <div className="inner-div-popup">
                    <TextField
                      variant="outlined"
                      className="textFeild__popup__inner"
                      label="newsPlace"
                      name="newsPlace"
                      value={formData.newsPlace}
                      onChange={(e) => { setFormData({ ...formData, newsPlace: e.target.value }) }}
                    />
                  </div>
                  <div className="inner-div-popup">
                    <FormControl variant="outlined" className="fromcontrol">
                      <InputLabel className="label">&nbsp;Categories&nbsp;</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        placeholder="Categories"
                        name="newsCategory"
                        value={formData.newsCategory}
                        onChange={(e) => { setFormData({ ...formData, newsCategory: e.target.value }) }}>
                        <MenuItem value="Trending">All News</MenuItem>
                        <MenuItem value="Sports">My Feed</MenuItem>
                        <MenuItem value="Politics">Trending</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="inner-div-popup">
                    <FormControl variant="outlined" className="fromcontrol">
                      <InputLabel className="label">&nbsp;Suggestions&nbsp;</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        placeholder="suggestions"
                        name="suggestions"
                        onClick={() => { onClickSuggestion() }}
                        onChange={(e) => { setFormData({ ...formData, suggestions: mappedId(e.target.value) }) }}>
                        {
                          suggestionName.map((suggestionName, id) =>
                            <MenuItem value={id}>{suggestionName}</MenuItem>
                          )
                        }
                      </Select>
                    </FormControl>
                  </div>
                  <div className="inner-div-popup">
                    <TextField
                      variant="outlined"
                      label="Topic"
                      className="textFeild__popup__inner"
                      name="newsTopic"
                      value={formData.newsTopic}
                      onChange={(e) => { setFormData({ ...formData, newsTopic: e.target.value }) }}
                    />
                  </div>
                  <div className="inner-div-popup">
                    <TextField
                      variant="outlined"
                      label="Source Name"
                      className="textFeild__popup__inner"
                      name="sourceName"
                      value={formData.sourceName}
                      onChange={(e) => { setFormData({ ...formData, sourceName: e.target.value }) }}
                    />
                  </div>
                  <div className="inner-div-popup">
                    <TextField
                      variant="outlined"
                      label="Source Url"
                      className="textFeild__popup__inner"
                      name="sourceUrl"
                      value={formData.sourceUrl}
                      onChange={(e) => { setFormData({ ...formData, sourceUrl: e.target.value }) }}
                    />
                  </div>

                  <div className="inner-div-popup">
                    <div className="inner__item">
                      <h4>Image URL:</h4>
                    </div>
                  </div>

                  <div className="inner-div-popup">
                    <div className="inner__item">
                      <div className="inner__link">
                        <a href={mappedValue.imageUrl} style={{ fontStyle: "italic" }}>Current Image</a>
                      </div>
                      <TextField
                        variant="outlined"
                        type="file"
                        className="textFeild__popup__inner"
                        id="inpFile"
                        name="file"
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
                          {loader && <CircularProgress size={25} color="secondary"/>}
                          {!loader&&'Update'}
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

export default PopUpMenu;