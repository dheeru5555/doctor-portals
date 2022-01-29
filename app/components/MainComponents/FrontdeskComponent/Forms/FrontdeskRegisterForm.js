import React, { useState, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import styled from 'styled-components';
import { DropzoneArea } from 'material-ui-dropzone';
import { AddAPhoto } from '@material-ui/icons';
import { connect } from "react-redux";
import { fetchAllClinics } from "../../../../redux/actions/profileActions";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Dropzone from 'react-dropzone';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const DropZoneWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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

function AddressForm(props) {

  const { frontDeskDetails, clinicDetails, handleInputChange,
    fetchAllClinics, masterData, cityList, imagesOrDocs, imageUrl, errorMessage } = props;
  const [selectedDate, setSelectedDate] = React.useState(frontDeskDetails.dob);

  const [img, setImg] = useState(null);
  const [files] = useState([]);

  React.useEffect(() => {
    if (clinicDetails === null) {
      fetchAllClinics();
    }
    if (Object.keys(errorMessage).length === 0) {

    }
  }, [errorMessage])

  let dropzoneRef;
  const acceptedFiles = ['image/*'];
  const fileSizeLimit = 100000;

  const imgPreview = img => {
    if (!img) { return null; }
    if (typeof img !== 'string' && img !== '') {
      return URL.createObjectURL(img);
    }
    return img;
  };

  const onDrop = (filesVal) => {
    let oldFiles = files;
    const filesLimit = 2;
    oldFiles = oldFiles.concat(filesVal);
    if (oldFiles.length > filesLimit) {
      console.log('Cannot upload more than ' + filesLimit + ' items.');
    } else {
      setImg(filesVal[0]);
    }
  };

  if (
    (clinicDetails === null) ||
    (masterData === null) ||
    (imagesOrDocs === null)
  ) {
    return null;
  } else {

    const renderClinicDetails = () => {
      return clinicDetails.map((clinic) => {
        return (
          <MenuItem
            key={`clinic-${clinic.id}`}
            value={clinic.id}
          >
            {clinic.name}
          </MenuItem>
        )
      });
    }

    const renderStates = () => {
      const { states } = masterData;

      return states.map((state) => {
        return (
          <MenuItem
            key={`state-${state.id}`}
            value={state.id}
          >
            {state.name}
          </MenuItem>
        )
      })
    }

    const renderCities = () => {
      if (cityList === null) {
        return null;
      } else {
        return cityList.map((city) => {
          return (
            <MenuItem
              key={`city-${city.id}`}
              value={city.id}
            >
              {city.name}
            </MenuItem>
          )
        });
      }

    }

    const handleDateChange = (date) => {
      handleInputChange("dob", date)
      setSelectedDate(date)
    }


    let fetchedImage = imagesOrDocs.receptionist_images_prefix_url + frontDeskDetails.avatar;
    return (
      <Grid container spacing={3}>
        <Grid item sm={12} style={{ textAlign: 'center' }}>
          {
            ((imageUrl !== null) &&
              (imageUrl !== undefined) &&
              (imageUrl !== '')) ? (
              <img src={fetchedImage} width="110" style={{ borderRadius: 16, width: 110, height: 110, objectFit: 'contain', border: '3px solid #f69ea4' }} />
            ) : (
              <DropZoneWrapper>
                <DropzoneArea
                  filesLimit={1}
                  Icon={AddAPhoto}
                  acceptedFiles={['image/*']}
                  onChange={(files) => handleInputChange(
                    "avatar",
                    (files[0]) ? files[0] : ""
                  )
                  }
                />
                <label style={{ marginTop: 10, textAlign: 'center' }}>Upload Profile Picture</label>
                <FormHelperText style={{ color: 'red' }}>{(Object.keys(errorMessage).length !== 0) && (errorMessage.avatar) ? errorMessage.avatar[0] : ''}</FormHelperText>
              </DropZoneWrapper>

            )
          }
          {/* <Dropzone
            // className={classes.hiddenDropzone}
            accept={acceptedFiles.join(',')}
            acceptClassName="stripes"
            onDrop={onDrop}
            maxSize={fileSizeLimit}
            ref={(node) => { dropzoneRef = node; }}
          >
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
              </div>
            )}
          </Dropzone>
          <div >
            <Avatar
              alt="Avatar"
              // className={classes.uploadAvatar}
              src={imgPreview('https://media.istockphoto.com/vectors/doctor-icon-vector-illustration-medical-doctor-vector-illustration-vector-id1223735381?k=20&m=1223735381&s=170667a&w=0&h=isPjVOHLkHJCX0mu3Kit4S12EkQuo6gs9Yshik_TfHk=')}
            />
            <Tooltip id="tooltip-upload">
              <IconButton
                // className={classes.buttonUpload}
                component="button"
                onClick={() => {
                  dropzoneRef.open();
                }}
              >
                <PhotoCamera />
              </IconButton>
            </Tooltip>
          </div> */}
        </Grid>
        <Grid item sm={2}>
          <FormControl required fullWidth error={(Object.keys(errorMessage).length !== 0) && (errorMessage.title)}>
            <InputLabel htmlFor="age-simple">Title</InputLabel>
            <Select
              value={frontDeskDetails.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            >
              <MenuItem value={"Mr"}>Mr</MenuItem>
              <MenuItem value={"Mrs"}>Mrs</MenuItem>
              <MenuItem value={"Miss"}>Miss</MenuItem>
            </Select>
            <FormHelperText>{(Object.keys(errorMessage).length !== 0) && (errorMessage.title) ? errorMessage.title[0] : ''}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item sm={4}>
          <TextField
            required
            id="Name"
            name="Name"
            label="First Name"
            fullWidth
            inputProps={{ maxLength: 30 }}
            error={(Object.keys(errorMessage).length !== 0) && (errorMessage.first_name)}
            helperText={(Object.keys(errorMessage).length !== 0) && (errorMessage.first_name) ? errorMessage.first_name[0] : ''}
            value={frontDeskDetails.first_name}
            onChange={(e) => handleInputChange("first_name", e.target.value)}
          />
        </Grid>
        <Grid item sm={6}>
          <TextField
            required
            id="Name"
            name="Name"
            label="Last Name"
            fullWidth
            inputProps={{ maxLength: 30 }}
            error={(Object.keys(errorMessage).length !== 0) && (errorMessage.last_name)}
            helperText={(Object.keys(errorMessage).length !== 0) && (errorMessage.last_name) ? errorMessage.last_name[0] : ''}
            value={frontDeskDetails.last_name}
            onChange={(e) => handleInputChange("last_name", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Email"
            name="Email"
            label="Frontdesk Email"
            fullWidth
            type="email"
            error={(Object.keys(errorMessage).length !== 0) && (errorMessage.email)}
            helperText={(Object.keys(errorMessage).length !== 0) && (errorMessage.email) ? errorMessage.email[0] : ''}
            value={frontDeskDetails.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Mobile"
            name="Mobile"
            label="Frontdesk Mobile"
            fullWidth
            type="number"
            onKeyDown={(e) => e.key === '.' && e.preventDefault()}
            value={frontDeskDetails.mobile}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
            }}
            error={(Object.keys(errorMessage).length !== 0) && (errorMessage.mobile)}
            helperText={(Object.keys(errorMessage).length !== 0) && (errorMessage.mobile) ? errorMessage.mobile[0] : ''}
            onChange={(e) => handleInputChange("mobile", e.target.value)}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <FormControl required fullWidth error={(Object.keys(errorMessage).length !== 0) && (errorMessage.clinic_id)}>
            <InputLabel htmlFor="age-simple">Localtion of Practise</InputLabel>
            <Select
              value={frontDeskDetails.clinic_id}
              onChange={(e) => handleInputChange("clinic_id", e.target.value)}
            >
              {renderClinicDetails()}
            </Select>
            <FormHelperText>{(Object.keys(errorMessage).length !== 0) && (errorMessage.clinic_id) ? errorMessage.clinic_id[0] : ''}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3} error={(Object.keys(errorMessage).length !== 0) && (errorMessage.gender)}>
          <FormControl required fullWidth>
            <InputLabel htmlFor="age-simple">Gender</InputLabel>
            <Select
              value={frontDeskDetails.gender}
              onChange={(e) => handleInputChange("gender", e.target.value)}
            >
              <MenuItem value={"m"}>Male</MenuItem>
              <MenuItem value={"f"}>Female</MenuItem>
              <MenuItem value={"o"}>Others</MenuItem>
            </Select>
            <FormHelperText>{(Object.keys(errorMessage).length !== 0) && (errorMessage.gender) ? errorMessage.gender[0] : ''}</FormHelperText>
          </FormControl>
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
            error={(Object.keys(errorMessage).length !== 0) && (errorMessage.marital_status)}
            helperText={(Object.keys(errorMessage).length !== 0) && (errorMessage.marital_status) ? errorMessage.marital_status[0] : ''}
            value={frontDeskDetails.marital_status}
            onChange={(e) => handleInputChange("marital_status", e.target.value)}
          >
            <MenuItem value={"s"}>Single</MenuItem>
            <MenuItem value={"m"}>Maried</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          {/* <TextField
            required
            id="DOB"
            name="DOB"
            label="Date of Birth"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            error={(Object.keys(errorMessage).length !== 0) && (errorMessage.dob)}
            helperText={(Object.keys(errorMessage).length !== 0) && (errorMessage.dob) ? errorMessage.dob[0] : ''}
            value={frontDeskDetails.dob}
            onChange={(e) => handleInputChange("dob", e.target.value)}
          /> */}
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              required
              fullWidth
              label="Date of Birth"
              // format="DD/MM/YYYY"
              disableFuture
              format="dd/MM/yyyy"
              placeholder="Select Date of Birth"
              name="dob"
              focused={frontDeskDetails.dob !== ''}
              mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
              value={frontDeskDetails.dob !== '' ? frontDeskDetails.dob : ''}
              onChange={handleDateChange}
              // maxDate={Date.now()}
              error={(Object.keys(errorMessage).length !== 0) && (errorMessage.dob)}
              helperText={(Object.keys(errorMessage).length !== 0) && (errorMessage.dob) ? errorMessage.dob[0] : ''}
              animateYearScrolling={false}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        {/* <Grid item xs={12} sm={1}>
            <TextField
              required
              id="Age"
              name="Age"
              label="Age"
              value="disabled"
              disabled
              autoComplete="email"
            />
          </Grid> */}
        <Grid item xs={6}>
          <TextField
            required
            id="outlined-multiline-static"
            label="Address"
            multiline
            rows="9"
            inputProps={{ maxLength: 250 }}
            fullWidth
            margin="normal"
            variant="outlined"
            error={(Object.keys(errorMessage).length !== 0) && (errorMessage.address)}
            helperText={(Object.keys(errorMessage).length !== 0) && (errorMessage.address) ? errorMessage.address[0] : ''}
            value={frontDeskDetails.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
          {/* <TextField
            required
            id="outlined-multiline-static"
            label="Flat No"
            // multiline
            // rows="9"
            fullWidth
            margin="normal"
            variant="outlined"
            name="flat_no"
            value={frontDeskDetails.flat_no}
            error={(Object.keys(errorMessage).length !== 0) && (errorMessage.flat_no)}
            helperText={(Object.keys(errorMessage).length !== 0) && (errorMessage.flat_no) ? errorMessage.flat_no[0] : ''}
            onChange={(e) => handleInputChange("flat_no", e.target.value)}
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
            value={frontDeskDetails.street_name}
            error={(Object.keys(errorMessage).length !== 0) && (errorMessage.street_name)}
            helperText={(Object.keys(errorMessage).length !== 0) && (errorMessage.street_name) ? errorMessage.street_name[0] : ''}
            onChange={(e) => handleInputChange("street_name", e.target.value)}
            inputProps={{ maxLength: 250 }}
            inputProps={{
              // autocomplete: 'new-password',
              form: {
                autocomplete: 'off',
              },
            }}
          /> */}
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
              error={(Object.keys(errorMessage).length !== 0) && (errorMessage.state_id)}
              helperText={(Object.keys(errorMessage).length !== 0) && (errorMessage.state_id) ? errorMessage.state_id[0] : ''}
              value={frontDeskDetails.state_id}
              onChange={(e) => handleInputChange("state_id", e.target.value)}
            >
              {renderStates()}
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
              error={(Object.keys(errorMessage).length !== 0) && (errorMessage.city_id)}
              helperText={(Object.keys(errorMessage).length !== 0) && (errorMessage.city_id) ? errorMessage.city_id[0] : ''}
              disabled={(cityList === null) ? true : false}
              value={frontDeskDetails.city_id}
              onChange={(e) => handleInputChange("city_id", e.target.value)}
            >
              {renderCities()}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="zip"
              name="zip"
              label="Zip / Postal Code"
              fullWidth
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
              }}
              onKeyDown={(e) => e.key === '.' && e.preventDefault()}
              type="number"
              error={(Object.keys(errorMessage).length !== 0) && (errorMessage.pincode)}
              helperText={(Object.keys(errorMessage).length !== 0) && (errorMessage.pincode) ? errorMessage.pincode[0] : ''}
              value={frontDeskDetails.pincode}
              onChange={(e) => handleInputChange("pincode", e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }

}

const mapStateToProps = state => {
  return {
    clinicDetails: state.get("profileReducer").clinicDetails,
    imagesOrDocs: state.get("dashboardReducer").imagesOrDocs,
  }
}

export default connect(mapStateToProps, { fetchAllClinics })(AddressForm);
