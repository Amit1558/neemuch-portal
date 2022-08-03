import React, { useState, useEffect, useRef } from 'react';
import Home from '../home/home.jsx'
import Grid from '@material-ui/core/Grid'
import TextField from '@mui/material/TextField';
import { Select, MenuItem, InputLabel, FormControl, Radio, RadioGroup, FormControlLabel } from '@material-ui/core'
import { REQUIRED, MODULE_CREATE_NEWS } from '../../constant/constants.js'
import Card from '@material-ui/core/Card';
import './create-news.css';
import { createNews, fetchSuggestion } from '../../api/api-call.js';
import { CircularProgress } from '@material-ui/core'
import MenuProps from '../../icons/MenuProps.js';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

function CreateNews() {
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [file, setFile] = useState();
  const [language, setLanguage] = useState(3);
  const [suggestionName, setSuggestionName] = useState([]);
  const [loader, setLoader] = useState(false);
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

  const onSubmitClick = () => {
    const input = document.getElementById("inpFile");
    const data = new FormData();
    const newsRequest = new Blob([JSON.stringify(formData)], {
      type: 'application/json'
    });
    data.append("file", input.files[0]);
    data.append("newsRequest", newsRequest);
    setLoader(true);
    createNews(data).then((response) => {
      if (response) {
        onHandleReset();
        enqueueSnackbar('News Created Successfully.', { variant: "success" });
        setLoader(false);
      }
    })
      .catch((err) => {
        enqueueSnackbar('Error creating news!', { variant: "error" });
        console.log(err);
        setLoader(false);
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
    const onClickSuggestion = () => {
      fetchSuggestion().then((response) => {
        if (response) {
          const data = response.data.data;
          setSuggestionData([{
            id: data.map((data) => (data.id)),
            suggestionsName: data.map((data) => (data.suggestionsName))
          }]);
          setSuggestionName(data.map((data) => (data.suggestionsName)))
        }
      }).catch((err) => {
        console.log(err);
      })
    }
    onClickSuggestion();
  }, []);

  const onHandleReset = () => {
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
    setLanguage(3);
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
      <form type="get" id="form" onSubmit={handleSubmit(onSubmitClick)}>
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
                              id="hindiHeadlines"
                              {...register("hindiHeadlines", {
                                required: (language === "2" || language === "3") ? true : false
                              })}
                              error={(language === "2" || language === "3") ? Boolean(errors.hindiHeadlines) : false}
                              helperText={(language === "2" || language === "3") ? errors.hindiHeadlines?.message : false}
                              onChange={(e) => { setFormData({ ...formData, newsMasterHindi: { ...formData.newsMasterHindi, hindiHeadlines: e.target.value } }) }}
                            />
                          </div>

                          <div className="inner__item__hindi" id="inner__item__shortDescHindi">
                            <TextField
                              variant="outlined"
                              label="Short Description (हिंदी)"
                              id="hindiShortDescription"
                              name="hindiShortDescription"
                              className="textFeild__inner"
                              {...register("hindiShortDescription", {
                                required: (language === "2" || language === "3") ? true : false
                              })}
                              error={(language === "2" || language === "3") ? Boolean(errors.hindiShortDescription) : false}
                              helperText={(language === "2" || language === "3") ? errors.hindiShortDescription?.message : false}
                              onChange={(e) => { setFormData({ ...formData, newsMasterHindi: { ...formData.newsMasterHindi, hindiShortDescription: e.target.value } }) }}
                            />
                          </div>

                          <div className="inner__item__hindi" id="inner__item__contentHindi">
                            <TextField
                              variant="outlined"
                              name="hindiContent"
                              label="Content (हिंदी)"
                              multiline
                              minRows={10}
                              maxRows={10}
                              id="hindiContent"
                              {...register("hindiContent", {
                                required: (language === "2" || language === "3") ? true : false
                              })}
                              error={(language === "2" || language === "3") ? Boolean(errors.hindiContent) : false}
                              helperText={(language === "2" || language === "3") ? errors.hindiContent?.message : false}
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
                              id="headlines"
                              {...register("headlines", {
                                required: (language === "1" || language === "3") ? true : false
                              })}
                              error={(language === "1" || language === "3") ? Boolean(errors.headlines) : false}
                              helperText={(language === "1" || language === "3") ? errors.headlines?.message : false}
                              onChange={(e) => { setFormData({ ...formData, newsMasterEnglish: { ...formData.newsMasterEnglish, headlines: e.target.value } }) }}
                            />
                          </div>


                          <div className="inner__item__english" id="inner__item__shortDescEnglish">
                            <TextField
                              variant="outlined"
                              label="Short Description"
                              name="shortDescription"
                              className="textFeild__inner"
                              id="shortDescription"
                              {...register("shortDescription", {
                                required: (language === "1" || language === "3") ? true : false
                              })}
                              error={(language === "1" || language === "3") ? Boolean(errors.shortDescription) : false}
                              helperText={(language === "1" || language === "3") ? errors.shortDescription?.message : false}
                              onChange={(e) => { setFormData({ ...formData, newsMasterEnglish: { ...formData.newsMasterEnglish, shortDescription: e.target.value } }) }}
                            />
                          </div>


                          <div className="inner__item__english" id="inner__item__contentEnglish">
                            <TextField
                              variant="outlined"
                              label="Content"
                              name="content"
                              multiline
                              minRows={10}
                              maxRows={10}
                              className="textFeild__inner"
                              id="content"
                              {...register("content", {
                                required: (language === "1" || language === "3") ? true : false
                              })}
                              error={(language === "1" || language === "3") ? Boolean(errors.content) : false}
                              helperText={(language === "1" || language === "3") ? errors.content?.message : false}
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
                      id="newsPlace"
                      {...register("newsPlace", {
                        required: REQUIRED
                      })}
                      error={Boolean(errors.newsPlace)}
                      helperText={errors.newsPlace?.message}
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
                        id="newsCategory"
                        {...register("newsCategory", {
                          required: REQUIRED
                        })}
                        error={Boolean(errors.newsCategory)}
                        helperText={errors.newsCategory?.message}
                        onChange={(e) => { setFormData({ ...formData, newsCategory: e.target.value }) }}>
                        <MenuItem value="All News">All News</MenuItem>
                        <MenuItem value="My Feed">My Feed</MenuItem>
                        <MenuItem value="Trending">Trending</MenuItem>
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
                        MenuProps={MenuProps}
                        className="textFeild__inner__dropbox"
                        id="suggestions"
                        {...register("suggestions", {
                          required: REQUIRED
                        })}
                        error={Boolean(errors.suggestions)}
                        helperText={errors.suggestions?.message}
                        onChange={(e) => { setFormData({ ...formData, suggestions: mappedId(e.target.value) }) }}
                      >
                        {
                          suggestionName.map((suggestionName, id) =>
                            <MenuItem value={id}>{suggestionName}</MenuItem>
                          )
                        }
                      </Select>
                    </FormControl>
                  </div>

                </div>
                <div className="inner_div_metadata">
                  <div className="inner__metadata__field">
                    <TextField
                      variant="outlined"
                      label="Source Name"
                      className="textFeild__inner__field"
                      name="sourceName"
                      id="sourceName"
                      onChange={(e) => { setFormData({ ...formData, sourceName: e.target.value }) }}
                    />
                  </div>

                  <div className="inner__metadata__field">
                    <TextField
                      variant="outlined"
                      label="Source Url"
                      className="textFeild__inner__field"
                      name="sourceUrl"
                      id="sourceUrl"
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
                      {...register("inpFile", {
                        required: REQUIRED
                      })}
                      error={Boolean(errors.inpFile)}
                      helperText={errors.inpFile?.message}
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
                        {loader && <CircularProgress size={25} color="secondary" />}
                        {!loader && 'Create'}
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
