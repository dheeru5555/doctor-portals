import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Type from 'enl-styles/Typography.scss';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import Divider from '@material-ui/core/Divider';
import styles from './frontdeskStyle-jss';
import {connect} from "react-redux";
import API from "../../../helpers/api";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import {fetchAllReceptionists} from "../../../redux/actions/receptionistActions";

function FrontdeskCard(props) {
    const {
        classes,
        avatar,
        name,
        isVerified,
        receptionist,
        imagesOrDocs,
        masterData,
        fetchAllReceptionists
    } = props;

    if(
        (masterData === null) || 
        (imagesOrDocs === null)
    ) {
        return null;
    } else {
        const [snackBarInfo, setSnackBarInfo] = React.useState({
            isSnackBarOpen: false,
            snackBarText: "",
            snackBarSeverity: "success",
        });

        const history = useHistory();

        const routeChange = (receptionist_id, crId) => {
            history.push({
                pathname: '/app/new-frontdesk',
                state: {receptionistId: receptionist_id, crId: crId}
            });
        };
    
        let imageUrl = "https://bootdey.com/img/Content/avatar/avatar6.png";   
        if(
            (imagesOrDocs !== null) &&
            (imagesOrDocs.receptionist_images_prefix_url) &&
            (receptionist.receptionist) &&
            (receptionist.receptionist.avatar)
        ) {
            imageUrl = imagesOrDocs.receptionist_images_prefix_url + receptionist.receptionist.avatar
        }
    
        const receptionistTitle = (
            (receptionist.receptionist) && 
            (receptionist.receptionist.title) &&
            (receptionist.receptionist.title !== null)
        ) ? receptionist.receptionist.title : "Mr";
    
        const receptionistFirstName = (
            (receptionist.receptionist) && 
            (receptionist.receptionist.first_name) &&
            (receptionist.receptionist.first_name !== null)
        ) ? receptionist.receptionist.first_name : "";
    
        const receptionistLastName = (
            (receptionist.receptionist) && 
            (receptionist.receptionist.last_name) &&
            (receptionist.receptionist.last_name !== null)
        ) ? receptionist.receptionist.last_name : "";
    
        const receptionistEmail = (
            (receptionist.receptionist) && 
            (receptionist.receptionist.email) &&
            (receptionist.receptionist.email !== null)
        ) ? receptionist.receptionist.email : "";
    
        const receptionistStatus =  (
            (receptionist.receptionist) && 
            (receptionist.receptionist.status) &&
            (receptionist.receptionist.status !== null)
        ) ? receptionist.receptionist.status : 1;
    
        const receptionistPhone =  (
            (receptionist.receptionist) && 
            (receptionist.receptionist.mobile) &&
            (receptionist.receptionist.mobile !== null)
        ) ? receptionist.receptionist.mobile : "";
    
        const receptionistGender = (
            (receptionist.receptionist) && 
            (receptionist.receptionist.gender) &&
            (receptionist.receptionist.gender !== null)
        ) ? receptionist.receptionist.gender : "m";
    
        const receptionistStateId = (
            (receptionist.receptionist) && 
            (receptionist.receptionist.state_id) &&
            (receptionist.receptionist.state_id !== null)
        ) ? receptionist.receptionist.state_id : 2;
    
        const receptionistPinCode = (
            (receptionist.receptionist) && 
            (receptionist.receptionist.pincode) &&
            (receptionist.receptionist.pincode !== null)
        ) ? receptionist.receptionist.pincode : "";
    
        const receptionistAddress = (
            (receptionist.receptionist) && 
            (receptionist.receptionist.address) &&
            (receptionist.receptionist.address !== null)
        ) ? receptionist.receptionist.address : "";
    
        const receptionistOnboardDate = (
            (receptionist.active_from) &&
            (receptionist.active_from !== null)
        ) ? new Date(receptionist.active_from).toDateString() : "";
    
        const receptionistOnboardTime = (
            (receptionist.active_from) &&
            (receptionist.active_from !== null)
        ) ? new Date(receptionist.active_from).toLocaleTimeString() : "";
    
        const receptionistClinic = (
            (receptionist.clinic) && 
            (receptionist.clinic.name) &&
            (receptionist.clinic.name !== null)
        ) ? receptionist.clinic.name : "";
    
        const state = masterData.states.find((state) => state.id === receptionistStateId);
    
        const removeReceptionistFromOrg = async (clinic_id, receptionist_id) => {
            const api = new API();
    
            await api.ACCOUNTS_URI().post("receptionists/remove-clinic", {
                clinic_id: clinic_id,
                receptionist_id: receptionist_id
            })
            .then(async (removeReceptionistResp) => {
                if(
                    (removeReceptionistResp.status === 200) &&
                    (removeReceptionistResp.data.success === true)
                ) {
                    setSnackBarInfo({
                        isSnackBarOpen: true,
                        snackBarText: "Successfuly removed receptionist",
                        snackBarSeverity: "success",
                    });

                    await fetchAllReceptionists();
                } else {
                    setSnackBarInfo({
                        isSnackBarOpen: true,
                        snackBarText: "Error while submitting the form",
                        snackBarSeverity: "error",
                    })
                }
            })
            .catch(() => {
                setSnackBarInfo({
                    isSnackBarOpen: true,
                    snackBarText: "Internal Server Error",
                    snackBarSeverity: "error",
                })
            });
        }
    
        const Alert = (props) => {
            return <MuiAlert elevation={6} variant="filled" {...props} />;
          }
        
          const handleSnackbarClose = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
        
            setSnackBarInfo({
                isSnackBarOpen: false,
                snackBarText: "",
                snackBarSeverity: "success",
            })
          };
    
        return (
            <div>
                <Card className={classes.cardSocmed} style={{ marginTop: 20 }}>
                    <CardContent className={classes.contentProfile}>
                        <div className={classes.userImage}>
                            <img src={imageUrl} alt="profile-Image" />
                        </div>
                        <br />
                        <Typography className={classes.subheading} gutterBottom>
                            <span className={Type.bold} style={{textTransform: 'capitalize'}}>
                                {`${receptionistTitle} ${receptionistFirstName} ${receptionistLastName}`}
                            </span>
                            &nbsp;
                            {(receptionistStatus === 1) && <VerifiedUser className={classes.verified} />}
                        </Typography>
                        <Typography className={classes.subheading} gutterBottom>
                            <span className={Type.regular}>
                                {(receptionistStatus === 1) ? "Active" : "In-active"} / {(receptionistGender === "m") ? "Male" : "Female"} 
                            </span>
                        </Typography>
                        <Typography className={classes.subheading} gutterBottom>
                            <span className={Type.regular}>Email : {receptionistEmail}</span>
                        </Typography>
                        <Typography className={classes.subheading} gutterBottom>
                            <span className={Type.regular}>Clinic : {receptionistClinic}</span>
                        </Typography>
                        <Typography className={classes.subheading} gutterBottom>
                            <span className={Type.regular}>Phone : +91 {receptionistPhone}</span>
                        </Typography>
                        <Typography className={classes.subheading} gutterBottom>
                            <span className={Type.regular}>Onboarded on : {receptionistOnboardDate}</span>
                        </Typography>
                        {/* <br /> */}
    
                        <Divider className={classes.Divider} />
                        <Typography variant="h6" className={classes.name} gutterBottom>Address</Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {`${receptionistAddress} , ${state ? state.name : ""} , ${receptionistPinCode}`}
                        </Typography>
                        <Button
                            variant="contained"
                            className={classes.button2}
                            onClick={() => routeChange(receptionist.receptionist_id, receptionist.id)}
                        >
                           Manage
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button2}
                            onClick={async () => await removeReceptionistFromOrg(receptionist.clinic_id,receptionist.receptionist_id)}
                        >
                            UnAssign
                        </Button>
                    </CardContent>
                    {/* <Divider /> */}
                </Card>
    
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
            </div>
        );
    }


}

FrontdeskCard.propTypes = {
    classes: PropTypes.object.isRequired,
    avatar: PropTypes.string,
    name: PropTypes.string,
    isVerified: PropTypes.bool,
    receptionist: PropTypes.any,
};

FrontdeskCard.defaultProps = {
    isVerified: false
};

const mapStateToProps = state => {
    return {
        imagesOrDocs: state.get("dashboardReducer").imagesOrDocs,
        masterData: state.get("dashboardReducer").masterData,
    }
}

export default connect(mapStateToProps, {fetchAllReceptionists})(withStyles(styles)(FrontdeskCard));
