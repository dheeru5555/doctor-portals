import axios from '../config/axiosConfig';

function frontDesk() {

    const getReceptionistsList=()=>{
        return axios.get('doctor/receptionists')
        .then(res => res.data)
        .catch(error => {
            console.log('Api Error', error)
            return {
                success:false,
                message:error
            }
        });
    }

    const getReceptionistsSearchList=(paramiter)=>{
        const send_parmiter = {
            q: (paramiter.search != 'undefined') ? paramiter.search : null,
          };
        return axios.get('doctor/receptionists/search',{
            params:send_parmiter})
        .then(res => res.data)
        .catch(error => {
            console.log('Api Error', error)
            return {
                success:false,
                message:error
            }
        });
    }
 
return {
    getReceptionistsList,
    getReceptionistsSearchList
  };
  
}

const frontDeskService = frontDesk();
export default frontDeskService;