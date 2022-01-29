// local imports
import API from '../../helpers/api';

// initialization
const api = new API();

export const fetchAllReceptionists = () => async dispatch => {
    const response = await api.ACCOUNTS_URI().get("receptionists");
    if (
        (response.status === 200) &&
        (Object.keys(response.data).length > 0) &&
        (response.data.success === true)) {
        dispatch({
            type: 'FETCH_ALL_RESEPTIONISTS',
            allReceptionist: response.data.receptionists
        });
    }
}

export const fetchAllSearchReceptionists = () => async dispatch => {
    const response = await api.ACCOUNTS_URI().get("receptionists/search");
    if (
        (response.status === 200) &&
        (Object.keys(response.data).length > 0) &&
        (response.data.success === true)) {
        dispatch({
            type: 'FETCH_SEARCH_RESEPTIONISTS',
            searchAllReceptionist: response.data.receptionists
        });
    }
}