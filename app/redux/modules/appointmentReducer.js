const INITIAL_STATE = {
  bookedAppointments: null,
  bookedAppointmentsAllData: null,
  queuedAppointments: null,
  queuedAppointmentsAllData: null,
  waitlistAppointments: null,
  waitlistAppointmentsAllData: null,
  checkedoutAppointments: null,
  checkedoutAppointmentsAllData: null,
  noshowAppointments: null,
  noshowAppointmentsAllData: null,
  pausedAppointments: null,
  pausedAppointmentsAllData: null,
  appointmentsByDate: null,
  selectedQueueId: null,
  selectedPatientId: null,
  consultaitionDetails: null,
  patientDetails: null,
  newMedicineOptions: null,
  billables: null,
  updateReq: true
};

function appointmentReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case 'FETCH_BOOKED_APPOINTMENTS':
      return Object.assign({}, state, { bookedAppointments: action.bookedAppointments });
    case 'FETCH_ALL_BOOKED_APPOINTMENTS':
      return Object.assign({}, state, { bookedAppointmentsAllData: action.bookedAppointmentsAllData });
    case 'SET_QUEUE_ID':
      return Object.assign({}, state, { selectedQueueId: action.selectedQueueId });
    case 'SET_PATIENT_ID':
      return Object.assign({}, state, { selectedPatientId: action.selectedPatientId });
    case 'FETCH_CONSULTATION_DETAILS':
      return Object.assign({}, state, { consultaitionDetails: action.consultaitionDetails });
    case 'FETCH_PATIENT_DETAILS':
      return Object.assign({}, state, { patientDetails: action.patientDetails });
    case 'FETCH_QUEUED_APPOINTMENTS':
      return Object.assign({}, state, { queuedAppointments: action.queuedAppointments });
    case 'FETCH_ALL_QUEUED_APPOINTMENTS':
      return Object.assign({}, state, { queuedAppointmentsAllData: action.queuedAppointmentsAllData });
    case 'FETCH_WAITLIST_APPOINTMENTS':
      return Object.assign({}, state, { waitlistAppointments: action.waitlistAppointments });
    case 'FETCH_ALL_WAITLIST_APPOINTMENTS':
      return Object.assign({}, state, { waitlistAppointmentsAllData: action.waitlistAppointmentsAllData });
    case 'FETCH_CHECKEDOUT_APPOINTMENTS':
      return Object.assign({}, state, { checkedoutAppointments: action.checkedoutAppointments });
    case 'FETCH_ALL_CHECKEDOUT_APPOINTMENTS':
      return Object.assign({}, state, { checkedoutAppointmentsAllData: action.checkedoutAppointmentsAllData });
    case 'FETCH_NOSHOW_APPOINTMENTS':
      return Object.assign({}, state, { noshowAppointments: action.noshowAppointments });
    case 'FETCH_ALL_NOSHOW_APPOINTMENTS':
      return Object.assign({}, state, { noshowAppointmentsAllData: action.noshowAppointmentsAllData });
    case 'FETCH_PAUSED_APPOINTMENTS':
      return Object.assign({}, state, { pausedAppointments: action.pausedAppointments });
    case 'FETCH_ALL_PAUSED_APPOINTMENTS':
      return Object.assign({}, state, { pausedAppointmentsAllData: action.pausedAppointmentsAllData });
    case 'FETCH_APPOINTMENTS_BYDATE':
      return Object.assign({}, state, { appointmentsByDate: action.appointmentsByDate });
    case 'FETCH_MEDICINE_OPT':
      return Object.assign({}, state, { newMedicineOptions: action.newMedicineOptions });
    case 'FETCH_BILLABLES_DATA':
      return Object.assign({}, state, { billables: action.billables });
    case 'UPDATE_API_CALL':
      return Object.assign({}, state, { updateReq: action.updateReq });
    default:
      return state;
  }
}

export default appointmentReducer;
