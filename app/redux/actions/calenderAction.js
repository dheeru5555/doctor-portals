import * as types from '../constants/calenderConstants';


export const featchCalenderApointmants = (month, year) => ({
  type: types.CALENDER_APOINTMANT_FEATCH,
  payload: {
    month,
    year
  }
});

export const setCalenderApointmants = (appointments) => ({
  type: types.CALENDER_APOINTMANT_SET,
  payload: appointments
});

export const featchCalenderApointmantList = (date) => ({
  type: types.CALENDER_APOINTMANT_LIST_FEATCH,
  payload: {
    date,
  }
});

export const setCalenderApointmantList = (appointments) => ({
  type: types.CALENDER_APOINTMANT_LIST_SET,
  payload: appointments
});
