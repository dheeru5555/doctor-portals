import { CALENDER_APOINTMANT_SET, CALENDER_APOINTMANT_LIST_SET } from '../constants/calenderConstants';


const initialState = {
  appointments: [],
  appointments_list: []
};


/* -------------------------------------------
            APOINTMENT  CALENDER
-------------------------------------------*/
function created_format(apoint_ment) {
  return [
    {
      title: `Video  (${apoint_ment.video})`, backgroundColor: '#3788d8', border: "none", start: apoint_ment.booked_date, allDay: true
    },
    {
      title: `Audio  (${apoint_ment.audio})`, backgroundColor: 'lightcoral', border: "none", start: apoint_ment.booked_date, allDay: true
    },
    {
      title: `Chat  (${apoint_ment.chat})`, backgroundColor: 'grey', border: "none", start: apoint_ment.booked_date, allDay: true
    },
    {
      title: `Walk In  (${apoint_ment.walk_in})`, backgroundColor: 'green', border: "none", start: apoint_ment.booked_date, allDay: true
    },
  ];
}
function generateCalenderData(params) {
  const resultArray = [];
  params.forEach(element => {
    const format_data = created_format(element);
    resultArray.push(...format_data);
  });
  return resultArray;
}

/* -------------------------------------------
            APOINTMENT  LISTING
-------------------------------------------*/
function apointmentFormat(params) {
  let appointments = [];
  params.map(appointment => {
    if (appointment.appointment_type_id == 1) {
      if (appointment.slot_end != null) {
        appointments.push({
          title: `${appointment.patient.first_name} ${appointment.patient.last_name}`, start: `${appointment.slot_date}${appointment.slot_start ? `T${appointment.slot_start}` : ''}`, end: `${appointment.slot_date}${appointment.slot_start ? `T${appointment.slot_end}` : ''}`, backgroundColor: '#3788d8'
        });

      } else {
        appointments.push({
          title: appointment.patient.first_name + " (Waitlist)", start: `${appointment.booked_date}`, end: `${appointment.booked_date}`, backgroundColor: '#3788d8'
        });
      }
    } else if (appointment.appointment_type_id == 2) {
      if (appointment.slot_end != null) {
        appointments.push({
          title: `${appointment.patient.first_name} ${appointment.patient.last_name}`, start: `${appointment.slot_date}${appointment.slot_start ? `T${appointment.slot_start}` : ''}`, end: `${appointment.slot_date}${appointment.slot_start ? `T${appointment.slot_end}` : ''}`, backgroundColor: 'lightcoral'
        });

      } else {
        appointments.push({
          title: appointment.patient.first_name + " (Waitlist)", start: `${appointment.booked_date}`, end: `${appointment.booked_date}`, backgroundColor: 'lightcoral'
        });
      }

    } else if (appointment.appointment_type_id == 3) {
      if (appointment.slot_end != null) {
        appointments.push({
          title: `${appointment.patient.first_name} ${appointment.patient.last_name}`, start: `${appointment.slot_date}${appointment.slot_start ? `T${appointment.slot_start}` : ''}`, end: `${appointment.slot_date}${appointment.slot_start ? `T${appointment.slot_end}` : ''}`, backgroundColor: 'grey'
        });

      } else {
        appointments.push({
          title: appointment.patient.first_name + " (Waitlist)", start: `${appointment.booked_date}`, end: `${appointment.booked_date}`, backgroundColor: 'grey'
        });
      }

    } else if (appointment.appointment_type_id == 4) {
      if (appointment.slot_end != null) {
        appointments.push({
          title: `${appointment.patient.first_name} ${appointment.patient.last_name}`, start: `${appointment.slot_date}${appointment.slot_start ? `T${appointment.slot_start}` : ''}`, end: `${appointment.slot_date}${appointment.slot_start ? `T${appointment.slot_end}` : ''}`, backgroundColor: 'green'
        });

      } else {
        appointments.push({
          title: appointment.patient.first_name + " (Waitlist)", start: `${appointment.booked_date}`, end: `${appointment.booked_date}`, backgroundColor: 'green'
        });
      }

    }
  });
  return appointments;
}


export default function apointmentCalender(state = initialState, action) {
  switch (action.type) {
    case CALENDER_APOINTMANT_SET:
      return {
        ...state,
        appointments: generateCalenderData(action.payload)
      };
      break;
    case CALENDER_APOINTMANT_LIST_SET:
      return {
        ...state,
        appointments_list: apointmentFormat(action.payload)
      };
      break;
    default:
      return state;
  }
}
