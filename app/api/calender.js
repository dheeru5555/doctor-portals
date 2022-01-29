import axios from '../config/axiosConfig';

function calender() {
  const getapointment = (paramiter) => {
    const send_parmiter = {
      month: (paramiter.month != 'undefined') ? paramiter.month : null,
      year: (paramiter.year != 'undefined') ? paramiter.year : null,
      cr_id: (localStorage.getItem('cr_id'))
    };
    return axios.get('doctor/calendar', {
      params: send_parmiter
    })
      .then(res => res.data)
      .catch(error => console.log('Api Error', error));
  };

  const getapointmentList = (paramiter) => {
    const send_parmiter = {
      date: (paramiter.date != 'undefined') ? paramiter.date : null,
      cr_id: (localStorage.getItem('cr_id'))
    };
    return axios.get('doctor/getDateAppointments', {
      params: send_parmiter
    })
      .then(res => res.data)
      .catch(error => console.log('Api Error', error));
  };

  return {
    getapointment,
    getapointmentList
  };
}

const calenderService = calender();
export default calenderService;
