import React, { Fragment } from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import Fade from '@material-ui/core/Fade';
import { withStyles } from '@material-ui/core/styles';
import {
  Header,
  SidebarBig,
} from 'enl-components';
import dataMenu from 'enl-api/ui/menu';
import frontdeskMenu from 'enl-api/ui/frontdeskMenu';
import {
  injectIntl,
} from 'react-intl';
import styles from '../appStyles-jss';

function LeftSidebarBigLayout(props) {
  const {
    classes,
    children,
    toggleDrawer,
    sidebarOpen,
    loadTransition,
    pageLoaded,
    mode,
    history,
    changeMode,
    place,
    handleOpenGuide,
    signOut,
    userAttr,
    isLogin
  } = props;

  let filterdMenu = [];
  let index = 0
  const localUserInfo = localStorage.getItem('userInfo')
  const parsedUserInfo = JSON.parse(localUserInfo)

  const isFrontdesk = parsedUserInfo ? parsedUserInfo.frontdesk : false;

  const userExists = (name) => {
    return filterdMenu.some(function(el) {
      return el.name === name;
    }); 
  }

  if (localStorage.getItem("cr_id") !== "") {
    if (parsedUserInfo) {
      index = parsedUserInfo.frontdesk_tags.findIndex((data) => data.id == localStorage.getItem("cr_id"))
    }
  }

  if (isFrontdesk && localStorage.getItem("cr_id") !== "") {
    frontdeskMenu.map((menu) => {
      parsedUserInfo.frontdesk_tags[index].access_array.map((localMenu) => {
        if (menu.permissionKey.includes(localMenu)) {
          if(!userExists(menu.name)) {
            filterdMenu.push(menu)
          }
        }
      })
    })

  } else {
    filterdMenu = []
  }


  return (
    <Fragment>
      <Header
        toggleDrawerOpen={toggleDrawer}
        margin={sidebarOpen}
        changeMode={changeMode}
        mode={mode}
        title={place}
        history={history}
        openGuide={handleOpenGuide}
        signOut={signOut}
        dense
        isLogin={isLogin}
        avatar={userAttr.avatar}
      />
      {isFrontdesk ? (
        <>
          {filterdMenu.length == 0 ? ('') : (
            <SidebarBig
              dataMenu={filterdMenu}
              loadTransition={loadTransition}
              open={sidebarOpen}
              userAttr={userAttr}
              toggleDrawerOpen={toggleDrawer}
            />            
          )}
        </>
      ) : (
        <SidebarBig
          dataMenu={dataMenu}
          loadTransition={loadTransition}
          open={sidebarOpen}
          userAttr={userAttr}
          toggleDrawerOpen={toggleDrawer}
        />
      )}
      <main className={classNames(classes.content, !sidebarOpen ? classes.contentPaddingLeftSm : '')} id="mainContent">
        <section className={classNames(classes.mainWrap, classes.sidebarLayout)}>

          {!pageLoaded && (<img src="/images/spinner.gif" alt="spinner" className={classes.circularProgress} />)}
          <Fade
            in={pageLoaded}
            {...(pageLoaded ? { timeout: 700 } : {})}
          >
            <div className={!pageLoaded ? classes.hideApp : ''}>
              {/* Application content will load here */}
              {children}
            </div>
          </Fade>
        </section>
      </main>
    </Fragment>
  );
}

LeftSidebarBigLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  history: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  changeMode: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  titleException: PropTypes.array.isRequired,
  handleOpenGuide: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  isLogin: PropTypes.bool,
  userAttr: PropTypes.object.isRequired,
};

LeftSidebarBigLayout.defaultProps = {
  isLogin: false
};

export default (withStyles(styles)(injectIntl(LeftSidebarBigLayout)));
