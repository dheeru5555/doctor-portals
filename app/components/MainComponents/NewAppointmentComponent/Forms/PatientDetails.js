import React, { Fragment, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import styled from 'styled-components';
import { DropzoneArea } from 'material-ui-dropzone';
import { AddAPhoto } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCityData, setCityData } from 'enl-redux/actions/dashboardActions';
import { createPatient, createPatientResponsReset } from 'enl-redux/actions/newAppointmentAction';
import AddMedicalHistory from '../MedicalHistory/AddMedicalHistory';
import helper from '../../../../helpers/helpers';
import { DatePicker, MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import InputAdornment from '@material-ui/core/InputAdornment';

const DropZoneWrapper = styled.div`
  .MuiDropzoneArea-root {
    width: 90px;
    height: 90px;
    min-height: 90px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #f69ea4;
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
    top: 0;
    right: 30px;
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

const HeightWrapper = styled('div')`
  .MuiInput-root {
    border: 0;
  }
  .MuiInput-underline:after {
    box-shadow: none;
    border-bottom: none;
  }
  .MuiInputAdornment-positionStart {
    padding-right: 0;
    margin-right: 0
  }
  input {
    padding-left: 0 !important
  }
`;


function AddressForm({ classes, handleNext }) {
  var today = new Date();
  // el_up.innerHTML = today;
  var dd = today.getDate();
  var mm = today.getMonth() + 1;

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  today = yyyy + '-' + mm + '-' + dd;

  const defultState = {
    fields: {
      title: '',
      first_name: '',
      last_name: '',
      email: '',
      mobile: '',
      address: '',
      flat_no: '',
      street_name: '',
      city_id: '',
      state_id: '',
      gender: '',
      pincode: '',
      marital_status: '',
      dob: '',
      weight: '',
      height: '',
      blood_group_id: '',
      avatar: null
    },
    errors: {
      title: '',
      first_name: '',
      last_name: '',
      email: '',
      mobile: '',
      address: '',
      flat_no: '',
      street_name: '',
      city_id: '',
      state_id: '',
      gender: '',
      pincode: '',
      marital_status: '',
      dob: '',
      weight: '',
      height: '',
      blood_group_id: '',
      avatar: null,
    }
  };

  const [state, setState] = useState(defultState);
  const [ageInfo, setAgeInfo] = useState({
    age: 0,
    dob: ''
  });
  const dispatch = useDispatch();
  const selectState = useSelector((state) => state.toJS());
  const { dashboardReducer, newAppointmentReducer } = selectState;
  const { masterData, cityData } = dashboardReducer;
  const { createPatientRespons } = newAppointmentReducer;
  const [stateList, setStateList] = useState([]);
  const [blooodGroup, setBlooodGroup] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [medicalHistory, setMedicalHistory] = useState([]);
  const [ft, setFt] = useState(0);
  const [inch, setInch] = useState(0);


  useEffect(() => {
    if (masterData != null) {
      setStateList(masterData.states);
      setBlooodGroup(masterData.bloodGroups);
    }
  }, [dashboardReducer]);


  useEffect(() => {
    if (createPatientRespons != null) {
      if (!createPatientRespons.success) {
        if (createPatientRespons.errors) {
          const errorsPatient = createPatientRespons.errors;
          const { fields, errors } = state;
          for (const key in errorsPatient) {
            const invalid_message = errorsPatient[key];
            errors[key] = invalid_message[0];
          }
          setState({ fields, errors });
        } else {
          alert(createPatientRespons.message);
        }
      } else {
        setState(defultState);
        handleNext(1);
      }
    }
  }, [createPatientRespons]);

  useEffect(() => {
    if (cityData != null) {
      setCityList(cityData);
    }
  }, [cityData]);

  const validateForm = (fields, filed_name) => {
    let validate = true;
    const { errors } = state;
    const validEmailRejx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkIntiger = /^\d+$/;
    const checkNumber = /^([,|.]?[0-9])+$/;


    switch (filed_name) {
      // case 'avatar':
      //   if (fields.avatar == null) {
      //     errors.avatar = 'Please Upload Profile Picture';
      //     validate = false;
      //   } else {
      //     errors.avatar = '';
      //   }
      //   break;
      case 'title':
        if (fields.title == '') {
          errors.title = 'Select your title';
          validate = false;
        } else {
          errors.title = '';
        }
        break;

      case 'first_name':
        if (fields.first_name == '') {
          errors.first_name = 'Enter your first name';
          validate = false;
        } else {
          errors.first_name = '';
        }
        break;
      case 'last_name':
        if (fields.last_name == '') {
          errors.last_name = 'Enter your last name';
          validate = false;
        } else {
          errors.last_name = '';
        }
        break;

      // case 'email':
      //   if (fields.email == '') {
      //     errors.email = 'Enter your email address';
      //     validate = false;
      //   } else if (!validEmailRejx.test(fields.email)) {
      //     errors.email = 'Enter valid email address';
      //   } else {
      //     errors.email = '';
      //   }
      //   break;

      case 'mobile':
        if (fields.mobile == '') {
          errors.mobile = 'Enter your mobile number';
          validate = false;
        } else if (!checkIntiger.test(fields.mobile)) {
          errors.mobile = 'Mobile number should be a number not string';
        } else if (fields.mobile.length != 10) {
          errors.mobile = 'Mobile number should be 10 digits';
        } else {
          errors.mobile = '';
        }
        break;


      case 'clinic_id':
        if (fields.clinic_id == '') {
          errors.clinic_id = 'Select your clinc';
          validate = false;
        } else {
          errors.clinic_id = '';
        }
        break;


      case 'gender':
        if (fields.gender == '') {
          errors.gender = 'Select gender';
          validate = false;
        } else {
          errors.gender = '';
        }
        break;

      // case 'marital_status':
      //   if (fields.marital_status == '') {
      //     errors.marital_status = 'Select your marital status';
      //     validate = false;
      //   } else {
      //     errors.marital_status = '';
      //   }
      //   break;


      case 'dob':
        if (fields.dob == '') {
          errors.dob = 'Select your date of birth';
          validate = false;
        } else {
          errors.dob = '';
        }
        break;


      case 'weight':
        if (fields.weight == '') {
          errors.weight = 'Enter your weight';
          validate = false;
        } else if (!checkNumber.test(fields.weight)) {
          errors.weight = 'Enter corect wegiht';
          validate = false;
        } else {
          errors.weight = '';
        }
        break;

      case 'height':
        if (fields.height == '') {
          errors.height = 'Enter your height';
          validate = false;
        } else if (!checkNumber.test(fields.height)) {
          errors.height = 'Enter corect height';
          validate = false;
        }
        else {
          errors.height = '';
        }
        break;


      case 'blood_group_id':
        if (fields.blood_group_id == '') {
          errors.blood_group_id = 'Select your blood group';
          validate = false;
        } else {
          errors.blood_group_id = '';
        }
        break;

      case 'address':
        if (fields.address == '') {
          errors.address = 'Enter your address';
          validate = false;
        } else {
          errors.address = '';
        }
        break;
      case 'flat_no':
        if (fields.flat_no == '') {
          errors.flat_no = 'Enter your Flat No';
          validate = false;
        } else {
          errors.flat_no = '';
        }
        break;
      case 'street_name':
        if (fields.street_name == '') {
          errors.street_name = 'Enter your Street Name';
          validate = false;
        } else {
          errors.street_name = '';
        }
        break;

      case 'city_id':
        if (fields.city_id == '') {
          errors.city_id = 'Select your city';
          validate = false;
        } else {
          errors.city_id = '';
        }
        break;

      case 'state_id':
        if (fields.state_id == '') {
          errors.state_id = 'Select your state';
          validate = false;
        } else {
          errors.state_id = '';
        }
        break;

      case 'pincode':
        if (fields.pincode == '') {
          errors.pincode = 'Enter your postal code';
          validate = false;
        } else if (!checkIntiger.test(fields.pincode)) {
          errors.pincode = 'Enter corect postal code';
          validate = false;
        } else if (fields.pincode.length != 6) {
          errors.pincode = 'postal code mode be 6 digits';
          validate = false;
        } else {
          errors.pincode = '';
        }
        break;
    }
    setState({ fields, errors });
    return validate;
  };

  const updateCity = async (state_id) => {
    await setCityList([]);
    await dispatch(setCityData());
    await dispatch(fetchCityData(state_id));
  };

  const heightInCm = () => {
    const { fields, errors } = state;
    let height = (ft * 30.48) + (inch * 2.54)
    let filabel = { ...fields };
    filabel = { ...fields, ['height']: height };
    validateForm(filabel, name);
    return height
  }

  React.useEffect(() => {
    heightInCm()
  }, [ft, inch])

  const handleChange = (event) => {
    const { name, value } = event.target;
    const { fields, errors } = state;
    let filabel = { ...fields };
    if (name == 'state_id') {
      updateCity(value);
      filabel = { ...fields, [name]: value, city_id: '' };
    } else if (name == 'dob') {
      filabel = { ...fields, [name]: value };
      setAge(helper.getAge(value));
    } else if (name == 'ft') {
      if (parseInt(value) > 11) {
        errors.height = 'Feets should not be greater than 11';
        setFt(0)
      } else {
        errors.height = '';
        setFt(value)
      }
    } else if (name == 'in') {
      if (parseInt(value) > 11) {
        errors.height = 'Inch should not be greater than 11';
        setInch(0)
      } else {
        errors.height = '';
        setInch(value)
      }
    } else {
      filabel = { ...fields, [name]: value };
    }
    validateForm(filabel, name);
  };



  const handleDateChange = (date) => {
    const format_date = date.format('YYYY-MM-DD');
    const { fields, errors } = state;
    let filabel = { ...fields };
    filabel = { ...fields, dob: format_date };
    setAgeInfo({ dob: date, age: helper.getAge(format_date) });
    validateForm(filabel, 'dob');
  }


  const fileUploade = (file) => {
    const { fields, errors } = state;
    const flage = {
      ...fields,
      avatar: file[0]
    };
    setState({ fields: flage, errors });
  };

  const submitvalidate = () => {
    const { fields } = state;
    let validate = true;
    for (const key in fields) {
      if (!validateForm(fields, key)) {
        validate = false;
      }
    }
    return validate;
  };

  const buildFormData = (formData, data, parentKey) => {
    if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File)) {
      Object.keys(data).forEach(key => {
        buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
      });
    } else {
      const value = data == null ? '' : data;
      formData.append(parentKey, value);
    }
  };

  const jsonToFormData = (data) => {
    const formData = new FormData();
    buildFormData(formData, data);
    return formData;
  };


  const addNewPatient = async () => {
    if (submitvalidate()) {
      const { fields, errors } = state;
      const submitData = jsonToFormData(fields);
      await dispatch(createPatient(submitData, medicalHistory));
      // await dispatch(createPatientResponsReset());
      // setState(defultState);
      // handleNext(1)
    }
  };

  const createDate = () => {
    var date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return date;
  }

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item sm={12} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <DropZoneWrapper>
            <DropzoneArea
              acceptedFiles={['image/*']}
              onChange={(files) => fileUploade(files)}
              filesLimit="1"
              Icon={AddAPhoto}
            />
          </DropZoneWrapper>
          <label style={{ marginTop: 10 }}>Upload Profile Picture</label>
          <small style={{ color: 'red' }}>{(state.errors.avatar != null && state.errors.avatar)}</small>
        </Grid>

        <Grid item sm={2}>
          <TextField
            required
            id="outlined-select-currency"
            select
            label="Title"
            fullWidth
            margin="normal"
            variant="outlined"
            name="title"
            onChange={handleChange}
            value={state.fields.title}
            error={(state.errors.title != '')}
            helperText={state.errors.title}
          >
            <MenuItem value="Mr">Mr</MenuItem>
            <MenuItem value="Mrs">Mrs</MenuItem>
            <MenuItem value="Miss">Miss</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={4}>
          <TextField
            required
            id="firstName"
            name="first_name"
            label="First Name"
            value={state.fields.first_name}
            error={(state.errors.first_name != '')}
            helperText={state.errors.first_name}
            onChange={handleChange}
            fullWidth
          // autoComplete="off"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            id="lastName"
            label="Last Name"
            name="last_name"
            onChange={handleChange}
            value={state.fields.last_name}
            error={(state.errors.last_name != '')}
            helperText={state.errors.last_name}
            fullWidth
          // autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            // required
            id="Email"
            name="email"
            label="Email"
            onChange={handleChange}
            value={state.fields.email}
            error={(state.errors.email != '')}
            helperText={state.errors.email}
            fullWidth
          // autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Mobile"
            name="mobile"
            label="Mobile Number"
            onKeyDown={(e) => e.key === '.' && e.preventDefault()}
            type="number"
            fullWidth
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
            }}
            value={state.fields.mobile}
            error={(state.errors.mobile != '')}
            helperText={state.errors.mobile}
            onChange={handleChange}
          // autoComplete="off"
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="outlined-select-currency"
            select
            label="Gender"
            fullWidth
            margin="normal"
            variant="outlined"
            name="gender"
            value={state.fields.gender}
            error={(state.errors.gender != '')}
            helperText={state.errors.gender}
            onChange={handleChange}
          >
            <MenuItem value="m"> Male</MenuItem>
            <MenuItem value="f">Female</MenuItem>
            <MenuItem value="o">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            // required
            id="outlined-select-currency"
            select
            label="Marital Status"
            fullWidth
            margin="normal"
            variant="outlined"
            name="marital_status"
            onChange={handleChange}
            value={state.fields.marital_status}
            error={(state.errors.marital_status != '')}
            helperText={state.errors.marital_status}
          >
            <MenuItem value="s">Single</MenuItem>
            <MenuItem value="m">Maried</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          {/* <TextField
            name="dob"
            label="Date of Birth"
            defaultValue={Date.now()}
            onChange={handleChange}
            type="date"
            value={state.fields.dob}
            error={(state.errors.dob != '')}
            helperText={state.errors.dob}
            fullWidth
          /> */}
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
              required
              fullWidth
              label="Date of Birth"
              format="DD/MM/YYYY"
              placeholder="Select Date of Birth"
              name="dob"
              focused={ageInfo.dob !== ''}
              mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
              value={ageInfo.dob !== '' ? ageInfo.dob : ''}
              onChange={handleDateChange}
              maxDate={createDate()}
              error={(state.errors.dob != '')}
              helperText={state.errors.dob ? state.errors.dob : 'Min Age should be 18+'}
              animateYearScrolling={false}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            id="Age"
            name="Age"
            label="Age"
            value={ageInfo.age}
            disabled
          // autoComplete="email"
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            required
            label="Weight"
            id="standard-start-adornment"
            fullWidth
            // margin="normal"
            type="number"
            name="weight"
            value={state.fields.weight}
            error={(state.errors.weight != '')}
            helperText={state.errors.weight}
            onChange={handleChange}
            // autoComplete="off"
            // className={clsx(classes.margin, classes.textField)}
            InputProps={{
              startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3} style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          <TextField
            required
            label="Height"
            fullWidth
            // margin="normal"
            type="number"
            onKeyDown={(e) => e.key === '.' && e.preventDefault()}
            name="ft"
            value={ft == 0 ? '' : ft}
            error={(state.errors.height != '')}
            helperText={state.errors.height}
            onChange={handleChange}
            // className={clsx(classes.margin, classes.textField)}
            id="standard-start-adornment"
            InputProps={{
              startAdornment: <InputAdornment position="start">ft</InputAdornment>,
            }}
          />
          <HeightWrapper>
            <TextField
              label=" "
              type="number"
              onKeyDown={(e) => e.key === '.' && e.preventDefault()}
              style={{ width: '47%', position: 'absolute', right: 8 }}
              name="in"
              value={inch == 0 ? '' : inch}
              onChange={handleChange}
              id="standard-start-adornment"
              InputProps={{
                startAdornment: <InputAdornment position="start">inch</InputAdornment>,
              }}
              max={1}
            />
          </HeightWrapper>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            required
            label="Height"
            fullWidth
            disabled
            type="number"
            name="height"
            value={Math.floor((ft * 30.48) + (inch * 2.54))}
            error={(state.errors.height != '')}
            // helperText={state.errors.height}
            onChange={handleChange}
            id="standard-start-adornment"
            InputProps={{
              startAdornment: <InputAdornment position="start">cm</InputAdornment>,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="outlined-select-currency"
            select
            label="Blood Group"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            name="blood_group_id"
            value={state.fields.blood_group_id}
            error={(state.errors.blood_group_id != '')}
            helperText={state.errors.blood_group_id}
          >
            {
              blooodGroup.map((blood) => (<MenuItem key={blood.id} value={blood.id}>{blood.name}</MenuItem>))
            }

          </TextField>
        </Grid>


        <Grid item xs={6}>
          <TextField
            required
            id="outlined-multiline-static"
            label="Address"
            // multiline
            // rows="9"
            fullWidth
            margin="normal"
            variant="outlined"
            name="address"
            value={state.fields.address}
            error={(state.errors.address != '')}
            helperText={state.errors.address}
            onChange={handleChange}
            inputProps={{ maxLength: 250 }}
            inputProps={{
              // autocomplete: 'new-password',
              form: {
                autocomplete: 'off',
              },
            }}
          />
          <TextField
            required
            id="outlined-multiline-static"
            label="Flat No"
            // multiline
            // rows="9"
            fullWidth
            margin="normal"
            variant="outlined"
            name="flat_no"
            value={state.fields.flat_no}
            error={(state.errors.flat_no != '')}
            helperText={state.errors.flat_no}
            onChange={handleChange}
            inputProps={{ maxLength: 250 }}
            inputProps={{
              // autocomplete: 'new-password',
              form: {
                autocomplete: 'off',
              },
            }}
          />
          <TextField
            required
            id="outlined-multiline-static"
            label="Street Name"
            // multiline
            // rows="9"
            fullWidth
            margin="normal"
            variant="outlined"
            name="street_name"
            value={state.fields.street_name}
            error={(state.errors.street_name != '')}
            helperText={state.errors.street_name}
            onChange={handleChange}
            inputProps={{ maxLength: 250 }}
            inputProps={{
              // autocomplete: 'new-password',
              form: {
                autocomplete: 'off',
              },
            }}
          />
        </Grid>
        <Grid item xs={6} sm={6}>

          <Grid item xs={12}>
            <TextField
              required
              id="outlined-select-currency"
              select
              label="State"
              fullWidth
              margin="normal"
              variant="outlined"
              name="state_id"
              value={state.fields.state_id}
              error={(state.errors.state_id != '')}
              helperText={state.errors.state_id}
              onChange={handleChange}
            >
              {
                stateList.map((state) => (<MenuItem key={state.id} value={state.id}>{state.name}</MenuItem>))
              }
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="outlined-select-currency"
              select
              label="City"
              fullWidth
              margin="normal"
              variant="outlined"
              name="city_id"
              value={state.fields.city_id}
              error={(state.errors.city_id != '')}
              helperText={state.errors.city_id}
              onChange={handleChange}
            >
              {
                cityList.map((city) => (<MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>))
              }
            </TextField>
          </Grid>


          <Grid item xs={12}>
            <TextField
              required
              id="zip"
              name="pincode"
              label="Zip / Postal Code"
              fullWidth
              type="number"
              onKeyDown={(e) => e.key === '.' && e.preventDefault()}
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
              }}
              value={state.fields.pincode}
              error={(state.errors.pincode != '')}
              helperText={state.errors.pincode}
              onChange={handleChange}
              inputProps={{
                // autocomplete: 'new-password',
                form: {
                  autocomplete: 'off',
                },
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="button">Medical History : </Typography>
          <AddMedicalHistory saveMedicalHistory={setMedicalHistory} />
        </Grid>
      </Grid>
      <div className={classes.stepperBtn}>
        {/* <Button disabled>Back</Button> */}
        <Button
          variant="contained"
          color="primary"
          onClick={addNewPatient}
        >
          {' '}
          Save & Continue
        </Button>
      </div>
    </Fragment>
  );
}

export default AddressForm;
