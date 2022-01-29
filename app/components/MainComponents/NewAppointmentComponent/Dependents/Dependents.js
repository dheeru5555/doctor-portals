import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { saveMedicalhistory } from 'enl-redux/actions/newAppointmentAction';
import styles from '../newAppointment-jss';
import MedicalHistory from '../MedicalHistory/AddMedicalHistory';
import AddDependents from './AddDependents';
import helper from '../../../../helpers/helpers';
function DependentsCard({ classes, handleNext }) {
  const selectState = useSelector((state) => state.toJS());
  const { newAppointmentReducer } = selectState;
  const { patientDependent, newPatient } = newAppointmentReducer;

  const dispatch = useDispatch();
  const [depend, setDepend] = useState(null);
  const setMedicalHistory = (medical_history) => {
    if (depend != null) {
      dispatch(saveMedicalhistory(newPatient.id, medical_history, depend));
    }
  };

  return (
    <>
      <Grid
        container
        alignItems="flex-start"
        justify="center"
        direction="row"
        spacing={2}
      >
        {
          (patientDependent.length > 0) ? (
            patientDependent.map((depend) => (
              <Grid key={depend.id} item md={6}>
                <Card className={classNames(classes.cardProduct, classes.cardList)}>
                  <CardContent className={classes.floatingButtonWrap}>
                    <Typography component="p" className={classes.desc}>
                      <b>Name:</b>
                      {' '}
                      {depend.title}
                      .
                      {depend.first_name}
                    </Typography>
                    {(depend.dob !== null && depend.dob !== undefined && depend.dob !== '') && (
                      <Typography component="p" className={classes.desc}>
                        <b>Age:</b>
                        {' '}
                        {helper.getAge(depend.dob)}
                      </Typography>
                    )}
                    <Typography component="p" className={classes.desc}>
                      <b>Relationship:</b>
                      {depend.relation_ship.name}
                    </Typography>
                    <br />
                    <div>
                      {/* <Button size="small" variant="outlined" color="secondary" style={{ marginRight: 10 }}>
                                See Detail
                      </Button> */}
                      <MedicalHistory dependId={depend.id} setDepend={setDepend} saveMedicalHistory={setMedicalHistory} />
                    </div>
                  </CardContent>
                  <div className={classes.status}>
                    <Chip label="Family Member 1" className={classes.chipDiscount} />
                  </div>

                  <CardMedia
                    className={classes.mediaProduct}
                    image={(depend.gender == 'm') ? 'https://img.icons8.com/bubbles/2x/user-male.png' : 'https://img.icons8.com/bubbles/2x/user-female.png'}
                    title={name}
                  />
                </Card>
              </Grid>
            ))
          ) : (
            <h1> No  Dependents</h1>
          )
        }


      </Grid>
      <div className={classes.stepperBtn}>
        {/* <Button
          className={classes.button}
          onClick={() => handleNext(0)}
        >
Back
        </Button> */}
        <AddDependents />
        {(patientDependent.length > 0) ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNext(2)}
            className={classes.button}
          >
            Save & Continue
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNext(2)}
            className={classes.button}
          >
            Skip
          </Button>
        )

        }


      </div>
    </>
  );
}

DependentsCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DependentsCard);
