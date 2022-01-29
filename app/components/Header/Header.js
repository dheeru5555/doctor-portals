import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import FullscreenOutlined from '@material-ui/icons/FullscreenOutlined';
import FullscreenExitOutlined from '@material-ui/icons/FullscreenExitOutlined';
import TextField from '@material-ui/core/TextField';
import Lock from '@material-ui/icons/Lock';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { NavLink, Link } from 'react-router-dom';
import brand from 'enl-api/dummy/brand';
import logo from 'enl-images/0001.jpg';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import menuMessages from 'enl-api/ui/menuMessages';
import link from 'enl-api/ui/link';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styled from 'styled-components';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import styles from './header-jss';
import messages from './messages';
import SearchUi from '../Search/SearchUi';
import UserMenu from './UserMenu';
import API from '../../helpers/api';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllClinics } from 'enl-redux/actions/profileActions'
import { featchWakingList, featchOnlineList } from 'enl-redux/actions/BillingAction';
import { fetchBookedAppointments, fetchQueedAppointments, fetchWaitListAppointments, fetchCheckedOutAppointments, fetchNoshowAppointment, fetchPausedAppointments, setSelectedQueueId, updateAPI } from '../../redux/actions/appointmentAction';
import { fatchDashboard } from 'enl-redux/actions/dashboardActions';

// initialization
const api = new API();

const LanguageWrapper = styled('div')`
  // .MuiAutocomplete-inputRoot {
  //   padding: 6px !important;
  //   border-radius: 8px;
  // }
  // .MuiAutocomplete-endAdornment {
  //   padding-top: 0;
  // }
  // label {
  //   top: 11px !important;
  // }
  .MuiAutocomplete-inputRoot .MuiAutocomplete-input {
    min-width: 160px;
  }
  fieldset {
    border: none;
  }
  .MuiAutocomplete-hasPopupIcon .MuiAutocomplete-inputRoot[class*="MuiFilledInput-root"], .MuiAutocomplete-hasClearIcon .MuiAutocomplete-inputRoot[class*="MuiFilledInput-root"] {
    padding: 1px 0;
    border-radius: 10px;
  }
  .MuiFilledInput-underline:before {
    border-bottom: none;
  }
  .MuiFilledInput-underline:after {
    border-bottom: none;
  }
  .MuiFilledInput-underline:hover:before {
    border: none;
  }
  .MuiFilledInput-root {
    background: rgba(0, 0, 0, 0.05);
  }
  input {
    font-size: 15px;
    padding-left: 15px !important;
    padding-right: 15px !important;
  }
  .MuiChip-outlined {
    width: 100px;
  }
  .MuiInputBase-root {
    padding-top: 1px !important;
    padding-bottom: 1px !important;
    background: #f5f5f5;
    border-radius: 8px;
  }
`;

const elem = document.documentElement;

