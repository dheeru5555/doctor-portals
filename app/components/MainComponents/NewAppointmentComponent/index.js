import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import NewAppointmentBanner from 'enl-images/new-icons/appointment-banner-white.png';
import PatientList from './PatientList';
import styles from './newAppointment-jss';

function NewAppointment(props) {
  const {
    classes,
    searchPatientListDispatch,
    searcPatient,
    avtarUrl
  } = props;

  const history = useHistory();

  const routeChange = () => {
    const path = '/app/new-patient';
    history.push(path);
  };

  const searchPatient = (event) => {
    const { value } = event.target;
    searchPatientListDispatch(value);
  };

  return (
    <>
      <div className={classes.positionRelative} elevation={2}>
        <Grid>
          <img src={NewAppointmentBanner} style={{ borderRadius: 8 }} />
          <Card className={classNames(classes.positionAbsolute, classes.top0, classes.banner)} elevation={0}>
            <CardContent className={classes.bannerForms} style={{ padding: '0 25px 0' }}>
              <Typography variant="h5" className={classes.fdHeader}>Hi, Doctor</Typography>
              <p className={classes.fdSubheader} style={{ fontSize: 12 }}>
                Search by:
                <span className={classes.bold}>Patient Name, Mobile Number</span>
              </p>
              <div className={classes.searchWrapper}>
                <FormControl className={classes.textField}>
                  <Input
                    type="search"
                    onChange={searchPatient}
                    placeholder="Search by Name or Mobile"
                  />
                </FormControl>
              </div>
              <Button variant="outlined" className={classes.createButton} onClick={routeChange}>Create New Patient</Button>
            </CardContent>
          </Card>
        </Grid>
      </div>
      <Grid container spacing={1} justify="center">
        <Grid item md={12} style={{ marginTop: 25 }}>
          <Paper elevation={1}>
            <PatientList avtarUrl={avtarUrl} searcPatient={searcPatient} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

NewAppointment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewAppointment);
