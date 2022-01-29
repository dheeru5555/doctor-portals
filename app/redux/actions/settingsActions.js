// local imports
import API from "../../helpers/api";
import history from "../../utils/history";

// initialization
const api = new API();
const localUserInfo = localStorage.getItem('userInfo')
const parsedUserInfo = JSON.parse(localUserInfo)

const isFrontdesk = parsedUserInfo ? parsedUserInfo.frontdesk : false;

export const fetchAllBillables = () => async dispatch => {
    let doctorId = ""
    // if (isFrontdesk && (localStorage.getItem("cr_id") !== "")) {
    //     let selectedDoctor = JSON.parse(localStorage.getItem("selectedTag"))
    //     doctorId = `/${selectedDoctor.doctor_id}`
    // }
    const response = await api.ACCOUNTS_URI().get(`/settings/billables`, {
        params: {
            cr_id: localStorage.getItem("cr_id")
        }
    });

    if (
        (response.status === 200) &&
        (Object.keys(response.data).length > 0) &&
        (response.data.success === true)
    ) {
        dispatch({
            type: "FETCH_ALL_BILLABLES",
            allBillables: response.data.billables
        });
    } else {
        if(response.data.errorMessage && !response.data.errorMessage.isSubscribed) {
            history.push("/subscriptions")
        }
    }
}