import axios from '../config/axiosConfig';

function apointment() {
  const createPatient = (paramiter) => axios.post('doctor/patients/add', paramiter)
    .then(res => res.data)
    .catch(error => console.log('Api Error', error));

  const createDepandan = (paramiter) => {
    const { pasent_id, data } = paramiter;
    const send_parmiter = {
      title: (data.title != 'undefined') ? data.title : null,
      first_name: (data.first_name != 'undefined') ? data.first_name : null,
      middle_name: (data.middle_name != 'undefined') ? data.middle_name : null,
      last_name: (data.last_name != 'undefined') ? data.last_name : null,
      mobile: (data.mobile != 'undefined') ? data.mobile : null,
      gender: (data.gender != 'undefined') ? data.gender : null,
      relationship_id: (data.relationship_id != 'undefined') ? data.relationship_id : null,
      blood_group_id: (data.blood_group_id != 'undefined') ? data.blood_group_id : null,
      dob: (data.dob != 'undefined') ? data.dob : null,
      height: (data.height != 'undefined') ? data.height : null,
      weight: (data.weight != 'undefined') ? data.weight : null,
      address: (data.address != 'undefined') ? data.address : null,
      flat_no: (data.flat_no != 'undefined') ? data.flat_no : null,
      street_name: (data.street_name != 'undefined') ? data.street_name : null,
      city_id: (data.city_id != 'undefined') ? data.city_id : null,
      state_id: (data.state_id != 'undefined') ? data.state_id : null,
      pincode: (data.pincode != 'undefined') ? data.pincode : null,
      medical_problems: (data.medical_problems != 'undefined') ? data.medical_problems : [],
      allergies: (data.allergies != 'undefined') ? data.allergies : [],
      procedures: (data.procedures != 'undefined') ? data.procedures : [],
      lifestyles: (data.lifestyles != 'undefined') ? data.lifestyles : [],
      diagnosis: (data.diagnosis != 'undefined') ? data.diagnosis : [],
      findings: (data.findings != 'undefined') ? data.findings : [],
    };
    return axios.post('doctor/patients/addEditDependent/' + pasent_id, send_parmiter)
      .then(res => res.data)
      .catch(error => console.log('Api Error', error));
  };


  const getDepandan = (paramiter) => axios.get(`doctor/patients/dependents/${paramiter}`)
    .then(res => res.data)
    .catch(error => console.log('Api Error', error));

  const createMedicalHistory = (paramiter) => {
    const send_parmiter = {
      ...paramiter.request,
      patient_id: paramiter.patient_id,
      patient_fm_id: paramiter.fm_id,
    };
    return axios.post('doctor/patients/addEditMedicalHistory', send_parmiter)
      .then(res => res.data)
      .catch(error => console.log('Api Error', error));
  };

  const getpatientList = (paramiter) => axios.get('doctor/patients/search', { params: { q: paramiter } })
    .then(res => res.data)
    .catch(error => console.log('Api Error', error));

  const getPatientDetail = (paramiter) => axios.get(`doctor/patients/detail/${paramiter}`)
    .then(res => res.data)
    .catch(error => console.log('Api Error', error));

  const getTimeSlot = (paramiter) => axios.get('doctor/appointments/getSlots', { params: { ...paramiter } })
    .then(res => res.data)
    .catch(error => console.log('Api Error', error));

  const bookAppointment = (paramiter) => {
    const send_parmiter = {
      patient_id: (paramiter.patient_id != 'undefined') ? paramiter.patient_id : null,
      patient_fm_id: (paramiter.patient_fm_id != 'undefined') ? paramiter.patient_fm_id : null,
      booking_type: (paramiter.booking_type != 'undefined') ? paramiter.booking_type : null,
      doctor_id: (paramiter.doctor_id != 'undefined') ? paramiter.doctor_id : null,
      clinic_id: (paramiter.clinic_id != 'undefined') ? paramiter.clinic_id : null,
      cr_id: (paramiter.cr_id != 'undefined') ? paramiter.cr_id : null,
      slot_id: (paramiter.slot_id != 'undefined') ? paramiter.slot_id : null,
      chief_complaint: (paramiter.chief_complaint != 'undefined') ? paramiter.chief_complaint : null,
      booked_date: (paramiter.booked_date != 'undefined') ? paramiter.booked_date : null,
    };

    return axios.post('doctor/appointments/bookAppointment', send_parmiter)
      .then(res => res.data)
      .catch(error => console.log('Api Error', error));
  };

  return {
    createPatient,
    createDepandan,
    getDepandan,
    createMedicalHistory,
    getpatientList,
    getPatientDetail,
    getTimeSlot,
    bookAppointment
  };
}

const apointmentService = apointment();
export default apointmentService;
