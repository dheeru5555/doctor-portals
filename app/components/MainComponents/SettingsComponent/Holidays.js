import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import API from '../../../helpers/api';
import UnBlock from './Dialogs/UnBlock';

const TableWrapper = styled('div')`
    
`;


const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
    padding: 10
  },
  border: {
    border: '1px solid #dedede',
    padding: '15px 0px',
    background: '#f5f5f5',
    borderRadius: 5
  },
  textField: {
    marginTop: 5,
    '& input': {
      padding: 10
    }
  },
  title: {
    padding: '5px 15px',
    fontWeight: 700
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  customButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  typography: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    fontWeight: 'normal'
  },
  py3: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  p3: {
    padding: theme.spacing(3)
  },
  px2: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  bold: {
    fontWeight: 700
  },
  rightPanel: {
    padding: '15px 20px',
  },
  infoMsg: {
    padding: '5px 10px',
    background: 'antiquewhite',
    margin: '0 15px',
    width: 'fit-content'
  },
  CustomtextField: {
    '& .MuiOutlinedInput-root': {
      padding: 0
    },
    '& input': {
      padding: '8px !important',
      background: '#fff',
      width: 70
    }
  },
  languages: {
    '& .MuiAutocomplete-root': {
      marginTop: 16
    },
    '& .MuiAutocomplete-inputRoot': {
      padding: 0
    }
  }
});


