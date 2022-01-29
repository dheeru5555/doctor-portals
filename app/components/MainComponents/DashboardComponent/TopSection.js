import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SupervisorAccount from '@material-ui/icons/SupervisorAccount';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import DirectionsWalk from '@material-ui/icons/DirectionsWalk';
import { injectIntl } from 'react-intl';
import avatarApi from 'enl-api/images/avatars';
import totalPatients from 'enl-images/new-icons/total-patients.png';
import rupee from 'enl-images/rupee.png';
import checkedOut from 'enl-images/new-icons/checked-out.png';
import styles from './dashboard-jss';
import CounterWidget from './CounterWidget';

function TopSection(props) {
  const { classes,
    totalAppointments,
    totalCheckedOut,
    totalEarning,
    totalQueue

  } = props;

  const history = useHistory();

  const routeChange = (val) => {
    history.push({
      pathname: "/app/appointments",
      state: {
        tabVal: val
      }
    })
  }

  return (
    <div className={classes.rootCounterFull}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <CounterWidget
            color="secondary-main"
            start={0}
            end={totalAppointments}
            duration={3}
            title="Total Appointments"
            routeChange={routeChange}
          >
            <img src={totalPatients} width="76" />
          </CounterWidget>
        </Grid>
        <Grid item xs={6} md={3}>
          <CounterWidget
            color="secondary-main"
            start={0}
            end={totalQueue}
            duration={3}
            title="Total Queue"
            routeChange={routeChange}
          >
            <img src={avatarApi[13]} width="90px" />
          </CounterWidget>
        </Grid>
        <Grid item xs={6} md={3}>
          <CounterWidget
            color="secondary-main"
            start={0}
            end={totalCheckedOut}
            duration={3}
            title="Checked Out"
            routeChange={routeChange}
          >
            {/* <DirectionsWalk className={classes.counterIcon} /> */}
            <img src={checkedOut} width="84" />
          </CounterWidget>
        </Grid>
        <Grid item xs={6} md={3}>
          <CounterWidget
            color="secondary-main"
            start={0}
            end={totalEarning}
            duration={3}
            title="Today Earnings"
            routeChange={() => history.push("/app/billing-invoice")}
          >
            <img src={rupee} width="83px" />
            {/* <MonetizationOn className={classes.counterIcon} /> */}
          </CounterWidget>
        </Grid>
      </Grid>
    </div>
  );
}

TopSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(injectIntl(TopSection));
