import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Icon from '@material-ui/core/Icon';
import styled from 'styled-components';
import logo from 'enl-images/0001.jpg';
import { connect } from 'react-redux';
import { fetchDoctorProfileDetails } from '../../../../redux/actions/profileActions';
import API from '../../../../helpers/api';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

const SubscriptionCard = styled('div')`
    position: relative;
    border: 1px solid #dedede;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #fff;
    sup {
        top: -1.5rem;
        position: relative;
        font-size: large;
        font-weight: 600;
        color: #ff4a2f;
    }
`;

const SpecificSubscriptionCard = styled('div')`
    background-color: #2d2d2d;
    color: #f5deb3;
    position: relative;
    border: 1px solid #dedede;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
    height: 100%;
    sup {
        top: -1.5rem;
        position: relative;
        font-size: large;
        font-weight: 600;
        color: #ff4a2f;
    }
`;

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
    padding: 10
  },
  border: {
    border: '1px solid #dedede',
    padding: '15px 0px',
    background: '#f5f5f5',
    borderRadius: 5
  },
  textField: {
    marginTop: 5,
  },
  title: {
    padding: '0 15px',
    fontWeight: 700
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    background: '#fff'
  },
  customButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  typography: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  p3: {
    padding: theme.spacing(3)
  },
  bold: {
    fontWeight: 700
  },
  rightPanel: {
    padding: '15px 20px',
  },
  subtitle: {
    fontSize: 11,
    color: 'gray',
    margin: 0,
    padding: '0 15px'
  },
  btnLink: {
    textDecoration: 'underline',
    color: 'blue'
  },
  statusChip: {
    background: '#0eae0e',
    fontSize: 10,
    height: 26,
    fontWeight: 600,
    color: 'white'
  },
  textCenter: {
    textAlign: 'center'
  },
  planPrice: {
    fontSize: '3.5rem',
    color: '#ff2100'
  },
  listItem: {
    textAlign: 'left',
    marginTop: 20,
    '& p': {
      display: 'flex',
      alignItems: 'center',
      '& span': {
        fontSize: '1rem',
        marginRight: 10
      }
    }
  },
  ellipsis: {
    '-webkit-line-clamp': 6,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
  },
  ribbon: {
    width: 140,
    height: 140,
    overflow: 'hidden',
    position: 'absolute',
    top: -6,
    right: -6,
  },
  ribbonContent: {
    left: -25,
    top: 30,
    '-webkit-transform': 'rotate(45deg)',
    '-ms-transform': 'rotate(45deg)',
    transform: 'rotate(45deg)',
    position: 'absolute',
    display: 'block',
    width: 225,
    padding: '10px 0',
    backgroundColor: '#f5cd79',
    boxShadow: '0 5px 10px rgba(0, 0, 0, 0.192)',
    color: '#fff',
    textShadow: '0 1px 1px rgba(0, 0, 0, .2)',
    textTransform: 'uppercase',
    textAlign: 'center',
    border: '2px dotted #fff',
    outline: '5px solid  #f5cd79',
    '&:before': {
      top: 0,
      left: 0,
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      position: 'absolute',
      zIndex: -1,
      content: '',
      display: 'block',
      border: '5px solid #f19066',
      boxSizing: 'content-box',
    },
    '&:after': {
      bottom: 0,
      right: 0,
      borderTopColor: 'transparent',
      borderRightColor: 'transparent',
      position: 'absolute',
      zIndex: -1,
      content: '',
      display: 'block',
      border: '5px solid #f19066'
    }
  },
  subscriptionButton: {
    padding: '15px 0 !important'
  },
  headerContainer: {
    padding: '5px 25px',
    background: '#fff',
    boxShadow: '0 0 50px #ccc',
    position: 'relative'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .MuiTypography-button': {
      marginLeft: 24
    },
    '& button': {
      marginLeft: 24
    }
  },
  noDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    color: '#808080',
    padding: 50
}
});

