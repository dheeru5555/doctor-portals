import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import { OtpForm } from 'enl-components';
import styles from './user-jss';
import brand from 'enl-api/dummy/brand';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import API from "../../../../helpers/api";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import history from '../../../../utils/history';
import { updateUserHashedKey } from "../../../../redux/actions/authActions";
import { connect } from "react-redux";
import { fetchMasterData } from '../../../../redux/actions/dashboardActions';
// initialization
const api = new API();

const parsedUserInfo = JSON.parse(localStorage.getItem("registerObj"))

function Otp(props) {
    const { classes, updateUserHashedKey, masterData } = props;
    const { location } = props.history;
    const title = brand.name + ' - Otp';
    const description = brand.desc;
    const [otpForm, setOtpForm] = useState({
        mobileNumber: (location.state && location.state.mobileNumber) ? location.state.mobileNumber : "999999999",
        title: (location.state && location.state.title) ? location.state.title : "",
        first_name: (location.state && location.state.first_name) ? location.state.first_name : "",
        last_name: (location.state && location.state.last_name) ? location.state.last_name : "",
        email: (location.state && location.state.email) ? location.state.email : "",
        otpValue: "",
        errorMessages: "",
    });
    const [userObj, setUserObj] = React.useState({
        title: (parsedUserInfo !== null && parsedUserInfo.title) ? parsedUserInfo.title : '',
        first_name: (parsedUserInfo !== null && parsedUserInfo.first_name) ? parsedUserInfo.first_name : '',
        last_name: (parsedUserInfo !== null && parsedUserInfo.last_name) ? parsedUserInfo.last_name : '',
        email: (parsedUserInfo !== null && parsedUserInfo.email) ? parsedUserInfo.email : '',
    })
    const [snackBarInfo, setSnackBarInfo] = React.useState({
        isSnackBarOpen: false,
        snackBarText: "",
        snackBarSeverity: "success",
    });

    useEffect(() => {
        if(masterData == null) {
            props.fetchMasterData()
        }
    })

    const updateOtpFormValues = (formKey, formValues) => {
        const obj = { ...otpForm };
        obj[formKey] = formValues;

        if ((obj["errorMessages"] !== null) && (obj["errorMessages"].length > 0)) {
            obj["errorMessages"] = "";
        }

        setOtpForm(obj)
    }

    const resendOtp = async () => {

        setOtpForm({
            ...otpForm,
            errorMessages: "",
        });

        if ((otpForm.mobileNumber.length > 0) && (otpForm.mobileNumber !== "999999999")) {
            const resendOtpResp = await api.CORE_URI().post("auth/resendOtp", {
                mobile: otpForm.mobileNumber
            });

            if (Object.keys(resendOtpResp).length > 0 && resendOtpResp.data.success === true) {
                setSnackBarInfo({
                    isSnackBarOpen: true,
                    snackBarText: "Otp sent successfully.",
                    snackBarSeverity: "success",
                });
            }
        } else {
            setOtpForm({
                ...otpForm,
                errorMessages: "Please enter a valid mobile number",
            });
        }

    }

    const verifyOtp = async () => {
        
        if ((otpForm.mobileNumber.length > 0) && (otpForm.mobileNumber !== "999999999")) {
            const verifyOtpResp = await api.CORE_URI().post("auth/verifyOtp", {
                mobile: otpForm.mobileNumber,
                title: otpForm.title,
                first_name: otpForm.first_name,
                last_name: otpForm.last_name,
                email: otpForm.email,
                otp: otpForm.otpValue,
            });

            if (Object.keys(verifyOtpResp).length > 0 && (verifyOtpResp.data.success === true)) {
                updateUserHashedKey(verifyOtpResp.data.hashedKey);
                history.push("/register-process")
                // window.location.href="/register-process";
            } else {
                if (verifyOtpResp.data && (verifyOtpResp.data.success === false) && verifyOtpResp.data.errorMessage) {

                    setOtpForm({
                        ...otpForm,
                        errorMessages: verifyOtpResp.data.errorMessage,
                    });

                }
            }


        } else {
            setOtpForm({
                ...otpForm,
                errorMessages: "Please enter a valid mobile number",
            });

        }
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
        <div className={classes.rootFull}>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
            </Helmet>
            <div className={classes.containerSide}>
                <Hidden smDown>
                    <div className={classes.opening} style={{ width: '39%' }}>
                        <div className={classes.openingWrap}>
                            <div className={classes.openingHead}>
                                <div className={classes.brand}>
                                    {/* <img src={logo} alt={brand.name} /> */}
                                    {brand.name}
                                </div>
                            </div>
                            <Typography variant="h3" component="h1" className={classes.opening} gutterBottom>
                                <FormattedMessage {...messages.greetingTitle} />
                            </Typography>
                            <Typography variant="h6" component="p" className={classes.subpening}>
                                <FormattedMessage {...messages.greetingSubtitle} />
                            </Typography>
                        </div>
                    </div>
                </Hidden>
                <div className={classes.sideFormWrap}>
                    <OtpForm
                        updateOtpFormValues={updateOtpFormValues}
                        verifyOtp={verifyOtp}
                        resendOtp={resendOtp}
                        otpForm={otpForm}
                        userObj={userObj}
                        masterData={masterData}
                    />
                </div>
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
        </div>
    );
}

Otp.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.any,
};

const mapStateToProps = state => ({
    masterData: state.get('dashboardReducer').masterData,
});

export default connect(mapStateToProps, { updateUserHashedKey, fetchMasterData })(withStyles(styles)(Otp));
