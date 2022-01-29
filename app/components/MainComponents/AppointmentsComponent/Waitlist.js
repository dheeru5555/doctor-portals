import Avatar from '@material-ui/core/Avatar';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import Loading from 'enl-components/Loading';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import EnhancedTableHead from '../AppointmentTables/TableHeader';
import EnhancedTableToolbar from '../AppointmentTables/TableToolbar';
import styles from '../AppointmentTables/tableStyle-jss';
import Cancel from './Dialogs/Cancel';
import MoveToQueue from './Dialogs/MoveToQueue';
import VitalsDialog from './Dialogs/Vitals';
import { fetchWaitListAppointments } from '../../../redux/actions/appointmentAction';
import API from '../../../helpers/api';
import helper from '../../../helpers/helpers';
import loader from 'enl-images/loader.gif';
import { Typography } from '@material-ui/core';
import ErrorOutline from '@material-ui/icons/ErrorOutline';


let counter = 0;
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
  appointmentType,
  appointmentRefId,
  clinicName,
  clinicId,
  slotDate,
  slotStartDate,
  slotEndDate,
  consultationType,
  canceledAt,
  consultationStart,
) {
  counter += 1;
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
    appointmentType,
    appointmentRefId,
    clinicName,
    clinicId,
    slotDate,
    slotStartDate,
    slotEndDate,
    consultationType,
    canceledAt,
    consultationStart,
  };
}

