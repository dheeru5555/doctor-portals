// local imports
import API from '../../helpers/api';
import history from '../../utils/history';
// initialization
const api = new API();


export const fetchBookedAppointments = (bookedParams) => async dispatch => {
  let inputParams = {
    sortby: 'patient_name',
    sortorder: 'desc',
    page: 1,
    length: 10,
    search: '',
    slot_date: '',
    appointment_type_id: '',
    consultation_type: '',
    clinic_id: JSON.parse(localStorage.getItem('selectedClinics')).map((clinic) => clinic.id),
    cr_id: (localStorage.getItem("cr_id") !== null && localStorage.getItem("cr_id") !== undefined) ? parseInt(localStorage.getItem("cr_id")) : ''
  };

  if (
    (bookedParams !== undefined)
    && (bookedParams !== null)
    && (Object.keys(bookedParams).length > 0)
  ) {
    inputParams = bookedParams;
  }

  const response = await api.ACCOUNTS_URI().post(
    'appointments/getBookedAppointmentsData',
    inputParams
  );

  if (
    (response.status === 200)
    && (Object.keys(response.data).length > 0)
    && (response.data.list)
  ) {
    dispatch({
      type: 'FETCH_BOOKED_APPOINTMENTS',
      bookedAppointments: response.data
    });

    dispatch({
      type: 'FETCH_ALL_BOOKED_APPOINTMENTS',
      bookedAppointmentsAllData: response.data
    });
  } else {
    history.push("/subscriptions")
    dispatch({
      type: 'FETCH_BOOKED_APPOINTMENTS',
      bookedAppointments: response.data
    });
  }
};

export const fetchQueedAppointments = (queedParams) => async dispatch => {
  let inputParams = {
    sortby: 'patient_name',
    sortorder: 'desc',
    page: 1,
    length: 10,
    search: '',
    slot_date: '',
    appointment_type_id: '',
    consultation_type: '',
    clinic_id: JSON.parse(localStorage.getItem('selectedClinics')).map((clinic) => clinic.id),
    cr_id: (localStorage.getItem("cr_id") !== null && localStorage.getItem("cr_id") !== undefined) ? parseInt(localStorage.getItem("cr_id")) : ''
  };

  if (
    (queedParams)
    && (queedParams !== null)
    && (Object.keys(queedParams).length > 0)
  ) {
    inputParams = queedParams;
  }

  const response = await api.ACCOUNTS_URI().post(
    'appointments/getQueuedAppointmentsData',
    inputParams
  );

  if (
    (response.status === 200)
    && (Object.keys(response.data).length > 0)
    && (response.data.list)
  ) {
    dispatch({
      type: 'FETCH_QUEUED_APPOINTMENTS',
      queuedAppointments: response.data.list
    });

    dispatch({
      type: 'FETCH_ALL_QUEUED_APPOINTMENTS',
      queuedAppointmentsAllData: response.data
    });
  } else {
    history.push("/subscriptions")
  }
};

export const fetchWaitListAppointments = (waitListParams) => async dispatch => {
  let inputParams = {
    sortby: 'patient_name',
    sortorder: 'desc',
    page: 1,
    length: 10,
    search: '',
    slot_date: '',
    appointment_type_id: '',
    consultation_type: '',
    clinic_id: JSON.parse(localStorage.getItem('selectedClinics')).map((clinic) => clinic.id),
    cr_id: (localStorage.getItem("cr_id") !== null && localStorage.getItem("cr_id") !== undefined) ? parseInt(localStorage.getItem("cr_id")) : ''
  };

  if (
    (waitListParams)
    && (waitListParams !== null)
    && (Object.keys(waitListParams).length > 0)
  ) {
    inputParams = waitListParams;
  }

  const response = await api.ACCOUNTS_URI().post(
    'appointments/getWaitlistedAppointmentsData',
    inputParams
  );

  if (
    (response.status === 200)
    && (Object.keys(response.data).length > 0)
    && (response.data.list)
  ) {
    dispatch({
      type: 'FETCH_WAITLIST_APPOINTMENTS',
      waitlistAppointments: response.data.list
    });

    dispatch({
      type: 'FETCH_ALL_WAITLIST_APPOINTMENTS',
      waitlistAppointmentsAllData: response.data
    });
  } else {
    history.push("/subscriptions")
  }
};

