import {
  takeEvery, all, call, put, fork
} from 'redux-saga/effects';
import {
  CREATE_PATIENT,
  CREATE_DEPENDENT,
  FEATCH_DEPENDENT,
  SAVE_MEDICAL_HISTORY,
  SEARCH_PATIENT_LIST,
  GET_PATIENT_DETAIL,
  GET_APPOINTMENT_SLOT,
  BOOK_APPOINTMENT
} from '../constants/newAppointmentConstant';
import apointmentService from '../../api/appointment';
import {
  createPatientRespons,
  setDependentRespons,
  setDependent,
  createPatientSet,
  featchDependent,
  saveMedicalhistory,
  setSearchPatient,
  setPasentDetails,
  setTimeSlot,
  setBookAppointmentRespons,
  setMedicalhistory,
  responsTimeSlot,
  setTimeToken,
} from '../actions/newAppointmentAction';

import { playTransitionAction } from '../actions/uiActions';

function* createPatient(paramiter) {
  try {
    const apiRespons = yield call(
      apointmentService.createPatient,
      paramiter.payload.user_data
    );
    yield put(createPatientRespons(apiRespons));
    if (apiRespons.success) {
      yield put(createPatientSet(apiRespons.patient));

      const medicalHistory = {
        ...paramiter.payload.medical_history,
        patient_id: apiRespons.patient.id
      };
      yield put(
        saveMedicalhistory(
          apiRespons.patient.id,
          paramiter.payload.medical_history
        )
      );
    }
  } catch (e) {
    console.log('Saga error', e);
  }
}

function* createDepandan(paramiter) {
  try {
    const apiRespons = yield call(
      apointmentService.createDepandan,
      paramiter.payload
    );
    yield put(setDependentRespons(apiRespons));
    if (apiRespons.success) {
      yield put(featchDependent(paramiter.payload.pasent_id));
    }
  } catch (e) {
    console.log('Saga error', e);
  }
}

function* featchDepandanSaga(paramiter) {
  try {
    const apiRespons = yield call(
      apointmentService.getDepandan,
      paramiter.payload
    );
    yield put(setDependentRespons(apiRespons));
    if (apiRespons.success) {
      yield put(setDependent(apiRespons.dependents));
    }
  } catch (e) {
    console.log('Saga error', e);
  }
}

function* saveMediclHistory(paramiter) {
  try {
    const apiRespons = yield call(
      apointmentService.createMedicalHistory,
      paramiter.payload
    );

    if (apiRespons.success) {
      const {
        patient_id, request, fm_id, id
      } = paramiter.payload;
      yield put(setMedicalhistory(patient_id, request, fm_id, apiRespons.medicalHistory.id));
    }
  } catch (e) {
    console.log('Saga error', e);
  }
}

function* searchPatient(paramiter) {
  try {
    const apiRespons = yield call(
      apointmentService.getpatientList,
      paramiter.payload
    );
    if (apiRespons.success) {
      yield put(setSearchPatient(apiRespons.patients));
    }
  } catch (e) {
    console.log('Saga error', e);
  }
}

function* getPasentDetail(paramiter) {
  try {
    yield put(playTransitionAction(false));
    const apiRespons = yield call(
      apointmentService.getPatientDetail,
      paramiter.payload
    );
    if (apiRespons.success) {
      yield put(setPasentDetails(apiRespons.patient));
      yield put(playTransitionAction(true));
    }
  } catch (e) {
    console.log('Saga error', e);
  }
}

function* getTimeSlotSaga(paramiter) {
  try {
    const apiRespons = yield call(
      apointmentService.getTimeSlot,
      paramiter.payload
    );
    yield put(responsTimeSlot(apiRespons));
    if (apiRespons.success) {
      let {booking_type}=paramiter.payload;
      if(booking_type=="s"){
        yield put(setTimeSlot(apiRespons.slots));
      }if(booking_type=="t"){
        yield put(setTimeToken(apiRespons.available_tokens));
      }
    }
  } catch (e) {
    console.log('Saga error', e);
  }
}


function* bookAppointment(paramiter) {
  try {
    const apiRespons = yield call(
      apointmentService.bookAppointment,
      paramiter.payload
    );
    yield put(setBookAppointmentRespons(apiRespons));
  } catch (e) {
    console.log('Saga error', e);
  }
}


function* apointmentSagaRootSaga() {
  yield all([
    takeEvery(CREATE_PATIENT, createPatient),
    takeEvery(CREATE_DEPENDENT, createDepandan),
    takeEvery(FEATCH_DEPENDENT, featchDepandanSaga),
    takeEvery(SAVE_MEDICAL_HISTORY, saveMediclHistory),
    takeEvery(SEARCH_PATIENT_LIST, searchPatient),
    takeEvery(GET_PATIENT_DETAIL, getPasentDetail),
    takeEvery(GET_APPOINTMENT_SLOT, getTimeSlotSaga),
    takeEvery(BOOK_APPOINTMENT, bookAppointment),
  ]);
}

const apointmentSaga = [fork(apointmentSagaRootSaga)];

export default apointmentSaga;