function Subscriptions(props) {
  const api = new API();
  const title = brand.name + ' - Settings';
  const description = brand.desc;
  const { classes, doctorProfileDetails } = props;
  const [subscriptionData, setSubscriptionData] = React.useState({
    current_plan: [],
    specific_subscription_plans: [],
    subscription_plans: []
  });
  const [snackBarInfo, setSnackBarInfo] = useState({
    isSnackBarOpen: false,
    snackBarText: '',
    snackBarSeverity: 'success',
  });
  const history = useHistory();

  const fetchSubscriptions = async () => {
    await api.ACCOUNTS_URI().get('settings/subscriptions')
      .then((subscriptionResp) => {
        if (subscriptionResp.data.success === true) {
          const intermediateSubscriptionObj = { ...subscriptionData };
          intermediateSubscriptionObj.current_plan = subscriptionResp.data.current_plans;
          intermediateSubscriptionObj.specific_subscription_plans = subscriptionResp.data.specific_subscription_plans;
          intermediateSubscriptionObj.subscription_plans = subscriptionResp.data.subscription_plans;

          setSubscriptionData(intermediateSubscriptionObj);
        }
      });
  };

  useEffect(() => {
    fetchSubscriptions();
    props.fetchDoctorProfileDetails();
  }, []);

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay(id, interval, price) {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    // creating a new order
    const respObj = {
      subscription_id: id,
      plan_interval: interval,
      amount: parseInt(price, 10),
      currency: 'INR'
    };

    const result = await api.ACCOUNTS_URI().post('settings/subscriptions/generateSubscriptionOrderId', respObj)
      .then((response) => response.data.orderRes)
      .catch((err) => console.log(err));

    if (!result) {
      alert('Server error. Are you online?');
      return;
    }

    // Getting the order details back
    const { amount, id: order_id, currency } = result;

    const options = {
      key: 'rzp_test_Nd0W8n3fTC3DWL', // Enter the Key ID generated from the Dashboard
      amount: parseInt(amount, 10),
      currency,
      name: 'Online Aarogya',
      description: 'Test Transaction',
      image: { logo },
      order_id,
      async handler(response) {
        const data = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };

        api.ACCOUNTS_URI().post('settings/subscriptions/verifySubscriptionSignature', data)
          .then((resp) => {
            if (resp.data.success) {
              fetchSubscriptions();
              history.push('/app/profile');
            }
          })
          .catch((err) => console.log(err));
      },
      prefill: {
        name: `${doctorProfileDetails.first_name} ${doctorProfileDetails.last_name}`,
        email: doctorProfileDetails.email,
        contact: doctorProfileDetails.mobile,
      },
      theme: {
        color: '#ff2100',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  const Alert = (prop) => <MuiAlert elevation={6} variant="filled" {...prop} />;

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


  const renderSubscriptionPlans = () => {
    if (subscriptionData.subscription_plans.length === 0) {
      return (
        <div className={classes.noDetails}>
          <ErrorOutline style={{ fontSize: 80 }} />
          <Typography>No Plans Found</Typography>
        </div>
      );
    }

    return subscriptionData.subscription_plans.map((subscription) => {
      const amount = (
        (subscription.subscription_details.length > 0)
        && subscription.subscription_details[0].price
        && (subscription.subscription_details[0].price !== null)
      ) ? subscription.subscription_details[0].price : '0.00';
      const duration = (
        (subscription.subscription_details.length > 0)
        && subscription.subscription_details[0].plan_interval
        && (subscription.subscription_details[0].plan_interval !== null)
      ) ? subscription.subscription_details[0].plan_interval : 'm';

      return (
        <Grid item sm={6} lg={4} key={`subscription-${subscription.id}`} style={{ marginBottom: 20 }}>
          <SubscriptionCard>
            <div>
              <Typography variant="subtitle2">{subscription.name}</Typography>
              <div className={classes.ellipsis} dangerouslySetInnerHTML={{ __html: subscription.description }} />
              <div>
                <sup>&#8377;</sup>
                <span className={classes.planPrice}>{amount}</span>
                <span>{duration === 'm' ? '/monthly' : '/yearly'}</span>
              </div>
              <div dangerouslySetInnerHTML={{ __html: subscription.subscription_details[0].statuses }} />
              {/* <Button variant="contained" disabled color="primary">Current Plan</Button> */}
              <div className={classes.listItem}>
                <p>
                  <Icon>check_circle</Icon>
                  Advance Calendar
                </p>
                <p>
                  <Icon>check_circle</Icon>
                  Professional Billing
                </p>
                <p>
                  <Icon>check_circle</Icon>
                  Patient Charting
                </p>
                <p>
                  <Icon>check_circle</Icon>
                  Unlimited Appointment confirmation, reminder & follow-up SMS
                </p>
                <p>
                  <Icon>check_circle</Icon>
                  SMS Center
                </p>
              </div>
            </div>
            <Button variant="contained" className={classes.subscriptionButton} onClick={() => displayRazorpay(subscription.id, subscription.subscription_details[0].plan_interval, subscription.subscription_details[0].price)}>Buy Now</Button>
          </SubscriptionCard>
        </Grid>
      );
    });
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
      .catch(() => {
        setSnackBarInfo({
          isSnackBarOpen: true,
          snackBarText: 'Could not logout. Please try again later.',
          snackBarSeverity: 'error',
        });
      });
  };


  const renderSpecificSubscriptionPlans = () => {
    if (subscriptionData.specific_subscription_plans.length === 0) {
      return null;
    }

    return subscriptionData.specific_subscription_plans.map((subscription) => {
      const amount = (
        (subscription.subscription_details.length > 0)
        && subscription.subscription_details[0].price
        && (subscription.subscription_details[0].price !== null)
      ) ? subscription.subscription_details[0].price : '0.00';
      const duration = (
        (subscription.subscription_details.length > 0)
        && subscription.subscription_details[0].plan_interval
        && (subscription.subscription_details[0].plan_interval !== null)
      ) ? subscription.subscription_details[0].plan_interval : 'm';

      return (
        <Grid item sm={6} lg={4} key={`subscription-${subscription.id}`} style={{ marginRight: 20 }}>
          <SpecificSubscriptionCard>
            <Typography variant="subtitle2">{subscription.name}</Typography>
            <div className={classes.ribbon}><span className={classes.ribbonContent}>For You</span></div>
            <div className={classes.ellipsis} dangerouslySetInnerHTML={{ __html: subscription.description }} />
            <div>
              <sup style={{ color: '#f5cd79' }}>&#8377;</sup>
              <span className={classes.planPrice} style={{ color: '#f5cd79' }}>{amount}</span>
              <span>{duration === 'm' ? '/monthly' : '/yearly'}</span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: subscription.subscription_details[0].statuses }} />
            {/* <Button variant="contained" disabled color="primary">Current Plan</Button> */}
            <div className={classes.listItem}>
              <p>
                <Icon>check_circle</Icon>
                Advance Calendar
              </p>
              <p>
                <Icon>check_circle</Icon>
                Professional Billing
              </p>
              <p>
                <Icon>check_circle</Icon>
                Patient Charting
              </p>
              <p>
                <Icon>check_circle</Icon>
                Unlimited Appointment confirmation, reminder & follow-up SMS
              </p>
              <p>
                <Icon>check_circle</Icon>
                SMS Center
              </p>
            </div>
            <Button variant="contained" style={{ backgroundColor: '#f5cd79', color: 'white' }} onClick={() => displayRazorpay(subscription.id, subscription.subscription_details[0].plan_interval, subscription.subscription_details[0].price)}>Buy Now</Button>
          </SpecificSubscriptionCard>
        </Grid>
      );
    });
  };

  //   const preventDefault = (event) => event.preventDefault();

  return (
    <div style={{ overflow: 'hidden' }}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Grid container justify="center" className={classes.headerContainer}>
        <Grid item sm={12}>
          <div className={classes.header}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={logo} alt={brand.name} width={70} />
              <Typography variant="h6" style={{ fontWeight: 600, color: 'red' }}>Online Aarogya</Typography>
            </div>
            <div>
              {/* <Link href="/terms-and-conditions" onClick={preventDefault}>
                                <Typography variant="button">Terms & Conditions</Typography>
                            </Link>
                            <Link href="#">
                                <Typography variant="button">Privacy Policy</Typography>
                            </Link> */}
              <Button color="primary" onClick={logout}>Logout</Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container justify="center" style={{ padding: 25 }} spacing={2}>
        <Grid item sm={12}>
          <Typography variant="h6" align="center">Pricing Plans</Typography>
          <p className={classes.textCenter}>All plans include 40+ advanced tools and features to boost your product. Choose the best plan to fit your needs.</p>
        </Grid>
        {renderSpecificSubscriptionPlans()}
        {renderSubscriptionPlans()}
      </Grid>
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
  );
}

Subscriptions.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  doctorProfileDetails: state.get('profileReducer').doctorProfileDetails,
});

export default connect(mapStateToProps, { fetchDoctorProfileDetails })(withStyles(styles)(Subscriptions));