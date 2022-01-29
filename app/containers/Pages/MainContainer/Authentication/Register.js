import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import { RegisterForm } from 'enl-components';
import styles from './user-jss';
import brand from 'enl-api/dummy/brand';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import API from "../../../../helpers/api";
import history from "../../../../utils/history";
import { connect } from "react-redux";
import { submitDoctorRegInfo } from "../../../../redux/actions/authActions";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { fetchMasterData } from '../../../../redux/actions/dashboardActions';

// initialization
const api = new API();
let parsedUserInfo = JSON.parse(localStorage.getItem("registerObj"))

function Register(props) {
    const { classes, submitDoctorRegInfo } = props;
    const { location } = props.history;
    const title = brand.name + ' - Register';
    const description = brand.desc;
    const [registerFormValues, setRegisterFormValues] = useState({
        title: "Dr",
        first_name: "",
        last_name: "",
        mobile: "",
        email: "",
        errorMessages: null,
    });

    const [snackBarInfo, setSnackbarInfo] = useState({
        isSnackBarOpen: false,
        snackBarText: "",
        snackBarSeverity: "success",
    });

    useEffect(() => {
        if (props.masterData == null) {
            props.fetchMasterData()
        }
    })

    useEffect(() => {
        if (location.state && location.state.title && location.state.first_name && location.state.last_name && location.state.email) {
            setRegisterFormValues({
                title: location.state.title,
                first_name: location.state.first_name,
                last_name: location.state.last_name,
                mobile: "",
                email: location.state.email,
                errorMessages: null,
            })
        }
    })

    const handleRegisterFormInputChange = (formKey, formValues) => {
        const obj = { ...registerFormValues };

        if ((obj["errorMessages"] !== null) && (obj["errorMessages"][formKey])) {
            delete obj["errorMessages"][formKey];
        }

        obj[formKey] = formValues;
        setRegisterFormValues(obj);
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

    const handleRegisterFormSubmit = async () => {

        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var mobileFormat = /^[6-9]\d{9}$/;

        if ((registerFormValues.first_name === "") &&
            (registerFormValues.last_name === "") &&
            (registerFormValues.mobile === "") &&
            (registerFormValues.email === "")
        ) {
            setRegisterFormValues({
                ...registerFormValues,
                errorMessages: {
                    ...registerFormValues.errorMessages,
                    first_name: ["Please enter a first name"],
                    last_name: ["Please enter a last name"],
                    mobile: ["Please enter a mobile number"],
                    email: ["Please enter an email address"],
                }
            });
            return;
        } else if (registerFormValues.first_name === "") {
            setRegisterFormValues({
                ...registerFormValues,
                errorMessages: {
                    ...registerFormValues.errorMessages,
                    first_name: ["Please enter a first name"],
                }
            });

            return;
        } else if (registerFormValues.last_name === "") {
            setRegisterFormValues({
                ...registerFormValues,
                errorMessages: {
                    ...registerFormValues.errorMessages,
                    last_name: ["Please enter a last name"],
                }
            });

            return;
        } else if (registerFormValues.email === "") {
            setRegisterFormValues({
                ...registerFormValues,
                errorMessages: {
                    ...registerFormValues.errorMessages,
                    email: ["Please enter a Email Address"],
                }
            });

            return;
        } else if (registerFormValues.mobile === "") {
            setRegisterFormValues({
                ...registerFormValues,
                errorMessages: {
                    ...registerFormValues.errorMessages,
                    mobile: ["Please enter an Mobile Number"],
                }
            });

            return;
        } else if (!registerFormValues.email.match(mailformat)) {
            setRegisterFormValues({
                ...registerFormValues,
                errorMessages: {
                    ...registerFormValues.errorMessages,
                    email: ["You have entered an invalid email address!"],
                }
            });

            return;
        } else if (!registerFormValues.mobile.match(mobileFormat)) {
            setRegisterFormValues({
                ...registerFormValues,
                errorMessages: {
                    ...registerFormValues.errorMessages,
                    mobile: ["You have entered an invalid Mobile Number!"],
                }
            });

            return;
        }

        const registerObj = {
            title: registerFormValues.title,
            first_name: registerFormValues.first_name,
            last_name: registerFormValues.last_name,
            mobile: registerFormValues.mobile,
            email: registerFormValues.email,
        };

        const registerResp = await api.CORE_URI().post("auth/register", registerObj);

        if ((Object.keys(registerResp.data).length > 0) && (registerResp.data.success === true)) {
            submitDoctorRegInfo(registerObj);
            localStorage.setItem("registerObj", JSON.stringify(registerObj));
            history.push({
                pathname: "/otp",
                state: {
                    mobileNumber: registerFormValues.mobile,
                    title: registerFormValues.title,
                    first_name: registerFormValues.first_name,
                    last_name: registerFormValues.last_name,
                    email: registerFormValues.email,
                }
            })
        } else {
            if (registerResp.data && (registerResp.data.success === false) && registerResp.data.errorMessage) {

                setRegisterFormValues({
                    ...registerFormValues,
                    errorMessages: {
                        ...registerFormValues.errorMessages,
                        ...registerResp.data.errorMessage
                    }
                });

                if(registerResp.data.errorMessage.email) {
                    setRegisterFormValues({
                        ...registerFormValues,
                        errorMessages: {
                            ...registerFormValues.errorMessages,
                            ...registerResp.data.errorMessage
                        }
                    });
                }

                console.log(registerResp.data.errorMessage)

                if(typeof registerResp.data.errorMessage === 'string') {
                    setSnackbarInfo({
                        isSnackBarOpen: true,
                        snackBarText: registerResp.data.errorMessage,
                        snackBarSeverity: "error",
                    })
                }

            }
        }
    }

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
                    <RegisterForm
                        registerFormValues={registerFormValues}
                        handleRegisterFormSubmit={handleRegisterFormSubmit}
                        handleRegisterFormInputChange={handleRegisterFormInputChange}
                        masterData={props.masterData}
                    />
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
        </div>
    );
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
    submitDoctorRegInfo: PropTypes.any,
};

const mapStateToProps = state => ({
    masterData: state.get('dashboardReducer').masterData,
});

export default connect(mapStateToProps, { submitDoctorRegInfo, fetchMasterData })(withStyles(styles)(Register));
