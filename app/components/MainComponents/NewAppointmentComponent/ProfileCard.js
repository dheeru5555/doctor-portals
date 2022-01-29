import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Type from 'enl-styles/Typography.scss';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import avatarApi from 'enl-api/images/avatars';
import styles from './cardStyle-jss';
import helper from '../../../helpers/helpers';
import API from '../../../helpers/api';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

function ProfileCard(props) {
  const {
    classes,
    avatar,
    name,
    dasUrl,
    patient_detail
  } = props;

  const api = new API()

  const [criticalNotes, setCriticalNotes] = React.useState(patient_detail.critical_note !== null ? patient_detail.critical_note : '')

  const history = useHistory();

  const routeProfile = () => {
    const path = '/app/appointments/patient-profile';
    history.push(path);
  };

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

  const handleCriticalNotes = (value) => {
    setCriticalNotes(value)
  }

  const updateCriticalNotes = () => {
    api.ACCOUNTS_URI().put('patients/updateCriticalNote', {
      patient_id: patient_detail.id,
      critical_note: criticalNotes
    }).then((resp) => {
      if (resp.data.success === true) {
        setSnackBarInfo({
          isSnackBarOpen: true,
          snackBarText: 'Critical Notes Saved Successfully',
          snackBarSeverity: 'success',
        });
      } else {
        setSnackBarInfo({
          isSnackBarOpen: true,
          snackBarText: 'Error while updating',
          snackBarSeverity: 'error',
        });
      }
    }).catch(() => {
      setSnackBarInfo({
        isSnackBarOpen: true,
        snackBarText: 'Internal Server Error',
        snackBarSeverity: 'error',
      });
    });
  }

  return (
    <div>
      <Card className={classes.cardSocmed}>
        <CardHeader title="Patient Information" />
        <CardContent className={classes.contentProfile}>
          <div style={{ display: 'flex', marginBottom: 15 }}>
            <Avatar alt={patient_detail.first_name} src={dasUrl + patient_detail.avatar} className={classes.avatarBig} />
            <br />
            <div style={{ marginLeft: 20 }}>
              <Typography variant="caption" className={classes.bold} gutterBottom>
                {patient_detail.title} {patient_detail.first_name} {patient_detail.last_name}
              </Typography>
              <Typography className={classes.subheading} gutterBottom>
                <span className={Type.regular}>{patient_detail.email}</span>
              </Typography>
              <Typography className={classes.subheading} gutterBottom>
                <span className={Type.regular}>{patient_detail.mobile}</span>
              </Typography>
            </div>
          </div>
          <Typography className={classes.subheading1} gutterBottom>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <div className={classes.subSubheading} md={4} xs={12}>
                  <Typography className={Type.bold}>Age</Typography>
                  <Typography className={Type.regular}>{helper.getAge(patient_detail.dob)}</Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.subSubheading} md={4} xs={12}>
                  <Typography className={classes.Bold}>Gender</Typography>
                  <Typography className={Type.regular}>{helper.genderName(patient_detail.gender)}</Typography>
                </div>
              </Grid>
            </Grid>
          </Typography>
          <Typography classNamepx={classes.subheading1} gutterBottom>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <div className={classes.subSubheading} md={4} xs={12}>
                  <Typography className={classes.Bold}>Blood Group</Typography>
                  <Typography className={Type.regular}>{patient_detail.blood_group_id !== null && patient_detail.blood_group.name}</Typography>
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div className={classes.subSubheading} md={4} xs={12}>
                  <Typography className={classes.Bold}>Weight</Typography>
                  <Typography className={Type.regular}>
                    {' '}
                    {patient_detail.weight}
                    {' '}
                    kg&apos;
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Typography>
          <Divider className={classes.Divider} />
          <Typography variant="h6" className={classes.name} gutterBottom>Address</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {patient_detail.address}
          </Typography>
          {/* <Button variant="contained" style={{ marginTop: 15, width: '100%' }} onClick={routeProfile}>View Profile</Button> */}
        </CardContent>
      </Card>

      <Card className={classes.cardSocmed} style={{ marginTop: 10 }}>
        <CardHeader subheader="Critical Notes" />
        <CardContent>
          <TextField
            id="outlined-multiline-static"
            label="Write Notes here"
            multiline
            rows="4"
            defaultValue={patient_detail.critical_note}
            inputProps={{ maxLength: 250 }}
            onChange={(e) => handleCriticalNotes(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            style={{ margin: 0 }}
          />
          <Button variant="contained" onClick={updateCriticalNotes} style={{ marginTop: 15, width: '100%' }}  > Save Note </Button>
        </CardContent>
      </Card>
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

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  avatar: PropTypes.string,
  name: PropTypes.string.isRequired,
};


export default withStyles(styles)(ProfileCard);
