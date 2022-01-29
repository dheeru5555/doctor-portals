import axios from "axios";
import enviroment from './enviroment';
import beartocken from './authCheckConfig';


const AxiosInstantent=axios.create({
    baseURL: enviroment.api_url
})

if(beartocken()!=''){
    AxiosInstantent.defaults.headers.common['Authorization']=`Bearer ${beartocken()}`
}


export default AxiosInstantent;