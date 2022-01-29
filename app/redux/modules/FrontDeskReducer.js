import { FRONT_DESK_SET_LIST,FRONT_DESK_SET_SEARCH_LIST, SET_FRONT_DESK } from '../constants/FrontDeskConstants';


const initialState = {
    front_desk_list: [],
    front_desk_search_list: [],
    front_desk_detalis:{},
    front_desk_permition:{}
  };
  

  export default function supportTickets(state = initialState, action) {

    switch (action.type) {
        case FRONT_DESK_SET_LIST:
            return {
                ...state,
                front_desk_list:action.payload
              };            
            break;
        case FRONT_DESK_SET_SEARCH_LIST:
            return {
                ...state,
                front_desk_search_list:action.payload
              };
            break;
        case SET_FRONT_DESK:
            return {
                ...state,
                front_desk_detalis:action.payload
              };
            break;
        default:
        return state
    }

  }