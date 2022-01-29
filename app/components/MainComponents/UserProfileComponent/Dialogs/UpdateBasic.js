import React, { useRef, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import Type from 'enl-styles/Typography.scss';
import Dropzone from 'react-dropzone';
import Loading from 'enl-components/Loading';
import css from 'enl-styles/Form.scss';
import MuiAlert from '@material-ui/lab/Alert';
import {
    Snackbar, IconButton,
    Tooltip, Button,
    Avatar, FormControl,
    InputLabel, Select,
    TextField, Dialog,
    DialogActions, DialogContent,
    DialogTitle, FormHelperText, Input
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import API from '../../../../helpers/api';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { fade } from '@material-ui/core/styles/colorManipulator';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { fetchDoctorProfileDetails } from '../../../../redux/actions/profileActions';
import { fetchImageOrDocument } from '../../../../redux/actions/dashboardActions';

const LanguageWrapper = styled('div')`
  fieldset {
    color: #424242;
    border: none;
  }
  .MuiAutocomplete-hasPopupIcon .MuiAutocomplete-inputRoot[class*="MuiFilledInput-root"], .MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot[class*="MuiFilledInput-root"] {
    padding: 1px 0;
    border-radius: 10px;
    color: #424242;
  }
  input {
    font-size: 15px;
    color: #424242;
  }
  .MuiInputBase-root {
    padding-top: 2px !important;
    padding-bottom: 2px !important;
    margin-top: 16px;
    color: #424242;
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,0.32);
  }
`;


const gradient = theme => ({
    backgroundColor: theme.palette.background.paper,
    backgroundImage: `linear-gradient(to right, ${theme.palette.background.paper} 0%, ${fade(theme.palette.divider, 0.03)} 50%, ${fade(theme.palette.divider, 0.03)} 70%, ${theme.palette.background.paper} 100%)`,
    backgroundRepeat: 'no-repeat',
});

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        textAlign: 'center'
    },
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    top: {
        color: '#ff2100',
        position: 'absolute',
        left: 0
    },
    circle: {
        strokeLinecap: 'round',
    },
    cover: {
        boxShadow: '0px 1px 8px 0px rgb(80 80 80 / 20%), 0px 3px 4px 0px rgb(80 80 80 / 14%), 0px 3px 3px -2px rgb(80 80 80 / 12%)',
        borderRadius: 12
    },
    content: {
        borderRadius: '12px 12px 0 0'
    },
    profilePicContainer: {
        position: 'relative',
        width: 'fit-content'
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: '-10%',
        background: '#ff2100',
        color: '#fff',
        "&:hover": {
            background: '#ff2100'
        }
    },
    higher: {},
    padding: {},
    content: {
        flexGrow: 1,
        transition: theme.transitions.create(['left', 'opacity'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.standard,
        }),
        [theme.breakpoints.down('xs')]: {
            left: '100%',
            top: 0,
            opacity: 0,
            position: 'absolute',
            zIndex: 1200,
            width: '100%',
            overflow: 'auto',
            height: '100%'
        }
    },
    title: {
        display: 'flex',
        flex: 1,
        '& svg': {
            marginRight: 5
        }
    },
    flex: {
        display: 'flex',
        alignItems: 'center'
    },
    input: {
        font: 'inherit',
        padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px ${theme.spacing(0.5)}px ${theme.spacing(6)}px`,
        border: 0,
        display: 'block',
        verticalAlign: 'middle',
        whiteSpace: 'normal',
        background: 'none',
        margin: 0, // Reset for Safari
        color: 'inherit',
        width: '100%',
        '&:focus': {
            outline: 0,
        },
    },
    avatar: {},
    field: {
        width: '100%',
        marginBottom: theme.spacing(1),
        '& svg': {
            color: theme.palette.grey[400],
            fontSize: 18,
        }
    },
    uploadAvatar: {
        width: '100%',
        height: '100%',
        background: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[100],
        borderRadius: 8,
        '&:hover': {
            '& $buttonUpload': {
                backgroundColor: 'rgb(255 255 255 / 30%)',
                color: '#fff'
            }
        }
    },
    hiddenDropzone: {
        display: 'none'
    },
    avatarWrap: {
        width: 100,
        height: 100,
        // margin: '10px auto 30px',
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    buttonUpload: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

    },
    img: {},
    subtitle: {},
    textContent: {},
    placeLoader: {
        maxWidth: 920,
        marginBottom: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        '& $img, $title, $subtitle': {
            ...gradient(theme),
        },
        '& $img': {
            width: 40,
            height: 40,
            borderRadius: '50%',
            display: 'block',
            animation: '2s placeHolderImg linear infinite',
        },
        '& $textContent': {
            flex: 1,
            padding: `0 ${theme.spacing(2)}px`
        },
        '& $title': {
            width: '80%',
            height: 20,
            borderRadius: 8,
            display: 'block',
            animation: '2s placeHolderTitle linear infinite',
        },
        '& $subtitle': {
            width: '50%',
            height: 10,
            borderRadius: 8,
            marginTop: theme.spacing(1),
            display: 'block',
            animation: '2s placeHolderTitle linear infinite',
        },
    },
    buttonProgress: {
        color: theme.palette.text.secondary,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    placeLoaderCover: {
        width: 300,
        margin: `${theme.spacing(1) * -4}px 0`,
        '& figure': {
            width: '60px !important',
            height: '60px !important',
        }
    },
    '@keyframes placeHolderImg': {
        from: {
            backgroundPosition: '-60px 0'
        },
        to: {
            backgroundPosition: '60px 0'
        }
    },
    '@keyframes placeHolderTitle': {
        from: {
            backgroundPosition: '-600px 0'
        },
        to: {
            backgroundPosition: '600px 0'
        }
    },
    edit: {
        fontSize: 13
    }
}),
);
const lang = [
    { id: 1, name: 'English' }
]
function UpdateBasic(props) {
    const api = new API()
    let languages = props.masterData.languages !== null ? props.masterData.languages : lang;
    const { profileDetails, masterData } = props;
    const classes = useStyles();
    const [files] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [img, setImg] = useState('');
    const [superSpecialization, setSuperSpecialization] = useState([])
    const [newSuperSpecialization, setNewSuperSpecialization] = useState([])
    const [basicDetails, setBasicDetails] = useState({
        avatar: profileDetails !== null ? profileDetails.avatar_url : '',
        languages: profileDetails !== null ? profileDetails.consult_langauges : [],
        super_speciality_ids: profileDetails !== null ? profileDetails.super_specializations : [],
    });
    const [errors, setErrors] = useState({
        avatar: '',
        languages: '',
        super_speciality_ids: ''
    });
    const [snackBarInfo, setSnackBarInfo] = useState({
        isSnackBarOpen: false,
        snackBarText: '',
        snackBarSeverity: 'success',
    });

    React.useEffect(() => {
        if (profileDetails !== null && masterData !== null && masterData.superSpecializations.length > 0) {
            let superSpecializationsList = masterData.superSpecializations.map((item) => {
                return ({
                    id: item.id,
                    name: item.name,
                    specialization_id: item.specialization.id
                });
            })
            let filteredSuperSpecialization = superSpecializationsList.filter((item) => item.specialization_id == profileDetails.speciality_id)
            console.log("filteredSuperSpecialization", superSpecializationsList)
            console.log("filteredSuperSpecialization", profileDetails.speciality_id)
            console.log("props.masterData.languages", props.masterData.languages)
            setSuperSpecialization(filteredSuperSpecialization)
            languages = masterData.languages;
        }
    }, [])

    const ref = useRef(null);
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
        const filesLimit = 1;
        oldFiles = oldFiles.concat(filesVal);
        if (oldFiles.length > filesLimit) {
            setSnackBarInfo({
                isSnackBarOpen: true,
                snackBarText: 'Cannot upload more than ' + filesLimit + ' items.',
                snackBarSeverity: 'error',
            });
        } else {
            setBasicDetails({
                ...basicDetails,
                avatar: filesVal[0]
            });
        }
    };

    const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackBarInfo({
            isSnackBarOpen: false,
            snackBarText: '',
            snackBarSeverity: 'success',
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (inputTarget, newValue) => {
        let intermediateObj = { ...basicDetails }
        intermediateObj[inputTarget] = newValue
        setBasicDetails(intermediateObj)
    }

    const submitvalidate = () => {
        let validate = true;
        // console.log("sdh", basicDetails)
        for (const key in basicDetails) {
            if (!validateForm(basicDetails, key)) {
                validate = false;
            }
        }
        return validate;
    };

    const validateForm = (fields, filed_name) => {
        let validate = true;

        switch (filed_name) {
            case 'avatar':
                if (fields.avatar == '') {
                    setErrors({
                        ...errors,
                        avatar: 'Enter Medicine Name'
                    })
                    validate = false;
                }
                break;

            case 'languages':
                if (fields.languages && fields.languages.length == 0) {
                    setErrors({
                        ...errors,
                        languages: 'Select Atleast one language'
                    })
                    console.log("ksjfsldk", errors)
                    validate = false;
                }
                break;

            case 'super_speciality_ids':
                if (fields.super_speciality_ids && fields.super_speciality_ids.length == 0) {
                    console.log("kdjf", errors)
                    setErrors({
                        ...errors,
                        super_speciality_ids: 'Select Atleast one SuperSpecialization'
                    })
                    validate = false;
                }
                break;
        }
        return validate;
    };

    const UpdateBasicDetails = () => {
        if (submitvalidate()) {
            console.log(errors)
            const formData = new FormData();
            let data = {
                super_speciality_ids: basicDetails.super_speciality_ids.map((item) => item.id),
                languages: basicDetails.languages.map((item) => item.id)
            }

            if (typeof (basicDetails.avatar) == 'object') {
                data.avatar = basicDetails.avatar;
                formData.append("avatar", basicDetails.avatar)
            }
            for (var i = 0; i < (data.super_speciality_ids).length; i++) {
                formData.append('super_speciality_ids[]', data.super_speciality_ids[i]);
            }
            for (var i = 0; i < (data.languages).length; i++) {
                formData.append('languages[]', data.languages[i]);
            }

            api.ACCOUNTS_URI().post('profile/editDetails', formData, {
                "Content-Type": "multipart/form-data"
            })
                .then((resp) => {
                    if (resp.data.success) {
                        props.fetchDoctorProfileDetails();
                        handleClose()
                        setSnackBarInfo({
                            isSnackBarOpen: true,
                            snackBarText: 'Successfully updated Profile Picture.',
                            snackBarSeverity: 'success',
                        });
                    } else {
                        setSnackBarInfo({
                            isSnackBarOpen: true,
                            snackBarText: resp.data.message,
                            snackBarSeverity: 'success',
                        });
                    }
                })
        }

    }

    if (
        (profileDetails == null) || (masterData == null)
    ) {
        return <Loading />;
    } else {
        return (
            <>
                <button onClick={handleClickOpen} className={classes.edit}>Edit Profile</button>
                <Dialog
                    open={open}
                    fullWidth
                    maxWidth={'sm'}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ marginBottom: 8 }}>{"Update Profile Details"}</DialogTitle>
                    <DialogContent>
                        <section className={css.bodyForm}>
                            <div>
                                <Dropzone
                                    className={classes.hiddenDropzone}
                                    accept={acceptedFiles.join(',')}
                                    name="avatar"
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
                                <div className={classes.avatarWrap}>
                                    <Avatar
                                        alt="Avatar"
                                        className={classes.uploadAvatar}
                                        src={imgPreview(basicDetails.avatar)}
                                    />
                                    <Tooltip id="tooltip-upload" title={"Upload Avatar"}>
                                        <IconButton
                                            className={classes.buttonUpload}
                                            component="button"
                                            onClick={() => {
                                                dropzoneRef.open();
                                            }}
                                        >
                                            <BorderColorIcon />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                            <Typography className={Type.textCenter} style={{ marginTop: 8 }}>
                                Upload Profile Picture
                            </Typography>
                        </section>
                        <LanguageWrapper>
                            <Autocomplete
                                multiple
                                limitTags={2}
                                name="languages"
                                options={languages}
                                getOptionLabel={option => option.name}
                                defaultValue={basicDetails.languages}
                                onChange={(event, newValue) => handleInputChange("languages", newValue)}
                                id="multiple-limit-tags"
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" placeholder="Consultation Languages" />
                                )}
                            />
                            <FormHelperText error>{errors.languages}</FormHelperText>
                        </LanguageWrapper>
                        <FormControl
                            className={classes.formControl}
                            fullWidth
                            required
                            disabled
                        >
                            <InputLabel>
                                Specialization
                            </InputLabel>
                            <Select
                                required
                                id="city_id"
                                name="city_id"
                                value={profileDetails.speciality_id}
                            >
                                {masterData.specializations.map((item) => {
                                    return <option value={item.id} key={item.name}>{item.name}</option>
                                })}
                            </Select>
                        </FormControl>
                        <LanguageWrapper>
                            {
                                (superSpecialization !== null &&
                                    superSpecialization !== undefined &&
                                    superSpecialization.length !== 0) ? (
                                    <Autocomplete
                                        multiple
                                        limitTags={2}
                                        name="super_speciality_ids"
                                        options={superSpecialization}
                                        getOptionLabel={option => option.name}
                                        defaultValue={basicDetails.super_speciality_ids ? basicDetails.super_speciality_ids : []}
                                        onChange={(event, newValue) => handleInputChange("super_speciality_ids", newValue)}
                                        id="multiple-limit-tags"
                                        renderInput={(params) => (
                                            <TextField {...params} variant="outlined" placeholder="Super Specialization" />
                                        )}
                                    />
                                ) : (
                                    <FormControl
                                        className={classes.formControl}
                                        fullWidth
                                        required
                                        disabled
                                    >
                                        <InputLabel>
                                            Super Specialization
                                        </InputLabel>
                                        <Select
                                            required
                                            id="city_id"
                                            name="city_id"
                                            value={'NoData'}
                                        >
                                            <option value={'NoData'}>No Super Specialization available</option>
                                        </Select>
                                    </FormControl>
                                )
                            }
                            <FormHelperText error>{errors.super_speciality_ids}</FormHelperText>
                        </LanguageWrapper>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                        <Button onClick={UpdateBasicDetails} autoFocus>
                            Update
                        </Button>
                    </DialogActions>
                </Dialog>
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
            </>
        );
    }

}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { fetchDoctorProfileDetails })(injectIntl(UpdateBasic));
