import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { Conversation } from 'enl-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { supportDetails, sportTicketReopen,sendSupportComment } from 'enl-redux/actions/supportActions';


function Chat() {
  const title = brand.name + ' - Chat';
  const description = brand.desc;
  const params = useParams();
  const ticket_id = params.ticketId;
  const selectState = useSelector((state) => state.toJS());
  const { supportReducer } = selectState;
  const dispatch = useDispatch();
  const sendMessage = (ticket_id, message) => {
    dispatch(sendSupportComment(ticket_id, message));
  };

  const reopenTicket = (ticket_id) => {
    dispatch(sportTicketReopen(ticket_id));
  };



  useEffect(() => {
    dispatch(supportDetails(ticket_id));
  }, []);
  const { ticket_details } = supportReducer;

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
      <Conversation send_message={sendMessage} reopenTicket={reopenTicket} ticket_details={ticket_details} />
    </div>
  );
}

export default Chat;
