import { all } from 'redux-saga/effects';
import authSagas from 'enl-redux/modules/authSagas';
import supportSagas from '../redux/modules/supportSagas';
import apointmentCalenderSaga from '../redux/modules/calenderSagas';
import apoFrontDeskSagas from '../redux/modules/FrontDeskSagas';
import apointmentSaga from '../redux/modules/newAppointmentSagas';
import dashboardSagas from '../redux/modules/dashboardSagas';
import billingSagas from '../redux/modules/BillingSagas';

export default function* sagas() {
  yield all([
    ...authSagas,
    ...dashboardSagas,
    ...supportSagas,
    ...apointmentCalenderSaga,
    ...apointmentSaga,
    ...apoFrontDeskSagas,
    ...billingSagas,
  ]);
}