function Waitlist(props) {
  const api = new API();

  // React.useEffect(() => {
  //   props.fetchWaitListAppointments()
  // }, [])

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
        label: 'Clinic'
      }, {
        id: 'fat',
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

  let storedClinics = localStorage.getItem('selectedClinics')
  let selectedClinics = storedClinics !== '' ? JSON.parse(storedClinics) : []

  const [isLoading, setIsLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);

  const [waitlistBooking, setWaitlistBooking] = useState({
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

  const handlePagination = (event, value) => {
    setPageNum(value)
    waitlistBooking.page = value;
  }

  const [snackBarInfo, setSnackBarInfo] = React.useState({
    isSnackBarOpen: false,
    snackBarText: '',
    snackBarSeverity: 'success',
  });

  const [cancelDialog, setCancelDialog] = React.useState(false);
  const [queueDialog, setQueueDialog] = React.useState(false);
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

  React.useEffect(() => {
    if (
      (props.masterData !== null)
      && (props.waitlistAppointments !== null)
      && (props.waitlistAppointments.length > 0)
    ) {
      const bookedAppointmentsData = props.waitlistAppointments.map((bAppointment) => {
        const appointmentType = (bAppointment.appointment_type_id !== null) ? fetchAppointmentType(bAppointment.appointment_type_id) : '';
        const patientId = (bAppointment.patient_id !== null) ? bAppointment.patient_id : '';
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
        const slotStartDate = (bAppointment.slot_start !== null) ? helper.tConvert((bAppointment.slot_start).substring(0, bAppointment.slot_start.length - 3)) : '';
        const slotEndDate = (bAppointment.slot_end !== null) ? helper.tConvert((bAppointment.slot_end).substring(0, bAppointment.slot_end.length - 3)) : '';
        const consultationType = (bAppointment.consultation_type !== null) ? fetchConsultationType(bAppointment.consultation_type) : '';
        const slotDate = (bAppointment.slot_date !== null) ? bAppointment.slot_date : '';
        const canceledAt = (bAppointment.cancelled_at !== null) ? bAppointment.cancelled_at : '';
        const consultationStart = (bAppointment.consultation_start !== null) ? bAppointment.consultation_start : '';
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
          appointmentType,
          bAppointment.appointment_ref_id,
          clinicName,
          clinicId,
          slotDate,
          slotStartDate,
          slotEndDate,
          consultationType,
          canceledAt,
          consultationStart,
        );
      });
      const intermediateFormData = { ...formState };
      intermediateFormData.data = bookedAppointmentsData;
      setFormState(intermediateFormData);
    }
  }, [props.waitlistAppointments]);

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

  const handleRequestSort = () => {
    const intermediateTodayBooking = { ...waitlistBooking };
    intermediateTodayBooking.sortorder = (waitlistBooking.sortorder === 'asc') ? 'desc' : 'asc';
    setWaitlistBooking(intermediateTodayBooking);
  };

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

  const handleClick = (event, id) => {
    const { checkcell } = formState;
    if (!checkcell) {
      return;
    }
    const { selected } = formState;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const thisIsSelected = id => formState.selected.indexOf(id) !== -1; // eslint-disable-line

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
  const renderCell = (dataArray, keyArray) => keyArray.map((itemCell, index) => (
    <TableCell align={itemCell.numeric ? 'right' : 'left'} key={index.toString()}>{dataArray[itemCell.id]}</TableCell>
  ));

  const history = useHistory();

  React.useEffect(() => {
    fetchWaitListsAppointment()
    // props.fetchWaitListAppointments(waitlistBooking);
  }, [waitlistBooking]);

  const handleUserInput = (id, value) => {
    const intermediateTodayBooking = { ...waitlistBooking };
    intermediateTodayBooking[id] = value;
    setWaitlistBooking(intermediateTodayBooking);
  };

  const handleCheckboxChange = (id, value, checked) => {
    const intermediateTodayBooking = { ...waitlistBooking };

    if (checked === true) {
      intermediateTodayBooking[id].push(value);
    } else if (intermediateTodayBooking[id].includes(value)) {
      const intermArr = [...intermediateTodayBooking[id]];
      const indexOfEle = intermArr.indexOf(value);
      if (indexOfEle > -1) {
        intermArr.splice(value, 1);
        intermediateTodayBooking[id] = intermArr;
      }
    }

    setWaitlistBooking(intermediateTodayBooking);
  };

  const updateAppointmentStatus = async (appId, appStatusId) => {
    await api.ACCOUNTS_URI().post('appointments/updateAppointmentStatus', {
      ids: [appId],
      status: appStatusId,
    })
      .then(async (appStatusResp) => {
        if (appStatusResp.data.success === true) {
          await props.fetchWaitListAppointments(waitlistBooking);
          setSnackBarInfo({
            isSnackBarOpen: true,
            snackBarText: 'Appointment Status Updated Successfully',
            snackBarSeverity: 'success',
          });
          setCancelDialog(true);
          setQueueDialog(true);
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

  const fetchWaitListsAppointment = async () => {
    const defaultValue = {
      sortby: 'patient_name',
      sortorder: 'desc',
      page: 1,
      length: 10,
      search: '',
      slot_date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`,
      appointment_type_id: [],
      consultation_type: [],
      clinic_id: selectedClinics.map((clinic) => clinic.id)
    };
    if (JSON.stringify(defaultValue) !== JSON.stringify(waitlistBooking)) {
      setIsLoading(true);
    }
    await props.fetchWaitListAppointments(waitlistBooking).finally(() => setIsLoading(false));
  };

  const handleViewProfileConsultationClick = (consultationId, patientId) => {
    // props.setSelectedQueueId(consultationId);
    // props.setSelectedPatientId(patientId)
    history.push({
      pathname: "/app/appointments/patient-profile",
      state: {
        appointmentId: consultationId,
        patientId: patientId
      }
    });
    // history.push('/app/appointments/patient-profile');
  };

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
                title="Waitlist"
                placeholder="Search"
                bookingTypes={waitlistBooking}
                handleCheckboxChange={handleCheckboxChange}
                fetchAppointments={fetchWaitListsAppointment}
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
                    orderBy={waitlistBooking.sortorder}
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
                      {((props.waitlistAppointments === undefined)
                        || (props.waitlistAppointments === null)
                        || (props.waitlistAppointments.length === 0)) ? (
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
                            // if (n.name.toLowerCase().indexOf(filterText) === -1 && n.mobile.toLowerCase().indexOf(filterText) === -1) {
                            //   return false;
                            // }
                            return (
                              <TableRow
                                // onClick={(event) => handleClick(event, n.id)}
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
                                <TableCell align="left">{n.clinicName}</TableCell>
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
                                  <VitalsDialog waitListData={n} patientId={n.patientId} />
                                  <Button
                                    variant="contained"
                                    onClick={() => handleViewProfileConsultationClick(n.appId, n.patientId)}
                                    className={classes.button}
                                  >
                                    View Profile
                                  </Button>
                                  <MoveToQueue
                                    updateStatus={updateAppointmentStatus}
                                    appId={n.id}
                                    showDialog={queueDialog}
                                    setQueueDialog={setQueueDialog}
                                  />
                                  <Cancel
                                    updateCancelStatus={updateAppointmentStatus}
                                    appId={n.id}
                                    showDialog={cancelDialog}
                                    setQueueDialog={setQueueDialog}
                                  />
                                </TableCell>
                              </TableRow>
                            );
                          })}
                          {emptyRows > 0 && (
                            <TableRow style={{ height: 9 }}>
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                      )}
                    </>
                  )}
                </Table>
              </TableContainer>
            </div>
            {pagination && (
              // <TablePagination
              //   component="div"
              //   count={data.length}
              //   rowsPerPage={rowsPerPage}
              //   page={page}
              //   backIconButtonProps={{
              //     'aria-label': 'Previous Page',
              //   }}
              //   nextIconButtonProps={{
              //     'aria-label': 'Next Page',
              //   }}
              //   onChangePage={(e, p) => handleChangePage(e, p)}
              //   onChangeRowsPerPage={(val) => handleChangeRowsPerPage(val)}
              // />
              <>
                {props.waitlistAppointmentsAllData !== null ? (
                  <Pagination count={props.waitlistAppointmentsAllData.last_page} className={classes.pagination} page={pageNum} onChange={handlePagination} />
                ) : ''}
              </>
            )}
          </Paper>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            open={snackBarInfo.isSnackBarOpen}
            autoHideDuration={2000}
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

Waitlist.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

const mapStateToProps = state => ({
  waitlistAppointments: state.get('appointmentReducer').waitlistAppointments,
  waitlistAppointmentsAllData: state.get('appointmentReducer').waitlistAppointmentsAllData,
  masterData: state.get('dashboardReducer').masterData,
  imagesOrDocs: state.get('dashboardReducer').imagesOrDocs,
});

export default connect(mapStateToProps, { fetchWaitListAppointments })(withStyles(styles)(injectIntl(Waitlist)));
