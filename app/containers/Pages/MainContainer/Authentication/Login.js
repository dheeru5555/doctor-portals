import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { LoginForm } from 'enl-components';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Loading } from 'enl-components/Loading';
import styles from './user-jss';
import API from '../../../../helpers/api';
import history from '../../../../utils/history';
import { handleUserLogin } from '../../../../redux/actions/profileActions';
import { updateUserHashedKey } from '../../../../redux/actions/authActions';
import AxiosInstantent from '../../../../config/axiosConfig';
import { fetchMasterData } from '../../../../redux/actions/dashboardActions';
// initialization
const api = new API();

function Login(props) {
  const { classes, updateUserHashedKey } = props;
  const title = brand.name + ' - Login';
  const description = brand.desc;
  const [valueForm, setValueForm] = useState({
    userName: '',
    password: '',
    rememberMe: false,
    errorMessages: null,
  });

  const [snackBarInfo, setSnackbarInfo] = useState({
    isSnackBarOpen: false,
    snackBarText: '',
    snackBarSeverity: 'success',
  });

  useEffect(() => {
    if (props.masterData == null) {
      props.fetchMasterData();
    }
  });

  useEffect(() => {
    const userInfoInLocalStorage = localStorage.getItem('userInfo');
    const parsedUserInfo = JSON.parse(userInfoInLocalStorage);

    if (parsedUserInfo !== null) {
      history.push('app/profile');
    }
    if (parsedUserInfo
      && (parsedUserInfo.frontdesk)
      && parsedUserInfo.userId
      && parsedUserInfo.hashedKey
      && (parsedUserInfo.hashedKey.length > 0)
      && (parsedUserInfo.verified !== undefined)
    ) {
      if (parsedUserInfo.frontdesk == true) {
        history.push('/app/appointments');
      } else if (parsedUserInfo.verified == false) {
        history.push('/app/profile');
      } else {
        history.push('/app/dashboard');
      }
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if ((valueForm.userName === '') && (valueForm.password === '')) {
      setValueForm({
        ...valueForm,
        errorMessages: {
          ...valueForm.errorMessages,
          userName: ['Please enter a email or phone number'],
          password: ['Please enter a password'],
        }
      });

      return;
    } if (valueForm.userName === '') {
      setValueForm({
        ...valueForm,
        errorMessages: {
          ...valueForm.errorMessages,
          userName: ['Please enter a username'],
        }
      });

      return;
    } if (valueForm.password === '') {
      setValueForm({
        ...valueForm,
        errorMessages: {
          ...valueForm.errorMessages,
          password: ['Please enter a password'],
        }
      });

      return;
    }

    const loginObj = {
      username: valueForm.userName,
      password: valueForm.password,
    };

    const loginResp = await api.CORE_URI().post('auth/login', loginObj);

    if ((Object.keys(loginResp.data).length > 0) && (loginResp.data.success === true)) {
      props.handleUserLogin(loginResp.data);

      const clinics = [];
      if (loginResp.data.frontdesk) {
        loginResp.data.frontdesk_tags.map((clinic) => {
          clinics.push(clinic.clinic);
        });
      }

      const userInfo = {
        hashedKey: loginResp.data.hashedKey,
        userId: loginResp.data.userId,
        verified: loginResp.data.verified,
        frontdesk: loginResp.data.hasOwnProperty('frontdesk') ? loginResp.data.frontdesk : false,
        frontdesk_tags: loginResp.data.frontdesk_tags,
        clinics,
        cr_id: ''
      };
      AxiosInstantent.defaults.headers.common.Authorization = `Bearer ${loginResp.data.hashedKey}`;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('cr_id', '');
      localStorage.setItem('selectedClinics', JSON.stringify([]));
      localStorage.setItem('selectedTag', '');

      if (loginResp.data.frontdesk == true) {
        history.push('/app/profile');
      } else {
        if (
          (loginResp.data.verified !== undefined)
          && (loginResp.data.verified === false)
        ) {
          history.push('/app/profile');
        } else if (loginResp.data.isSubscribed) {
          history.push('/app/dashboard');
        } else {
          history.push('/subscriptions');
        }
        // if (loginResp.data.isSubscribed) {
        //     if (
        //         (loginResp.data.verified !== undefined) &&
        //         (loginResp.data.verified === false)
        //     ) {
        //         history.push("/app/profile");
        //     } else {
        //         history.push("/app/dashboard");
        //     }
        // } else {
        //     history.push("/subscriptions")
        // }
      }
    } else if (loginResp.data && (loginResp.data.success === false) && loginResp.data.errorMessage) {
      if (
        (loginResp.data.continueRegistration !== undefined)
        && (loginResp.data.continueRegistration === true)
        ) {
        console.log(loginResp)
        const userInfo = {
          hashedKey: loginResp.data.hashedKey,
          userId: loginResp.data.userId,
          email: loginResp.data.email,
          frontdesk: loginResp.data.frontdesk,
          frontdesk_tags: loginResp.data.frontdesk_tags,
          // clinics,
          cr_id: ''
        };
        // localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('email', loginResp.data.email);
        localStorage.setItem('cr_id', '');
        localStorage.setItem('selectedTag', '');
        updateUserHashedKey(userInfo.hashedKey);
        history.push({
          pathname: '/register-process',
          state: {
            currentStep: (loginResp.data.currentStep !== undefined) ? loginResp.data.currentStep : 1
          }
        });
      }

      let errMsg = {};

      if (typeof loginResp.data.errorMessage === 'object') {
        errMsg = {
          ...loginResp.data.errorMessage
        };
      } else {
        // errMsg = {
        //     password: [loginResp.data.errorMessage],
        // };
        setSnackbarInfo({
          isSnackBarOpen: true,
          snackBarText: loginResp.data.errorMessage,
          snackBarSeverity: 'error',
        });
      }

      setValueForm({
        ...valueForm,
        errorMessages: { ...errMsg }
      });
    }
  };

  const updateValueFormFields = (formKey, formValue) => {
    const obj = { ...valueForm };

    if ((obj.errorMessages !== null) && (obj.errorMessages[formKey])) {
      delete obj.errorMessages[formKey];
    }

    obj[formKey] = formValue;
    setValueForm(obj);
  };

  const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarInfo({
      isSnackBarOpen: false,
      snackBarText: '',
      snackBarSeverity: 'success',
    });
  };

  // if(props.masterData == null) {
  //     return <Loading />
  // }

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
          <div className={classes.opening} style={{ width: '35%' }}>
            <div className={classes.openingWrap}>
              <div className={classes.openingHead}>
                <div className={classes.brand}>
                  {/* <img src={logo} alt={brand.name} /> */}
                  {brand.name}
                </div>
              </div>
              <Typography variant="h3" component="h1" gutterBottom>
                <span>Welcome to</span>
                &nbsp;
                {brand.name}
              </Typography>
              <Typography variant="h6" component="p" className={classes.subpening}>
                <span>Please sign in to continue</span>
              </Typography>
            </div>
          </div>
        </Hidden>
        <div className={classes.sideFormWrap}>
          <form onSubmit={handleFormSubmit} action="" style={{ height: '100%' }}>
            <LoginForm
              formValues={valueForm}
              updateValueFormFields={updateValueFormFields}
              handleFormSubmit={handleFormSubmit}
              masterData={props.masterData}
            />
          </form>
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
    </div>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  masterData: state.get('dashboardReducer').masterData,
});

export default connect(mapStateToProps, { handleUserLogin, updateUserHashedKey, fetchMasterData })(withStyles(styles)(Login));
