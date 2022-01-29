// local imports
import API from '../../helpers/api';
import * as types from '../constants/dashboardConstants';

// initialization
const api = new API();

export const fetchMasterData = () => async dispatch => {
  const response = await api.MASTER_URI().get();
  if (response.status === 200 && (Object.keys(response.data).length > 0)) {
    dispatch({
      type: 'FETCH_MASTER_DATA',
      masterData: response.data
    });
  }
};

export const fetchMedicineOptionsData = () => async dispatch => {
  const response = await api.MASTER_URI().get("/medicineData/get");
  if (response.status === 200 && (Object.keys(response.data).length > 0)) {
    dispatch({
      type: 'FETCH_MEDICINE_OPTIONS',
      medOptionsData: response.data
    });
  }
};

export const fetchSuperSpecializations = () => async dispatch => {
  const response = await api.MASTER_URI().get('/superSpecializations/18');

  if (response.status === 200 && (Object.keys(response.data).length > 0)) {

    dispatch({
      type: 'FETCH_SUPER_SPECIALIZATIONS',
      superSpecialization: response.data.superSpecializations,
    });
  
  }
};

export const fetchCityData = (cityId) => async dispatch => {
  const response = await api.MASTER_URI().get(`/city/${cityId}`);
  if (response.status === 200 && (Object.keys(response.data).length > 0)) {
    dispatch({
      type: 'FETCH_CITY_DATA',
      cityData: response.data.cities,
    });
  
  }
}

export const setCityData = () => async dispatch => {
  dispatch({
    type: 'FETCH_CITY_DATA',
    cityData: null,
  });
}

export const fetchImageOrDocument = () => async dispatch => {
  const response = await api.ACCOUNTS_URI().get(`imageOrDocumentPrefixUrls`, {
    params: {
      cr_id: localStorage.getItem("cr_id")
    }
  });

  if (response.status === 200 && (Object.keys(response.data).length > 0)) {
 
    dispatch({
      type: 'FETCH_IMAGE_OR_DOCS',
      paths: response.data.paths,
    });
  
  }
}


export const  fatchDashboard=()=>({
  type: types.DASHBOARD_DATA_FEATCH,
  payload: null,
});

export const  setDashboard=(dashboard)=>({
  type: types.DASHBOARD_DATA_SET,
  payload: dashboard,
});