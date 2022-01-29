import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import brand from 'enl-api/dummy/brand';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { fatchDashboard } from 'enl-redux/actions/dashboardActions';
import Alert from '@material-ui/lab/Alert';
import ScheduleIcon from '@material-ui/icons/Schedule';
import {
  TopSection,
  AppointmentsGraph,
  PaymentsGraph,
  Loading
} from 'enl-components';
import styles from './dashboard-jss';


function Dashboard(props) {
  const title = brand.name + ' - Personal Dashboard';
  const description = brand.desc;
  const history = useHistory();
  const { classes, dashboardData, getDashBoard } = props;
  const weksName = {
    Sunday: "Sun",
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",

  }
  const pasentGraph = (apointments) => {
    const convortRespons = apointments.map((appoint, index) => {
      let selectDate = new Date(appoint.date);
      let curentDate = new Date()
      return {
        name: (curentDate.getDate() == selectDate.getDate()) ? "Today" : `${selectDate.getDate()}/${selectDate.getMonth() + 1}`,
        queue: appoint.queue,
        checked_out: appoint.checked_out,
        waitlist: appoint.waitlist,
        paused: appoint.paused,
      }
    });
    return convortRespons;
  }

  const onlinePaymentRespons = (payments) => payments.map((payment) => ({
    name: weksName[payment.date],
    Received: payment.settled,
    NotReceived: payment.due,
  }))

  const walkinPaymentRespons = (payments) => payments.map((payment) => ({
    name: weksName[payment.date],
    Invoice: payment.invoices,
    Collection: payment.collection,
  }));

  useEffect(() => {
    if (dashboardData == null) {
      getDashBoard();
    }
  }, []);

  if(dashboardData == null) {
    return <Loading />
  }

  const routeChange = () => {
    history.push({
      pathname: "/app/settings",
      state: {
        tabVal: 1
      }
    })
  }

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta due="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      {dashboardData.days_to_expiry <= 7 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Alert className={classes.alert} icon={<ScheduleIcon fontSize="inherit" />} severity="error">Your Subscription is going to expire in {dashboardData.days_to_expiry}days!<Button variant="contained" color="primary" onClick={routeChange}>View all Subscriptions</Button></Alert>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={12}>
          {(dashboardData != null) ? <TopSection totalAppointments={dashboardData.totalAppointments} totalCheckedOut={dashboardData.totalCheckedOut} totalEarning={dashboardData.totalEarning} totalQueue={dashboardData.totalQueue} /> : ''}
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid container spacing={3} className={classes.root}>
        <Grid item md={6}>
          {(dashboardData != null) ? <AppointmentsGraph appointments={pasentGraph(dashboardData.appointments)} /> : ""}
        </Grid>
        <Grid item md={6}>
          {(dashboardData != null) ? <PaymentsGraph onlinePayment={onlinePaymentRespons(dashboardData.onlinePayments)} walkinPayment={walkinPaymentRespons(dashboardData.offlinePayments)} /> : ""}
        </Grid>
      </Grid>
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToprops = state => {
  let { dashboardReducer } = state.toJS();
  return {
    dashboardData: dashboardReducer.dashboardData
  }
}

const mapDispatchToprops = dispatch => ({
  getDashBoard: data => dispatch(fatchDashboard())
})

// export default (withStyles(styles)(Dashboard));
export default connect(mapStateToprops, mapDispatchToprops)(withStyles(styles)(Dashboard))
