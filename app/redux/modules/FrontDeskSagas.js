import {takeEvery, all, call, put, fork} from 'redux-saga/effects';
import { FRONT_DESK_FEATCH_LIST,FRONT_DESK_FEATCH_SEARCH_LIST} from '../constants/FrontDeskConstants';
import frontDeskService from '../../api/frontDesk';
import {setFrontedsk} from '../actions/FrontDeskAction';
import history from '../../utils/history';

function* frontDeskFeatchList() {
    try{
        const apiRespons = yield call(frontDeskService.getReceptionistsList);
        if (apiRespons.success) {
            yield put(setFrontedsk(apiRespons.receptionists));
        }else {
            if(apiRespons.errorMessage && !apiRespons.errorMessage.isSubscribed) {
                history.push("/subscriptions")
            }
        }
    } catch(e) {console.log('Saga error', e);}
}

function* frontDeskSearchFeatchList(paramiter) {
    try{
        const apiRespons = yield call(frontDeskService.getReceptionistsSearchList,paramiter.payload);
        if (apiRespons.success) {
            yield put(setFrontedsk(apiRespons.receptionists));
        }
    } catch(e) {console.log('Saga error', e);}
}



function* frontDeskRootSaga() {
    yield all([
      takeEvery(FRONT_DESK_FEATCH_LIST, frontDeskFeatchList),
      takeEvery(FRONT_DESK_FEATCH_SEARCH_LIST, frontDeskSearchFeatchList),
    ]);
}
  

const apointmentCalenderSaga = [
    fork(frontDeskRootSaga),
  ];
  
  export default apointmentCalenderSaga;