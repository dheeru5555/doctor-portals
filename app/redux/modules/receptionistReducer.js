const INITIAL_STATE = {
  allReceptionist: null,
  searchAllReceptionist: null
};

function receptionistReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case 'FETCH_ALL_RESEPTIONISTS':
      return Object.assign({}, state, { allReceptionist: action.allReceptionist });
    case 'FETCH_SEARCH_RESEPTIONISTS':
      return Object.assign({}, state, { searchAllReceptionist: action.searchAllReceptionist });
    default:
      return state;
  }
}

export default receptionistReducer;
