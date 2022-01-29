import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { CalendarComponent } from 'enl-components';
import { useDispatch, useSelector, connect } from 'react-redux';
import { featchCalenderApointmants, featchCalenderApointmantList } from 'enl-redux/actions/calenderAction';

function Calendar() {
  const [stateMonth, stateMonthState] = useState(0);
  const [stateDate, stateDateState] = useState(0);
  const title = brand.name + ' - Calendar';
  const description = brand.desc;
  const dispatch = useDispatch();
  const selectState = useSelector((state) => state.toJS());
  const { calenderReducer } = selectState;
  const { appointments, appointments_list } = calenderReducer;

  const featchApointmants = (month, year) => {
    if (stateMonth != month) {
      dispatch(featchCalenderApointmants(month, year));
      stateMonthState(month);
    }
  };

  const featchApointmantList = (date) => {
    if (stateDate != date) {
      dispatch(featchCalenderApointmantList(date));
      stateDateState(date);
    }
  };

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <CalendarComponent featchApointmantList={featchApointmantList} featchApointmants={featchApointmants} appointments={appointments} appointments_list={appointments_list} />
    </div>
  );
}

export default Calendar;
