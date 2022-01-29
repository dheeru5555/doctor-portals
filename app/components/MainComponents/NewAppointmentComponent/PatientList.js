import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector, connect } from 'react-redux';
import { getPasentDetails, setSearchPatient } from 'enl-redux/actions/newAppointmentAction';
import styles from './newAppointment-jss';
import helper from '../../../helpers/helpers';

let id = 0;
function createData(name, mobile, type, gender, age) {
  id += 1;
  return {
    id,
    name,
    mobile,
    type,
    gender,
    age,
  };
}

const data = [
  createData('Mr.Abhishek', '+91 9999999999', '1', 'Male', '25y'),
];

function PatientList(props) {
  const { classes, searcPatient, avtarUrl } = props;

  const history = useHistory();
  const dispatch = useDispatch();

  const routeChange = async (pasent_id) => {
    const path = '/app/book-appointment/' + pasent_id;
    await dispatch(getPasentDetails(pasent_id));
    await dispatch(setSearchPatient([]));
    await history.push(path);
  };

  const handleViewProfileConsultationClick = async (patientId) => {
    await history.push({
      pathname: "/app/appointments/patient-profile",
      state: {
        patientId: patientId
      }
    });
    // history.push('/app/appointments/patient-profile');
  };

  return (
    <Fragment>
      <div className={classes.rootTable} style={{ margin: '0px' }}>
        <Table className={classNames(classes.table, classes.stripped)} style={{ margin: '0px' }}>
          <TableHead>
            <TableRow key="header">
              <TableCell align="left">Patient Name</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Age</TableCell>
              <TableCell align="left">Contact</TableCell>
              <TableCell align="left" />
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              searcPatient.length > 0 ? (
                searcPatient.map(patient => ([
                  <TableRow key={patient.id}>
                    <TableCell align="left">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar className={classes.avatar} src={avtarUrl + patient.avatar} />
                        <div style={{ marginLeft: '10px', textTransform: 'capitalize' }}>
                          {patient.title}
                          {' '}
                          {patient.first_name}
                          {' '}
                          {patient.last_name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="left">{ helper.genderName(patient.gender)}</TableCell>
                    <TableCell align="left">{helper.getAge(patient.dob)}</TableCell>
                    <TableCell align="left">{patient.mobile}</TableCell>
                    <TableCell align="left" />
                    <TableCell align="right">
                      {/* <Button variant="contained" style={{marginRight: 10}}>Details</Button> */}
                      <Button variant="contained" style={{marginRight: 8}} onClick={() => handleViewProfileConsultationClick(patient.id)}>View Profile</Button>
                      <Button variant="contained" onClick={() => routeChange(patient.id)}>Book Appointment</Button>
                    </TableCell>
                  </TableRow>
                ]))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    {' '}
                    <h5> No Patient available </h5>
                    {' '}
                  </TableCell>
                </TableRow>
              )
            }

          </TableBody>
        </Table>
      </div>
    </Fragment>
  );
}

PatientList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatientList);
