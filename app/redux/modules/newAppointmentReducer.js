import { responsTimeSlot } from '../actions/newAppointmentAction';
import {
  CREATE_PATIENT_SET,
  CREATE_PATIENT_RESPONS_SET,
  CREATE_PATIENT_RESPONS_RESTE,
  APPEND_DEPENDENT,
  SET_DEPENDENT,
  CREATE_DEPENDENT_RESPONS,
  SET_MEDICAL_HISTORY,
  SET_SEARCH_PATIENT_LIST,
  SET_PATIENT_DETAIL,
  SET_APPOINTMENT_SLOT,
  RESPONS_BOOK_APPOINTMENT,
  RESPONS_APPOINTMENT_SLOT,
  RESET_MEDICAL_HISTORY,
  SET_APPOINTMENT_TOKEN
} from '../constants/newAppointmentConstant';


const initialState = {
  newPatient: null,
  medicalHistory: [],
  createPatientRespons: null,
  patientDependentRespons: null,
  patientDependent: [],
  searchPatient: [],
  appointmentSlot: [],
  appointmentToken: null,
  appointmentPatient: null,
  newAppointmentRespons: null,
  appointmentSlotRespons: null
};

export default function appointment(state = initialState, action) {
  switch (action.type) {
    case CREATE_PATIENT_SET:
      return {
        ...state,
        newPatient: action.payload
      };
      break;
    case CREATE_PATIENT_RESPONS_SET:
      return {
        ...state,
        createPatientRespons: action.payload
      };
      break;

    case CREATE_PATIENT_RESPONS_RESTE:
      return {
        ...state,
        createPatientRespons: action.payload
      };
      break;

    case APPEND_DEPENDENT:
      const depandans = state.patientDependent;
      depandans.push(action.payload);
      return {
        ...state,
        patientDependent: depandans
      };
      break;
    case SET_DEPENDENT:
      return {
        ...state,
        patientDependent: action.payload
      };
      break;

    case CREATE_DEPENDENT_RESPONS:
      return {
        ...state,
        patientDependentRespons: action.payload
      };

    case SET_MEDICAL_HISTORY:
      const medicalHistory = [...state.medicalHistory];
      let medical_index = -1;
      if (medicalHistory.length > 0) {
        if (action.payload.fm_id == null) {
          medical_index = medicalHistory.findIndex(data => data.patient_id == action.payload.patient_id);
        } else {
          medical_index = medicalHistory.findIndex(data => data.patient_fm_id == action.payload.fm_id);
        }
        if (medical_index >= 0) {
          medicalHistory[medical_index] = {
            ...action.payload.request,
            patient_id: action.payload.patient_id,
            patient_fm_id: action.payload.fm_id,
            id: action.payload.id,
          };
        } else {
          medicalHistory.push({
            ...action.payload.request,
            patient_id: action.payload.patient_id,
            patient_fm_id: action.payload.fm_id,
            id: action.payload.id,

          });
        }
      } else {
        medicalHistory.push({
          ...action.payload.request,
          patient_id: action.payload.patient_id,
          patient_fm_id: action.payload.fm_id,
          id: action.payload.id,

        });
      }
      return {
        ...state,
        medicalHistory
      };
      break;

    case RESET_MEDICAL_HISTORY:
      return {
        ...state,
        medicalHistory: []
      };
      break;
    case SET_SEARCH_PATIENT_LIST:
      return {
        ...state,
        searchPatient: action.payload
      };
      break;
    case SET_PATIENT_DETAIL:

      return {
        ...state,
        appointmentPatient: action.payload
      };
      break;

    case SET_APPOINTMENT_SLOT:
      return {
        ...state,
        appointmentSlot: action.payload
      };
      break;

    case SET_APPOINTMENT_TOKEN:
      return {
        ...state,
        appointmentToken: action.payload
      };
      break;
    case RESPONS_APPOINTMENT_SLOT:
      return {
        ...state,
        appointmentSlotRespons: action.payload
      };
      break;

    case RESPONS_BOOK_APPOINTMENT:
      return {
        ...state,
        newAppointmentRespons: action.payload
      };
      break;


    default:
      return state;
  }
}