export const fetchCheckedOutAppointments = (checkoutParams) => async dispatch => {
  let inputParams = {
    sortby: 'patient_name',
    sortorder: 'desc',
    page: 1,
    length: 10,
    search: '',
    slot_date: '',
    appointment_type_id: '',
    consultation_type: '',
    clinic_id: JSON.parse(localStorage.getItem('selectedClinics')).map((clinic) => clinic.id),
    cr_id: (localStorage.getItem("cr_id") !== null && localStorage.getItem("cr_id") !== undefined) ? parseInt(localStorage.getItem("cr_id")) : ''
  };

  if (
    (checkoutParams)
    && (checkoutParams !== null)
    && (Object.keys(checkoutParams).length > 0)
  ) {
    inputParams = checkoutParams;
  }

  const response = await api.ACCOUNTS_URI().post(
    'appointments/getCheckedOutAppointmentsData',
    inputParams
  );

  if (
    (response.status === 200)
    && (Object.keys(response.data).length > 0)
    && (response.data.list)
  ) {
    dispatch({
      type: 'FETCH_CHECKEDOUT_APPOINTMENTS',
      checkedoutAppointments: response.data.list
    });
    dispatch({
      type: 'FETCH_ALL_CHECKEDOUT_APPOINTMENTS',
      checkedoutAppointmentsAllData: response.data
    });
  } else {
    history.push("/subscriptions")
  }
};

export const fetchNoshowAppointment = (noshowParams) => async dispatch => {
  let inputParams = {
    sortby: 'patient_name',
    sortorder: 'desc',
    page: 1,
    length: 10,
    search: '',
    slot_date: '',
    appointment_type_id: '',
    consultation_type: '',
    clinic_id: JSON.parse(localStorage.getItem('selectedClinics')).map((clinic) => clinic.id),
    cr_id: (localStorage.getItem("cr_id") !== null && localStorage.getItem("cr_id") !== undefined) ? parseInt(localStorage.getItem("cr_id")) : ''
  };

  if (
    (noshowParams)
    && (noshowParams !== null)
    && (Object.keys(noshowParams).length > 0)
  ) {
    inputParams = noshowParams;
  }

  const response = await api.ACCOUNTS_URI().post(
    'appointments/getNoShowAppointmentsData',
    inputParams
  );

  if (
    (response.status === 200)
    && (Object.keys(response.data).length > 0)
    && (response.data.list)
  ) {
    dispatch({
      type: 'FETCH_NOSHOW_APPOINTMENTS',
      noshowAppointments: response.data.list
    });

    dispatch({
      type: 'FETCH_ALL_NOSHOW_APPOINTMENTS',
      noshowAppointmentsAllData: response.data
    });
  } else {
    history.push("/subscriptions")
  }
};

export const fetchPausedAppointments = (pausedParams) => async dispatch => {
  let inputParams = {
    sortby: 'patient_name',
    sortorder: 'desc',
    page: 1,
    length: 10,
    search: '',
    slot_date: '',
    appointment_type_id: '',
    consultation_type: '',
    clinic_id: JSON.parse(localStorage.getItem('selectedClinics')).map((clinic) => clinic.id),
    cr_id: (localStorage.getItem("cr_id") !== null && localStorage.getItem("cr_id") !== undefined) ? parseInt(localStorage.getItem("cr_id")) : ''
  };

  if (
    (pausedParams)
    && (pausedParams !== null)
    && (Object.keys(pausedParams).length > 0)
  ) {
    inputParams = pausedParams;
  }

  const response = await api.ACCOUNTS_URI().post(
    'appointments/getPausedAppointmentsData',
    inputParams
  );

  if (
    (response.status === 200)
    && (Object.keys(response.data).length > 0)
    && (response.data.list)
  ) {
    dispatch({
      type: 'FETCH_PAUSED_APPOINTMENTS',
      pausedAppointments: response.data.list
    });

    dispatch({
      type: 'FETCH_ALL_PAUSED_APPOINTMENTS',
      pausedAppointmentsAllData: response.data
    });
  } else {
    history.push("/subscriptions")
  }
};

