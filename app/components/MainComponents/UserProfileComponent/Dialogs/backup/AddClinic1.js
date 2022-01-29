import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import flag from 'enl-images/flag-lang.png';
import InputLabel from '@material-ui/core/InputLabel';
import { DropzoneArea } from 'material-ui-dropzone';
import styled from 'styled-components';
import { compose } from 'recompose';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from 'react-google-maps';
import { connect } from "react-redux";
import Loading from 'enl-components/Loading';
import { fetchSingleClinicData, fetchAllClinics, resetClinicData } from "../../../../redux/actions/profileActions";
import { fetchCityData } from "../../../../redux/actions/dashboardActions";
import API from "../../../../helpers/api";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import FormHelperText from '@material-ui/core/FormHelperText';

// Styled component named StyledButton
const DropZoneWrapper = styled.div`
.MuiDropzoneArea-root {
    width: 110px;
    height: 110px;
    min-height: 110px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #f69ea4;
    margin-left: auto;
    margin-right: auto;
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
    top: 50%;
    left: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
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
    height: 110px;
  }
`;

const FormControlWrapper = styled.div`
    #address-helper-text {
        color: gold;
    }
`;

// initialization
const api = new API();

const MapWithAMarker = compose(
    withScriptjs,
    withGoogleMap
)((props) => (
    <GoogleMap
        {...props}
        key={new Date().getTime()}
        defaultZoom={8}
        defaultCenter={{ lat: props.latData, lng: props.lngData, }}
    >
        <Marker position={{
            lat: props.latData,
            lng: props.lngData,
        }}
        />
    </GoogleMap>
));


const flagIcon = {
    width: 16,
    height: 16,
    borderRadius: '50%',
    display: 'inline-block',
    position: 'relative',
    marginRight: 5,
    top: 1,
    background: `url(${flag}) no-repeat transparent`,
    backgroundSize: '16px auto',
    '&[class="ar"]': {
        backgroundPosition: '0 3px'
    },
    '&[class="zh"]': {
        backgroundPosition: '0 -12px'
    },
    '&[class="en"]': {
        backgroundPosition: '0 -28px'
    },
    '&[class="de"]': {
        backgroundPosition: '0 -44px'
    },
    '&[class="id"]': {
        backgroundPosition: '0 -62px'
    },
    '&[class="es"]': {
        backgroundPosition: '0 -79px'
    },
};

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    actionButtons: {
        color: '#000000a3',
        backgroundColor: '#e0e0e0',
        margin: theme.spacing(1),
    },
    header: {
        display: 'flex',
        alignItems: 'center'
    },
    rightPanelTitle: {
        padding: '15px 0px',
        border: '1px solid #dedede',
        background: '#fff',
        marginTop: 58
    },
    title: {
        padding: '15px 10px'
    },
    rightPanel: {
        padding: '15px 20px',
    },
    customButton: {
        justifyContent: 'space-between',
        padding: '15px 0px',
        '&:hover': {
            background: 'inherit',
        }
    },
    textField: {
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: 'white'
    },
    inputLang: {
        maxWidth: 260,
        background: 'white',
        border: 'none',
        paddingBottom: 5,
        '& i': {
            ...flagIcon
        }
    },
    formControl: {
        width: '100%'
    },
    buttonIcon: {
        fontSize: '1rem !important',
        marginRight: 5
    },
    title: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 30,
        '& h6': {
            margin: 0,
            color: 'lightcoral',
            fontSize: '1em'
        },
        '& small': {
            color: 'gray',
            fontSize: '70%'
        }
    },
    clinicButton: {
        margin: 20
    },
    dropLabel: {
        // width: 110,
        textAlign: 'center',
        display: 'block',
        fontWeight: 600,
        color: '#b7b7b7',
        fontSize: 12,
        marginBottom: 16
    },
    image: {
        width: 110,
        height: 110,
        objectFit: 'contain',
        border: '3px solid #9ef6a1',
        marginRight: 'auto',
        marginLeft: 'auto',
        borderRadius: 16,
        display: 'flex',
        '&:hover': {
            // opacity: 0.6,
            cursor: 'pointer',
        }
    },
    uploadCont: {
        position: 'relative'
    },
    updateImage: {
        position: 'absolute',
        left: '50%',
        top: '40%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#f69ea480',
        '&:hover': {
            backgroundColor: '#f69ea480'
        }
    },
    uploadAvatar: {
        width: 110,
        height: 110,
        background: '#f5f5f5',
        borderRadius: 8
    },
    buttonUpload: {
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)'
    },
    avatarWrap: {
        width: 'fit-content',
        position: 'relative'
    }
});

