import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import API from '../../../helpers/api';

// function createData(title, when, checkbox, cheque1, cheque2, patientTemplate, doctorTemplate) {
//     return {
//         title, when, checkbox, cheque1, cheque2, patientTemplate, doctorTemplate
//     };
// }

// const rows = [
//     createData('Appointment Created', 'As soon as an appointment is created', true, '', '', '<b>To Patient</b><p>Your appointment at <a>Online Aarogya Clinic</a> for <a>Aug 23rd, 6:30pm</a> has been confirmed. Please call <a>+91-9999999999</a> for any help/ changes.<p>', '<b>To Doctor</b><p>Your appointment at <a>Online Aarogya Clinic</a> for <a>Aug 23rd, 6:30pm</a> has been confirmed. Please call <a>+91-9999999999</a> for any help/ changes.<p>'),
//     createData('Appointment Cancelled', 'As soon as an appointment is cancelled', true, '', '', '<b>To Patient</b><p>Your appointment at <a>Online Aarogya Clinic</a> for <a>Aug 23rd, 6:30pm</a> has been confirmed. Please call <a>+91-9999999999</a> for any help/ changes.<p>', '<b>To Doctor</b><p>Your appointment at <a>Online Aarogya Clinic</a> for <a>Aug 23rd, 6:30pm</a> has been confirmed. Please call <a>+91-9999999999</a> for any help/ changes.<p>'),
//     createData('Appointment Changed', 'As soon as an appointment is changed', true, '', '', '<b>To Patient</b><p>Your appointment at <a>Online Aarogya Clinic</a> for <a>Aug 23rd, 6:30pm</a> has been confirmed. Please call <a>+91-9999999999</a> for any help/ changes.<p>', '<b>To Doctor</b><p>Your appointment at <a>Online Aarogya Clinic</a> for <a>Aug 23rd, 6:30pm</a> has been confirmed. Please call <a>+91-9999999999</a> for any help/ changes.<p>'),
//     createData('Appointment Reminder', '', false, 'Day of the appointment at 8:00am', 'Day before appointment at 12:00pm', '<b>To Patient</b><p>Your appointment at <a>Online Aarogya Clinic</a> for <a>Aug 23rd, 6:30pm</a> has been confirmed. Please call <a>+91-9999999999</a> for any help/ changes.<p>', '<b>To Doctor</b><p>Your appointment at <a>Online Aarogya Clinic</a> for <a>Aug 23rd, 6:30pm</a> has been confirmed. Please call <a>+91-9999999999</a> for any help/ changes.<p>'),
//     createData('Missed Appointment', 'Send SMS for past appointments, whoever is not attended for consultation', true, '', '', '<b>To Patient</b><p>Your appointment at <a>Online Aarogya Clinic</a> for <a>Aug 23rd, 6:30pm</a> has been confirmed. Please call <a>+91-9999999999</a> for any help/ changes.<p>', '<b>To Doctor</b><p>Your appointment at <a>Online Aarogya Clinic</a> for <a>Aug 23rd, 6:30pm</a> has been confirmed. Please call <a>+91-9999999999</a> for any help/ changes.<p>'),
//     createData('Daily Appointment Summary', 'Everday at 7:00am (to doctor and consultants)', false, 'Include Patient mobile number', 'Include appointment notes', '<b>To Patient</b><p>Your appointment at <a>Online Aarogya Clinic</a> for <a>Aug 23rd, 6:30pm</a> has been confirmed. Please call <a>+91-9999999999</a> for any help/ changes.<p>', '<b>To Doctor</b><p>Your appointment at <a>Online Aarogya Clinic</a> for <a>Aug 23rd, 6:30pm</a> has been confirmed. Please call <a>+91-9999999999</a> for any help/ changes.<p>'),
// ];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'on', numeric: false, disablePadding: false, label: 'Events'
  },
  {
    id: 'doctor', numeric: false, disablePadding: false, label: 'Template'
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    order,
    orderBy,
    onRequestSort,
  } = props;

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { smsTemplate, submitSmsChanges } = props;

  return (
    <Toolbar
      className={clsx(classes.root)}
    >
      <Typography
        className={classes.title}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        SMS Settings
      </Typography>


      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>save</Icon>}
        disabled={
          !!((
            (smsTemplate === null)
            || (smsTemplate.length === 0)
          ))
        }
        onClick={() => submitSmsChanges()}
      >
        Save
      </Button>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function SMS(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [smsTemplate, setSmsTemplate] = React.useState(null);
  const [snackBarInfo, setSnackbarInfo] = React.useState({
    isSnackBarOpen: false,
    snackBarText: '',
    snackBarSeverity: 'success',
  });

  React.useEffect(() => {
    fetchSmsSettings();
  }, []);

  const fetchSmsSettings = async () => {
    const api = new API();

    await api.ACCOUNTS_URI().get('settings/sms', {
      params: {
        cr_id: localStorage.getItem("cr_id")
      }
    })
      .then((smsResponse) => {
        if (
          (smsResponse.status === 200)
          && (smsResponse.data)
          && (smsResponse.data.sms_settings)
        ) {
          setSmsTemplate(smsResponse.data.sms_settings);
        }
      })
      .catch(() => {
        setSnackbarInfo({
          isSnackBarOpen: true,
          snackBarText: 'Could not fetch sms template',
          snackBarSeverity: 'error',
        });
      });
  };

  const { masterData } = props;

  if (
    (masterData === null)
    || (masterData.templateEvents === undefined)
    || smsTemplate === null
  ) {
    return null;
  }

  const createData = (id, title, checkbox, cheque1, cheque2, patientTemp, doctorTemp) => ({
    id, title, checkbox, cheque1, cheque2, patientTemp, doctorTemp
  });

  const { templateEvents } = masterData;

  const rows = smsTemplate.map((tEvents) => {
    const eventId = tEvents.template_event.id;
    const eventName = tEvents.template_event.name;
    const eventCheckbox = true;
    const eventCheckBox1 = tEvents.for_patient;
    const eventCheckbox2 = tEvents.for_doctor;
    const patientTemplate = (
      tEvents.template_event.event_sms_templates
      && (tEvents.template_event.event_sms_templates.length > 0)
    ) ? tEvents.template_event.event_sms_templates[0].text_html : '';
    const doctorTemplate = (
      tEvents.template_event.event_sms_templates
      && (tEvents.template_event.event_sms_templates.length > 1)
    ) ? tEvents.template_event.event_sms_templates[1].text_html : '';


    return createData(eventId, eventName, eventCheckbox, eventCheckBox1, eventCheckbox2, patientTemplate, doctorTemplate);
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const submitSmsChanges = async () => {
    const api = new API();

    const inputSMS = smsTemplate.map((sms) => (
      {
        template_event_id: parseInt(sms.template_event_id, 10),
        for_doctor: sms.for_doctor,
        for_patient: sms.for_patient,
      }
    ))

    await api.ACCOUNTS_URI().post('settings/sms/update', {
      sms_settings: inputSMS,
      cr_id: localStorage.getItem("cr_id")
    })
      .then((updateSmsResp) => {
        if (
          (updateSmsResp.status === 200) &&
          (updateSmsResp.data.success)
        ) {
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: 'SMS Settings updated successfully',
            snackBarSeverity: 'success',
          });
        } else {
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: 'Error while submitting the form',
            snackBarSeverity: 'error',
          });
        }
      })
      .catch(() => {
        setSnackbarInfo({
          isSnackBarOpen: true,
          snackBarText: 'Could not update sms settings',
          snackBarSeverity: 'error',
        });
      });
  };

  const handleCheckboxChange = (eventId, eventName, eventValue) => {
    let intermediateSmsTemp = [];

    if (
      (smsTemplate !== null)
      && (smsTemplate.length > 0)
    ) {
      intermediateSmsTemp = [...smsTemplate];
    }

    if (
      intermediateSmsTemp
      && (intermediateSmsTemp.length > 0)
    ) {
      const filteredSmsTemp = intermediateSmsTemp.find((intermSmsTemp) => intermSmsTemp.template_event_id === parseInt(eventId, 10));

      if (filteredSmsTemp) {
        filteredSmsTemp[eventName] = eventValue ? 1 : 0;
      } else {
        const smsTempObj = {
          template_event_id: parseInt(eventId, 10),
          for_doctor: true,
          for_patient: true,
        };

        smsTempObj[eventName] = eventValue ? 1 : 0;

        intermediateSmsTemp.push(smsTempObj);
      }
    } else {
      const smsTempObj = {
        template_event_id: parseInt(eventId, 10),
        for_doctor: true,
        for_patient: true,
      };

      smsTempObj[eventName] = eventValue ? 1 : 0;

      intermediateSmsTemp.push(smsTempObj);
    }

    setSmsTemplate(intermediateSmsTemp);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarInfo({
      isSnackBarOpen: false,
      snackBarText: '',
      snackBarSeverity: 'success',
    });
  };

  const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          smsTemplate={smsTemplate}
          submitSmsChanges={submitSmsChanges}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
            style={{ margin: 0 }}
          >
            <EnhancedTableHead classes={classes} />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  let forPatientCheckbox = true;
                  let forDoctorCheckbox = true;

                  if (
                    (smsTemplate !== null)
                    && (smsTemplate.length > 0)
                  ) {
                    const filteredTemp = smsTemplate.find((temp) => temp.template_event_id === parseInt(row.id, 10));

                    if (filteredTemp) {
                      forPatientCheckbox = (filteredTemp.for_patient !== undefined) ? (filteredTemp.for_patient == 1 ? true : false) : true;
                      forDoctorCheckbox = (filteredTemp.for_doctor !== undefined) ? (filteredTemp.for_doctor == 1 ? true : false) : true;
                    }
                  }

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={`sms-${row.id}`}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        width="200"
                      >
                        <Typography variant="subtitle2" gutterBottom>{row.title}</Typography>
                        {row.checkbox ? (
                          <FormGroup row>
                            <FormControlLabel
                              control={(
                                <Checkbox
                                  id={row.id.toString()}
                                  checked={forPatientCheckbox}
                                  onChange={(e) => handleCheckboxChange(e.target.id, e.target.name, e.target.checked)}
                                  name="for_patient"
                                />
                              )}
                              label={<Typography variant="body2" color="textSecondary">To Patient</Typography>}
                            />
                            <FormControlLabel
                              control={(
                                <Checkbox
                                  id={row.id.toString()}
                                  checked={forDoctorCheckbox}
                                  onChange={(e) => handleCheckboxChange(e.target.id, e.target.name, e.target.checked)}
                                  name="for_doctor"
                                  color="primary"
                                />
                              )}
                              label={<Typography variant="body2" color="textSecondary">To Doctor</Typography>}
                            />
                          </FormGroup>
                        ) : ('')}
                      </TableCell>
                      <TableCell width="400">
                        <b style={{color: "#0000008a"}}>To Patient:</b>
                        <div dangerouslySetInnerHTML={{ __html: row.patientTemp }} style={{ marginBottom: 15 }}></div>
                        <b style={{color: "#0000008a"}}>To Doctors:</b>
                        <div dangerouslySetInnerHTML={{ __html: row.doctorTemp }} style={{ marginBottom: 15 }}></div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
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
    </div>
  );
}

const mapStateToProps = state => ({
  masterData: state.get('dashboardReducer').masterData,
});

export default connect(mapStateToProps, {})(SMS);
