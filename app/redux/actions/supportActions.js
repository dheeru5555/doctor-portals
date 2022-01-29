import * as types from '../constants/sppourtConstants';

export const supportList = () => ({
  type: types.SUPPORT_LIST
});


export const setSportTicket = (tickets) => ({

  type: types.SET_SUPPORT_TICKET,
  payload: tickets
});

export const createSportTicket = (tickets) => ({
  type: types.CREATE_SUPPORT_TICKET,
  payload: tickets
});

export const createSportTicketRespons = (responce) => ({
  type: types.CREATE_SUPPORT_TICKET_RESPONS,
  payload: responce
});


export const supportDetails = (ticket_id) => ({
  type: types.SUPPORT_TICKET_DETAILS,
  payload: ticket_id
});

export const setSupportDetails = (ticket_detals) => ({
  type: types.SET_SUPPORT_TICKET_DETAILS,
  payload: ticket_detals
});

export const sendSupportComment = (ticket_id, message) => ({
  type: types.SEND_SUPPORT_COMMENT,
  payload: {
    support_id: ticket_id,
    message,
  }
});

export const setNewSupportComment = (message) => ({
  type: types.SET_NEW_SEND_SUPPORT_COMMENT,
  payload: message
});

export const sportTicketReopen = (ticket_id) => ({
  type: types.SUPPORT_TICKET_REOPEN,
  payload: ticket_id
});

export const sportTicketReopenSuccess = (ticket_id) => ({
  type: types.SUPPORT_TICKET_REOPEN_SUCCESS,
  payload: ticket_id
});

export const sportTicketReopenFailed = (respons) => ({
  type: types.SUPPORT_TICKET_REOPEN_FAILED,
  payload: respons
});
