import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import PhoneAndroidOutlined from '@material-ui/icons/PhoneAndroidOutlined';
import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import brand from 'enl-api/dummy/brand';
import TextField from '@material-ui/core/TextField';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Toolbar from '@material-ui/core/Toolbar';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import history from "../../../utils/history";
import styles from './user-jss';
import API from "../../../helpers/api";

// initialization
const api = new API();

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
    return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function LoginForm(props) {
    const { classes, masterData } = props;

    const [resetPasswordText, setResetPasswordText] = useState("");
    const [resetError, setResetError] = useState("");
    const [snackBarInfo, setSnackBarInfo] = React.useState({
        isSnackBarOpen: false,
        snackBarText: '',
        snackBarSeverity: 'success',
    });

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

    const onInputChange = (resetText) => setResetPasswordText(resetText);

    const handleSendPasswordClick = async () => {
        await api.CORE_URI().post("auth/forgotPassword", {
            "username": resetPasswordText,
        }).then((resetResponse) => {
            if (resetResponse && resetResponse.status === 200 && resetResponse.data.success) {
                setResetPasswordText("")
                setSnackBarInfo({
                    isSnackBarOpen: true,
                    snackBarText: 'Password Sent Successfully',
                    snackBarSeverity: 'success',
                });
                // history.push("/login");
            } else if (resetResponse.data.errorMessage) {
                setResetError(resetResponse.data.errorMessage)
                setSnackBarInfo({
                    isSnackBarOpen: true,
                    snackBarText: resetResponse.data.errorMessage,
                    snackBarSeverity: 'error',
                });
            } else {
                setResetError("Internal Server Error");
                setSnackBarInfo({
                    isSnackBarOpen: true,
                    snackBarText: resetResponse.data.errorMessage,
                    snackBarSeverity: 'error',
                });

            }
        }).catch((err) => {
            setResetError("Internal Server Error");
            setSnackBarInfo({
                isSnackBarOpen: true,
                snackBarText: resetResponse.data.errorMessage,
                snackBarSeverity: 'error',
            });
        });

    }

    return (
        <Paper className={classes.sideWrap}>
            <Hidden mdUp>
                <div className={classes.headLogo}>
                    <div className={classes.brand}>
                        {brand.name}
                    </div>
                </div>
            </Hidden>
            <div className={classes.topBar} style={{ marginTop: -100 }}>
                <Typography variant="h4" className={classes.title}>
                    Reset Password
                </Typography>
                <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/login">
                    <ArrowForward className={classes.icon} />
                    Login
                </Button>
            </div>
            <Grid container justify="center">
                <Grid item sm={10}>
                    <section className={classes.pageFormSideWrap}>
                        <Typography variant="body2">
                            Enter the email id and we will send the password on your mail.
                        </Typography>
                        <div>
                            <TextField
                                id="standard-basic"
                                fullWidth
                                label="Email or Phone No"
                                value={resetPasswordText}
                                error={(resetError.length > 0) ? true : false}
                                helperText={(resetError.length > 0) ? resetError : ""}
                                onChange={(e) => onInputChange(e.target.value)}
                            />
                        </div>
                        <div className={classes.btnArea}>
                            <Button
                                variant="contained"
                                fullWidth
                                color="primary"
                                size="large"
                                disabled={resetPasswordText.length === 0}
                                onClick={async () => await handleSendPasswordClick()}
                            >
                                Send Password
                            </Button>
                        </div>
                    </section>
                </Grid>
            </Grid>
            <Toolbar style={{
                marginTop: '10',
                marginBottom: '10',
                width: '70%',
                bottom: 5,
                left: '15%',
                position: 'absolute',
                backgroundColor: '#f6f6f6'
            }}
            >
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} align="center">
                        <Typography variant="subtitle2" align="center">
                            Why not speak or write to our team, we will be happy to assist
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} align="right" style={{ paddingRight: 35 }}>
                        <PhoneAndroidOutlined fontSize="small" style={{ marginRight: 5 }} />
                        <Link tel="+91-9087654321" component="button" variant="body2">
                            <a href={masterData !== null ? `tel:+91-${masterData.phone}` : ""} style={{textDecoration: 'none', color: '#ff2100'}}>+91-{masterData !== null ? masterData.phone : ""}</a>
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={6} align="left">
                        <MailOutlineOutlined fontSize="small" style={{ marginRight: 5 }} />
                        <Link component="button" variant="body2">
                            <a href={masterData !== null ? `mailto:${masterData.email}` : ""} style={{textDecoration: 'none', color: '#ff2100', textTransform: 'lowercase'}}>{masterData !== null ? masterData.email : ""}</a>
                        </Link>
                    </Grid>
                </Grid>
            </Toolbar>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={snackBarInfo.isSnackBarOpen}
                autoHideDuration={2000000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    severity={snackBarInfo.snackBarSeverity}
                    onClose={handleSnackbarClose}
                >
                    {snackBarInfo.snackBarText}
                </Alert>
            </Snackbar>
        </Paper>
    );
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    intl: intlShape,
    messagesAuth: PropTypes.string,
    loading: PropTypes.bool,
    closeMsg: PropTypes.func,
};

LoginForm.defaultProps = {
    messagesAuth: null,
    loading: false,
};

export default withStyles(styles)(injectIntl(LoginForm));
