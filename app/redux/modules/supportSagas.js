import {
  takeEvery, all, call, put, fork
} from 'redux-saga/effects';
import {
  SUPPORT_LIST, SEND_SUPPORT_COMMENT, CREATE_SUPPORT_TICKET, SUPPORT_TICKET_DETAILS, SUPPORT_TICKET_REOPEN
} from '../constants/sppourtConstants';
import supportTicketService from '../../api/support';
import history from '../../utils/history';
import {
  setSportTicket, supportList, setSupportDetails, setNewSupportComment, sportTicketReopenSuccess, sportTicketReopenFailed
} from '../actions/supportActions';

function* fetchSportTicket() {
  try {
    const soportTicket = yield call(supportTicketService.getAllSupportTicket);
    if (soportTicket.success) {
      yield put(setSportTicket(soportTicket.tickets));
    } else {
      if(soportTicket.errorMessage && !soportTicket.errorMessage.isSubscribed) {
        history.push("/subscriptions")
      }
    }
  } catch (e) { console.log('Saga error', e); }
}

function* createSportTicket(paramiter) {
  try {
    const tickRes = yield call(supportTicketService.createSupportTicket, paramiter.payload);
    yield put(createSportTicketRespons(tickRes));
    if (tickRes.success) {
      yield put(supportList());
    }
  } catch (e) {
    console.log('Saga error', e);
  }
}

function* sportTicketDetail(paramiter) {
  try {
    const tickRes = yield call(supportTicketService.supportTicketDetail, paramiter.payload);
    if (tickRes.success) {
      yield put(setSupportDetails(tickRes.ticket));
    }
  } catch (e) {
    console.log('Saga error', e);
  }
}

function* sendSupportMessage(paramiter) {
  try {
    const tickRes = yield call(supportTicketService.sendTicketMessage, paramiter.payload);
    if (tickRes.success) {
      yield put(setNewSupportComment(tickRes.comment));
    }
  } catch (e) {
    console.log('Saga error', e);
  }
}

function* reopenTicket(paramiter) {
  try {
    const tickRes = yield call(supportTicketService.reopenSupportTicket, paramiter.payload);
    if (tickRes.success) {
      yield put(sportTicketReopenSuccess(paramiter.payload));
    }else{
      yield put(sportTicketReopenFailed(tickRes));
    }
  } catch (e) {
    console.log('Saga error', e);
  }
}


function* supportRootSaga() {
  yield all([
    takeEvery(SUPPORT_LIST, fetchSportTicket),
    takeEvery(CREATE_SUPPORT_TICKET, createSportTicket),
    takeEvery(SUPPORT_TICKET_DETAILS, sportTicketDetail),
    takeEvery(SEND_SUPPORT_COMMENT, sendSupportMessage),
    takeEvery(SUPPORT_TICKET_REOPEN, reopenTicket),
  ]);
}

const supportSagas = [
  fork(supportRootSaga),
];

export default supportSagas;