function Holiday(props) {
  const api = new API();
  const { classes } = props;

  React.useEffect(() => {
    fetchHolidayList();
  }, []);

  const [allHolidays, setAllHolidays] = React.useState([]);

  const [holiday, setHoliday] = React.useState({
    start_date: new Date(),
    end_date: new Date(),
    online_appointments: false,
    offline_appointments: false,
  });

  const [snackBarInfo, setSnackbarInfo] = React.useState({
    isSnackBarOpen: false,
    snackBarText: '',
    snackBarSeverity: 'success',
  });

  const ActionsCustom = (row) => (
    <UnBlock
      deleteHoliday={deleteHoliday}
      holidayId={row.id}
    />
  );


  const ksdj = (row) => {
    let holidayDetail = 'Cancelled Online and Walk-in appointments';

    if (
      (holiday.online_appointments === 1)
      && (holiday.offline_appointments === 1)) {
      holidayDetail = 'Cancelled Online and Walk-in appointments';
    } else if (holiday.online_appointments === 1) {
      holidayDetail = 'Cancelled Online appointments';
    } else if (holiday.offline_appointments === 1) {
      holidayDetail = 'Cancelled Walk-in appointments';
    }
    return TypeCustom(row, holidayDetail);
  };

  const TypeCustom = (row) => (
    <p>
      {row.offline_appointments}
    </p>
  );
  const DateCustom = (row) => (
    <p>
      {row.start_date}
      {' '}
      -
      {' '}
      {row.end_date}
    </p>
  );


  const columns = [
    {
      name: 'Id',
      selector: 'id',
      sortable: true,
      maxWidth: '40px'
    },
    {
      name: 'Date',
      selector: 'date',
      cell: (row) => <DateCustom {...row} />,
      sortable: false,
      grow: 3
    },
    {
      name: 'Type',
      selector: 'type',
      cell: (row) => ksdj(row),
      sortable: false,
      grow: 3
    },
    {
      name: 'Actions',
      selector: 'actions',
      sortable: false,
      cell: (row) => <ActionsCustom {...row} />,
      right: true
    }
  ];

  const handleHolidayFieldChange = (eventType, eventValue) => {
    const intermeidateHolidayField = { ...holiday };

    intermeidateHolidayField[eventType] = eventValue;

    setHoliday(intermeidateHolidayField);
  };

  const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

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

  const fetchHolidayList = async () => {
    await api.ACCOUNTS_URI().get('settings/holidays', {
      params: {
        cr_id: localStorage.getItem("cr_id")
      }
    })
      .then((holidayListResp) => {
        if (holidayListResp.status === 200) {
          if (
            (holidayListResp.data.success === true)
            && (holidayListResp.data.holidays.length > 0)
          ) {
            setAllHolidays(holidayListResp.data.holidays);
          } else {
            let empty = [];
            setAllHolidays(empty)
          }
        } else {
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: 'Error while fetching holiday list',
            snackBarSeverity: 'error',
          });
        }
      })
      .catch(() => {
        setSnackbarInfo({
          isSnackBarOpen: true,
          snackBarText: 'Internal server error',
          snackBarSeverity: 'error',
        });
      });
  };

  const handleBlockCalanderSubmit = async () => {
    const blockCalanderReq = {
      start_date: holiday.start_date,
      end_date: holiday.end_date,
      online_appointments: (holiday.online_appointments === true) ? 1 : 0,
      offline_appointments: (holiday.offline_appointments === true) ? 1 : 0,
      cr_id: localStorage.getItem("cr_id")
    };

    await api.ACCOUNTS_URI().post('settings/holidays/add', {
      ...blockCalanderReq
    }).then(async (addBillResp) => {
      if (addBillResp.status === 200) {
        if ((addBillResp.data.success === true)) {
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: 'Successfully Added Holiday',
            snackBarSeverity: 'success',
          });
          setHoliday({
            start_date: new Date(),
            end_date: new Date(),
            online_appointments: true,
            offline_appointments: true,
          });
          await fetchHolidayList();
        } else if (
          (typeof addBillResp.data.errorMessage === 'object')
          && (Object.keys(addBillResp.data.errorMessage).length > 0)
        ) {
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: (
              (addBillResp.data.errorMessage.start_date && addBillResp.data.errorMessage.start_date)
              || (addBillResp.data.errorMessage.end_date && addBillResp.data.errorMessage.end_date)
            ),
            snackBarSeverity: 'error',
          });
        } else {
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: addBillResp.data.errorMessage,
            snackBarSeverity: 'error',
          });
        }
      } else {
        setSnackbarInfo({
          isSnackBarOpen: true,
          snackBarText: 'Error while adding holiday',
          snackBarSeverity: 'error',
        });
      }
    })
      .catch(() => {
        setSnackbarInfo({
          isSnackBarOpen: true,
          snackBarText: 'Internal server error',
          snackBarSeverity: 'error',
        });
      });
  };

  const renderHolidayList = () => {
    if (allHolidays.length === 0) {
      return null;
    }

    return (
      <DataTable
        title="Listing"
        columns={columns}
        data={allHolidays}
        // pagination
      />
    );
  };

  const deleteHoliday = async (holidayId) => {
    await api.ACCOUNTS_URI().put(`settings/holidays/cancel/${holidayId}`, {
      cr_id: localStorage.getItem("cr_id")
    })
      .then(async (deleteHolidayResp) => {
        if (deleteHolidayResp.status === 200) {
          if (deleteHolidayResp.data.success === true) {
            await fetchHolidayList();
            setSnackbarInfo({
              isSnackBarOpen: true,
              snackBarText: 'Holiday Unblocked successfully',
              snackBarSeverity: 'success',
            });
          } else {
            setSnackbarInfo({
              isSnackBarOpen: true,
              snackBarText: 'Error while unblocking holiday',
              snackBarSeverity: 'error',
            });
          }
        } else {
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: 'Error while deleting holiday',
            snackBarSeverity: 'error',
          });
        }
      })
      .catch(() => {
        setSnackbarInfo({
          isSnackBarOpen: true,
          snackBarText: 'Internal server error',
          snackBarSeverity: 'error',
        });
      });
  };

  const disableSubmitButton = !!((
    (new Date(holiday.start_date).getTime() > new Date(holiday.end_date).getTime())
    || ((holiday.online_appointments === false) && (holiday.offline_appointments === false))
  ));

  return (
    <div>
      <Grid container spacing={2} justify="center">
        <Grid item md={8}>
          <div className={classes.border}>
            <div className={classes.spaceBetween}>
              <Typography variant="h6" className={classes.title}>
                Block Calendar
              </Typography>
            </div>
            <Divider style={{ margin: '15px 0 0' }} />
            <Grid container className={classes.p3} spacing={2}>
              <Grid item sm={6}>
                <Typography className={classes.typography}>
                  Start date<span style={{color: 'red'}}>*</span>
                </Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="flex-start">
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      format="MM/dd/yyyy"
                      value={holiday.start_date}
                      className={classes.px2}
                      minDate={Date.now()}
                      maxDateMessage="Start Date cannot be greater than End Date"
                      onChange={(startDateVal) => handleHolidayFieldChange('start_date', startDateVal)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item sm={6}>
                <Typography className={classes.typography}>
                  End Date<span style={{color: 'red'}}>*</span>
                </Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justify="flex-start">
                    <KeyboardDatePicker
                      margin="normal"
                      id="date-picker-dialog"
                      format="MM/dd/yyyy"
                      value={holiday.end_date}
                      minDate={holiday.start_date}
                      className={classes.px2}
                      onChange={(endDateVal) => handleHolidayFieldChange('end_date', endDateVal)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item sm={12}>
                <FormControlLabel
                  control={(
                    <Checkbox
                      name="checkedA"
                      checked={holiday.online_appointments}
                      onChange={(e) => handleHolidayFieldChange('online_appointments', e.target.checked)}
                    />
                  )}
                  label="Cancel online appointments"
                  className={classes.px2}
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      name="checkedA"
                      checked={holiday.offline_appointments}
                      onChange={(e) => handleHolidayFieldChange('offline_appointments', e.target.checked)}
                    />
                  )}
                  label="Cancel Walk In appointments"
                  className={classes.px2}
                />
              </Grid>
              <Grid item sm={12}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ float: 'right' }}
                  disabled={disableSubmitButton}
                  onClick={() => handleBlockCalanderSubmit()}
                >
                  Block Calendar
                </Button>
              </Grid>
              <Divider style={{ margin: '15px 0 0', width: '100%' }} />
              <Grid container style={{ padding: '20px 10px' }} spacing={2}>
                {renderHolidayList()}
              </Grid>
            </Grid>
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
        </Grid>
      </Grid>
    </div>
  );
}

Holiday.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Holiday);
