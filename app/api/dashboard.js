import axios from '../config/axiosConfig';



function dashBoard() {

    const getDashboardData = () => {
        const headerReq = {
            clinic_id: JSON.parse(localStorage.getItem('selectedClinics')).map((clinic) => clinic.id),
        }

        return axios.get('doctor/dashboard', {
            params: headerReq
        })
            .then(res => res.data)
            .catch(error => {
                console.log('Api Error', error)
                return {
                    success: false,
                    message: error
                }
            });
    }

    return {
        getDashboardData,
    };

}

const dashboardService = dashBoard();
export default dashboardService;