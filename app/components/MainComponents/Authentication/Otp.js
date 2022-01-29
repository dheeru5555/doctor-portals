import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import OtpInput from 'react-otp-input';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import brand from 'enl-api/dummy/brand';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Toolbar from '@material-ui/core/Toolbar';
import PhoneAndroidOutlined from '@material-ui/icons/PhoneAndroidOutlined';
import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { injectIntl } from 'react-intl';
import { closeMsgAction } from 'enl-redux/actions/authActions';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import styles from './user-jss';
import history from '../../../utils/history';

const OtpWrapper = styled('div')`
  label + .MuiInput-formControl {
    margin-top: 0;
  }
  .MuiInputLabel-formControl {
    top: -5px;
  }
`;

function OtpForm(props) {
  const {
    classes,
    otpForm,
    updateOtpFormValues,
    verifyOtp,
    resendOtp,
    userObj,
    masterData
  } = props;

  const [seconds, setSeconds] = React.useState(5);

  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      setSeconds(
        <Typography
          component="span"
          className={classes.buttonLink}
          style={{ color: '#5A8DEE', textDecoration: 'underline', cursor: 'pointer' }}
          onClick={async () => await resendOtp()}
        >
          Resend OTP
        </Typography>
      );
    }
  });

  const routeChange = () => {
    const path = '/register';
    history.push({
      pathname: path,
      state: {
        title: userObj.title,
        first_name: userObj.first_name,
        last_name: userObj.last_name,
        email: userObj.email
      }
    });
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Paper className={classes.sideWrap} style={{ paddingLeft: 100, paddingRight: 100 }}>
      <Hidden mdUp>
        <div className={classes.headLogo}>
          <div className={classes.brand}>
            {/* <img src={logo} alt={brand.name} /> */}
            {brand.name}
          </div>
        </div>
      </Hidden>
      <div className={classes.topBar}>
        <Typography variant="h4" className={classes.title}>
          Verify Otp
        </Typography>
      </div>
      <OtpWrapper>
        <Grid container justify="center">
          <Grid item sm={7}>

            <div className={classes.positionRelative}>
              <FormControl className={classes.formControl}>
                <TextField
                  name="mobile"
                  placeholder="+91 9999999999"
                  value={otpForm.mobileNumber}
                  disabled
                  className={classes.field}
                  style={{ background: '#f5f5f5' }}
                />
              </FormControl>
              <label className={classes.changeNumber} onClick={routeChange}>Change</label>
            </div>
            <div style={{ textAlign: 'center' }}>
              <label className={classes.note}>*Kindly enter Four digit OTP sent to your Mobile Number</label>
              <OtpInput
                onChange={(otpVal) => updateOtpFormValues('otpValue', otpVal)}
                value={otpForm.otpValue}
                numInputs={4}
                isInputNum
                separator={<span>-</span>}
                inputStyle={classes.inputStyle}
                containerStyle={classes.containerStyle}
                hasErrored={
                  !!(((otpForm.errorMessages !== null)
                    && otpForm.errorMessages.length > 0))
                }
                errorStyle={{
                  borderColor: '#ff2100'
                }}
              />
              {
                ((otpForm.errorMessages !== null) && (otpForm.errorMessages.length > 0))
                && (
                  <label style={{
                    color: '#ff2100',
                    fontSize: 16,
                  }}
                  >
                    {otpForm.errorMessages}
                  </label>
                )
              }

            </div>
            <div align="right">
              <Typography style={{ marginTop: 15 }}>
                Didn't receive OTP?
                {seconds}
              </Typography>
            </div>
            <div className={classes.btnArea} style={{ marginTop: 10 }}>
              <div>
                <Snackbar
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  open={open}
                  autoHideDuration={1000}
                  message="OTP verification Failed"
                  action={(
                    <React.Fragment>
                      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </React.Fragment>
                  )}
                />
              </div>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={async () => await verifyOtp()}
              >
                Continue
                <ArrowForward />
              </Button>
            </div>
          </Grid>
        </Grid>
      </OtpWrapper>
      <Toolbar style={{
        marginBottom: '10',
        width: '70%',
        bottom: 15,
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
              <a href={masterData !== null ? `tel:+91-${masterData.phone}` : ""} style={{ textDecoration: 'none', color: '#ff2100' }}>+91-{masterData !== null ? masterData.phone : ""}</a>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} align="left">
            <MailOutlineOutlined fontSize="small" style={{ marginRight: 5 }} />
            <Link component="button" variant="body2">
              <a href={masterData !== null ? `mailto:${masterData.email}` : ""} style={{ textDecoration: 'none', color: '#ff2100', textTransform: 'lowercase' }}>{masterData !== null ? masterData.email : ""}</a>
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </Paper>
  );
}
OtpForm.defaultProps = {
  messagesAuth: null,
};

OtpForm.propTypes = {
  classes: PropTypes.object,
  messagesAuth: PropTypes.string,
  closeMsg: PropTypes.func,
  updateOtpFormValues: PropTypes.func,
  verifyOtp: PropTypes.func,
  resendOtp: PropTypes.func,
  otpForm: PropTypes.exact({
    mobileNumber: PropTypes.string,
    otpValue: PropTypes.string,
    errorMessages: PropTypes.string,
  })
};
export default withStyles(styles)(injectIntl(OtpForm));
