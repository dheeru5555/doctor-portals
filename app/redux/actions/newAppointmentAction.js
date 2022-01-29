import * as types from '../constants/newAppointmentConstant';

const localUserInfo = localStorage.getItem('userInfo')
const parsedUserInfo = JSON.parse(localUserInfo)

const isFrontdesk = parsedUserInfo ? parsedUserInfo.frontdesk : false;

export const createPatient = (data, history) => ({
  type: types.CREATE_PATIENT,
  payload: {
    user_data: data,
    medical_history: history
  }
});

export const createPatientSet = (data) => ({
  type: types.CREATE_PATIENT_SET,
  payload: data
});

export const createPatientRespons = (responce) => ({
  type: types.CREATE_PATIENT_RESPONS_SET,
  payload: responce
});

export const createPatientResponsReset = () => ({
  type: types.CREATE_PATIENT_RESPONS_RESTE,
  payload: null
});

export const createDependent = (pasent_id, data) => ({
  type: types.CREATE_DEPENDENT,
  payload: {
    pasent_id,
    data
  }
});

export const appendDependent = (data) => ({
  type: types.APPEND_DEPENDENT,
  payload: data
});

export const featchDependent = (pasent_id) => ({
  type: types.FEATCH_DEPENDENT,
  payload: pasent_id
});

export const setDependent = (pasent_id) => ({
  type: types.SET_DEPENDENT,
  payload: pasent_id
});

export const setDependentRespons = (responce) => ({
  type: types.CREATE_DEPENDENT_RESPONS,
  payload: responce
});

export const dependentResponsReset = (responce) => ({
  type: types.CREATE_DEPENDENT_RESPONS_RESTE,
  payload: responce
});

export const setMedicalhistory = (patient_id, request, fm_id = null, id = null) => ({
  type: types.SET_MEDICAL_HISTORY,
  payload: {
    patient_id,
    request,
    fm_id,
    id,
  }

});

export const saveMedicalhistory = (patient_id, request, fm_id = null, id = null) => ({
  type: types.SAVE_MEDICAL_HISTORY,
  payload: {
    patient_id,
    request,
    fm_id,
    id,
  }
});

export const resetMedicalHistory = () => ({
  type: types.RESET_MEDICAL_HISTORY,
  payload: []
});


export const searchPatient = (search_text) => ({
  type: types.SEARCH_PATIENT_LIST,
  payload: search_text
});

export const setSearchPatient = (responce) => ({
  type: types.SET_SEARCH_PATIENT_LIST,
  payload: responce
});


export const getPasentDetails = (pasent_id) => ({
  type: types.GET_PATIENT_DETAIL,
  payload: pasent_id
});

export const setPasentDetails = (responce) => ({
  type: types.SET_PATIENT_DETAIL,
  payload: responce
});

export const getTimeSlot = (date, type, clinic_id, cr_id) => ({
  type: types.GET_APPOINTMENT_SLOT,
  payload: {
    date,
    booking_type: type,
    clinic_id,
    cr_id
  }
});

export const setTimeSlot = (responce) => ({
  type: types.SET_APPOINTMENT_SLOT,
  payload: responce
});

export const setTimeToken = (responce) => ({
  type: types.SET_APPOINTMENT_TOKEN,
  payload: responce
});

export const responsTimeSlot = (responce) => ({
  type: types.RESPONS_APPOINTMENT_SLOT,
  payload: responce
});

export const bookAppointment = (request) => ({
  type: types.BOOK_APPOINTMENT,
  payload: request
});

export const setBookAppointmentRespons = (responce) => ({
  type: types.RESPONS_BOOK_APPOINTMENT,
  payload: responce
});