function Header(props) {
  const localUserInfo = localStorage.getItem('userInfo')
  const parsedUserInfo = JSON.parse(localUserInfo)

  const isFrontdesk = parsedUserInfo ? parsedUserInfo.frontdesk : false;
  const isVerified = parsedUserInfo ? parsedUserInfo.verified : false;

  const {
    classes,
    toggleDrawerOpen,
    margin,
    title,
    history,
    signOut,
    dense,
    isLogin,
    avatar,
    intl,
  } = props;
  const [open] = useState(false);
  const dispatch = useDispatch();
  const selectState = useSelector((state) => state.toJS());
  const { profileReducer } = selectState;
  const [fullScreen, setFullScreen] = useState(false);
  const [turnDarker, setTurnDarker] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [clinics, setClinics] = useState([]);
  const [selectedClinics, setSelectedClinics] = useState([]);
  const [selectedFrontdesk, setSelectedFrontdesk] = useState(localStorage.getItem("cr_id"));
  const [sc, setSc] = useState([]);
  const [snackBarInfo, setSnackBarInfo] = useState({
    isSnackBarOpen: false,
    snackBarText: '',
    snackBarSeverity: 'success',
  });

  useEffect(() => {
    if (!isFrontdesk) {
      dispatch(fetchAllClinics());
    }
    getSelectedDoctor()
    fetchSelectedClincs()
  }, [])

  useEffect(() => {
    if (profileReducer.clinicDetails) {
      df()
    }
  }, [profileReducer.clinicDetails]);

  const df = () => {
    let clinics = profileReducer.clinicDetails.map((clinic) => {
      return ({
        id: clinic.id,
        name: clinic.name
      })
    })

    setClinics(clinics)
  }
  let headerClinics = [];

  const fetchSelectedClincs = () => {
    let storedClinics = localStorage.getItem('selectedClinics')
    let parsedClinics = storedClinics !== '' ? JSON.parse(storedClinics) : []
    setSelectedClinics(parsedClinics)
    headerClinics = parsedClinics;
  }

  // Initial header style
  let flagDarker = false;
  let flagTitle = false;

  const handleScroll = () => {
    const doc = document.documentElement;
    const scroll = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    const newFlagDarker = (scroll > 30);
    const newFlagTitle = (scroll > 40);
    if (flagDarker !== newFlagDarker) {
      setTurnDarker(newFlagDarker);
      flagDarker = newFlagDarker;
    }
    if (flagTitle !== newFlagTitle) {
      setShowTitle(newFlagTitle);
      flagTitle = newFlagTitle;
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

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const lockScreen = () => {
    const path = '/lock-screen';
    history.push(path);
  };

  const logout = async () => {
    await api.ACCOUNTS_URI().post('auth/logout')
      .then((logoutResp) => {
        if (logoutResp.status === 200) {
          localStorage.removeItem('userInfo');
          localStorage.removeItem('selectedClinics');
          localStorage.clear();
          history.push('/login');
          window.location.reload();
        } else {
          setSnackBarInfo({
            isSnackBarOpen: true,
            snackBarText: 'Could not logout. Please try again later.',
            snackBarSeverity: 'error',
          });
        }
      })
      .catch((err) => {
        setSnackBarInfo({
          isSnackBarOpen: true,
          snackBarText: 'Could not logout. Please try again later.',
          snackBarSeverity: 'error',
        });
      });
  };

  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });


  function formatDate() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  const handleChange = (newValue) => {
    let stringify = JSON.stringify(newValue)
    localStorage.setItem("selectedClinics", stringify)
    let localClinics = localStorage.getItem("selectedClinics")
    let parsedClinics = JSON.parse(localClinics)

    // props.updateAPI(false);
    props.fetchBookedAppointments()
    props.fetchQueedAppointments()
    props.fetchWaitListAppointments()
    props.fetchCheckedOutAppointments()
    props.fetchNoshowAppointment()
    props.fetchPausedAppointments()
    dispatch(props.fatchDashboard())
    props.featchWakingList({
      sortby: 'patient_name',
      sortorder: 'desc',
      page: '1',
      date_range: `${formatDate()} - ${formatDate()}`,
      length: 10,
      clinic_id: parsedClinics.length == 0 ? [] : parsedClinics.map((clinic) => clinic.id)
    })
  };

  const getSelectedDoctor = () => {
    if (isFrontdesk && (localStorage.getItem("cr_id") !== "")) {
      console.log("skdj4")
      let tag = parsedUserInfo.frontdesk_tags.filter((tag) => tag.id == localStorage.getItem("cr_id"))
      localStorage.setItem("selectedTag", JSON.stringify(tag[0]))
    } else {
      console.log("skdj5")
      localStorage.setItem("selectedTag", '')
    }
  }


  const handleFrontdeskChange = (e) => {
    console.log("cr_id")
    setSelectedFrontdesk(e.target.value)
    localStorage.setItem("cr_id", e.target.value)
    getSelectedDoctor()
    props.fetchBookedAppointments()
    props.fetchQueedAppointments()
    props.fetchWaitListAppointments()
    props.fetchCheckedOutAppointments()
    props.fetchNoshowAppointment()
    props.fetchPausedAppointments()
    props.fetchPausedAppointments()
    props.featchWakingList({
      sortby: 'patient_name',
      sortorder: 'desc',
      page: '1',
      date_range: `${formatDate()} - ${formatDate()}`,
      length: 10,
      cr_id: e.target.value
    })
    if (JSON.parse(localStorage.getItem("selectedTag") !== '')) {
      if (JSON.parse(localStorage.getItem("selectedTag")).access_array.length == 0) {
        history.push("/app/profile")
        console.log("skdj")
      } else {
        window.location.reload();
        console.log("skdj2")
      }
    }
  }

  return (
    <AppBar
      className={classNames(
        classes.appBar,
        classes.darker,
        classes.floatingBar,
        margin && classes.appBarShift,
      )}
    >
      <Toolbar disableGutters={!open}>
        <div className={classNames(classes.brandWrap, dense && classes.dense)}>
          <span className={classes.dtNone}>
            <IconButton
              className={classes.menuButton}
              aria-label="Menu"
              onClick={toggleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </span>
          <Hidden smDown>
            <div style={{ paddingBottom: 0 }} className={classNames(classes.brand, classes.brandBar)}>
              <img src={logo} alt={brand.name} />
            </div>
          </Hidden>
        </div>
        <Hidden smDown>
          <div className={classes.headerProperties}>

            <h2
              className={classNames(
                classes.headerTitle, classes.show,
              )}
              style={{
                top: 16, left: 16, fontSize: '1rem', margin: 0
              }}
            >
              {title}
            </h2>
          </div>
        </Hidden>

        <Hidden xsDown>
          <span className={classes.separatorV} />
        </Hidden>
        {isFrontdesk ? (
          <>
            <FormControl className={classes.formControl}>
              <Select
                native
                value={selectedFrontdesk}
                style={{ paddingRight: 34, marginLeft: 16 }}
                onChange={handleFrontdeskChange}
              >
                <option value="">Select Doctor</option>
                {parsedUserInfo.frontdesk_tags.map((tag) => {
                  return (
                    <option key={tag.id} value={tag.id}>{tag.doctor.first_name} {tag.doctor.last_name} - {tag.clinic.name}</option>
                  )
                })}
              </Select>
            </FormControl>
          </>
        ) : (
          <>
            {isVerified && profileReducer.clinicDetails !== null ? (
              <LanguageWrapper>
                <Autocomplete
                  multiple
                  limitTags={2}
                  id="multiple-limit-tags"
                  options={clinics}
                  getOptionLabel={(option) => option.name}
                  defaultValue={JSON.parse(localStorage.getItem('selectedClinics')) !== null ? JSON.parse(localStorage.getItem('selectedClinics')) : []}
                  onChange={(event, newValue) => handleChange(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" placeholder="Choose Location" />
                  )}
                />
              </LanguageWrapper>
            ) : ''}
          </>
        )}
        <div className={classes.userToolbar}>
          {isLogin
            ? <UserMenu signOut={signOut} avatar={avatar} />
            : (
              <Button
                color="primary"
                className={classes.buttonTop}
                component={Link}
                to={link.profile}
                variant="contained"
              >
                <AccountCircle />
                <FormattedMessage {...messages.account} />
              </Button>
            )
          }
          <Tooltip title="Logout" placement="bottom">
            <IconButton className={classes.button} onClick={logout}>
              <PowerSettingsNew />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>

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

    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawerOpen: PropTypes.func.isRequired,
  avatar: PropTypes.string.isRequired,
  margin: PropTypes.bool.isRequired,
  isLogin: PropTypes.bool,
  dense: PropTypes.bool,
  mode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  openGuide: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

Header.defaultProps = {
  dense: false,
  isLogin: false
};

const mapStateToProps = state => ({
  bookedAppointments: state.get('appointmentReducer').bookedAppointments,
  bookedAppointmentsAllData: state.get('appointmentReducer').bookedAppointmentsAllData,
});

export default connect(mapStateToProps, { fetchBookedAppointments, fetchQueedAppointments, fetchWaitListAppointments, fetchCheckedOutAppointments, fetchNoshowAppointment, fetchPausedAppointments, updateAPI, fatchDashboard, featchWakingList })(withStyles(styles)(injectIntl(Header)));
