// local imports
import API from "../../helpers/api";
import { FETCH_DOCTOR_PROFILE_DETAILS } from "../constants/profileConstants";
import history from '../../utils/history';

// initialization
const api = new API();

let localUserInfo = localStorage.getItem('userInfo')
let parsedUserInfo = JSON.parse(localUserInfo)

let isFrontdesk = false;


export const fetchDoctorProfileDetails = () => async dispatch => {
    if ((parsedUserInfo !== null) &&
        parsedUserInfo.frontdesk) {
        isFrontdesk = parsedUserInfo.frontdesk;
    } else {
        localUserInfo = localStorage.getItem('userInfo')
        parsedUserInfo = JSON.parse(localUserInfo)
    }
    const response = await api.ACCOUNTS_URI().get("profile");
    if (response.status === 200 && (Object.keys(response.data).length > 0)) {
        if(response.data.success) {
            if (parsedUserInfo.frontdesk) {
                dispatch({
                    type: FETCH_DOCTOR_PROFILE_DETAILS,
                    doctorProfileDetails: response.data.receptionist
                });
            } else {
                dispatch({
                    type: FETCH_DOCTOR_PROFILE_DETAILS,
                    doctorProfileDetails: response.data.doctor
                });
            }
        } else {
            if(
                (Object.keys(response.data.errorMessage).length > 0) &&
                !response.data.errorMessage.isSubscribed
            ) {
                history.push("/subscriptions")
            }
        }
    }
}

export const fetchAllClinics = () => async dispatch => {
    const response = await api.ACCOUNTS_URI().get("clinics", {
        params: {
            cr_id: localStorage.getItem('cr_id')
        }
    });

    if (response.status === 200 && (Object.keys(response.data).length > 0)) {
        if(response.data.success) {
            dispatch({
                type: "FETCH_ALL_CLINICS",
                clinicDetails: response.data.clinics
            });
        } else {
            if(response.data.errorMessage && !response.data.errorMessage.isSubscribed) {
                history.push("/subscriptions")
            }
        }
    }
}

export const fetchSingleClinicData = (clinicId) => async dispatch => {
    const response = await api.ACCOUNTS_URI().get(`clinics/detail/${clinicId}`, {
        params: {
            cr_id: localStorage.getItem('cr_id')
        }
    });

    if (response.status === 200 && (Object.keys(response.data).length > 0)) {
        dispatch({
            type: "FETCH_SINGLE_CLINICS",
            singleCLinicDetails: response.data.clinic
        });
    }
}

export const resetClinicData = () => async dispatch => {
    dispatch({
        type: "FETCH_SINGLE_CLINICS",
        singleCLinicDetails: null
    });
}

export const handleUserLogin = (userLoginModel) => dispatch => {

    dispatch({
        type: "USER_LOGIN_DETAILS",
        userLoginDetails: userLoginModel
    })

}