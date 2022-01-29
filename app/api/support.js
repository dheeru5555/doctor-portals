import axios from '../config/axiosConfig';

function service() {
  const getAllSupportTicket = () => axios.get('doctor/support')
    .then(res => res.data)
    .catch(error => console.log('Api Error', error));

  const createSupportTicket = (paramiter) => {
    const send_paramiter = {
      support_category: (paramiter.support_category != 'undefined') ? paramiter.support_category : null,
      ticket_subject: (paramiter.ticket_subject != 'undefined') ? paramiter.ticket_subject : null,
      booking_id: (paramiter.booking_id != 'undefined') ? parseInt(paramiter.booking_id) : null,
      ticket_description: (paramiter.ticket_description != 'undefined') ? paramiter.ticket_description : null,
    };
    return axios.post('doctor/support/add', send_paramiter)
      .then(res => res.data)
      .catch(error => console.log('Api Error', error));
  };

  const supportTicketDetail = (ticket_id) => axios.get(`doctor/support/detail/${ticket_id}`)
    .then(res => res.data)
    .catch(error => console.log('Api Error', error));

  const sendTicketMessage = (paramiter) =>{
    const send_paramiter = {
      support_id: (paramiter.support_id != 'undefined') ? paramiter.support_id : null,
      message: (paramiter.message != 'undefined') ? paramiter.message : null,
    };
    return axios.post('doctor/support/add-comment', send_paramiter)
      .then(res => res.data)
      .catch(error => console.log('Api Error', error));
  };

  const reopenSupportTicket = (ticket_id) => axios.post(`doctor/support/reopenTicket/${ticket_id}`)
    .then(res => res.data)
    .catch(error => console.log('Api Error', error));


  return {
    getAllSupportTicket,
    createSupportTicket,
    supportTicketDetail,
    sendTicketMessage,
    reopenSupportTicket,
  };
}

const supportTicketService = service();


export default supportTicketService;
