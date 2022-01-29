import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
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
import EnhancedTableHead from '../Tables/TableHeader';
import EnhancedTableToolbar from '../Tables/TableToolbar';
import styles from '../Tables/tableStyle-jss';
import ViewBills from './Dialogs/ViewBills';
import BillPayment from './Dialogs/BillPayment';
import GenerateInvoice from './Dialogs/GenerateInvoice';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import helper from '../../../helpers/helpers';

let counter = 0;
function createData(name, mobile, type, slottime, slotdate, gender, age, amount, status) {
  counter += 1;
  return {
    id: counter,
    name,
    mobile,
    type,
    slottime,
    slotdate,
    gender,
    age,
    amount,
    status
  };
}

function WalkIn(props) {

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
        type: 'patient_name',
        label: 'Patient'
      }, {
        id: 'fat1',
        numeric: false,
        disablePadding: false,
        type: 'consultation_type',
        label: 'Consultation type'
      }, {
        id: 'fat2',
        numeric: false,
        disablePadding: false,
        label: 'Slot / Token'
      }, {
        id: 'fat3',
        numeric: false,
        disablePadding: false,
        type: 'booking_id',
        label: 'Appointment Details'
      }, {
        id: 'carbs',
        numeric: false,
        disablePadding: false,
        type: 'amount',
        label: 'Amount'
      },
      {
        id: 'protein',
        numeric: true,
        disablePadding: false,
        type: 'status',
        label: 'Status'
      }, {
        id: 'protein1',
        numeric: true,
        disablePadding: false,
        label: ''
      },
    ],
    filterText: '',
    size: 'medium',
    bordered: false,
    stripped: false,
    hovered: true,
    toolbar: true,
    checkcell: false,
    pagination: true,
    tableflter: {
      sortby: 'patient_name',
      sortorder: 'desc',
      page: pageNum,
      length: 10,
      search: null,
      date_range: "",
      payment_status: null,
      clinic_id: selectedClinics.length == 0 ? [] : selectedClinics.map((clinic) => clinic.id),
      cr_id: (localStorage.getItem("cr_id") !== null && localStorage.getItem("cr_id") !== undefined) ? parseInt(localStorage.getItem("cr_id")) : ''
    }
  });

  const [invoiceDisplay, setinvoiceDisplay] = useState(false);
  const [pageNum, setPageNum] = useState(1);

  // const handleRequestSort = (event, property) => {
  //   const { orderBy, order, data } = formState;
  // };

  const handleSelectAllClick = event => {
    const { data } = formState;
    if (event.target.checked) {
      setFormState({
        ...formState,
        selected: data.map(n => patient.id)
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

  const handlePagination = (event, page) => {
    setPageNum(page)
    setFormState({
      ...formState,
      tableflter: { ...formState.tableflter, page }
    });

    getWalkinPatientList({
      ...formState.tableflter,
      page
    });
  };

  // const handleChangeRowsPerPage = event => {
  //   setFormState({
  //     ...formState,
  //     tableflter: { ...formState.tableflter, length: event.target.value }
  //   });
  //   getWalkinPatientList({
  //     ...formState.tableflter,
  //     length: event.target.value
  //   });
  // };

  const openInvoice = (apointment_id) => {
    setinvoiceDisplay(true);
    getinvoiceDetail(apointment_id);
  };

  const filterDatePicker = (date) => {
    let searchDate = null;
    if (date !== null) {
      const firstDate = date[0];
      const lastDate = date[1];
      searchDate = `${firstDate.getFullYear()}-${firstDate.getMonth() + 1}-${firstDate.getDate()} - ${lastDate.getFullYear()}-${lastDate.getMonth() + 1}-${lastDate.getDate()}`;
    }

    setFormState({
      ...formState,
      tableflter: { ...formState.tableflter, date_range: searchDate }
    });

    getWalkinPatientList({
      ...formState.tableflter,
      date_range: searchDate
    });
  };

  const searchFilterText = (serarch_text) => {
    setFormState({
      ...formState,
      tableflter: { ...formState.tableflter, search: serarch_text }
    });
    getWalkinPatientList({
      ...formState.tableflter,
      search: serarch_text
    });
  };

  const searchPaymentStatus = (serarch_text) => {
    setFormState({
      ...formState,
      tableflter: { ...formState.tableflter, payment_status: serarch_text }
    });
    getWalkinPatientList({
      ...formState.tableflter,
      payment_status: serarch_text
    });
  };

  const generateInvoiceTable = () => {
    setinvoiceDisplay(true);
    getWalkinPatientList(formState.tableflter);
  };


  const thisIsSelected = id => formState.selected.indexOf(id) !== -1; // eslint-disable-line

  const handleUserInput = value => {
    // Show all item first
    const { data, defaultPerPage } = formState;
    if (value !== '') {
      setFormState({
        ...formState,
        rowsPerPage: data
      });
    } else {
      setFormState({
        ...formState,
        rowsPerPage: defaultPerPage
      });
    }

    // Show result base on keyword
    setFormState({
      ...formState,
      filterText: value.toLowerCase()
    });
  };

  const {
    classes, intl, walkinPatientList, getWalkinPatientList, getinvoiceDetail, billingDetails
  } = props;

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

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, walkinPatientList.list - (page * rowsPerPage));

  // const history = useHistory();

  // const routeChange = () => {
  //   const path = '/app/appointments/patient-profile';
  //   history.push(path);
  // };

  React.useEffect(() => {
    console.log(walkinPatientList)
  })

  return (
    <div>
      <GenerateInvoice billingDetails={billingDetails} invoiceDisplay={setinvoiceDisplay} viewInvoice={invoiceDisplay} appointMentId={40} />
      <Grid container className={classes.rootTable}>
        <Grid item xs={12}>
          <Paper className={classes.rootTable} elevation={0}>
            {toolbar && (
              <EnhancedTableToolbar
                numSelected={selected.length}
                filterText={filterText}
                onUserInput={(event) => handleUserInput(event)}
                onDateSelected={filterDatePicker}
                onSearchFilter={searchFilterText}
                onPaymentFilter={searchPaymentStatus}
                title="WalkIn Payments"
                placeholder="Search"
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
                    orderBy={orderBy}
                    onSelectAllClick={(e) => handleSelectAllClick(e)}
                    onRequestSort={(e, p) => handleRequestSort(e, p)}
                    rowCount={walkinPatientList.list.length}
                    columnData={columnData}
                    checkcell={checkcell}
                  />
                  <TableBody>
                    {walkinPatientList.list.length == 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} padding="checkbox" align="center">
                          <div className={classes.noDetails}>
                            <ErrorOutline style={{ fontSize: 80 }} />
                            <Typography>No Records Found</Typography>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      <>
                        {walkinPatientList.list.map((patient, index) => {
                          const isSelected = thisIsSelected(patient.id);
                          return (
                            <TableRow
                              onClick={(event) => handleClick(event, patient.id)}
                              role="checkbox"
                              aria-checked={isSelected}
                              tabIndex={-1}
                              key={index}
                              selected={isSelected}
                            >
                              {checkcell && (
                                <TableCell padding="checkbox">
                                  <Checkbox checked={isSelected} size="small" />
                                </TableCell>
                              )}
                              <TableCell component="th" scope="row" padding="none">
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <Avatar className={classes.avatar}>A</Avatar>
                                  <div style={{ marginLeft: '10px', textTransform: 'capitalize' }}>
                                    {patient.patient_fm_id !== '' && patient.patient_fm_id !== null ? patient.patient_fm_name : patient.patient_name}
                                    <br />
                                    {patient.patient_fm_gender !== '' && patient.patient_fm_gender !== null ? helper.genderName(patient.patient_fm_gender) : helper.genderName(patient.patient_gender)}, {''}
                                    {/* {patient.patient_gender}, */}
                                    {patient.patient_fm_dob !== '' && patient.patient_fm_dob !== null ? helper.getAge(patient.patient_fm_dob) : helper.getAge(patient.patient_dob)}y
                                    <br />
                                    {patient.patient_fm_mobile !== '' && patient.patient_fm_mobile !== null ? patient.patient_fm_mobile : patient.patient_mobile}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell align="left">
                                <div className={classes.bgWalkIn}>
                                  <p>Walk-In</p>
                                  <p>{patient.clinic_name}</p>
                                </div>
                              </TableCell>
                              <TableCell align="left">
                                {patient.slot_start !== '' && patient.slot_start !== null && patient.slot_start !== undefined ? helper.tConvert(patient.slot_start.substring(0, patient.slot_start.length - 3)) : ''}
                                {' '}
                                -{' '}
                                {patient.slot_end !== '' && patient.slot_end !== null && patient.slot_end !== undefined ? helper.tConvert(patient.slot_end.substring(0, patient.slot_end.length - 3)) : ''}
                                <br />
                                {patient.slot_date}
                              </TableCell>
                              <TableCell align="left">
                                <p>
                                  <b>Booking ID: </b>
                                  <span>{patient.appointment_ref_id}</span>
                                </p>
                                <div>
                                  <b>Ref: </b>
                                  <span><Chip label={(patient.follow_up_date == null ? ('New') : ('Follow up'))} /></span>
                                </div>
                              </TableCell>
                              <TableCell align="left">
                                {(patient.bill_amount != null) ? (
                                  <span>
                                    {' '}
                                    &#8377;
                                    {patient.bill_amount}
                                    {' '}

                                  </span>
                                ) : ''}
                              </TableCell>
                              <TableCell align="right">
                                {patient.payment_status === 1 ? (
                                  <Chip label="Received" className={classes.success} />
                                ) : (
                                  <Chip label="Not Received" className={classes.warning} />
                                )}
                              </TableCell>
                              <TableCell align="right">
                                {(patient.payment_status == 1) ? <Button variant="contained" onClick={() => openInvoice(patient.id)}>View Invoice</Button> : <BillPayment getWalkinPatientList={getWalkinPatientList} invoiceDisplay={generateInvoiceTable} appointmentId={patient.id} patientId={patient.patient_id} clinicId={patient.clinic_id} isData />}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </>
                    )}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            {pagination && (
              // <TablePagination
              //   component="div"
              //   count={walkinPatientList.total}
              //   rowsPerPage={formState.tableflter.length}
              //   page={formState.tableflter.page}
              //   backIconButtonProps={{
              //     'aria-label': 'Previous Page',
              //   }}
              //   nextIconButtonProps={{
              //     'aria-label': 'Next Page',
              //   }}
              //   onChangePage={(e, p) => handleChangePage(e, p)}
              //   onChangeRowsPerPage={(val) => handleChangeRowsPerPage(val)}
              // />
              <Pagination count={walkinPatientList.last_page} className={classes.pagination} page={pageNum} onChange={handlePagination} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

/* WalkIpatient.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: intlShape.isRequired
}; */

export default withStyles(styles)(injectIntl(WalkIn));
