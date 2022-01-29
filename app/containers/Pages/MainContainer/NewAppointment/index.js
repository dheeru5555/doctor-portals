import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { NewAppointmentComponent } from 'enl-components';
import { useDispatch, useSelector, connect } from 'react-redux';
import { searchPatient, setSearchPatient } from 'enl-redux/actions/newAppointmentAction';

function NewAppointment() {
  const title = brand.name + ' - New Appointment';
  const description = brand.desc;
  const [prifixUrl,setPrifixUrl]=useState(null);

  const dispatch = useDispatch();
  const selectState = useSelector((state) => state.toJS());
  const { newAppointmentReducer,dashboardReducer } = selectState;


  const searchPatientListDispatch = (serach_text) => {
    if (serach_text.length > 3) {
      dispatch(searchPatient(serach_text));
    } else {
      dispatch(setSearchPatient([]));
    }
  };
  useEffect(() => {
    if(dashboardReducer.imagesOrDocs!=null){
        let {patient_avatar_prefix_url}=dashboardReducer.imagesOrDocs
        setPrifixUrl(patient_avatar_prefix_url)
    }
},[dashboardReducer])

  

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
        spacing={3}
      >
        <Grid item md={12} xs={12}>
          <NewAppointmentComponent avtarUrl={prifixUrl} searcPatient={newAppointmentReducer.searchPatient} searchPatientListDispatch={searchPatientListDispatch} />
        </Grid>
      </Grid>
    </div>
  );
}

export default NewAppointment;
