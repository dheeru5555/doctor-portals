const INITIAL_STATE = {
    doctorProfileDetails: null,
    clinicDetails: null,
    singleCLinicDetails: null,
    userLoginDetails: null,
};
  
function profileReducer(state = INITIAL_STATE, action = {}) {
    switch(action.type) {
        case "FETCH_DOCTOR_PROFILE_DETAILS":
            return Object.assign({}, state, { doctorProfileDetails: action.doctorProfileDetails })
        case "FETCH_ALL_CLINICS":
            return Object.assign({}, state, { clinicDetails: action.clinicDetails })
        case "FETCH_SINGLE_CLINICS":
            return Object.assign({}, state, { singleCLinicDetails: action.singleCLinicDetails })
        case "USER_LOGIN_DETAILS":
            return Object.assign({}, state, { userLoginDetails: action.userLoginDetails })
        default:
            return state;
    }
}

export default profileReducer;
