import { SET_SUPPORT_TICKET, SET_SUPPORT_TICKET_DETAILS, SET_NEW_SEND_SUPPORT_COMMENT, CREATE_SUPPORT_TICKET_RESPONS, SUPPORT_TICKET_REOPEN_SUCCESS, SUPPORT_TICKET_REOPEN_FAILED } from '../constants/sppourtConstants';


function createData(id, subject, remarks, created, status) {
  return {
    id, subject, remarks, created, status
  };
}
const initialState = {
  ticket_list: [],
  ticket_details: {
    id: null,
    ticket_number: null,
    category_name: null,
    create_date: null,
    comments: [],
    issue_status:null
  },
  create_ticket_respons:null,
  open_ticket_respons:null
};

export default function supportTickets(state = initialState, action) {
  switch (action.type) {
    case SET_SUPPORT_TICKET:
      return {
        ...state,
        ticket_list: action.payload
      };
      break;
    case SET_SUPPORT_TICKET_DETAILS:
      const {
        id, comments, created_at, ticket_no, support_category,issue_status
      } = action.payload;
      const ticket_details = {
        id,
        ticket_number: ticket_no,
        category_name: support_category.name,
        create_date: created_at,
        comments,
        issue_status,
      };
      return {
        ...state,
        ticket_details
      };
      break;
    case CREATE_SUPPORT_TICKET_RESPONS:
      return {
        ...state,
        create_ticket_respons:action.payload
      };
    break;
      
    case SET_NEW_SEND_SUPPORT_COMMENT:
      const teicket = state.ticket_details;
      const comment = teicket.comments;
      comment.push(action.payload);
      const ticket_deta = { ...teicket };
      return {
        ...state,
        ticket_details: ticket_deta
      };
      break;

      case SUPPORT_TICKET_REOPEN_SUCCESS:
        return {
          ...state,
          ticket_details: {
            ...state.ticket_details,
            issue_status:0
          }
        };
      break;
      case SUPPORT_TICKET_REOPEN_FAILED:
        return{
          ...state,
          open_ticket_respons:action.payload
        }
      break;

    default:
      return state;
  }
}
