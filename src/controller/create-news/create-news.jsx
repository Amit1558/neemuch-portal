import React, { useState, useEffect } from 'react';
import Home from '../home/home.jsx'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { Select, MenuItem, InputLabel, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel } from '@material-ui/core'
import { URL_CREATE_NEWS, URL_SUGGESTION_FETCH } from '../../constant/endpoints.js';
import { SEVERITY_WARNING, SEVERITY_ERROR, SEVERITY_SUCCESS, MODULE_CREATE_NEWS } from '../../constant/constants.js'
import Snackbar from '@material-ui/core/Snackbar';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import './create-news.css';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CreateNews() {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBar(false);
  };
  const [snackBarInfo, setSnackBarInfo] = useState({ severity: "", message: "" });
  const [snackBar, setSnackBar] = useState(false);
  const [file, setFile] = useState();
  const [language, setLanguage] = useState(3);
  const [suggestionName, setSuggestionName] = useState([]);
  const [suggestionResponse, setSuggestionResponse] = useState({});
  const [suggestionData, setSuggestionData] = useState([{
    id: "",
    suggestionName: ""
  }]);
  const [formData, setFormData] = useState({
    newsPlace: "",
    newsTopic: "",
    newsCategory: "",
    suggestions: "",
    sourceName: "",
    sourceUrl: "",
    newsMasterEnglish: {
      headlines: "",
      shortDescription: "",
      content: ""
    },
    newsMasterHindi: {
      hindiHeadlines: "",
      hindiShortDescription: "",
      hindiContent: ""
    },
  });

  const validate = () => {
    let isError = false;
    if (!file) {
      setSnackBar(true);
      setSnackBarInfo({ message: "File is not chosen!", severity: SEVERITY_WARNING })
      isError = true;
    }
    if (!formData.newsTopic) {
      setSnackBar(true);
      setSnackBarInfo({ message: "Topic cannot be blank!", severity: SEVERITY_WARNING })
      isError = true;
    }
    if (!formData.newsCategory) {
      setSnackBar(true);
      setSnackBarInfo({ message: "Category cannot be blank!", severity: SEVERITY_WARNING })
      isError = true;
    }
    if (formData.newsMasterHindi.hindiHeadlines) {
      if (!formData.newsMasterHindi.hindiShortDescription) {
        setSnackBar(true);
        setSnackBarInfo({ message: "Short description (हिंदी) field cannot be blank!", severity: SEVERITY_WARNING })
        isError = true;
      }
    }
    if (formData.newsMasterEnglish.headlines) {
      if (!formData.newsMasterEnglish.shortDescription) {
        setSnackBar(true);
        setSnackBarInfo({ message: "Short description field cannot be blank!", severity: SEVERITY_WARNING })
        isError = true;
      }
    }
    if (!formData.newsMasterHindi.hindiHeadlines && !formData.newsMasterEnglish.headlines) {
      setSnackBar(true);
      setSnackBarInfo({ message: "Hindi headlines field cannot be blank!", severity: SEVERITY_WARNING })
      isError = true;
    }

    return isError;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const err = validate();

    if (!err) {
      const input = document.getElementById("inpFile");
      const data = new FormData();
      const newsRequest = new Blob([JSON.stringify(formData)], {
        type: 'application/json'
      });
      data.append("file", input.files[0]);
      data.append("newsRequest", newsRequest);
      console.log(formData);
      console.log(err);
      const response = await axios.post(URL_CREATE_NEWS, data)
        .catch((err) => {
          setSnackBar(true);
          setSnackBarInfo({ message: "Error while creating news", severity: SEVERITY_ERROR });
          console.log(err);
        })
      if (response) {
        setSnackBar(true);
        setSnackBarInfo({ message: "NewsCreated Successfully", severity: SEVERITY_SUCCESS });
      }
    }
  }

  function mappedId(value) {
    for (var i = 0; i <= value; i++) {
      if (i == value) {
        return suggestionData[0].id[i];
      }
    }
    return value;
  }

  async function onClickSuggestion() {
    await axios.get(URL_SUGGESTION_FETCH).then((response) => {
      setSuggestionResponse({ response });
    }).catch((err) => {
      console.log(err);
    })
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

  const onHandleReset = event => {
    setFormData({
      newsPlace: "",
      newsTopic: "",
      newsCategory: "",
      sourceName: "",
      sourceUrl: "",
      newsMasterEnglish: {
        headlines: "",
        shortDescription: "",
        content: ""
      },
      newsMasterHindi: {
        hindiHeadlines: "",
        hindiShortDescription: "",
        hindiContent: ""
      },
    });
    setFile(null);
    document.getElementById("form").reset();
  }

  useEffect(() => {
    const hindi = document.getElementById("hindi");
    const english = document.getElementById("english");
    const headlineHindiField = document.getElementById("inner__item__headlineHindi");
    const shortDescHindiField = document.getElementById("inner__item__shortDescHindi");
    const contentHindiField = document.getElementById("inner__item__contentHindi");
    const headLineEnglishField = document.getElementById("inner__item__headlineEnglish");
    const shortDescEnglishField = document.getElementById("inner__item__shortDescEnglish");
    const contentEnglishField = document.getElementById("inner__item__contentEnglish");
    if (language == '1') {
      hindi.classList.add('close');
      english.classList.remove('close');
      headlineHindiField.classList.add('close');
      shortDescHindiField.classList.add('close');
      contentHindiField.classList.add('close');
      headLineEnglishField.classList.remove('close');
      shortDescEnglishField.classList.remove('close');
      contentEnglishField.classList.remove('close');
    } else if (language == '2') {
      hindi.classList.remove('close');
      english.classList.add('close');
      headlineHindiField.classList.remove('close');
      shortDescHindiField.classList.remove('close');
      contentHindiField.classList.remove('close');
      headLineEnglishField.classList.add('close');
      shortDescEnglishField.classList.add('close');
      contentEnglishField.classList.add('close');
    } else if (language == '3') {
      hindi.classList.remove('close');
      english.classList.remove('close');
      headlineHindiField.classList.remove('close');
      shortDescHindiField.classList.remove('close');
      contentHindiField.classList.remove('close');
      headLineEnglishField.classList.remove('close');
      shortDescEnglishField.classList.remove('close');
      contentEnglishField.classList.remove('close');
    }
  }, [language]);

  return (
    <div className="create__contianer">
      <Home module={MODULE_CREATE_NEWS} />
      <form type="get" id="form" onSubmit={handleSubmit}>
        <Grid container spacing={5} style={{ padding: "50px 90px" }}>
          <Grid item xs={12}>
            <Card variant="outlined" style={{ borderRadius: "8px" }}>
              <div className="left-form">
                <div className="create_title">
                  <h2 >Create News</h2>
                </div>
                <div className="inner-div">

                  <FormControl component="fieldset">

                    <div className="inner-div">
                      <div className="inner__item">
                        <h3>Language</h3>
                      </div>
                    </div>

                    <RadioGroup
                      row
                      aria-label="language"
                      defaultValue="3"
                      name="radio-buttons-group"
                      onChange={(e) => { setLanguage(e.target.value) }}>
                      <FormControlLabel value="1" control={<Radio />} label="English" />
                      <FormControlLabel value="2" control={<Radio />} label="Hindi" />
                      <FormControlLabel value="3" control={<Radio />} label="Both" />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className="language">
                  <div className="hindi__div">
                    <div className="hindi__news" id="hindi">
                      <div className="inner-div">
                        <div className="inner__item">
                          <h4>Hindi News</h4>
                        </div>
                      </div>

                      <div className="inner-div">
                        <div className="inner__hindi__news" id="inner__hindi__news">
                          <div className="inner__item__hindi" id="inner__item__headlineHindi">
                            <TextField
                              variant="outlined"
                              label="Headline (हिंदी)"
                              name="hindiHeadlines"
                              className="textFeild__inner"
                              onChange={(e) => { setFormData({ ...formData, newsMasterHindi: { ...formData.newsMasterHindi, hindiHeadlines: e.target.value } }) }}
                            />
                          </div>

                          <div className="inner__item__hindi" id="inner__item__shortDescHindi">
                            <TextField
                              variant="outlined"
                              label="Short Description (हिंदी)"
                              name="hindiShortDescription"
                              className="textFeild__inner"
                              onChange={(e) => { setFormData({ ...formData, newsMasterHindi: { ...formData.newsMasterHindi, hindiShortDescription: e.target.value } }) }}
                            />
                          </div>

                          <div className="inner__item__hindi" id="inner__item__contentHindi">
                            <TextField
                              variant="outlined"
                              name="hindiContent"
                              label="Content (हिंदी)"
                              multiline
                              rows={10}
                              rowsMax={10}
                              className="textFeild__inner"
                              onChange={(e) => { setFormData({ ...formData, newsMasterHindi: { ...formData.newsMasterHindi, hindiContent: e.target.value } }) }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="english__div">
                    <div className="english__news" id="english">
                      <div className="inner-div">
                        <div className="inner__item">
                          <h4>English News</h4>
                        </div>
                      </div>


                      <div className="inner-div">
                        <div className="inner__hindi__news" id="inner__hindi__news">
                          <div className="inner__item__english" id="inner__item__headlineEnglish">
                            <TextField
                              variant="outlined"
                              label="Headlines"
                              name="headlines"
                              className="textFeild__inner"
                              onChange={(e) => { setFormData({ ...formData, newsMasterEnglish: { ...formData.newsMasterEnglish, headlines: e.target.value } }) }}
                            />
                          </div>


                          <div className="inner__item__english" id="inner__item__shortDescEnglish">
                            <TextField
                              variant="outlined"
                              label="Short Description"
                              name="shortDescription"
                              className="textFeild__inner"
                              onChange={(e) => { setFormData({ ...formData, newsMasterEnglish: { ...formData.newsMasterEnglish, shortDescription: e.target.value } }) }}
                            />
                          </div>


                          <div className="inner__item__english" id="inner__item__contentEnglish">
                            <TextField
                              variant="outlined"
                              label="Content"
                              name="content"
                              multiline
                              rows={10}
                              rowsMax={10}
                              className="textFeild__inner"
                              onChange={(e) => { setFormData({ ...formData, newsMasterEnglish: { ...formData.newsMasterEnglish, content: e.target.value } }) }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="left-form">
                <div className="inner-div">
                  <h2 className="create_metadata">News Metadata</h2>
                </div>
                <div className="inner__metadata__div" id="inner__metadata__div">
                  <div className="inner__metadata__item">
                    <TextField
                      variant="outlined"
                      label="Place"
                      name="newsPlace"
                      className="textFeild__inner__metadata"
                      onChange={(e) => { setFormData({ ...formData, newsPlace: e.target.value }) }}
                    />
                  </div>
                  <div className="inner__metadata__item">
                    <FormControl variant="outlined" className="fromcontrol">
                      <InputLabel className="label">&nbsp;Categories&nbsp;</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        className="textFeild__inner__dropbox"
                        placeholder="Categories"
                        name="newsCategory"
                        onChange={(e) => { setFormData({ ...formData, newsCategory: e.target.value }) }}>
                        <MenuItem value="Trending">All News</MenuItem>
                        <MenuItem value="Sports">My Feed</MenuItem>
                        <MenuItem value="Politics">Trending</MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className="inner__metadata__item">
                    <FormControl variant="outlined" className="fromcontrol">
                      <InputLabel className="label">&nbsp;Suggestions&nbsp;</InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        placeholder="suggestions"
                        name="suggestions"
                        className="textFeild__inner__dropbox"
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
                  <div className="inner__metadata__item">
                    <TextField
                      variant="outlined"
                      label="Topic"
                      name="newsTopic"
                      className="textFeild__inner__metadata"
                      onChange={(e) => { setFormData({ ...formData, newsTopic: e.target.value }) }}
                    />
                  </div>

                </div>
                <div className="inner_div_metadata">
                  <div className="inner__metadata__field">
                    <TextField
                      variant="outlined"
                      label="Source Name"
                      className="textFeild__inner__field"
                      name="sourceName"
                      onChange={(e) => { setFormData({ ...formData, sourceName: e.target.value }) }}
                    />
                  </div>

                  <div className="inner__metadata__field">
                    <TextField
                      variant="outlined"
                      label="Source Url"
                      className="textFeild__inner__field"
                      name="sourceUrl"
                      onChange={(e) => { setFormData({ ...formData, sourceUrl: e.target.value }) }}
                    />
                  </div>
                </div>

                <div className="inner-div">
                  <div className="inner__item">
                    <h4>Image URL:</h4>
                  </div>
                </div>

                <div className="inner-div">
                  <div className="inner__item">
                    <TextField
                      variant="outlined"
                      type="file"
                      className="textField"
                      id="inpFile"
                      name="file"
                      onChange={(e) => { setFile({ file: e.target.value }) }}
                    />
                  </div>
                </div>

                <div className="inner-div">
                  <div className="inner__item__button">
                    <div className="button_container">
                      <button
                        className="create__button"
                        type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                  <div className="inner__item__button">
                    <div className="button_container">
                      <button
                        className="create__button__reset"
                        onClick={() => { onHandleReset() }}
                        type="reset">
                        Reset
                      </button>
                      <div className="snackbar">
                        <Snackbar open={snackBar} autoHideDuration={6000} onClose={handleClose}>
                          <Alert onClose={handleClose} severity={snackBarInfo.severity}>
                            {snackBarInfo.message}
                          </Alert>
                        </Snackbar>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default CreateNews;
