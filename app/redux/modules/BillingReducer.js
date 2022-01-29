import { SET_BILLING_DETAILS, SET_ONLINE_LIST, SET_WALKIN_LIST } from '../constants/BillingConstants';


const initialState = {
  walk_in_billing_list: {
    page:1,
    total:null,
    pages:null,
    sortby:null,
    sortorder:'asc',
    list:[]
  },
  online_billing_list: {
    page:1,
    total:null,
    pages:null,
    sortby:null,
    sortorder:'asc',
    list:[]
  },
  billing_details: null,
};


export default function billing(state = initialState, action) {
    switch (action.type) {
      case SET_WALKIN_LIST:
        return {
          ...state,
          walk_in_billing_list: action.payload
        };
        break;
      case SET_ONLINE_LIST:
        return {
          ...state,
          online_billing_list: action.payload
        };
        break;
      case SET_BILLING_DETAILS:
        return {
          ...state,
          billing_details: action.payload
        };
        break;
      default:
        return state;
    }
  }
  

