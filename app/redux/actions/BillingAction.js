import * as types from '../constants/BillingConstants';


export const featchWakingList = (paramiter) => ({
    type: types.FEATCH_WALKIN_LIST,
    payload: paramiter
  });

export const setWakingList = (respons) => ({
    type: types.SET_WALKIN_LIST,
    payload: respons
 });

export const featchOnlineList = (paramiter) => ({
    type: types.FEATCH_ONLINE_LIST,
    payload: paramiter
  });

export const setOnlineList = (respons) => ({
    type: types.SET_ONLINE_LIST,
    payload: respons
 });

export const generateInvoice = (respons) => ({
    type: types.GENEREATE_INVOICE,
    payload: respons
 });

export const featchBillingDetails = (appoint_ment_id) => ({
    type: types.FEATCH_BILLING_DETAILS,
    payload: appoint_ment_id
});

export const setBillingDetails = (respons) => ({
    type: types.SET_BILLING_DETAILS,
    payload: respons
});
