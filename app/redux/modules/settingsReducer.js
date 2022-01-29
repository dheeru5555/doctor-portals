const INITIAL_STATE = {
    allBillables: [],
};
  
function settingsReducer(state = INITIAL_STATE, action = {}) {
    switch(action.type) {
        case "FETCH_ALL_BILLABLES":
            return Object.assign({}, state, { allBillables: action.allBillables })
        default:
            return state;
    }
}

export default settingsReducer;
