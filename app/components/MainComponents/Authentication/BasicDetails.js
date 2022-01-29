import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { intlShape } from 'react-intl';
import styled from 'styled-components';
import { DropzoneArea } from 'material-ui-dropzone';
import { AddAPhoto } from '@material-ui/icons';
import { connect } from "react-redux";
import API from "../../../helpers/api";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormHelperText from '@material-ui/core/FormHelperText';
import { submitBasicDocInfo } from "../../../redux/actions/authActions";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '.MuiInputBase-root.Mui-disabled': {
//       background: '#00000014 !important';
//     }
//   }
// }));
// initialization
const api = new API();

const DropZoneWrapper = styled.div`
  .MuiDropzoneArea-root {
    width: 90px;
    height: 90px;
    min-height: 90px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 4px solid #f69ea4;
  }
  .MuiGrid-container {
    position: absolute;
    top: 0;
    margin: 0;
  }
  .MuiDropzonePreviewList-imageContainer:hover .MuiDropzonePreviewList-image {
    opacity: 1;
  }
  .MuiGrid-spacing-xs-8 > .MuiGrid-item {
    padding: 0;
  }
  .MuiGrid-grid-xs-4 {
    flex-grow: 0;
    max-width: 100%;
    flex-basis: 100%;
  }
  .MuiDropzonePreviewList-image {
    height: auto;
  }
  .MuiDropzoneArea-text {
    display: none;
  }
  .MuiDropzonePreviewList-removeButton {
    top: 30%;
    right: 35%;
    opacity: 0;
    position: absolute;
    transition: .5s ease;
  }
  .MuiFab-root:hover {
    text-decoration: none;
    background-color: #d5d5d5b3;
  }
  .MuiSvgIcon-root {
    margin-right: 0 !important;
    color: gray;
  }
  .MuiGrid-container {
    position: absolute;
    top: 0;
    margin: 0;
  }
  .MuiDropzonePreviewList-image {
    height: 90px;
  }
`;

const LanguageWrapper = styled('div')`
  .MuiAutocomplete-inputRoot {
    padding: 6px !important;
    border-radius: 8px;
  }
  .MuiAutocomplete-endAdornment {
    padding-top: 0;
  }
  label {
    top: 11px !important;
  }
`;

const FormWrapper = styled('div')`
  margin: 30px auto;
  width: 70%;
  label + .MuiInput-formControl {
    margin-top: 0
  }
  .MuiInputLabel-formControl {
    top: -5px
  }
  .MuiInputBase-root.Mui-disabled {
    background: #00000014 !important;
    cursor: not-allowed;
  }
  .MuiSelect-select.Mui-disabled {
    cursor: not-allowed;
  }
`;
// Destructuring props

const Experiences = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
  { value: 10, label: '10' },
];
const BasicDetails = (props) => {

  const [selectedDate, setSelectedDate] = React.useState(null);
  const [lang, setLang] = React.useState([]);
  const autoC = useRef(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    handleInputChange("med_reg_year", date.getFullYear())
  }

  const { superSpecializationStoreList, masterData, basicDoctorInfo,
    handleNext, submitBasicDocInfo, doctorRegInfo, hashedKey } = props;

  // const classes = useStyles();

  const [isContinueButtonDisabled, setIsContinueButtonDisabled] = useState(true);

  const [snackBarInfo, setSnackbarInfo] = useState({
    isSnackBarOpen: false,
    snackBarText: "",
    snackBarSeverity: "success",
  });

  const userInfoInLocalStorage = localStorage.getItem("userInfo");
  const userEmailLocalStorage = localStorage.getItem("email");
  const registerInfoLocalStorage = localStorage.getItem("registerObj");
  const parsedUserInfo = JSON.parse(userInfoInLocalStorage);
  const registerUserInfo = JSON.parse(registerInfoLocalStorage);

  let localStorageEmail = "";

  // if ((parsedUserInfo !== null) &&
  //   parsedUserInfo.email &&
  //   (parsedUserInfo.email.length > 0)) {
  //   localStorageEmail = parsedUserInfo.email;
  // }

  if (
    userEmailLocalStorage !== null &&
    userEmailLocalStorage !== undefined &&
    userEmailLocalStorage !== ''
  ) {
    localStorageEmail = userEmailLocalStorage
  }

  if ((registerUserInfo !== null) &&
    registerUserInfo.email) {
    localStorageEmail = registerUserInfo.email;
  }

  const [basicDetails, setBasicDetails] = useState({
    avatar: "",
    email: (doctorRegInfo && (doctorRegInfo !== null)) ? doctorRegInfo.email : (basicDoctorInfo && basicDoctorInfo.email) ? basicDoctorInfo.email : localStorageEmail,
    alt_mobile: (basicDoctorInfo && basicDoctorInfo.alt_mobile) ? basicDoctorInfo.alt_mobile : "",
    password: (basicDoctorInfo && basicDoctorInfo.password) ? basicDoctorInfo.password : "",
    password_confirmation: (basicDoctorInfo && basicDoctorInfo.password_confirmation) ? basicDoctorInfo.password_confirmation : "",
    gender: (basicDoctorInfo && basicDoctorInfo.gender) ? basicDoctorInfo.gender : "",
    languages: (basicDoctorInfo && basicDoctorInfo.languages) ? basicDoctorInfo.languages : [],
    speciality_id: (basicDoctorInfo && basicDoctorInfo.speciality_id) ? basicDoctorInfo.speciality_id : '',
    super_speciality_id: (basicDoctorInfo && basicDoctorInfo.super_speciality_id) ? basicDoctorInfo.super_speciality_id : superSpecializationStoreList.super_specializations[0].id,
    med_reg_no: (basicDoctorInfo && basicDoctorInfo.med_reg_no) ? basicDoctorInfo.med_reg_no : "",
    med_reg_year: (basicDoctorInfo && basicDoctorInfo.med_reg_year) ? basicDoctorInfo.med_reg_year : '',
    medical_council: (basicDoctorInfo && basicDoctorInfo.medical_council) ? basicDoctorInfo.medical_council : "",
    exp: (basicDoctorInfo && basicDoctorInfo.exp) ? basicDoctorInfo.exp : "",
  });

  const [specialization, setSpecialization] = useState([])
  const [superSpecialization, setSuperSpecialization] = useState([])
  const [newSuperSpecialization, setNewSuperSpecialization] = useState([])
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (
      (basicDetails.avatar !== '')
      && (basicDetails.email !== '')
      && (basicDetails.password !== '')
      && (basicDetails.password_confirmation !== '')
      && (basicDetails.gender !== '')
      && (basicDetails.languages.length > 0)
      && (basicDetails.med_reg_no !== '')
      && (basicDetails.speciality_id !== '')
      && (basicDetails.super_speciality_id.length > 0)
      && (basicDetails.med_reg_year !== '')
      && (basicDetails.medical_council !== '')
      && (basicDetails.exp !== '')
    ) {
      setIsContinueButtonDisabled(false);
    }

    if ((basicDetails.password.length > 0) &&
      (basicDetails.password_confirmation.length > 0) &&
      (basicDetails.password.trim() !== basicDetails.password_confirmation.trim())) {
      setBasicDetailsError({
        password_confirmation: ["Confirm Password does not match"],
      });
      setIsContinueButtonDisabled(true);
    }
  }, [basicDetails]);

  useEffect(() => {
    var mobileFormat = /^[6-9]\d{9}$/;

    if ((basicDetails.alt_mobile.length > 0) &&
      (basicDetails.alt_mobile !== '') &&
      (basicDetails.alt_mobile !== null) &&
      (basicDetails.alt_mobile !== undefined)) {
      if (!basicDetails.alt_mobile.match(mobileFormat)) {
        setBasicDetailsError({
          alt_mobile: ["Enter Valid Mobile Number"],
        });
      }

    }
  }, [basicDetails.alt_mobile])

  const [basicDetailsErrors, setBasicDetailsError] = useState({});

  const handleInputChange = (inputTarget, inputValue) => {
    // console.log(inputValue, inputTarget)
    const intermediateObj = { ...basicDetails };
    if ((Object.keys(basicDetailsErrors).length > 0) && basicDetailsErrors[inputTarget]) {
      delete basicDetailsErrors[inputTarget];
    }

    if (inputTarget === 'speciality_id') {
      intermediateObj['super_speciality_id'] = [];
      const ele = autoC.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0];
      if (ele) ele.click();
    }

    if (inputTarget === 'super_speciality_id') {
      intermediateObj[inputTarget] = inputValue.map((item) => item.super_specialization_id);
    } else {
      intermediateObj[inputTarget] = inputValue;
    }

    setBasicDetails({ ...intermediateObj });
    if (inputTarget === 'speciality_id') {
      renderSuperSpecialization(inputValue)
    }

    console.log(basicDetails)

  }

  // let languages = [
  //   { id: 1, name: 'English' },
  //   { id: 2, name: 'Hindi' },
  //   { id: 3, name: 'Telugu' },
  // ];



  useEffect(() => {
    if (masterData.languages.length > 0) {
      let languages = masterData.languages.map((language) => {
        return ({
          id: language.id,
          name: language.name,
        });
      });

      setLang(languages)
    }
    if (masterData.specializations.length > 0) {
      let specializationsList = masterData.specializations.map((specialization) => {
        return ({
          id: specialization.id,
          name: specialization.name,
        });
      })
      setSpecialization(specializationsList)
    }
  }, [masterData.specializations])


  useEffect(() => {
    if (masterData.superSpecializations.length > 0) {
      let superSpecializationsList = masterData.superSpecializations.map((item) => {
        return ({
          super_specialization_id: item.id,
          super_specialization_name: item.name,
          specialization_id: item.specialization.id
        });
      })
      setSuperSpecialization(superSpecializationsList)
    }
  }, [masterData.specializations])

  let renderSuperSpecialization = (id) => {
    setNewSuperSpecialization(superSpecialization.filter((item) => item.specialization_id === id))
  }


  let superSpecializationList = [
    {
      id: 3,
      name: "super specialization 1",
    },
    {
      id: 4,
      name: "super specialization 2",
    }
  ];

  if (superSpecializationStoreList.super_specializations &&
    (superSpecializationStoreList.super_specializations.length > 0)) {
    superSpecializationStoreList.super_specializations.map((superSpecialDetail) => {
      return ({
        id: superSpecialDetail.id,
        name: superSpecialDetail.name,
      })
    })
  }

  const handleBasicDetailsSubmit = async () => {
    const requestBody = { ...basicDetails };

    const hashedKeyValue = (hashedKey === null) ?
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL29hYXJvZ3lhLWFkbWluXC9hcGlcL3BhdGllbnRcL2F1dGhcL3ZlcmlmeU90cCIsImlhdCI6MTYxOTcwNDAwNCwiZXhwIjoxNjUxMjQwMDA0LCJuYmYiOjE2MTk3MDQwMDQsImp0aSI6IlBNVEE5bWNvZGtBY1hmaU8iLCJzdWIiOjMsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.dwGelEZnFrvh8Y0KeDt1kIIe1l51F9EIGkCkGaxboE8' :
      hashedKey;

    requestBody["languages"] = (basicDetails.languages.length > 0) ?
      basicDetails.languages.map((lang) => lang.id) : [1];

    const formData = new FormData();
    formData.append("avatar", requestBody.avatar)
    formData.append("email", requestBody.email)
    formData.append("alt_mobile", requestBody.alt_mobile)
    formData.append("password", requestBody.password)
    formData.append("password_confirmation", requestBody.password_confirmation)
    formData.append("gender", requestBody.gender)
    formData.append("speciality_id", requestBody.speciality_id)
    formData.append("exp", requestBody.exp)
    formData.append("med_reg_no", requestBody.med_reg_no)
    formData.append("med_reg_year", requestBody.med_reg_year)
    formData.append("medical_council", requestBody.medical_council)
    for (var i = 0; i < (requestBody.languages).length; i++) {
      formData.append('languages[]', requestBody.languages[i]);
    }

    for (var i = 0; i < (requestBody.super_speciality_id).length; i++) {
      formData.append('super_speciality_ids[]', requestBody.super_speciality_id[i]);
    }

    await api.CORE_URI().post("profile/updateBasicInfo", formData,
      {
        headers: { Authorization: `Bearer ${hashedKeyValue}` },
        "Content-Type": "multipart/form-data"
      })
      .then((responseData) => {
        if (responseData.status === 200) {
          if ((responseData.data.success === true)) {
            submitBasicDocInfo(requestBody);
            handleNext();
          } else {
            setBasicDetailsError({
              ...responseData.data.errorMessage
            });
          }
        } else {
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: "Error while submitting the form",
            snackBarSeverity: "error",
          })
        }

      })
      .catch(() => {
        setSnackbarInfo({
          isSnackBarOpen: true,
          snackBarText: "Internal server error",
          snackBarSeverity: "error",
        })
      })
  }

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarInfo({
      isSnackBarOpen: false,
      snackBarText: "",
      snackBarSeverity: "success",
    })
  };

  return (
    <FormWrapper>
      <Grid container spacing={2} noValidate>
        <Grid item sm={12} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <DropZoneWrapper>
            <DropzoneArea
              name="avatar"
              acceptedFiles={['image/*']}
              onChange={(files) => handleInputChange(
                "avatar",
                (files[0]) ? files[0] : ""
              )
              }
              filesLimit={1}
              Icon={AddAPhoto}
            />
          </DropZoneWrapper>
          <label style={{ marginTop: 10 }}>Upload Profile Picture <span style={{ color: 'red' }}>*</span></label>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={basicDetails.email}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            required
            disabled={true}
            error={(Object.keys(basicDetailsErrors).length > 0) && (basicDetailsErrors["email"]) ? true : false}
            helperText={(Object.keys(basicDetailsErrors).length > 0) &&
              (basicDetailsErrors["email"]) ? basicDetailsErrors["email"][0] : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Alternate Phone"
            name="alt_mobile"
            type="number"
            onKeyDown={(e) => e.key === '.' && e.preventDefault()}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
            }}
            value={basicDetails.alt_mobile}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            error={(Object.keys(basicDetailsErrors).length > 0) && (basicDetailsErrors["alt_mobile"]) ? true : false}
            helperText={(Object.keys(basicDetailsErrors).length > 0) &&
              (basicDetailsErrors["alt_mobile"]) ? basicDetailsErrors["alt_mobile"][0] : ""}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              inputProps={{
                autocomplete: 'new-password',
                form: {
                  autocomplete: 'off',
                },
              }}
              value={basicDetails.password}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              error={(Object.keys(basicDetailsErrors).length > 0) && (basicDetailsErrors["password"]) ? true : false}
              helperText={(Object.keys(basicDetailsErrors).length > 0) &&
                (basicDetailsErrors["password"]) ? basicDetailsErrors["password"][0] : ""}
              required
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div>
            <TextField
              fullWidth
              label="Confirm Password"
              name="password_confirmation"
              type="password"
              value={basicDetails.password_confirmation}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              error={(Object.keys(basicDetailsErrors).length > 0) && (basicDetailsErrors["password_confirmation"]) ? true : false}
              helperText={(Object.keys(basicDetailsErrors).length > 0) &&
                (basicDetailsErrors["password_confirmation"]) ? basicDetailsErrors["password_confirmation"][0] : ""}
              required
            />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          error={(Object.keys(basicDetailsErrors).length > 0) && (basicDetailsErrors["gender"]) ? true : false}
        >
          <FormControl fullWidth required>
            <InputLabel>Gender</InputLabel>
            <Select
              value={basicDetails.gender}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              name="gender"
            >
              <MenuItem value="m">Male</MenuItem>
              <MenuItem value="f">Female</MenuItem>
              <MenuItem value="o">Other</MenuItem>
            </Select>
            <FormHelperText>
              {
                (Object.keys(basicDetailsErrors).length > 0) &&
                  (basicDetailsErrors["gender"]) ? basicDetailsErrors["gender"][0] : ""
              }
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LanguageWrapper>
            <Autocomplete
              fullWidth
              multiple
              id="languages"
              options={lang.length > 0 && lang}
              getOptionLabel={option => option.name}
              onChange={(event, newValue) => handleInputChange("languages", newValue)}
              renderTags={(value, getTagProps) => value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option.name}
                  size="small"
                  style={{ padding: 0, marginTop: 0, marginBottom: 0 }}
                  {...getTagProps({ index })}
                />
              ))
              }
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Consultation Languages" required />
              )}
            />
          </LanguageWrapper>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          error={(Object.keys(basicDetailsErrors).length > 0) && (basicDetailsErrors["speciality_id"]) ? true : false}
        >
          <FormControl fullWidth required>
            <InputLabel>Specialization</InputLabel>
            <Select
              value={basicDetails.speciality_id}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              name="speciality_id"
            >
              {
                specialization.map((sList) => {
                  return (
                    <MenuItem
                      value={sList.id}
                      key={`specialization-${sList.id}`}
                    >
                      {sList.name}
                    </MenuItem>
                  );
                })
              }
            </Select>
            <FormHelperText>
              {
                (Object.keys(basicDetailsErrors).length > 0) &&
                  (basicDetailsErrors["speciality_id"]) ? basicDetailsErrors["speciality_id"][0] : ""
              }
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          error={(Object.keys(basicDetailsErrors).length > 0) && (basicDetailsErrors["super_speciality_id"]) ? true : false}
        >
          {/* <FormControl fullWidth>
            <InputLabel>Super Specialization</InputLabel>
            <Select
              value={basicDetails.super_speciality_id}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              name="super_speciality_id"
              disabled={newSuperSpecialization.length <= 0}
            >
              {
                newSuperSpecialization.map((sSpecialization) => {
                  return (
                    <MenuItem
                      value={sSpecialization.super_specialization_id}
                      key={`superSpecializaiton-${sSpecialization.super_specialization_id}`}
                    >
                      {sSpecialization.super_specialization_name}
                    </MenuItem>
                  )
                })
              }
            </Select>
            <FormHelperText>
              {
                (Object.keys(basicDetailsErrors).length > 0) &&
                  (basicDetailsErrors["super_speciality_id"]) ? basicDetailsErrors["super_speciality_id"][0] : ""
              }
            </FormHelperText>
          </FormControl> */}
          <LanguageWrapper>
            {console.log(newSuperSpecialization)}
            <Autocomplete
              fullWidth
              ref={autoC} 
              multiple
              limitTags={1}
              name="super_speciality_id"
              id="languages"
              disabled={newSuperSpecialization.length <= 0}
              options={newSuperSpecialization}
              getOptionLabel={option => option.super_specialization_name}
              onChange={(event, newValue) => handleInputChange("super_speciality_id", newValue)}
              renderTags={(value, getTagProps) => value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option.super_specialization_name}
                  size="small"
                  style={{ padding: 0, marginTop: 0, marginBottom: 0 }}
                  {...getTagProps({ index })}
                />
              ))
              }
              renderInput={(params) => (
                <TextField {...params} variant="outlined" label="Super Specialization" required />
              )}
            />
            <FormHelperText>
              {
                (Object.keys(basicDetailsErrors).length > 0) &&
                  (basicDetailsErrors["super_speciality_id"]) ? basicDetailsErrors["super_speciality_id"][0] : ""
              }
            </FormHelperText>
          </LanguageWrapper>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
        >
          <TextField
            fullWidth
            select
            label="Experience"
            name="exp"
            value={basicDetails.exp}
            InputProps={{
              startAdornment: <InputAdornment position="start">Years</InputAdornment>,
            }}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            error={(Object.keys(basicDetailsErrors).length > 0) && (basicDetailsErrors["exp"]) ? true : false}
            helperText={(Object.keys(basicDetailsErrors).length > 0) &&
              (basicDetailsErrors["exp"]) ? basicDetailsErrors["exp"][0] : ""}
            required
          >
            {Experiences.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}{option.label == '10' ? '+' : ''}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Registration No"
            name="med_reg_no"
            type="number"
            onKeyDown={(e) => e.key === '.' && e.preventDefault()}
            value={basicDetails.med_reg_no}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            error={(Object.keys(basicDetailsErrors).length > 0) && (basicDetailsErrors["med_reg_no"]) ? true : false}
            helperText={(Object.keys(basicDetailsErrors).length > 0) &&
              (basicDetailsErrors["med_reg_no"]) ? basicDetailsErrors["med_reg_no"][0] : ""}
            required
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          error={(Object.keys(basicDetailsErrors).length > 0) && (basicDetailsErrors["med_reg_year"]) ? true : false}
        >
          {/* <FormControl fullWidth required>
            <InputLabel>Registration Year</InputLabel>
            <Select
              value={basicDetails.med_reg_year}
              onChange={(e) => handleInputChange(e.target.name, e.target.value)}
              name="med_reg_year"
            >
              <MenuItem value="2019">2019</MenuItem>
              <MenuItem value="2020">2020</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
            </Select>
            <FormHelperText>
              {
                (Object.keys(basicDetailsErrors).length > 0) &&
                  (basicDetailsErrors["med_reg_year"]) ? basicDetailsErrors["med_reg_year"][0] : ""
              }
            </FormHelperText>
          </FormControl> */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              views={["year"]}
              label="Registration Year"
              required
              value={selectedDate}
              disableFuture
              // value={basicDetails.med_reg_year}
              onChange={handleDateChange}
              // onChange={(e) => handleInputChange("med_reg_year", e.target.value)}
              fullWidth
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Medical Council"
            name="medical_council"
            value={basicDetails.medical_council}
            onChange={(e) => handleInputChange(e.target.name, e.target.value)}
            error={(Object.keys(basicDetailsErrors).length > 0) && (basicDetailsErrors["medical_council"]) ? true : false}
            helperText={(Object.keys(basicDetailsErrors).length > 0) &&
              (basicDetailsErrors["medical_council"]) ? basicDetailsErrors["medical_council"][0] : ""}
            required
          />
        </Grid>
      </Grid>
      <div
        style={{ display: 'flex', marginTop: 10, justifyContent: 'flex-end' }}
      >
        <Button
          variant="contained"
          disabled={isContinueButtonDisabled}
          color="primary"
          onClick={async () => await handleBasicDetailsSubmit()}
        >
          Continue
        </Button>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={snackBarInfo.isSnackBarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity={snackBarInfo.snackBarSeverity}
          onClose={handleSnackbarClose}
        >
          {snackBarInfo.snackBarText}
        </Alert>
      </Snackbar>
    </FormWrapper>
  );
};

BasicDetails.propTypes = {
  // classes: PropTypes.object.isRequired,
  masterData: PropTypes.any,
  superSpecializationStoreList: PropTypes.any,
  // intl: intlShape.isRequired,
  handleBack: PropTypes.any,
  handleNext: PropTypes.any,
  submitBasicDocInfo: PropTypes.any,
};

const mapStateToProps = state => {
  return {
    masterData: state.get("dashboardReducer").masterData,
    superSpecializationStoreList: state.get("dashboardReducer").superSpecialization,
    doctorRegInfo: state.get("authReducer").doctorRegInfo,
    basicDoctorInfo: state.get("authReducer").basicDoctorInfo,
    hashedKey: state.get("authReducer").hashedKey,
  }
}

export default connect(mapStateToProps, { submitBasicDocInfo })(BasicDetails);