const DialogTitle = withStyles(styles)((props) => {
    const {
        children, classes, clinicId, onClose, ...other
    } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <div className={classes.header}>
                {onClose ? (
                    <Button aria-label="close" className={classes.textWhite} onClick={onClose}>
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                ) : null}
                <div className={classes.title}>
                    {(clinicId !== null) ? (
                        <h6>Edit Clinic</h6>
                    ) : (
                        <h6>Add Clinic</h6>
                    )}
                    <small>Fill below details to add/edit Clinic</small>
                </div>
            </div>
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        background: '#f5f5f5'
    },
}))(MuiDialogContent);

function AddClinicDialog(props) {
    const { classes, clinicId, fetchAllClinics, imagesOrDocs,
        singleCLinicDetails, masterData, cityData, closeAddEditModal } = props;

    let isAdd  = clinicId !== null ? true : false;
    const [snackBarInfo, setSnackbarInfo] = useState({
        isSnackBarOpen: false,
        snackBarText: "",
        snackBarSeverity: "success",
    });

    const [addClinicState, setAddClinicState] = React.useState({
        name: "",
        phones: "",
        google_map_url: "",
        latitude: 17.4126274,
        longitude: 78.2679571,
        address: "",
        pincode: "",
        state_id: "",
        city_id: "",
        logo: '',
        doctor_signature: '',
        header_image: '',
        footer_image: '',
        photos: [],
    });
    const [errorMessages, setErrorMessages] = React.useState(null);

    useEffect(() => {
        props.fetchSingleClinicData(clinicId);
    }, [clinicId]);

    useEffect(() => {
        setAddClinicState({
            name: ((singleCLinicDetails !== null) && singleCLinicDetails.name && (singleCLinicDetails.name !== null)) ?
                singleCLinicDetails.name : "",
            phones: ((singleCLinicDetails !== null) && singleCLinicDetails.phones && (singleCLinicDetails.phones !== null)) ?
                singleCLinicDetails.phones : "",
            google_map_url: ((singleCLinicDetails !== null) && singleCLinicDetails.google_map_url && (singleCLinicDetails.google_map_url !== null)) ?
                singleCLinicDetails.google_map_url : "",
            latitude: ((singleCLinicDetails !== null) && singleCLinicDetails.latitude && (singleCLinicDetails.latitude !== null)) ?
                singleCLinicDetails.latitude : 17.4126274,
            longitude: ((singleCLinicDetails !== null) && singleCLinicDetails.longitude && (singleCLinicDetails.longitude !== null)) ?
                singleCLinicDetails.longitude : 78.2679571,
            address: ((singleCLinicDetails !== null) && singleCLinicDetails.address && (singleCLinicDetails.address !== null)) ?
                singleCLinicDetails.address : "",
            pincode: ((singleCLinicDetails !== null) && singleCLinicDetails.pincode && (singleCLinicDetails.pincode !== null)) ?
                singleCLinicDetails.pincode : "",
            state_id: ((singleCLinicDetails !== null) && singleCLinicDetails.state_id && (singleCLinicDetails.state_id !== null)) ?
                singleCLinicDetails.state_id : "",
            city_id: ((singleCLinicDetails !== null) && singleCLinicDetails.city_id && (singleCLinicDetails.city_id !== null)) ?
                singleCLinicDetails.city_id : "",
            logo: ((singleCLinicDetails !== null) && singleCLinicDetails.logo && (singleCLinicDetails.logo !== null)) ?
                singleCLinicDetails.logo : "",
            doctor_signature: ((singleCLinicDetails !== null) && singleCLinicDetails.doctor_signature && (singleCLinicDetails.doctor_signature !== null)) ?
                singleCLinicDetails.doctor_signature : "",
            header_image: ((singleCLinicDetails !== null) && singleCLinicDetails.header_image && (singleCLinicDetails.header_image !== null)) ?
                singleCLinicDetails.header_image : "",
            footer_image: ((singleCLinicDetails !== null) && singleCLinicDetails.footer_image && (singleCLinicDetails.footer_image !== null)) ?
                singleCLinicDetails.footer_image : "",
            photos: ((singleCLinicDetails !== null) && singleCLinicDetails.photos_array && (singleCLinicDetails.photos_array !== null) && (singleCLinicDetails.photos_array.length > 0)) ?
                singleCLinicDetails.photos_array : [],
        });

        if (singleCLinicDetails !== null && singleCLinicDetails.state_id) {
            props.fetchCityData(singleCLinicDetails.state_id)
        }
    }, [singleCLinicDetails])

    useEffect(() => {
        if (addClinicState.state_id && (addClinicState.state_id !== "")) {
            props.fetchCityData(addClinicState.state_id);
        }
    }, [])

    if ((clinicId !== null) && (singleCLinicDetails === null) && (masterData !== null) && (cityData !== null)) {
        return <Loading />;
    }

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    const handleClose = () => {
        closeAddEditModal()
    };

    const renderStates = () => {

        if (masterData && (masterData !== null) && (masterData.states.length > 0)) {

            const { states } = masterData;

            return states.map((state) => {
                return (
                    <option value={state.id} key={state.id}>
                        {state.name}
                    </option>
                )
            });
        }
    }

    const renderCities = () => {

        if (cityData && (cityData !== null) && (cityData.length > 0)) {
            return cityData.map((city) => {
                return (
                    <option value={city.id} key={city.id}>
                        {city.name}
                    </option>
                )
            });
        }
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

    const handleSelectDropdown = (event) => {
        const intermediateClinicData = { ...addClinicState };
        intermediateClinicData[event.target.name] = event.target.value;
        setAddClinicState(intermediateClinicData)
    }

    const handleAddClinic = (event) => {
        const intermediateClinicData = { ...addClinicState };

        if ((errorMessages !== null) && (errorMessages[event.target.id])) {
            const intermediateErrorMessages = { ...errorMessages };
            delete intermediateErrorMessages[event.target.id];
            setErrorMessages(intermediateErrorMessages);
        }

        if (
            (event.target.name === "mapLink") &&
            (event.target.value.length > 0)
        ) {
            const splitMapUrl = event.target.value.split("@")[1];
            if (splitMapUrl) {
                const [lat, lng] = splitMapUrl.split(",");
                if (lat && lng) {
                    intermediateClinicData["latitude"] = parseFloat(lat);
                    intermediateClinicData["longitude"] = parseFloat(lng);
                }

            }
            intermediateClinicData[event.target.id] = event.target.value;
        } else {
            intermediateClinicData[event.target.id] = event.target.value;
        }

        setAddClinicState(intermediateClinicData)
    }

    const handleAddClinicSubmit = async () => {

        if (clinicId !== null) {
            const formData = new FormData();
            formData.append("name", addClinicState.name)
            formData.append("phones", addClinicState.phones)
            formData.append("google_map_url", addClinicState.google_map_url)
            formData.append("latitude", addClinicState.latitude)
            formData.append("longitude", addClinicState.longitude)
            formData.append("address", addClinicState.address)
            formData.append("pincode", addClinicState.pincode)
            formData.append("state_id", addClinicState.state_id)
            formData.append("city_id", addClinicState.city_id)
            formData.append("cr_id", localStorage.getItem('cr_id'))

            setRenderClinicState(addClinicState)

            if (
                (singleCLinicDetails === null) ||
                (singleCLinicDetails.logo === 0)
            ) {
                formData.append("logo", addClinicState.logo)
            }

            if (
                (singleCLinicDetails === null) ||
                (singleCLinicDetails.doctor_signature === 0)
            ) {
                formData.append("doctor_signature", addClinicState.doctor_signature)
            }

            if (
                (singleCLinicDetails === null) ||
                (singleCLinicDetails.header_image === 0)
            ) {
                formData.append("header_image", addClinicState.header_image)
            }

            if (
                (singleCLinicDetails === null) ||
                (singleCLinicDetails.footer_image === 0)
            ) {
                formData.append("footer_image", addClinicState.footer_image)
            }

            if (
                (singleCLinicDetails === null) ||
                (singleCLinicDetails.photos === null) ||
                (singleCLinicDetails.photos.length === 0)
            ) {
                for (var i = 0; i < (addClinicState.photos).length; i++) {
                    formData.append('photos[]', addClinicState.photos[i]);
                }
            }

            await api.ACCOUNTS_URI().post(`clinics/edit/${clinicId}`,
                formData
                ,
                {
                    "Content-Type": "multipart/form-data"
                })
                .then(async (responseData) => {
                    if (responseData.status === 200) {
                        if ((responseData.data.success === true)) {
                            await fetchAllClinics()
                            setSnackbarInfo({
                                isSnackBarOpen: true,
                                snackBarText: "Clinic Data Updated Successfully",
                                snackBarSeverity: "success",
                            });
                            handleClose();
                        } else {
                            setErrorMessages({
                                ...responseData.data.errorMessages
                            });
                            setSnackbarInfo({
                                isSnackBarOpen: true,
                                snackBarText: "Error while updating clinic data",
                                snackBarSeverity: "error",
                            })
                        }
                    } else {
                        setSnackbarInfo({
                            isSnackBarOpen: true,
                            snackBarText: "Error while submitting the clinic data",
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
        } else {

            const formData = new FormData();
            formData.append("name", addClinicState.name)
            formData.append("phones", addClinicState.phones)
            formData.append("google_map_url", addClinicState.google_map_url)
            formData.append("latitude", addClinicState.latitude)
            formData.append("longitude", addClinicState.longitude)
            formData.append("address", addClinicState.address)
            formData.append("pincode", addClinicState.pincode)
            formData.append("state_id", addClinicState.state_id)
            formData.append("city_id", addClinicState.city_id)
            formData.append("logo", addClinicState.logo)
            formData.append("doctor_signature", addClinicState.doctor_signature)
            formData.append("header_image", addClinicState.header_image)
            formData.append("footer_image", addClinicState.footer_image)
            formData.append("cr_id", localStorage.getItem('cr_id'))
            for (var i = 0; i < (addClinicState.photos).length; i++) {
                formData.append('photos[]', addClinicState.photos[i]);
            }

            await api.ACCOUNTS_URI().post(`clinics/add`, formData,
                {
                    "Content-Type": "multipart/form-data"
                })
                .then(async (responseData) => {
                    if (responseData.status === 200) {
                        if ((responseData.data.success === true)) {
                            await fetchAllClinics()
                            setSnackbarInfo({
                                isSnackBarOpen: true,
                                snackBarText: "Clinic Added Successfully",
                                snackBarSeverity: "success",
                            });
                            handleClose();
                        } else {
                            setErrorMessages({
                                ...responseData.data.errorMessage
                            });
                            // setSnackbarInfo({
                            //     isSnackBarOpen: true,
                            //     snackBarText: "Error while submitting the clinic data",
                            //     snackBarSeverity: "error",
                            // })
                        }
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
    }

    return (
        <div style={{ display: 'contents' }}>
            <Dialog
                fullScreen
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={true}
            >
                <DialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                    {...props}
                >
                    Modal title
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={1} justify="center">
                        <Grid item sm={10}>
                            <Grid container spacing={3} style={{ padding: 20, background: '#fff', borderRadius: 10 }}>
                                <Grid item sm={6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={6} style={{ paddingTop: 0, paddingBottom: 0 }}>
                                            <FormControl variant="outlined" fullWidth>
                                                <TextField
                                                    fullWidth
                                                    label="Clinic Name"
                                                    name="clinicName"
                                                    value={addClinicState.name}
                                                    id="name"
                                                    onChange={handleAddClinic}
                                                    required={true}
                                                    error={((errorMessages !== null) && (errorMessages.name)) ? true : false}
                                                />
                                            </FormControl>
                                            <FormHelperText style={{ color: 'red' }}>
                                                {
                                                    ((errorMessages !== null) && (errorMessages.name)) ? errorMessages.name[0] : ""
                                                }
                                            </FormHelperText>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} style={{ paddingTop: 0, paddingBottom: 0 }}>
                                            <FormControl variant="outlined" fullWidth>
                                                <TextField
                                                    fullWidth
                                                    label="Clinic Phone Number"
                                                    name="clinicNumber"
                                                    onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                                                    type="number"
                                                    onInput={(e) => {
                                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                                                    }}
                                                    id="phones"
                                                    value={addClinicState.phones}
                                                    onChange={handleAddClinic}
                                                    required={true}
                                                    error={((errorMessages !== null) && (errorMessages.phones)) ? true : false}
                                                />
                                            </FormControl>
                                            <FormHelperText style={{ color: 'red' }}>
                                                {
                                                    ((errorMessages !== null) && (errorMessages.phones)) ? errorMessages.phones[0] : ""
                                                }
                                            </FormHelperText>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4} style={{ paddingTop: 0, paddingBottom: 0 }}>
                                            <FormControl
                                                className={classes.formControl}
                                                fullWidth
                                                // style={{ marginTop: 15 }}
                                                required
                                            >
                                                <InputLabel>
                                                    State
                                                </InputLabel>
                                                <Select
                                                    // native
                                                    // label="state"
                                                    id="state_id"
                                                    name="state_id"
                                                    // focused
                                                    value={addClinicState.state_id}
                                                    onChange={handleSelectDropdown}
                                                >
                                                    {/* <option value=''>Select State</option> */}
                                                    {renderStates()}
                                                </Select>
                                            </FormControl>
                                            <FormHelperText style={{ color: 'red' }}>
                                                {
                                                    ((errorMessages !== null) && (errorMessages.state_id)) ? errorMessages.state_id[0] : ""
                                                }
                                            </FormHelperText>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4} style={{ paddingTop: 0, paddingBottom: 0 }}>
                                            <FormControl
                                                // variant="outlined"
                                                className={classes.formControl}
                                                fullWidth
                                                // style={{ marginTop: 15 }}
                                                required
                                            >
                                                <InputLabel>
                                                    City
                                                </InputLabel>
                                                <Select
                                                    // native
                                                    required
                                                    // label="state"
                                                    id="city_id"
                                                    name="city_id"
                                                    disabled={(addClinicState.state_id === "") ? true : false}
                                                    onChange={handleSelectDropdown}
                                                    value={addClinicState.city_id}
                                                >
                                                    {renderCities()}
                                                </Select>
                                            </FormControl>
                                            <FormHelperText style={{ color: 'red' }}>
                                                {
                                                    ((errorMessages !== null) && (errorMessages.city_id)) ? errorMessages.city_id[0] : ""
                                                }
                                            </FormHelperText>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={4} style={{ paddingTop: 0, paddingBottom: 0 }}>
                                            <FormControl
                                                variant="outlined"
                                                className={classes.formControl}
                                                fullWidth
                                            >
                                                <TextField
                                                    fullWidth
                                                    required
                                                    label="Pincode"
                                                    type="number"
                                                    onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                                                    onInput={(e) => {
                                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 6)
                                                    }}
                                                    name="pincode"
                                                    id="pincode"
                                                    onChange={handleAddClinic}
                                                    value={addClinicState.pincode}
                                                    error={((errorMessages !== null) && (errorMessages.pincode)) ? true : false}
                                                />
                                            </FormControl>
                                            <FormHelperText style={{ color: 'red' }}>
                                                {
                                                    ((errorMessages !== null) && (errorMessages.pincode)) ? errorMessages.pincode : ""
                                                }
                                            </FormHelperText>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sm={6}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={12} md={12} style={{ paddingTop: 0, paddingBottom: 0 }}>
                                            <FormControlWrapper>
                                                <FormControl variant="outlined" fullWidth>
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        label="Clinic Address"
                                                        name="clinicAddress"
                                                        id="address"
                                                        onChange={handleAddClinic}
                                                        inputProps={{ maxLength: 250 }}
                                                        helperText="Hint: Enter Building No, Street Name, Village Name."
                                                        value={addClinicState.address}
                                                        rows={3}
                                                        required
                                                        error={((errorMessages !== null) && (errorMessages.address)) ? true : false}
                                                    />
                                                </FormControl>
                                                <FormHelperText style={{ color: 'red' }}>
                                                    {
                                                        ((errorMessages !== null) && (errorMessages.address)) ? errorMessages.address : ""
                                                    }
                                                </FormHelperText>
                                            </FormControlWrapper>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <Typography variant="subtitle2" gutterBottom style={{ marginBottom: 15 }}>
                                        Clinic Photos
                                    </Typography>
                                    <Grid container spaccing={4}>
                                        
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <Typography variant="subtitle2">
                                        Tag Location
                                    </Typography>
                                    <FormControl variant="outlined" fullWidth>
                                        <TextField
                                            fullWidth
                                            label="Enter map link"
                                            name="mapLink"
                                            value={addClinicState.google_map_url}
                                            id="google_map_url"
                                            onChange={handleAddClinic}
                                            required
                                        />
                                    </FormControl>
                                    <FormHelperText style={{ color: 'red' }}>
                                        {
                                            ((errorMessages !== null) && (errorMessages.google_map_url)) ? errorMessages.google_map_url[0] : ""
                                        }
                                    </FormHelperText>
                                    <Typography variant="subtitle2" gutterBottom style={{ marginTop: 15, marginBottom: 15 }}>
                                        Google Map
                                    </Typography>
                                    <MapWithAMarker
                                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                        loadingElement={<div style={{ height: '100%' }} />}
                                        containerElement={<div style={{ height: '250px' }} />}
                                        mapElement={<div style={{ height: '100%' }} />}
                                        latData={addClinicState.latitude}
                                        lngData={addClinicState.longitude}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} align="right">
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={async () => await handleAddClinicSubmit()}
                                    >
                                        {isAdd ? 'Update' : 'Add'}
                                    </Button>
                                </Grid>
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
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    );
}

AddClinicDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    isEdit: PropTypes.bool,
    clinicId: PropTypes.number,
    singleCLinicDetails: PropTypes.any,
    fetchSingleClinicData: PropTypes.any,
    resetClinicData: PropTypes.any,
    fetchAllClinics: PropTypes.any,
    masterData: PropTypes.any,
    cityData: PropTypes.any,
    fetchCityData: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        masterData: state.get("dashboardReducer").masterData,
        cityData: state.get("dashboardReducer").cityData,
        singleCLinicDetails: state.get("profileReducer").singleCLinicDetails,
        imagesOrDocs: state.get('dashboardReducer').imagesOrDocs,
    }
}

export default connect(mapStateToProps, { fetchSingleClinicData, fetchAllClinics, fetchCityData, resetClinicData })(withStyles(styles)(AddClinicDialog));
