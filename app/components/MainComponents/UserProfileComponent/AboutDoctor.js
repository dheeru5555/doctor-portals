import React, { useEffect, useRef, useState } from 'react';
import {
    Grid,
    Avatar,
    Tooltip,
    IconButton,
    Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import { injectIntl } from 'react-intl';
import styles from './profile-jss';
import ChangePassword from './ChangePasswordDialog';
import Documents from './Documents';
import { connect } from "react-redux";
import Loading from 'enl-components/Loading';
import { fetchDoctorProfileDetails, fetchAllClinics } from "../../../redux/actions/profileActions";
// import Dropzone from 'react-dropzone';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';

function AboutDoctor(props) {

    const { classes, doctorProfileDetails } = props;
    const localUserInfo = localStorage.getItem('userInfo')
    const parsedUserInfo = JSON.parse(localUserInfo)

    const isFrontdesk = parsedUserInfo ? parsedUserInfo.frontdesk : false;
    // const [img, setImg] = useState('https://media.gettyimages.com/photos/patient-in-the-hospital-picture-id1136865476?s=612x612');
    // const [files] = useState([]);
    // const ref = useRef(null);
    // let dropzoneRef;
    // const acceptedFiles = ['image/jpeg', 'image/png', 'image/bmp'];
    // const fileSizeLimit = 100000;
    // const imgPreview = img => {
    //     if (!img) { return null; }
    //     if (typeof img !== 'string' && img !== '') {
    //         return URL.createObjectURL(img);
    //     }
    //     return img;
    // };

    // const onDrop = (filesVal) => {
    //     let oldFiles = files;
    //     const filesLimit = 2;
    //     oldFiles = oldFiles.concat(filesVal);
    //     if (oldFiles.length > filesLimit) {
    //         console.log('Cannot upload more than ' + filesLimit + ' items.');
    //     } else {
    //         setImg(filesVal[0]);
    //     }
    // };


    useEffect(() => {

        if (doctorProfileDetails === null || doctorProfileDetails === undefined) {
            props.fetchDoctorProfileDetails()
        }

        // if (props.clinicDetails === null) {
        //     props.fetchAllClinics()
        // }

    }, [])


    if ((doctorProfileDetails === null) || (doctorProfileDetails === undefined)) {
        return <Loading />;
    }


    let specialization = "Not Specified";
    let superSpecialization = "Not Specified";

    if (!isFrontdesk) {
        if ((props.doctorProfileDetails !== null) && (doctorProfileDetails !== undefined) && props.doctorProfileDetails.speciality_id &&
            (props.doctorProfileDetails.speciality_id !== null) && (props.masterData !== null) && props.masterData.specializations) {
            const filteredSpeciality = props.masterData.specializations.find((specializationDetail) => specializationDetail.id === props.doctorProfileDetails.speciality_id);

            if (filteredSpeciality) {
                specialization = filteredSpeciality.name
            }
        }

        if ((props.doctorProfileDetails !== null) && (doctorProfileDetails !== undefined) && props.doctorProfileDetails.super_speciality_ids && props.doctorProfileDetails.super_specializations !== null &&
            (props.doctorProfileDetails.super_speciality_ids !== null) && (props.superSpecialization !== null) && props.superSpecialization.super_specializations) {
            // const filteredSuperSpeciality = props.superSpecialization.super_specializations.find((superSpecializationDetail) => superSpecializationDetail.id === props.doctorProfileDetails.super_speciality_id);
            const filteredSuperSpeciality = props.doctorProfileDetails.super_specializations.map((item) => {
                return ({
                    id: item.id,
                    name: item.name
                })
            })
            // superSpecialization = props.doctorProfileDetails.super_specialization.name
            superSpecialization = filteredSuperSpeciality.map((item) => item.name).join(',')
        }
    }


    return (
        <Grid
            container
            alignItems="flex-start"
            justify="flex-start"
            direction="row"
            spacing={3}
        >
            {/* <Grid item md={12}>
                <div>
                    <div className={classes.avatarWrap}>
                        <Dropzone
                            className={classes.hiddenDropzone}
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
                        <Avatar
                            alt="Avatar"
                            className={classes.uploadAvatar}
                            src={imgPreview(img)}
                        />
                        <Tooltip id="tooltip-upload" title={'upload1'}>
                            <IconButton
                                className={classes.buttonUpload}
                                component="button"
                                onClick={() => {
                                    dropzoneRef.open();
                                }}
                            >
                                <PhotoCamera />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </Grid> */}
            <Grid item md={12} xs={12}>
                <Paper elevation={3}>
                    <Card className={classes.cardSocmed}>
                        <CardContent>
                            <Grid
                                container
                                className={classes.colList}
                                style={{ paddingLeft: 30, paddingRight: 30 }}
                            >
                                <Grid item md={3}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar
                                                className={classNames(
                                                    classes.avatar,
                                                    classes.purpleAvatar
                                                )}
                                            >
                                                <Icon>person</Icon>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Name"
                                            secondary={(
                                                (doctorProfileDetails !== null) && (doctorProfileDetails !== undefined) && (doctorProfileDetails.first_name) && (doctorProfileDetails.last_name)) ?
                                                `${doctorProfileDetails.title} ${doctorProfileDetails.first_name} ${doctorProfileDetails.last_name}` : "Not Specified"
                                            }
                                        />
                                    </ListItem>
                                </Grid>
                                <Grid item md={3}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar
                                                className={classNames(
                                                    classes.avatar,
                                                    classes.greenAvatar
                                                )}
                                            >
                                                <Icon>email</Icon>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Email"
                                            style={{textTransform: 'lowercase'}}
                                            secondary={(
                                                (doctorProfileDetails !== null) && (doctorProfileDetails !== undefined) && (doctorProfileDetails.email)) ?
                                                (doctorProfileDetails.email) : "Not Specified"
                                            }
                                        />
                                    </ListItem>
                                </Grid>
                                <Grid item md={3}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar
                                                className={classNames(classes.avatar, classes.pinkAvatar)}
                                            >
                                                <Icon>local_phone</Icon>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Phone Number"
                                            secondary={(
                                                (doctorProfileDetails !== null) && (doctorProfileDetails !== undefined) && (doctorProfileDetails.mobile)) ?
                                                `+91-${doctorProfileDetails.mobile}` : "Not Specified"
                                            }
                                        />
                                    </ListItem>
                                </Grid>
                                <Grid item md={3}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar
                                                className={classNames(
                                                    classes.avatar,
                                                    classes.orangeAvatar
                                                )}
                                            >
                                                <Icon>person</Icon>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Gender"
                                            secondary={(
                                                (doctorProfileDetails !== null) && (doctorProfileDetails !== undefined) && (doctorProfileDetails.gender)) ?
                                                `${doctorProfileDetails.gender === "m" ? "Male" : "Female"}` : "Not Specified"
                                            }
                                        />
                                    </ListItem>
                                </Grid>
                                {isFrontdesk ? ('') : (
                                    <>
                                        <Grid item md={3}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        className={classNames(
                                                            classes.avatar,
                                                            classes.purpleAvatar
                                                        )}
                                                    >
                                                        <Icon>add_to_queue</Icon>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary="Specialization"
                                                    secondary={specialization}
                                                />
                                            </ListItem>
                                        </Grid>
                                        <Grid item md={3}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        className={classNames(
                                                            classes.avatar,
                                                            classes.greenAvatar
                                                        )}
                                                    >
                                                        <Icon>add_to_queue</Icon>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary="Super Specialization"
                                                    secondary={superSpecialization}
                                                />
                                            </ListItem>
                                        </Grid>
                                        <Grid item md={3}>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar
                                                        className={classNames(
                                                            classes.avatar,
                                                            classes.greenAvatar
                                                        )}
                                                    >
                                                        <Icon>language</Icon>
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary="Language for Consultation"
                                                    secondary={(
                                                        (doctorProfileDetails !== null) && (doctorProfileDetails !== undefined) && (doctorProfileDetails.consult_langauges)) ?
                                                        `${doctorProfileDetails.consult_langauges.length !== 0 ? doctorProfileDetails.consult_langauges.map((lang) => lang.name) : "No Specified"}` : "No Specified2"
                                                    }
                                                />
                                            </ListItem>
                                        </Grid>
                                    </>
                                )}
                                <Grid item md={3}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar
                                                className={classNames(
                                                    classes.avatar,
                                                    classes.greenAvatar
                                                )}
                                            >
                                                <Icon>language</Icon>
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Password"
                                            secondary="********"
                                        />
                                        <ChangePassword />
                                    </ListItem>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
            {!isFrontdesk && (
                <Grid item sm={12}>
                    <Documents masterData={props.masterData} />
                </Grid>
            )}
        </Grid>
    );
}

AboutDoctor.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        doctorProfileDetails: state.get("profileReducer").doctorProfileDetails,
        superSpecialization: state.get("dashboardReducer").superSpecialization,
        masterData: state.get("dashboardReducer").masterData,
        clinicDetails: state.get("profileReducer").clinicDetails,
    }
}

export default connect(mapStateToProps, { fetchDoctorProfileDetails, fetchAllClinics })(withStyles(styles)(injectIntl(AboutDoctor)));
