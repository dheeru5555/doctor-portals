import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from '@material-ui/core/Icon';
import { openMenuAction, closeMenuAction } from 'enl-redux/actions/uiActions';
import { injectIntl, FormattedMessage } from 'react-intl';
import messages from 'enl-api/ui/menuMessages';
import styled from 'styled-components';
import appointmentsIcon from 'enl-images/new-icons/appointment.png';
import appointmentsActiveIcon from 'enl-images/new-icons/appointment-active.png';
import frontdeskIcon from 'enl-images/new-icons/frontdesk.png';
import frontdeskActiveIcon from 'enl-images/new-icons/frontdesk-active.png';
import newAppointmentIcon from 'enl-images/new-icons/add-appointment.png';
import newAppointmentActiveIcon from 'enl-images/new-icons/add-appointment-active.png';
import logComplaintIcon from 'enl-images/new-icons/log-complaint.png';
import logComplaintActiveIcon from 'enl-images/new-icons/log-complaint-active.png';
import billInvoiceIcon from 'enl-images/new-icons/bill-invoice.png';
import billInvoiceActiveIcon from 'enl-images/new-icons/bill-invoice-active.png';
import styles from './sidebarBig-jss';

const SideBarWrapper = styled('div')`
  background: #f5f5f5;
  .active:before {
    top: 0;
    left: -8px;
    width: 5px;
    height: 70px;
    content: "";
    position: absolute;
    background: #ff2100;
    border-radius: 5px;
  }
  .active {
    span {
      color: #ff2100;
    }
  }
`;
const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function MainMenuBig(props) { // eslint-disable-line
  const {
    classes,
    open,
    dataMenu,
    userAttr,
    closeDrawer,
    openDrawer,
    mobile,
  } = props;
  const [selectedMenu, setSelectedMenu] = useState([]);
  // const [menuLoaded, setMenuLoaded] = useState(true);
  const [pathname, setPathname] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  const handleLoadMenu = (menu) => {
    setSelectedMenu(menu);
    // setMenuLoaded(false);

    // Unecessary in mobile, because toggle menu already handled
    if (!mobile) {
      openDrawer();
    }
  };

  const activeMenu = (key, child) => {
    if (selectedMenu.length < 1) {
      if (open.indexOf(key) > -1) {
        return true;
      }
      return false;
    }
    if (child === selectedMenu) {
      return true;
    }
    return false;
  };

  const getMenus = menuArray => menuArray.map((item, index) => {

    return (
      <ButtonBase
        key={index.toString()}
        focusRipple
        className={classes.menuHead}
        component={LinkBtn}
        to={item.linkParent}
        onClick={closeDrawer}
      >
        {item.name == 'Appointments' ? (
          <>
            {pathname === '/app/appointments' ? (
              <img src={appointmentsActiveIcon} width="32" style={{ marginBottom: 8 }} />
            ) : (
              <img src={appointmentsIcon} width="32" style={{ marginBottom: 8 }} />
            )}
          </>
        ) : (
          <>
            {
              item.name == 'FrontDesk' ? (
                <>
                  {pathname === '/app/frontdesk' ? (
                    <img src={frontdeskActiveIcon} width="32" style={{ marginBottom: 8 }} />
                  ) : (
                    <img src={frontdeskIcon} width="32" style={{ marginBottom: 8 }} />
                  )}
                </>
              ) : (
                <>
                  {
                    item.name == 'New Appointment' ? (
                      <>
                        {pathname === '/app/new-appointment' ? (
                          <img src={newAppointmentActiveIcon} width="32" style={{ marginBottom: 8 }} />
                        ) : (
                          <img src={newAppointmentIcon} width="32" style={{ marginBottom: 8 }} />
                        )}
                      </>
                    ) : (
                      <>
                        {
                          item.name == 'Log Complaint' ? (
                            <>
                              {pathname === '/app/support' ? (
                                <img src={logComplaintActiveIcon} width="32" style={{ marginBottom: 8 }} />
                              ) : (
                                <img src={logComplaintIcon} width="32" style={{ marginBottom: 8 }} />
                              )}
                            </>
                          ) : (
                            <>
                              {
                                item.name == 'Bill / Invoice' ? (
                                  <>
                                    {pathname === '/app/billing-invoice' ? (
                                      <img src={billInvoiceActiveIcon} width="32" style={{ marginBottom: 8 }} />
                                    ) : (
                                      <img src={billInvoiceIcon} width="32" style={{ marginBottom: 8 }} />
                                    )}
                                  </>
                                ) : (
                                  <Icon className={classes.icon}>{item.icon}</Icon>
                                )
                              }
                            </>
                          )
                        }
                      </>
                    )
                  }
                </>
              )
            }
          </>
        )}
        <span className={classes.text}>
          {
            messages[item.key] !== undefined
              ? <FormattedMessage {...messages[item.key]} />
              : item.name
          }
        </span>
      </ButtonBase>
    );
  });

  return (
    <aside className={classes.bigSidebar}>
      <nav className={classes.category}>
        <SideBarWrapper>
          <div className={classes.fixedWrap}>
            {/* <MenuProfile userAttr={userAttr} /> */}
            {getMenus(dataMenu)}
          </div>
        </SideBarWrapper>
      </nav>
    </aside>
  );
}

MainMenuBig.propTypes = {
  classes: PropTypes.object.isRequired,
  userAttr: PropTypes.object.isRequired,
  open: PropTypes.object.isRequired,
  dataMenu: PropTypes.array.isRequired,
  openDrawer: PropTypes.func.isRequired,
  closeDrawer: PropTypes.func.isRequired,
  mobile: PropTypes.bool,
};

MainMenuBig.defaultProps = {
  toggleDrawerOpen: () => { },
  mobile: false
};

const reducer = 'ui';

const mapStateToProps = state => ({
  open: state.getIn([reducer, 'subMenuOpen']),
  ...state
});

const mapDispatchToProps = dispatch => ({
  openDrawer: () => dispatch(openMenuAction),
  closeDrawer: () => dispatch(closeMenuAction)
});

const MainMenuBigMapped = connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainMenuBig);

export default withStyles(styles)(injectIntl(MainMenuBigMapped));
