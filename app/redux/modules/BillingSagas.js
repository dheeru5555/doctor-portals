import {
  takeEvery, all, call, put, fork
} from 'redux-saga/effects';
import { FEATCH_BILLING_DETAILS, FEATCH_ONLINE_LIST, FEATCH_WALKIN_LIST, GENEREATE_INVOICE } from '../constants/BillingConstants';
import bookingService from '../../api/billing';
import history from '../../utils/history';
import { setWakingList, setOnlineList, setBillingDetails } from '../actions/BillingAction';


function* featchWankingList(paramiter) {
  
  try {
    const apiRespons = yield call(bookingService.walkinList, paramiter.payload);
    console.log("featchWankingList",apiRespons);
    if (apiRespons.success) {
      yield put(setWakingList(apiRespons));
    } else {
      if (apiRespons.errorMessage && !apiRespons.errorMessage.isSubscribed) {
        history.push("/subscriptions")
      }
    }
  } catch (e) { console.log('Saga error', e); }
}

function* featchOnlineList(paramiter) {
  try {
    const apiRespons = yield call(bookingService.onlineList, paramiter.payload);
    if (apiRespons.success) {
      yield put(setOnlineList(apiRespons));
    } else {
      if (apiRespons.errorMessage && !apiRespons.errorMessage.isSubscribed) {
        history.push("/subscriptions")
      }
    }
  } catch (e) { console.log('Saga error', e); }
}

function* featchBillingDetails(paramiter) {
  try {
    yield put(setBillingDetails(null));
    const apiRespons = yield call(bookingService.getInvoiceDetail, paramiter.payload);
    if (apiRespons.success) {
      yield put(setBillingDetails(apiRespons.data));
    }
  } catch (e) { console.log('Saga error', e); }
}

function* generateInvoice(paramiter) {
  try {
    const apiRespons = yield call(bookingService.generateInvoice, paramiter.payload);
    if (apiRespons.success) {
      yield put(setBillingDetails(apiRespons.data));
    }
  } catch (e) { console.log('Saga error', e); }
}


function* billingRootSaga() {
  yield all([
    takeEvery(FEATCH_WALKIN_LIST, featchWankingList),
    takeEvery(FEATCH_ONLINE_LIST, featchOnlineList),
    takeEvery(FEATCH_BILLING_DETAILS, featchBillingDetails),
    takeEvery(GENEREATE_INVOICE, generateInvoice),
  ]);
}


const bilingSaga = [
  fork(billingRootSaga),
];

export default bilingSaga;
