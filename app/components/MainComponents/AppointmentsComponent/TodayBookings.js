import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Pagination from '@material-ui/lab/Pagination';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import CloudDownload from '@material-ui/icons/CloudDownload';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import EnhancedTableHead from '../AppointmentTables/TableHeader';
import EnhancedTableToolbar from '../AppointmentTables/TableToolbar';
import styles from '../AppointmentTables/tableStyle-jss';
import Cancel from './Dialogs/Cancel';
import MoveToQueue from './Dialogs/MoveToQueue';
import { fetchBookedAppointments, setSelectedQueueId, setSelectedPatientId } from '../../../redux/actions/appointmentAction';
import API from '../../../helpers/api';
import helper from '../../../helpers/helpers';
import loader from 'enl-images/loader.gif';
import { Typography } from '@material-ui/core';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import PlayArrow from '@material-ui/icons/PlayArrow';
import ViewRx from './Dialogs/ViewRx';

function createData(
  id,
  patientId,
  patientName,
  dependentName,
  patientMobile,
  dependentMobile,
  patientAge,
  dependentAge,
  patientGender,
  dependentGender,
  patientImage,
  appointmentStatus,
  appointmentType,
  appointmentRefId,
  clinicName,
  clinicId,
  slotDate,
  tokenNumber,
  slotStartDate,
  slotEndDate,
  consultationType,
  canceledAt,
  consultationStart,
  consultationEnd,
  appointmentRx
) {
  return {
    id,
    patientId,
    patientName,
    dependentName,
    patientMobile,
    dependentMobile,
    patientAge,
    dependentAge,
    patientGender,
    dependentGender,
    patientImage,
    appointmentStatus,
    appointmentType,
    appointmentRefId,
    clinicName,
    clinicId,
    slotDate,
    tokenNumber,
    slotStartDate,
    slotEndDate,
    consultationType,
    canceledAt,
    consultationStart,
    consultationEnd,
    appointmentRx
  };
}

