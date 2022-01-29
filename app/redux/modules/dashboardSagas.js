import {takeEvery, all, call, put, fork} from 'redux-saga/effects';
import { DASHBOARD_DATA_FEATCH } from '../constants/dashboardConstants';
import dashboardService from '../../api/dashboard';
import { setDashboard } from '../actions/dashboardActions';




function* featchDashboard(paramiter) {
    try {
        const apiRespons = yield call(dashboardService.getDashboardData);
        if (apiRespons.success) {
            yield put(setDashboard(apiRespons));
          }
    } catch (error) {
        console.log('Saga error', error);
    }
}



function* dashboardRootSaga() {
    yield all([
      takeEvery(DASHBOARD_DATA_FEATCH, featchDashboard),
    ]);
  }
  
  
  const dashboardSagas = [
    fork(dashboardRootSaga),
  ];
  
  export default dashboardSagas;
  