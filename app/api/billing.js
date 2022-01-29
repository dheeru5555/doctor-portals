import axios from '../config/axiosConfig';

function booking() {
  
  const walkinList = (request) => {
    const requast_param = {
      sortby: request.sortby,
      sortorder: request.sortorder,
      page: request.page,
      length: request.length,
      search: request.search,
      date_range: request.date_range,
      payment_status: request.payment_status,
      clinic_id: request.clinic_id,
      cr_id: parseInt(request.cr_id)
    };
    return axios.post('doctor/appointments/getWalkInBills', requast_param)
      .then(res => res.data)
      .catch(error => console.log('Api Error', error));
  };

  const onlineList = (request) => {
    const requast_param = {
      sortby: request.sortby,
      sortorder: request.sortorder,
      page: request.page,
      length: request.length,
      search: request.search,
      date_range: request.date_range,
      payment_status: request.payment_status,
      clinic_id: request.clinic_id
    };
    return axios.post('doctor/appointments/getOnlineBills', requast_param)
      .then(res => res.data)
      .catch(error => console.log('Api Error', error));
  };

  const generateInvoice = (request) =>
    axios.post('doctor/appointments/consultation/generateInvoice', request)
      .then(res => res.data)
      .catch(error => console.log('Api Error', error));
  const getInvoiceDetail = (request) => axios.get(`doctor/appointments/consultation/getBillDetail/${request}`)
    .then(res => res.data)
    .catch(error => console.log('Api Error', error));


  return {
    walkinList,
    onlineList,
    generateInvoice,
    getInvoiceDetail
  };
}

const bookingService = booking();

export default bookingService;
