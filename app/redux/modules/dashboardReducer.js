import { DASHBOARD_DATA_SET } from '../constants/dashboardConstants';
const INITIAL_STATE = {
  dashboardData: null,
  superSpecialization: null,
  masterData: null,
  medOptionsData: null,
  cityData: null,
  imagesOrDocs: null,
};

function dashboardReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case 'FETCH_MASTER_DATA':
      return Object.assign({}, state, { masterData: action.masterData });
    case 'FETCH_MEDICINE_OPTIONS':
      return Object.assign({}, state, { medOptionsData: action.medOptionsData });
    case 'FETCH_SUPER_SPECIALIZATIONS':
      return Object.assign({}, state, { superSpecialization: action.superSpecialization });
    case 'FETCH_CITY_DATA':
      return Object.assign({}, state, { cityData: action.cityData });
    case 'FETCH_IMAGE_OR_DOCS':
      return Object.assign({}, state, { imagesOrDocs: action.paths });
    case DASHBOARD_DATA_SET:
      return {
        ...state,
        dashboardData: action.payload
      };
    default:
      return state;
  }
}

export default dashboardReducer;