function TodayBookings(props) {
  const api = new API();

  let storedClinics = localStorage.getItem('selectedClinics');
  let parsedClinics = storedClinics !== '[]' ? JSON.parse(storedClinics) : []
  const [selectedClinics, setSelectedClinics] = React.useState(parsedClinics)

  const [formState, setFormState] = useState({
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    columnData: [
      {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Patient'
      }, {
        id: 'calories',
        numeric: false,
        disablePadding: false,
        label: 'Consultation type'
      }, {
        id: 'fat',
        numeric: false,
        disablePadding: false,
        label: 'Slot / Token'
      }, {
        id: 'carbs',
        numeric: false,
        disablePadding: false,
        label: 'Appointment Details'
      }, {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Action'
      },
    ],
    data: [],
    page: 0,
    rowsPerPage: 10,
    defaultPerPage: 5,
    filterText: '',
    size: 'medium',
    bordered: false,
    stripped: false,
    hovered: true,
    toolbar: true,
    checkcell: false,
    pagination: true
  });

  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [todayBooking, setTodayBooking] = useState({
    sortby: 'patient_name',
    sortorder: 'desc',
    page: pageNum,
    length: 10,
    search: '',
    slot_date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`,
    appointment_type_id: [],
    consultation_type: [],
    clinic_id: selectedClinics.length == 0 ? [] : selectedClinics.map((clinic) => clinic.id),
    cr_id: (localStorage.getItem("cr_id") !== null && localStorage.getItem("cr_id") !== undefined) ? parseInt(localStorage.getItem("cr_id")) : ''
  });

  const componentRef = useRef();

  const handlePagination = (event, value) => {
    setPageNum(value)
    todayBooking['page'] = value;
    props.fetchBookedAppointments(todayBooking);
  }


  const [snackBarInfo, setSnackBarInfo] = React.useState({
    isSnackBarOpen: false,
    snackBarText: '',
    snackBarSeverity: 'success',
  });

  const [cancelDialog, setCancelDialog] = React.useState(false);
  const [queueDialog, setQueueDialog] = React.useState(false);
  // const [loading, setQueueDialog] = React.useState(false);

  React.useEffect(() => {
    if (
      (props.masterData !== null)
      && (props.bookedAppointments.list !== null)
      && (props.bookedAppointments.list.length > 0)
    ) {
      const bookedAppointmentsData = props.bookedAppointments.list.map((bAppointment) => {
        const appointmentStatus = (bAppointment.appointment_status_id !== null) ? bAppointment.appointment_status_id : '';
        const appointmentType = (bAppointment.appointment_type_id !== null) ? fetchAppointmentType(bAppointment.appointment_type_id) : '';
        const patientName = (bAppointment.patient_name !== null) ? bAppointment.patient_name : '';
        const dependentName = (bAppointment.patient_fm_id !== null) ? bAppointment.patient_fm_name : '';
        const patientMobile = (bAppointment.patient_mobile !== null) ? bAppointment.patient_mobile : '';
        const dependentMobile = (bAppointment.patient_fm_mobile !== null) ? bAppointment.patient_fm_mobile : '';
        const patientAge = (bAppointment.patient_dob !== null) ? getAge(bAppointment.patient_dob) : '';
        const dependentAge = (bAppointment.patient_fm_dob !== null) ? getAge(bAppointment.patient_fm_dob) : '';
        const patientGender = (bAppointment.patient_gender !== null) ? getGender(bAppointment.patient_gender) : getGender();
        const dependentGender = (bAppointment.patient_fm_gender !== null) ? getGender(bAppointment.patient_fm_gender) : getGender();
        const clinicName = (bAppointment.clinic_name !== null) ? bAppointment.clinic_name : '';
        const clinicId = (bAppointment.clinic_id !== null) ? bAppointment.clinic_id : '';
        const tokenNumber = (bAppointment.token_number) ? (bAppointment.token_number !== null ? bAppointment.token_number : '') : '';
        const slotStartDate = (bAppointment.slot_start !== null) ? helper.tConvert((bAppointment.slot_start).substring(0, bAppointment.slot_start.length - 3)) : '';
        const slotEndDate = (bAppointment.slot_end !== null) ?  helper.tConvert((bAppointment.slot_end).substring(0, bAppointment.slot_end.length - 3)) : '';
        const consultationType = (bAppointment.consultation_type !== null) ? fetchConsultationType(bAppointment.consultation_type) : '';
        const slotDate = (bAppointment.slot_date !== null) ? bAppointment.slot_date : '';
        const canceledAt = (bAppointment.cancelled_at !== null) ? bAppointment.cancelled_at : '';
        const consultationStart = (bAppointment.consultation_start !== null) ? bAppointment.consultation_start : '';
        const consultationEnd = (bAppointment.consultation_end !== null) ? bAppointment.consultation_end : '';
        const appointmentRx = (bAppointment.appointment_rx !== null) ? bAppointment.appointment_rx : '';
        let patientImage = '';
        if (
          (bAppointment.patient_image !== null)
          && (bAppointment.patient_image !== '')
          && (props.imagesOrDocs !== null)
          && props.imagesOrDocs.patient_avatar_prefix_url
        ) {
          patientImage = props.imagesOrDocs.patient_avatar_prefix_url + bAppointment.patient_image;
        }

        return createData(
          bAppointment.id,
          bAppointment.patient_id,
          patientName,
          dependentName,
          patientMobile,
          dependentMobile,
          patientAge,
          dependentAge,
          patientGender,
          dependentGender,
          patientImage,
          appointmentStatus,
          appointmentType,
          bAppointment.appointment_ref_id,
          clinicName,
          clinicId,
          slotDate,
          tokenNumber,
          slotStartDate,
          slotEndDate,
          consultationType,
          canceledAt,
          consultationStart,
          consultationEnd,
          appointmentRx
        );
      });
      const intermediateFormData = { ...formState };
      intermediateFormData.data = bookedAppointmentsData;
      setFormState(intermediateFormData);
    }
  }, [props.bookedAppointments]);



  const getAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getGender = (gender) => {
    switch (gender) {
      case 'm':
        return 'Male';
      case 'f':
        return 'Female';
      case 'o':
        return 'Other';
      default:
        return 'Male';
    }
  };

  const fetchConsultationType = (consultationId) => {
    switch (consultationId) {
      case 'i':
        return 'New';
      case 'r':
        return 'Repeat';
      case 'f':
        return 'Follow Up';
      default:
        return 'New';
    }
  };

  const fetchAppointmentType = (appointmentId) => {
    let selectedAppointments = '';
    const filteredConsultation = props.masterData.appointmentTypes.find((appType) => appType.id === appointmentId);

    if (filteredConsultation) {
      selectedAppointments = filteredConsultation.name;
    } else {
      selectedAppointments = 'Video';
    }

    return selectedAppointments;
  };

  const history = useHistory();

  const handleRequestSort = () => {
    const intermediateTodayBooking = { ...todayBooking };
    intermediateTodayBooking.sortorder = (todayBooking.sortorder === 'asc') ? 'desc' : 'asc';
    setTodayBooking(intermediateTodayBooking);
  };

  React.useEffect(() => {
    props.fetchBookedAppointments(todayBooking).finally(() => setIsLoading(false))
  }, [todayBooking, isUpdated], pageNum);


  const handleSelectAllClick = event => {
    const { data } = formState;
    if (event.target.checked) {
      setFormState({
        ...formState,
        selected: data.map(n => n.id)
      });
      return;
    }
    setFormState({
      ...formState,
      selected: []
    });
  };

  const handleClick = (event, appintment) => {
    const { checkcell } = formState;
    if (!checkcell) {
      return;
    }
    const { selected } = formState;
    const selectedIndex = selected.indexOf(appintment);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, appintment);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setFormState({
      ...formState,
      selected: newSelected
    });
  };

  const handleChangePage = (event, page) => {
    setFormState({
      ...formState,
      page
    });
  };

  const handleChangeRowsPerPage = event => {
    setFormState({
      ...formState,
      rowsPerPage: event.target.value
    });
  };

  // const thisIsSelected = id => {
  //   const fileteredData = formState.selected.find((sel) => sel.id === id);

  //   if (fileteredData !== undefined) {
  //     return true;
  //   }
  //   return false;
  // };

  const thisIsSelected = id => formState.selected.indexOf(id) !== -1; // eslint-disable-line


  const handleUserInput = (id, value) => {
    const intermediateTodayBooking = { ...todayBooking };
    intermediateTodayBooking[id] = value;
    setTodayBooking(intermediateTodayBooking);
  };

  const handleCheckboxChange = (id, value, checked) => {
    const intermediateTodayBooking = { ...todayBooking };

    if (
      (checked === true)
      && (intermediateTodayBooking[id].includes(value) === false)
    ) {
      intermediateTodayBooking[id].push(value);
    }

    if (
      (checked === false)
      && (intermediateTodayBooking[id].includes(value))
    ) {
      const intermArr = [...intermediateTodayBooking[id]];
      const indexOfEle = intermArr.indexOf(value);
      if (indexOfEle > -1) {
        intermArr.splice(indexOfEle, 1);
        intermediateTodayBooking[id] = intermArr;
      }
    }

    setTodayBooking(intermediateTodayBooking);
  };

  const fetchTodaysAppointment = async () => {
    const defaultValue = {
      sortby: 'patient_name',
      sortorder: 'desc',
      page: pageNum,
      length: 10,
      search: '',
      slot_date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`,
      appointment_type_id: [],
      consultation_type: [],
    };
    if (JSON.stringify(defaultValue) !== JSON.stringify(todayBooking)) {
    }
    setIsLoading(true);
    await props.fetchBookedAppointments(todayBooking).finally(() => setIsLoading(false));
  };

  const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarInfo({
      isSnackBarOpen: false,
      snackBarText: '',
      snackBarSeverity: 'success',
    });
  };

  const updateAppointmentStatus = async (appId, appStatusId) => {
    await api.ACCOUNTS_URI().post('appointments/updateAppointmentStatus', {
      ids: Array.isArray(appId) ? appId : [appId],
      status: appStatusId,
    })
      .then(async (appStatusResp) => {
        if (appStatusResp.data.success === true) {
          await fetchBookedAppointments(todayBooking);
          setIsUpdated(!isUpdated)
          setSnackBarInfo({
            isSnackBarOpen: true,
            snackBarText: 'Appointment Status Updated Successfully',
            snackBarSeverity: 'success',
          });
        } else {
          setSnackBarInfo({
            isSnackBarOpen: true,
            snackBarText: 'Error while updating status',
            snackBarSeverity: 'error',
          });
        }
      })
      .catch(() => {
        setSnackBarInfo({
          isSnackBarOpen: true,
          snackBarText: 'Internal Server Error',
          snackBarSeverity: 'error',
        });
      });
  };

  const DownloadPrescription = async (consultationId) => {

    const userInfoInLocalStorage = localStorage.getItem("userInfo");
    const parsedUserInfo = JSON.parse(userInfoInLocalStorage);

    let bearerToken = "";

    if ((parsedUserInfo !== null) &&
      parsedUserInfo.hashedKey &&
      (parsedUserInfo.hashedKey.length > 0)) {
      bearerToken = parsedUserInfo.hashedKey;
    }

    let data = {
      appointment_id: consultationId
    }
    await axios.post("https://oaarogyabetaportal.mirakidigital.in/api/doctor/appointments/consultation/downloadRx", data, {
      headers: { Authorization: `Bearer ${bearerToken}` },
      responseType: 'blob',
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf');
        document.body.appendChild(link);
        link.click();
      })
  }

  const handleResumeConsultation = (consultationId) => {

    api.ACCOUNTS_URI().post('appointments/updateCounsultationStatus', {
      appointment_id: consultationId,
      consultation_status: 's',
    })
      .then((updateConsultResp) => {
        if (
          (updateConsultResp.status === 200)
          && (updateConsultResp.data.success === true)
        ) {
          window.sessionStorage.setItem("selectedQueueId", consultationId)
          props.setSelectedQueueId(consultationId);
          history.push('/consult');
        }
      })
      .catch((err) => {
        console.log('error is:', err);
      });
  };

  const handleViewProfileConsultationClick = (consultationId, patientId) => {
    props.setSelectedQueueId(consultationId);
    props.setSelectedPatientId(patientId)
    history.push({
      pathname: "/app/appointments/patient-profile",
      state: {
        appointmentId: consultationId,
        patientId: patientId
      }
    });
    // history.push('/app/appointments/patient-profile');
  };

  const renderActionButtons = (appId, appType, consultationStart, cancelledAt, appointmentStatus, consultationEnd, appointmentRx, patientId) => {
    if (appointmentStatus === 2) {
      return (
        <>
          <Button style={{ color: '#00800054' }}>In Queue</Button>

          <Cancel
            updateCancelStatus={updateAppointmentStatus}
            appId={appId}
            showDialog={cancelDialog}
          />
        </>
      )
    } else if (appointmentStatus === 3) {
      return (
        <>
          <MoveToQueue
            updateStatus={updateAppointmentStatus}
            appId={appId}
          />
          <Cancel
            updateCancelStatus={updateAppointmentStatus}
            appId={appId}
            showDialog={cancelDialog}
          />
        </>
      )
    } else if (appointmentStatus === 4) {
      return (
        <>
          <ViewRx appointmentRx={appointmentRx} />
        </>
      )
    } else if (appointmentStatus === 5) {
      return (
        <>
          <Button color="primary">No Show</Button>
        </>
      )
    } else if (appointmentStatus === 6) {
      return (
        <>
          <Button color="primary">Cancelled</Button>
        </>
      )
    } else if (appointmentStatus === 9) {
      return (
        <>
          <Button style={{ color: '#ffb963' }}>Paused</Button>
          <Cancel
            updateCancelStatus={updateAppointmentStatus}
            appId={appId}
            showDialog={cancelDialog}
          />
        </>
      )
    }
  };

  const htmlView = "<!DOCTYPE html>\\r\\n<html lang=\\\"en\\\">\\r\\n\\r\\n<head>\\r\\n    <meta charset=\\\"UTF-8\\\">\\r\\n    <meta http-equiv=\\\"X-UA-Compatible\\\" content=\\\"IE=edge\\\">\\r\\n    <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\">\\r\\n    <title>Document</title>\\r\\n    <style>\\r\\n        h1,\\r\\nh2 {\\r\\n    font-family: Lato;\\r\\n}\\r\\n\\r\\ntable {\\r\\n    border: 1px solid;\\r\\n    border-collapse: collapse;\\r\\n    /* border-collapse: inherit; */\\r\\n    border-spacing: 0 10px;\\r\\n}\\r\\n\\r\\ntr {\\r\\n    border-bottom: 1px solid;\\r\\n    padding: inherit;\\r\\n    padding-top: 8px;\\r\\n    padding-bottom: 8px;\\r\\n}\\r\\n\\r\\ntd,\\r\\nth {\\r\\n    border-right: 1px solid;\\r\\n    border-bottom: 1px solid;\\r\\n    padding: inherit;\\r\\n    padding-left: 10px;\\r\\n    padding-right: 10px;\\r\\n}\\r\\n\\r\\n.border {\\r\\n    border: 1px solid;\\r\\n}\\r\\n\\r\\n.p10 {\\r\\n    padding: 10px;\\r\\n}\\r\\n\\r\\n.ml10 {\\r\\n    margin-left: 10px;\\r\\n}\\r\\n\\r\\n.px10 {\\r\\n    padding-left: 10px;\\r\\n    padding-right: 10px;\\r\\n}\\r\\n\\r\\n.flex {\\r\\n    display: flex;\\r\\n}\\r\\n\\r\\n.align-items-center {\\r\\n    align-items: center;\\r\\n}\\r\\n\\r\\n.justify-content-center {\\r\\n    justify-content: center;\\r\\n}\\r\\n\\r\\n.column30 {\\r\\n    flex: 30%;\\r\\n}\\r\\n\\r\\n.column50 {\\r\\n    flex: 50%;\\r\\n}\\r\\n\\r\\n.column70 {\\r\\n    flex: 70%;\\r\\n}\\r\\n\\r\\n.bg-gray {\\r\\n    background: #f5f5f5;\\r\\n}\\r\\n    </style>\\r\\n</head>\\r\\n\\r\\n<body>\\r\\n    <div>\\r\\n        <div>\\r\\n            <div>\\r\\n                <h3>Prescription Preview</h3>\\r\\n            </div>\\r\\n            <hr>\\r\\n            <div>\\r\\n                <div class=\\\"flex align-items-center\\\">\\r\\n                    <div class=\\\"border p10 column70\\\">\\r\\n                        <div class=\\\"flex\\\">\\r\\n                            <div class=\\\"column50\\\">\\r\\n                                <p><b>Name:</b><span> Dr(Mrs) Dheera yy Test</span></p>\\r\\n                                <p><b>Age/Sex:</b><span> 26y, Male</span></p>\\r\\n                                <p><b>Clinic:</b><span>  Dr Abhishek Ad</span></p>\\r\\n                            </div>\\r\\n                            <div class=\\\"column50\\\">\\r\\n                                <p><b>Date:</b><span> 30-10-2021</span></p>\\r\\n                                <p><b>Mobile:</b><span> 8520021995</span></p>\\r\\n                            </div>\\r\\n                        </div>\\r\\n                    </div>\\r\\n                   \\r\\n                </div>\\r\\n                <div>\\r\\n                                        <div>\\r\\n                        <p><b>Symptoms:</b><span> Cough,Headache,Eyesight deteriorating,Nasal Block (smhdb)</span></p>\\r\\n                    </div>\\r\\n                                                            <div>\\r\\n                        <p><b>Observations:</b><span> test observation,new obs</span></p>\\r\\n                    </div>\\r\\n                                                            <div>\\r\\n                        <p><b>Diagnosis:</b><span> New Diagnosis,sample new diagnosis</span></p>\\r\\n                    </div>\\r\\n                                                            <div>\\r\\n                        <div><b>Investigations:</b>\\r\\n                   <ul>\\r\\n                            <li><span style=\\\"padding: 0px 10px;\\\">•</span>Test New Investigation ()</li>,<li><span style=\\\"padding: 0px 10px;\\\">•</span>New Name ()</li>\\r\\n</ul>\\r\\n                        </div>\\r\\n                    </div>\\r\\n                     \\r\\n                                        <div>\\r\\n                        <p>\\r\\n                            <b>Family History:</b><span> Father (Test family mem problem) ,Father (test,testtwo,Test2) </span>\\r\\n                        </p>\\r\\n                    </div>\\r\\n                                                            <div>\\r\\n                        <div>\\r\\n                            <table>\\r\\n                                <thead>\\r\\n                                    <tr>\\r\\n                                        <th scope=\\\"col\\\" style=\\\"padding: 10px; width: 40px;\\\">No</th>\\r\\n                                        <th scope=\\\"col\\\">Name</th>\\r\\n                                        <th scope=\\\"col\\\">Frequency</th>\\r\\n                                        <th scope=\\\"col\\\" style=\\\"padding: 10px; width: 100px;\\\">Duration</th>\\r\\n                                        <th scope=\\\"col\\\" style=\\\"padding: 10px; width: 100px;\\\">Quantity</th>\\r\\n                                        <th scope=\\\"col\\\" style=\\\"padding: 10px; width: 100px;\\\">Total</th>\\r\\n                                        <th scope=\\\"col\\\">Notes</th>\\r\\n                                    </tr>\\r\\n                                </thead>\\r\\n                                <tbody>\\r\\n                                    <tr><th role=\\\"cell\\\" scope=\\\"row\\\">1</th><td><b>Test New Medicine</b><br>Test Name</td><td></td><td> days </td><td>5 tablet - </td><td>0</td></tr><th role=\\\"cell\\\" scope=\\\"row\\\">2</th><td><b>Test New Medicine 10</b><br>New Name</td><td></td><td>0 days </td><td>0 tablet - </td><td>0</td></tr>\\r\\n                                </tbody>\\r\\n                            </table>\\r\\n                        </div>\\r\\n                    </div>\\r\\n                                                            <div>\\r\\n                        <p><b>Instructions:</b></p>\\r\\n                        <ul>\\r\\n                            <li><span style=\\\"padding: 0px 10px;\\\">•</span>Test Instruction ()</li>,<li><span style=\\\"padding: 0px 10px;\\\">•</span>Test ()</li>\\r\\n                        </ul>\\r\\n                    </div>\\r\\n                                                            <div>\\r\\n                        <p><b>Procedures:</b></p>\\r\\n                        <ul>\\r\\n                            <li><span style=\\\"padding: 0px 10px;\\\">•</span>New Name 10 ()</li>,<li><span style=\\\"padding: 0px 10px;\\\">•</span>New Procedure ()</li>\\r\\n                        </ul>\\r\\n                    </div>\\r\\n                                                                                                    <div class=\\\"bg-gray p10\\\">\\r\\n                        <div style=\\\"display: flex; align-items: center; justify-content: space-between;\\\">\\r\\n                            <div>\\r\\n                                <b>Dr Abhishek Ad</b> \\r\\n                            </div>\\r\\n                    </div>\\r\\n                </div>\\r\\n            </div>\\r\\n        </div>\\r\\n    </div>\\r\\n</body>\\r\\n\\r\\n</html>"

  const { classes, intl } = props;
  const {
    data,
    order,
    orderBy,
    selected,
    rowsPerPage,
    page,
    filterText,
    size,
    columnData,
    toolbar, pagination, checkcell,
    bordered, stripped, hovered,
  } = formState;
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - (page * rowsPerPage));

  if (
    (props.masterData === null)
    || (props.imagesOrDocs === null)
    || (props.imagesOrDocs.appointment_attachment_prefix_url === undefined)
    || (props.imagesOrDocs.appointment_attachment_prefix_url === null)
  ) {
    return null;
  }

  return (
    <div>
      <Grid container className={classes.rootTable}>
        <Grid item xs={12}>
          <Paper className={classes.rootTable} elevation={0}>
            {toolbar && (
              <EnhancedTableToolbar
                numSelected={selected.length}
                filterText={filterText}
                onUserInput={handleUserInput}
                title="Today Bookings"
                placeholder="Search"
                bookingTypes={todayBooking}
                handleCheckboxChange={handleCheckboxChange}
                fetchAppointments={fetchTodaysAppointment}
                selectedAppointmens={formState.selected}
                updateStatus={updateAppointmentStatus}
                isUpdated={isUpdated}
                todayAppointmentList={props.bookedAppointments.list}
              />
            )}
            <div className={classes.tableWrapper}>
              <TableContainer className={classes.container}>
                <Table stickyHeader className={
                  classNames(
                    classes.table,
                    hovered && classes.hover,
                    stripped && classes.stripped,
                    bordered && classes.bordered,
                    classes[size]
                  )}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={todayBooking.sortorder}
                    onSelectAllClick={(e) => handleSelectAllClick(e)}
                    onRequestSort={handleRequestSort}
                    rowCount={data.length}
                    columnData={columnData}
                    checkcell={checkcell}
                  />
                  {isLoading ? (
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={6} padding="checkbox" align="center">
                          <img src={loader} />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <>
                      {
                        (
                          (props.bookedAppointments.list === undefined)
                          || (props.bookedAppointments.list === null)
                          || (props.bookedAppointments.list.length === 0)
                          // || (props.masterData === null) 
                        ) ? (
                          <TableBody>
                            <TableRow>
                              <TableCell colSpan={6} padding="checkbox" align="center">
                                <div className={classes.noDetails}>
                                  <ErrorOutline style={{ fontSize: 80 }} />
                                  <Typography>No Records Found</Typography>
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        ) : (
                          <TableBody>
                            {data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((n, index) => {
                              const isSelected = thisIsSelected(n.id);
                              return (
                                <TableRow
                                  // onClick={(event) => handleClick(event, n)}
                                  role="checkbox"
                                  aria-checked={isSelected}
                                  tabIndex={-1}
                                  key={n.id}
                                  selected={isSelected}
                                >
                                  {checkcell && (
                                    <TableCell padding="checkbox">
                                      <Checkbox onClick={(event) => handleClick(event, n.id)} checked={isSelected} size="small" />
                                    </TableCell>
                                  )}
                                  <TableCell component="th" scope="row" padding="none">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <Avatar className={classes.avatar} src={n.patientImage === '' ? '' : n.patientImage}>
                                        {n.patientImage === '' ?
                                          ((n.patientName.length > 0) ? n.patientName.charAt(0) : '')
                                          : ''
                                        }
                                      </Avatar>
                                      <div style={{ marginLeft: '10px', textTransform: 'capitalize' }}>
                                        {n.dependentName !== '' && n.dependentName !== null ? n.dependentName : n.patientName}
                                        <br />
                                        {n.dependentGender !== '' && n.dependentGender !== null ? n.dependentGender : n.patientGender}
                                        ,
                                        {`${n.dependentAge !== '' && n.dependentAge !== null ? n.dependentAge : n.patientAge} y`}
                                        <br />
                                        {`+91 ${n.dependentMobile !== '' && n.dependentMobile !== null ? n.dependentMobile : n.patientMobile}`}
                                      </div>
                                    </div>
                                  </TableCell>
                                  <TableCell align="left">

                                    {n.appointmentType === 'Video' ? (
                                      <div className={classes.bgVideo}>
                                        <p>{n.appointmentType}</p>
                                      </div>
                                    ) : ('')}
                                    {n.appointmentType === 'Audio' ? (
                                      <div className={classes.bgAudio}>
                                        <p>{n.appointmentType}</p>
                                      </div>
                                    ) : ('')}
                                    {n.appointmentType === 'Chat' ? (
                                      <div className={classes.bgChat}>
                                        <p>{n.appointmentType}</p>
                                      </div>
                                    ) : ('')}
                                    {n.appointmentType === 'Walk-In' ? (
                                      <div className={classes.bgWalkIn}>
                                        <p>{n.appointmentType}</p>
                                        {n.appointmentType === 'Walk-In' ? (<p>{n.clinicName}</p>) : ('')}
                                      </div>
                                    ) : ('')}
                                  </TableCell>
                                  <TableCell align="left">
                                    {n.tokenNumber == '' ? (n.slotStartDate == '' && n.slotEndDate == '' ? 'No Slot' : `${n.slotStartDate} - ${n.slotEndDate}`) : `Token No - ${n.tokenNumber}`}
                                    {' '}
                                    <br />
                                    {' '}
                                    {n.slotDate}
                                    {n.token ? (
                                      <p style={{ margin: 0 }}>
                                        TKN no:
                                        {n.token}
                                      </p>
                                    ) : ('')}
                                  </TableCell>
                                  <TableCell align="left">
                                    <p>
                                      <b>Booking ID: </b>
                                      <span>{n.appointmentRefId}</span>
                                    </p>
                                    <div>
                                      <b>Ref: </b>
                                      <span>
                                        <Chip
                                          label={n.consultationType}
                                        />
                                      </span>
                                    </div>
                                  </TableCell>
                                  <TableCell align="right">
                                    {renderActionButtons(n.id, n.appointmentType, n.consultationStart, n.canceledAt, n.appointmentStatus, n.consultationEnd, n.appointmentRx, n.patientId)}
                                    <Button
                                      variant="contained"
                                      onClick={() => handleViewProfileConsultationClick(n.id, n.patientId)}
                                      className={classes.button}
                                      style={{ marginLeft: 8 }}
                                    >
                                      View Profile
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                            {emptyRows > 0 && (
                              <TableRow style={{ height: 49 * emptyRows }}>
                                <TableCell colSpan={6} />
                              </TableRow>
                            )}
                          </TableBody>
                        )
                      }
                    </>
                  )}
                </Table>
              </TableContainer>
            </div>
            {pagination && (
              <Pagination count={props.bookedAppointments.last_page} className={classes.pagination} page={pageNum} onChange={handlePagination} />
            )}
          </Paper>

          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={snackBarInfo.isSnackBarOpen}
            autoHideDuration={2000000}
            onClose={handleSnackbarClose}
          >
            <Alert
              severity={snackBarInfo.snackBarSeverity}
              onClose={handleSnackbarClose}
            >
              {snackBarInfo.snackBarText}
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </div>
  );
}

TodayBookings.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

const mapStateToProps = state => ({
  bookedAppointments: state.get('appointmentReducer').bookedAppointments,
  bookedAppointmentsAllData: state.get('appointmentReducer').bookedAppointmentsAllData,
  masterData: state.get('dashboardReducer').masterData,
  imagesOrDocs: state.get('dashboardReducer').imagesOrDocs,
});

export default connect(mapStateToProps, { fetchBookedAppointments, setSelectedQueueId, setSelectedPatientId })(withStyles(styles)(injectIntl(TodayBookings)));
