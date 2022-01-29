import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { useParams, useHistory } from 'react-router-dom';
import {
  PatientProfileCard,
  BookAppointmentForm
} from 'enl-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorProfileDetails, fetchAllClinics } from 'enl-redux/actions/profileActions';
import {
  getPasentDetails, getTimeSlot, bookAppointment, setBookAppointmentRespons, responsTimeSlot, setTimeSlot, setTimeToken
} from 'enl-redux/actions/newAppointmentAction';


function BookAppointment() {
  const title = brand.name + ' - Book Appointment';
  const localUserInfo = localStorage.getItem('userInfo')
  const parsedUserInfo = JSON.parse(localUserInfo)

  const isFrontdesk = parsedUserInfo ? parsedUserInfo.frontdesk : false;
  const description = brand.desc;
  const dispatch = useDispatch();
  const selectState = useSelector((state) => state.toJS());
  const { newAppointmentReducer, profileReducer, dashboardReducer } = selectState;
  const { appointmentSlotRespons } = newAppointmentReducer;
  const [errorRespons, seterrorRespons] = useState([]);
  const [slotRespons, setSlotRespons] = useState({
    open: false,
    message: ''
  });
  const [prifixUrl, setPrifixUrl] = useState(null);
  const params = useParams();
  const pasent_id = params.pasentId;
  const history = useHistory();

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  useEffect(() => {
    if (newAppointmentReducer.appointmentPatient != null) {
      if (pasent_id != newAppointmentReducer.appointmentPatient.id) {
        dispatch(getPasentDetails(pasent_id));
      }

      if (newAppointmentReducer.newAppointmentRespons != null) {
        if (newAppointmentReducer.newAppointmentRespons.success) {
          const path = '/app/appointments/';
          history.push(path);
          dispatch(setBookAppointmentRespons(null));
          dispatch(responsTimeSlot(null));
          resetTokenSlot();
        } else {
          seterrorRespons(newAppointmentReducer.newAppointmentRespons.errorMessage);
        }



      }
    } else {
      dispatch(getPasentDetails(pasent_id));
      if (profileReducer.doctorProfileDetails == null) {
        dispatch(fetchDoctorProfileDetails());
        // dispatch(setBookAppointmentRespons(null));
      }
    }
  }, [newAppointmentReducer]);

  useEffect(() => {
    dispatch(fetchDoctorProfileDetails());
    dispatch(fetchAllClinics());
  }, [])

  useEffect(() => {
    if (appointmentSlotRespons != null) {
      if (!appointmentSlotRespons.success) {
        setSlotRespons({ open: true, message: appointmentSlotRespons.errorMessage });
        setTimeout(() => {
          setSlotRespons({ ...slotRespons, open: false });
        }, 3000);
      }
    }
  }, [appointmentSlotRespons]);


  useEffect(() => {
    if (dashboardReducer.imagesOrDocs != null) {
      const { patient_avatar_prefix_url } = dashboardReducer.imagesOrDocs;
      setPrifixUrl(patient_avatar_prefix_url);
    }
  }, [dashboardReducer]);

  const getTimeSlotList = (select_date, type, clinic_id, cr_id) => {
    const date = select_date.format('YYYY-MM-DD');
    dispatch(getTimeSlot(date, type, clinic_id, cr_id));
  };

  const resetTokenSlot = () => {
    dispatch(setTimeSlot([]));
    dispatch(setTimeToken(null));
  }

  const bookNowAppointment = (request_data) => {
    dispatch(bookAppointment(request_data));
  };

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <Grid
        container
        alignItems="flex-start"
        justify="flex-start"
        direction="row"
        spacing={2}
      >
        <Grid item md={4} lg={3} sm={12}>
          {(newAppointmentReducer.appointmentPatient != null)
            ? <PatientProfileCard dasUrl={prifixUrl} patient_detail={newAppointmentReducer.appointmentPatient} /> : ''}
        </Grid>
        <Grid item md={8} lg={9} sm={12} style={{ borderRadius: 12 }}>
          {(newAppointmentReducer.appointmentPatient != null && profileReducer.doctorProfileDetails != null)
            ? (
              <BookAppointmentForm
                getTimeSlot={getTimeSlotList}
                resetTokenSlot={resetTokenSlot}
                timeSlot={newAppointmentReducer.appointmentSlot}
                appointmentToken={newAppointmentReducer.appointmentToken}
                depandendes={newAppointmentReducer.appointmentPatient.family_members}
                docuterDetail={profileReducer.doctorProfileDetails}
                appointmentErrorRespons={errorRespons}
                bookNowAppointment={bookNowAppointment}
                pasentId={pasent_id}
                clinics={profileReducer.clinicDetails}
                isFrontdesk={isFrontdesk}
                parsedUserInfo={parsedUserInfo}
              />
            ) : ''}
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setSlotRespons({ ...slotRespons, open: false })}
        open={slotRespons.open}
        autoHideDuration={6000}
      >
        <Alert severity="warning">
          {slotRespons.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default BookAppointment;
