import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { toggleAction, openAction, playTransitionAction } from 'enl-redux/actions/uiActions';
import { logout } from 'enl-redux/actions/authActions';
import dummy from 'enl-api/dummy/dummyContents';
import LeftSidebarBigLayout from './layouts/LeftSidebarBig';
import styles from './appStyles-jss';
import Loading from 'enl-components/Loading';
import {
  fetchMasterData, fetchSuperSpecializations,
  fetchImageOrDocument
} from "../../redux/actions/dashboardActions";

function Dashboard(props) {
  const {
    initialOpen,
    classes,
    children,
    toggleDrawer,
    sidebarOpen,
    loadTransition,
    pageLoaded,
    mode,
    history,
    layout,
    changeMode,
    signOut,
    user,
    isAuthenticated
  } = props;
  const [appHeight, setAppHeight] = useState(0);
  const [openGuide, setOpenGuide] = useState(false);
  const titleException = ['/app', '/app/crm-dashboard', '/app/crypto-dashboard'];
  const parts = history.location.pathname.split('/');
  let place;
  if(parts.includes("book-appointment")) {
    place = "Book Appointment"
  }else {
    place = parts[parts.length - 1].replace('-', ' ');
  }
  const profile = userProfile => {
    if (userProfile) {
      return {
        avatar: userProfile.photoURL || dummy.user.avatar,
        name: userProfile.displayName
      };
    }
    return {
      avatar: dummy.user.avatar,
      name: dummy.user.name
    };
  };

  const handleOpenGuide = () => {
    setOpenGuide(true);
  };

  const handleCloseGuide = () => {
    setOpenGuide(false);
  };

  useEffect(() => {
    // Adjust min height
    setAppHeight(window.innerHeight + 112);

    // Set expanded sidebar menu
    const currentPath = history.location.pathname;
    initialOpen(currentPath);
    // Play page transition
    loadTransition(true);

    // making necessary api calls
    if ((props.masterData === undefined) || (props.masterData === null)) {
      props.fetchMasterData();
    }

    if ((props.superSpecialization === undefined) || (props.superSpecialization === null)) {
      props.fetchSuperSpecializations();
    }

    if ((props.imagesOrDocs === undefined) || (props.imagesOrDocs === null)) {
      props.fetchImageOrDocument();
    }

    // Execute all arguments when page changes
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
      setTimeout(() => {
        loadTransition(true);
      }, 500);
    });

    return () => {
      unlisten();
    };
  }, []);


  if (
    props.masterData === null ||
    props.superSpecialization === null ||
    props.imagesOrDocs === null
  ) {
    <Loading />
  }

  return (
    <div
      // style={{ minHeight: appHeight }}
      className={
        classNames(
          classes.appFrameInner,
          layout === 'top-navigation' || layout === 'mega-menu' ? classes.topNav : classes.sideNav,
          mode === 'dark' ? 'dark-mode' : 'light-mode'
        )
      }
    >
      {/* <GuideSlider openGuide={openGuide} closeGuide={handleCloseGuide} /> */}

      { /* Left Big-Sidebar Layout */
        layout === 'big-sidebar' && (
          <LeftSidebarBigLayout
            history={history}
            toggleDrawer={toggleDrawer}
            loadTransition={loadTransition}
            changeMode={changeMode}
            sidebarOpen={sidebarOpen}
            pageLoaded={pageLoaded}
            mode={mode}
            place={place}
            titleException={titleException}
            handleOpenGuide={handleOpenGuide}
            signOut={signOut}
            isLogin={isAuthenticated}
            userAttr={profile(user)}
          >
            {children}
          </LeftSidebarBigLayout>
        )
      }

    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  initialOpen: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  signOut: PropTypes.func.isRequired,
  layout: PropTypes.string.isRequired,
  masterData: PropTypes.any,
  superSpecialization: PropTypes.any,
  fetchImageOrDocument: PropTypes.any,
};

Dashboard.defaultProps = {
  user: null,
  isAuthenticated: null
};

const reducerUi = 'ui';
const reducerAuth = 'authReducer';
const mapStateToProps = state => ({
  sidebarOpen: state.getIn([reducerUi, 'sidebarOpen']),
  pageLoaded: state.getIn([reducerUi, 'pageLoaded']),
  mode: state.getIn([reducerUi, 'type']),
  layout: state.getIn([reducerUi, 'layout']),
  isAuthenticated: state.get(reducerAuth).loggedIn,
  user: state.get(reducerAuth).user,
  masterData: state.get('dashboardReducer').masterData,
  superSpecialization: state.get('dashboardReducer').superSpecialization,
  imagesOrDocs: state.get('dashboardReducer').imagesOrDocs,
  ...state,
});

const mapDispatchToProps = dispatch => ({
  toggleDrawer: () => dispatch(toggleAction),
  initialOpen: bindActionCreators(openAction, dispatch),
  loadTransition: bindActionCreators(playTransitionAction, dispatch),
  signOut: bindActionCreators(logout, dispatch),
  fetchMasterData: bindActionCreators(fetchMasterData, dispatch),
  fetchSuperSpecializations: bindActionCreators(fetchSuperSpecializations, dispatch),
  fetchImageOrDocument: bindActionCreators(fetchImageOrDocument, dispatch),
});

const DashboardMaped = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default (withStyles(styles)(DashboardMaped));
