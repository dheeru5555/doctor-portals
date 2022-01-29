import React, { useState, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';
import TablePagination from '@material-ui/core/TablePagination';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import Loading from 'enl-components/Loading';
import EnhancedTableHead from '../AppointmentTables/TableHeader';
import EnhancedTableToolbar from '../AppointmentTables/TableToolbar';
import styles from '../AppointmentTables/tableStyle-jss';
import { fetchCheckedOutAppointments } from '../../../redux/actions/appointmentAction';
import loader from 'enl-images/loader.gif';
import Typography from '@material-ui/core/Typography';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import ViewRx from './Dialogs/ViewRx';
import helper from '../../../helpers/helpers';

function createData(
  id,
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
  appointmentRx
) {
  return {
    id,
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
    appointmentRx
  };
}

function CheckedOut(props) {
  // React.useEffect(() => {
  //   if (props.checkedoutAppointments === null) {
  //     props.fetchCheckedOutAppointments();
  //   }
  // }, []);

  // React.useEffect(() => {
  //   props.fetchCheckedOutAppointments();
  // }, []);
  const componentRef = useRef();
  const [length, setLength] = useState(10);
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
        label: 'Consultation Period'
      }, {
        id: 'carbs',
        numeric: false,
        disablePadding: false,
        label: 'Appointment details'
      }, {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        label: 'Action'
      },
    ],
    data: [],
    page: 0,
    rowsPerPage: length,
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

  const [checkedBooking, setCheckedBooking] = useState({
    sortby: 'patient_name',
    sortorder: 'desc',
    page: pageNum,
    length: 10,
    search: '',
    slot_date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`,
    appointment_type_id: [],
    consultation_type: [],
    clinic_id: (selectedClinics !== null && selectedClinics !== undefined) ? (selectedClinics.length == 0 ? [] : selectedClinics.map((clinic) => clinic.id)) : [],
    cr_id: (localStorage.getItem("cr_id") !== null && localStorage.getItem("cr_id") !== undefined) ? parseInt(localStorage.getItem("cr_id")) : ''
  });

  const handlePagination = (event, value) => {
    setPageNum(value)
    checkedBooking['page'] = value;
    props.fetchCheckedOutAppointments();
  }

  React.useEffect(() => {
    if (
      (props.masterData !== null)
      && (props.checkedoutAppointments !== null)
      && (props.checkedoutAppointments.length > 0)
    ) {
      const bookedAppointmentsData = props.checkedoutAppointments.map((bAppointment) => {
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
        const slotStartDate = (bAppointment.slot_start !== null) ? helper.tConvert((bAppointment.slot_start).substring(0, bAppointment.slot_start.length - 3)) : '';
        const slotEndDate = (bAppointment.slot_end !== null) ? helper.tConvert((bAppointment.slot_end).substring(0, bAppointment.slot_end.length - 3)) : '';
        const consultationType = (bAppointment.consultation_type !== null) ? fetchConsultationType(bAppointment.consultation_type) : '';
        const slotDate = (bAppointment.slot_date !== null) ? bAppointment.slot_date : '';
        const canceledAt = (bAppointment.cancelled_at !== null) ? bAppointment.cancelled_at : '';
        const consultationStart = (bAppointment.consultation_start !== null) ? bAppointment.consultation_start : '';
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
          appointmentRx
        );
      });
      const intermediateFormData = { ...formState };
      intermediateFormData.data = bookedAppointmentsData;
      setFormState(intermediateFormData);
    }
  }, [props.checkedoutAppointments]);

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
    const intermediateTodayBooking = { ...checkedBooking };
    intermediateTodayBooking.sortorder = (checkedBooking.sortorder === 'asc') ? 'desc' : 'asc';
    setCheckedBooking(intermediateTodayBooking);
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

  const routeChange = () => {
    const path = '/app/appointments/patient-profile';
    history.push(path);
  };

  React.useEffect(() => {
    fetchCheckedoutAppointments()
  }, [checkedBooking]);

  const handleUserInput = (id, value) => {
    const intermediateTodayBooking = { ...checkedBooking };
    intermediateTodayBooking[id] = value;
    setCheckedBooking(intermediateTodayBooking);
  };

  const handleCheckboxChange = (id, value, checked) => {
    const intermediateTodayBooking = { ...checkedBooking };

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

    setCheckedBooking(intermediateTodayBooking);
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

  const fetchCheckedoutAppointments = async () => {
    const defaultValue = {
      sortby: 'patient_name',
      sortorder: 'desc',
      page: 1,
      length: 10,
      search: '',
      slot_date: `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`,
      appointment_type_id: [],
      consultation_type: [],
    };
    if (JSON.stringify(defaultValue) !== JSON.stringify(checkedBooking)) {
    }
    setIsLoading(true);
    await props.fetchCheckedOutAppointments(checkedBooking).finally(() => setIsLoading(false));
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
                title="Checked Out"
                placeholder="Search"
                bookingTypes={checkedBooking}
                handleCheckboxChange={handleCheckboxChange}
                fetchAppointments={fetchCheckedoutAppointments}
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
                    orderBy={checkedBooking.sortorder}
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
                        (props.checkedoutAppointments === undefined)
                          || (props.checkedoutAppointments === null)
                          || (props.checkedoutAppointments.length === 0) ? (
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
                                  onClick={(event) => handleClick(event, n.id)}
                                  role="checkbox"
                                  aria-checked={isSelected}
                                  tabIndex={-1}
                                  key={n.id}
                                  selected={isSelected}
                                >
                                  {checkcell && (
                                    <TableCell padding="checkbox">
                                      <Checkbox checked={isSelected} />
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
                                    {`${n.slotStartDate} - ${n.slotEndDate}`}
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
                                      <span><Chip label={n.consultationType} /></span>
                                    </div>
                                  </TableCell>
                                  <TableCell align="right">
                                    {n.type === 'Walk-In' ? (
                                      <Button variant="contained" className={classes.button} style={{ marginRight: '15px' }}>
                                        Invoice
                                        <CloudDownload className={classes.rightIcon} />
                                      </Button>
                                    ) : ('')}
                                    <ViewRx appointmentRx={n.appointmentRx} />
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
                {props.checkedoutAppointmentsAllData !== null ?
                  (<Pagination count={props.checkedoutAppointmentsAllData.last_page} className={classes.pagination} page={pageNum} onChange={handlePagination} />) : (
                    ''
                  )}
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

CheckedOut.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: intlShape.isRequired
};

const mapStateToProps = state => ({
  checkedoutAppointments: state.get('appointmentReducer').checkedoutAppointments,
  checkedoutAppointmentsAllData: state.get('appointmentReducer').checkedoutAppointmentsAllData,
  masterData: state.get('dashboardReducer').masterData,
  imagesOrDocs: state.get('dashboardReducer').imagesOrDocs,
});

export default connect(mapStateToProps, { fetchCheckedOutAppointments })(withStyles(styles)(injectIntl(CheckedOut)));