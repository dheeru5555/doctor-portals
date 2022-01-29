import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CheckCircle from '@material-ui/icons/CheckCircle';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  createPatientSet, createPatientRespons, getPasentDetails, resetMedicalHistory
} from 'enl-redux/actions/newAppointmentAction';

export default function SucessComponet({ classes }) {
  const selectState = useSelector((state) => state.toJS());
  const { newAppointmentReducer } = selectState;
  const { newPatient } = newAppointmentReducer;
  const history = useHistory();
  const dispatch = useDispatch();
  const createAppointMent = (appoint_id) => {
    const path = '/app/book-appointment/' + appoint_id;
    history.push(path);
    dispatch(getPasentDetails(appoint_id));
    dispatch(createPatientSet(null));
    dispatch(createPatientRespons(null));
    dispatch(resetMedicalHistory());
  };
  console.log(newPatient)

  if (newPatient != null) {
    return (
      <div className={classes.finishMessage}>
        <Typography variant="h4" gutterBottom>
          <span>
            <CheckCircle />
          </span>
          Registered Successfully.
        </Typography>
        <Typography variant="subtitle1">
          Welcome aboard to &nbsp;
          <strong>Online Aarogya</strong>
          .&nbsp;
        </Typography>
        <Typography variant="subtitle1">
          <strong>Name :</strong>
          &nbsp;
          {' '}
          {newPatient.title}
          {' '}
          {newPatient.first_name}
        </Typography>
        {newPatient.email !== null && (
          <Typography variant="subtitle1">
            <strong>Email :</strong>
            &nbsp;
            {' '}
            {newPatient.email}
          </Typography>
        )}
        <Typography variant="subtitle1">
          <strong>Mobile Number :</strong>
          &nbsp; +91
          {' '}
          {newPatient.mobile}
        </Typography>
        {/* <Typography variant="subtitle1">
          <strong>Address :</strong>
        &nbsp;
          {' '}
          {newPatient.address}
        </Typography> */}
        <Button
          variant="contained"
          // color="primary"
          className={classes.button}
          component={Link}
          // to={"/app/book-appointment/"+newPatient.id}
          onClick={() => createAppointMent(newPatient.id)}
        >
          Book Appointment
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          component={Link}
          // to={"/app/book-appointment/"+newPatient.id}
          onClick={() => history.push('/app/new-appointment')}
        >
          Close
        </Button>
      </div>
    );
  }
}
