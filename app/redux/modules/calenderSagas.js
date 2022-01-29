import {
  takeEvery, all, call, put, fork
} from 'redux-saga/effects';
import { CALENDER_APOINTMANT_FEATCH, CALENDER_APOINTMANT_LIST_FEATCH } from '../constants/calenderConstants';
import calender from '../../api/calender';
import history from '../../utils/history';
import { setCalenderApointmants, setCalenderApointmantList } from '../actions/calenderAction';

function* featchApointmentCalender(paramiter) {
  try {
    const apiRespons = yield call(calender.getapointment, paramiter.payload);
    if (apiRespons.success) {
      yield put(setCalenderApointmants(apiRespons.appointments));
    } else {
      if(apiRespons.errorMessage && !apiRespons.errorMessage.isSubscribed) {
        history.push("/subscriptions")
      }
    }
  } catch (e) { console.log('Saga error', e); }
}

function* featchApointmentList(paramiter) {
  try {
    const apiRespons = yield call(calender.getapointmentList, paramiter.payload);
    if (apiRespons.success) {
      yield put(setCalenderApointmantList(apiRespons.appointments));
    } else {
      if(apiRespons.errorMessage && !apiRespons.errorMessage.isSubscribed) {
        history.push("/subscriptions")
      }
    }
  } catch (e) { console.log('Saga error', e); }
}


function* apointmentCalenderRootSaga() {
  yield all([
    takeEvery(CALENDER_APOINTMANT_FEATCH, featchApointmentCalender),
    takeEvery(CALENDER_APOINTMANT_LIST_FEATCH, featchApointmentList)
  ]);
}


const apointmentCalenderSaga = [
  fork(apointmentCalenderRootSaga),
];

export default apointmentCalenderSaga;