export const fetchAppointmentsByDate = (pausedParams) => async dispatch => {
  let inputParams = {
    date: '',
  };

  if (
    (pausedParams)
    && (pausedParams !== null)
    && (Object.keys(pausedParams).length > 0)
  ) {
    inputParams = pausedParams;
  }

  const response = await api.ACCOUNTS_URI().get(
    'getDateAppointments',
    { params: inputParams }
  );

  if (
    (response.status === 200)
    && (response.data.appointments)
    // && (response.data.appointments.length > 0)
  ) {
    dispatch({
      type: 'FETCH_APPOINTMENTS_BYDATE',
      appointmentsByDate: response.data.appointments
    });
  }
};

export const fetchConsultationDetails = (consultationid) => async dispatch => {
  const localUserInfo = localStorage.getItem('userInfo')
  const parsedUserInfo = JSON.parse(localUserInfo)

  const isFrontdesk = parsedUserInfo ? parsedUserInfo.frontdesk : false;
  const response = await api.ACCOUNTS_URI().get(`appointments/getAppointmentDetails/${consultationid}`, {
    params: {
      cr_id: isFrontdesk && localStorage.getItem('cr_id') !== '' && localStorage.getItem('cr_id')
    }
  });

  if (
    (response.status === 200)
    && (Object.keys(response.data).length > 0)
    && (response.data.success === true)
    && (response.data.appointment !== null)
  ) {
    dispatch({
      type: 'FETCH_CONSULTATION_DETAILS',
      consultaitionDetails: response.data.appointment
    });
  }
};

export const fetchPatientDetails = (consultationid) => async dispatch => {
  const response = await api.ACCOUNTS_URI().get(`patients/detail/${consultationid}`);

  if (
    (response.status === 200)
    && (Object.keys(response.data).length > 0)
    && (response.data.success === true)
    && (response.data.patient !== null)
  ) {
    dispatch({
      type: 'FETCH_PATIENT_DETAILS',
      patientDetails: response.data.patient
    });
  }
};

export const fetchNewMedicineOptions = () => async dispatch => {
  const response = await api.MASTER_URI().get(`/medicineData/get`);
  if (
    (response.status === 200)
    && (Object.keys(response.data).length > 0)
    && (response.data.success === true)
  ) {
    dispatch({
      type: 'FETCH_MEDICINE_OPT',
      newMedicineOptions: response.data
    });
  }
};

export const fetchAllBillables = () => async dispatch => {
  const response = await api.ACCOUNTS_URI().get(`settings/billables`);
  if (
    (response.status === 200)
    && (Object.keys(response.data).length > 0)
    && (response.data.success === true)
  ) {
    dispatch({
      type: 'FETCH_BILLABLES_DATA',
      billables: response.data.billables
    });
  }
};

export const setSelectedQueueId = (queueId) => dispatch => {
  dispatch({
    type: 'SET_QUEUE_ID',
    selectedQueueId: queueId
  });
}

export const setSelectedPatientId = (patientId) => dispatch => {
  dispatch({
    type: 'SET_PATIENT_ID',
    selectedPatientId: patientId
  });
}

export const resetConsultationDetails = () => dispatch => {
  dispatch({
    type: 'FETCH_CONSULTATION_DETAILS',
    consultaitionDetails: null,
  });
}

export const updateAPI = (bool) => dispatch => {
  dispatch({
    type: 'UPDATE_API_CALL',
    updateReq: bool,
  });
}