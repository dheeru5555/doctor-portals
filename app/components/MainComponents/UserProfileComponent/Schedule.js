import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Type from 'enl-styles/Typography.scss';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import styled, { ThemeConsumer } from 'styled-components';
import Popover from '@material-ui/core/Popover';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import API from '../../../helpers/api';
import helper from '../../../helpers/helpers';
import AddScheduleDialog from './Dialogs/AddScheduleDialog';
import loader from 'enl-images/loader.gif';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

const styles = (theme) => ({
  pinkAvatar: {
    color: '#fff',
    backgroundColor: pink[500],
  },
  greenAvatar: {
    color: '#fff',
    backgroundColor: green[500],
  },
  orangeAvatar: {
    color: '#fff',
    backgroundColor: deepOrange[500],
  },
  purpleAvatar: {
    color: '#fff',
    backgroundColor: deepPurple[500],
  },
  MuiToggleButton: {
    selected: {
      backgroundColor: '#cccccc !important',
      color: 'red !important'
    },
  },
  TypeBox: {
    border: '1px solid #adadad',
    borderRadius: 10,
    marginRight: 5,
    padding: 7,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '& Icon': {
      paddingTop: 10,
      paddingBottom: 10,
      height: 27
    }
  },
  cardLeft: {
    backgroundColor: '#d3d3d3',
    padding: '15px 40px',
    color: '#000'
  },
  cardRight: {
    padding: '15px 40px'
  },
  timeStamp: {
    border: '1px solid #dedede',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    color: '#000000de'
  },
  dayChip: {
    padding: 5,
    border: '1px solid #dedede',
    borderRadius: 15,
    backgroundColor: 'lightgray',
    display: 'inline-block',
    width: 35,
    margin: 1,
    textAlign: 'center',
    // display: 'none'
  },
  dayChipActive: {
    padding: 5,
    border: '1px solid #dedede',
    borderRadius: 15,
    backgroundColor: 'lightgray',
    display: 'inline-block',
    width: 35,
    margin: 1,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#ff2100',
  },
  borderLeft: {
    borderLeft: '1px solid #dedede',
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  borderBottom: {
    borderBottom: '1px solid #dedede'
  },
  border: {
    border: '1px solid #dedede'
  },
  mAuto: {
    margin: 'auto',
    padding: '5px 0'
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  bold: {
    fontWeight: 600
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  buttonIcon: {
    fontSize: '1rem !important',
    marginRight: 5
  },
  popover: {
    padding: 20,
    background: 'lightgray'
  },
  filter: {
    width: '50%'
  },
  grid: {
    display: 'grid'
  },
  noDetails: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    color: '#808080',
    padding: 50
  }
});

// initialization
const api = new API();

function Schedule(props) {
  const { classes } = props;
  const [open, setOpen] = React.useState(false);
  const [currentSelId, setCurrentSelId] = React.useState('');
  const [value, setValue] = React.useState('video');
  const [basis, setBasis] = React.useState('byslot');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [schedules, setSchedules] = React.useState([]);
  const [snackBarInfo, setSnackBarInfo] = React.useState({
    isSnackBarOpen: false,
    snackBarText: '',
    snackBarSeverity: 'success',
  });
  const [loading, setLoading] = React.useState(true)

  let data = {
    cr_id: localStorage.getItem('cr_id')
  }

  useEffect(() => {
    fetchDoctorSchedules();

    return () => {
      setCurrentSelId('');
    };
  }, []);

  useEffect(() => {
    fetchDoctorSchedules();
  }, [open]);

  const fetchDoctorSchedules = async () => {
    await api.ACCOUNTS_URI().get('schedules', { params: data }).then((schedulesResp) => {
      if (schedulesResp.status === 200 && schedulesResp.data && schedulesResp.data.success) {
        setSchedules(schedulesResp.data.schedules);
        setLoading(false)
      }
    });
  };

  const handleEditSchedule = (scheduleId) => {
    setCurrentSelId(scheduleId);
    setOpen(true);
  };

  const handleScheduleDialogOpen = () => {
    setOpen(true);
  };
  const handleScheduleDialogClose = () => {
    setCurrentSelId('');
    setOpen(false);
  };

  const deleteDoctorSchedules = async (scheduleId) => {
    await api.ACCOUNTS_URI().delete(`schedules/delete-schedule/${scheduleId}`, { params: data })
      .then(async (deleteResp) => {
        if (deleteResp.status === 200 && deleteResp.data && deleteResp.data.success) {
          await fetchDoctorSchedules().then(() => {
            setSnackBarInfo({
              isSnackBarOpen: true,
              snackBarText: 'Successfully Deleted Schedule',
              snackBarSeverity: 'success',
            });
          });
        } else {
          setSnackBarInfo({
            isSnackBarOpen: true,
            snackBarText: 'Error While Deleting Schedule',
            snackBarSeverity: 'success',
          });
        }
      });
  };

  const handleFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const filteropen = Boolean(anchorEl);
  const id = filteropen ? 'simple-popover' : undefined;

  const handleBasis = (event) => {
    setBasis(event.target.value);
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

  let clinicDetailsMap = [
    {
      clinicId: 10,
      clinicName: 'Dr. Yashwin Shetty Clinic',
    },
    {
      clinicId: 20,
      clinicName: 'Online Aarogya Clinic center',
    },
    {
      clinicId: 30,
      clinicName: 'Yashoda Hospital',
    }
  ];

  if (props.clinicDetails !== null) {
    clinicDetailsMap = props.clinicDetails.map((clinic) => ({
      clinicId: clinic.id,
      clinicName: clinic.name,
    }));
  }

  const renderClinicData = (clinic_id) => {
    let clinicDetail = 'Not Specified';

    const filteredClinicDetails = props.clinicDetails.find((clinic) => clinic.id === clinic_id);

    if (filteredClinicDetails) {
      clinicDetail = filteredClinicDetails.name;
    }

    return clinicDetail;
  };

  const renderConsultationType = (appointment_type_id, booking_type) => {
    let consultationType = 'Video';

    if (appointment_type_id === 1) {
      consultationType = 'Video';
    } else if (appointment_type_id === 2) {
      consultationType = 'Audio';
    } else if (appointment_type_id === 3) {
      consultationType = 'Chat';
    } else if (appointment_type_id === 4) {
      consultationType = 'Walk-In';
    }

    return (booking_type === 's') ? `${consultationType} (Slots)` : `${consultationType} (Tokens)`;
  };

  const convertHoursToSeconds = (timeInString) => {
    const splitTime = timeInString.split(':');
    const seconds = (+splitTime[0]) * 60 * 60 + (+splitTime[1]) * 60;

    return seconds;
  };

  let numberOfSlots = 10;
  // let type = 'Slots';

  schedules.map((item) => {

  })

  const calculateNoOfSlots = (item) => {
    if (item.booking_type == 's') {
      const timeDiff = convertHoursToSeconds(item.end_time) - convertHoursToSeconds(item.start_time);
      numberOfSlots = timeDiff / (item.slot_duration * 60)
    } else {
      // type = 'token';
      numberOfSlots = item.numberOfTokens ? item.numberOfTokens : '';
    }
    return Math.ceil(numberOfSlots)
  }

  const calculateTokenDuration = (start_time, end_time, slot_duration) => {
    const timeDiff = convertHoursToSeconds(end_time) - convertHoursToSeconds(start_time);
    const tokenTime = timeDiff / (slot_duration) / 60;
    return tokenTime.toFixed(2)
  }

  return (
    <Paper elevation={3} style={{ padding: 15 }}>
      <Grid
        container
        alignItems="center"
        justify="space-between"
        direction="row"
        spacing={2}
        className={classes.title}
      >
        <Grid item sm={6}>
          <Typography color="primary" className={classes.bold}>Schedule</Typography>
        </Grid>
        <Grid item md={6} sm={6} xs={6} align="right">
          {/* <Button variant="contained" className={classes.button} onClick={handleFilter}>
                        Filter
                    </Button> */}
          <Popover
            id={id}
            open={filteropen}
            anchorEl={anchorEl}
            onClose={handleFilterClose}
            anchorOrigin={{
              vertical: 50,
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <div className={classes.popover}>
              <Grid container spacing={1}>
                <Grid item sm={6} className={classes.grid}>
                  <FormControl>
                    <Typography
                      gutterBottom
                      style={{ fontSize: 11, whiteSpace: 'nowrap' }}
                    >
                      Clinic Location:
                    </Typography>
                    <Select
                      value={basis}
                      onChange={handleBasis}
                    >
                      {
                        clinicDetailsMap.map((clinicItem) => (
                          <MenuItem
                            value={clinicItem.clinicId}
                            key={`clinic-${clinicItem.clinicId}`}
                          >
                            {clinicItem.clinicName}
                          </MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={6} className={classes.grid}>
                  <FormControl>
                    <Typography
                      gutterBottom
                      style={{ fontSize: 11, whiteSpace: 'nowrap' }}
                    >
                      Type of Consult:
                    </Typography>
                    <Select
                      value={basis}
                      onChange={handleBasis}
                    >

                      <MenuItem value={10}>Video</MenuItem>
                      <MenuItem value={20}>Audio</MenuItem>
                      <MenuItem value={10}>Chat</MenuItem>
                      <MenuItem value={10}>Walk In</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={12} className={classes.grid}>
                  <FormControl>
                    <Typography
                      gutterBottom
                      style={{ fontSize: 11, whiteSpace: 'nowrap' }}
                    >
                      Basis:
                    </Typography>
                    <Select
                      value={basis}
                      onChange={handleBasis}
                    >

                      <MenuItem value={10}>by Slot</MenuItem>
                      <MenuItem value={20}>by Token</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </div>

          </Popover>
          <AddScheduleDialog
            open={open}
            currentSelId={currentSelId}
            handleClickOpen={handleScheduleDialogOpen}
            handleClose={handleScheduleDialogClose}
          />
          {/* <Button variant="contained">Print <Print /></Button> */}
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Grid container spacing={2}>
        {loading ? <img src={loader} style={{ marginLeft: 'auto', marginRight: 'auto' }} /> : (
          <>
            {
              (schedules.length > 0)
                ? schedules.map((schedule) => (
                  <Grid item md={6} key={`schedule-${schedule.id}`}>
                    <Card className={classes.border}>
                      <CardContent style={{ padding: 0, }}>
                        <Grid container>
                          <Grid item sm={4} className={classes.cardLeft}>
                            <Typography variant="body2" noWrap gutterBottom>
                              <span className={Type.bold}> Start Time: </span>
                            </Typography>
                            <Typography className={classes.timeStamp} noWrap gutterBottom>
                              {`${helper.tConvert(schedule.start_time.slice(0, -3))}`}
                            </Typography>
                            <Typography variant="body2" noWrap gutterBottom>
                              <span className={Type.bold}> End Time: </span>
                            </Typography>
                            <Typography className={classes.timeStamp} noWrap gutterBottom>
                              {`${helper.tConvert(schedule.end_time.slice(0, -3))}`}
                            </Typography>
                          </Grid>
                          <Grid item sm={7} className={classes.cardRight}>
                            <Grid container spacing={1}>
                              <Grid item sm={6}>
                                <Typography variant="body2" noWrap gutterBottom>
                                  <span className={Type.bold}> Consultation Type: </span>
                                </Typography>
                                <Typography noWrap gutterBottom style={{ color: '#2196f3' }}>
                                  {renderConsultationType(schedule.appointment_type_id, schedule.booking_type)}
                                </Typography>
                                <Typography variant="body2" noWrap gutterBottom>
                                  <span className={Type.bold}> {schedule.booking_type === 's' ? 'Slot' : 'Token'} Duration: </span>
                                </Typography>
                                <Typography noWrap gutterBottom>
                                  {schedule.booking_type === 's' ? schedule.slot_duration : calculateTokenDuration(schedule.start_time, schedule.end_time, schedule.slot_duration)}
                                  {' '}
                                  Mins
                                </Typography>
                              </Grid>
                              <Grid item sm={6}>
                                <Typography variant="body2" noWrap gutterBottom>
                                  <span className={Type.bold}>
                                    {' '}
                                    No of
                                    {schedule.booking_type === 's' ? ' Slots' : ' Tokens'}
                                    :
                                    {' '}
                                  </span>
                                </Typography>
                                <Typography noWrap gutterBottom>{schedule.booking_type === 's' ? calculateNoOfSlots(schedule) : schedule.slot_duration}</Typography>
                                {schedule.appointment_type_id === 4 ? (
                                  <>
                                    <Typography variant="body2" noWrap gutterBottom>
                                      <span className={Type.bold}> Clinic Location: </span>
                                    </Typography>
                                    <Typography noWrap gutterBottom>
                                      {renderClinicData(schedule.clinic_id)}
                                    </Typography>
                                  </>
                                ) : ''}
                              </Grid>
                              <Grid item sm={12} style={{ whiteSpace: 'nowrap' }}>
                                <Typography
                                  className={schedule.days_of_week_array.includes('1') ? classes.dayChipActive : classes.dayChip}
                                  variant="body2"
                                  noWrap
                                  gutterBottom
                                >
                                  Mon
                                </Typography>
                                <Typography
                                  className={schedule.days_of_week_array.includes('2') ? classes.dayChipActive : classes.dayChip}
                                  variant="body2"
                                  noWrap
                                  gutterBottom
                                >
                                  Tue
                                </Typography>
                                <Typography
                                  className={schedule.days_of_week_array.includes('3') ? classes.dayChipActive : classes.dayChip}
                                  variant="body2"
                                  noWrap
                                  gutterBottom
                                >
                                  Wed
                                </Typography>
                                <Typography
                                  className={schedule.days_of_week_array.includes('4') ? classes.dayChipActive : classes.dayChip}
                                  variant="body2"
                                  noWrap
                                  gutterBottom
                                >
                                  Thu
                                </Typography>
                                <Typography
                                  className={schedule.days_of_week_array.includes('5') ? classes.dayChipActive : classes.dayChip}
                                  variant="body2"
                                  noWrap
                                  gutterBottom
                                >
                                  Fri
                                </Typography>
                                <Typography
                                  className={schedule.days_of_week_array.includes('6') ? classes.dayChipActive : classes.dayChip}
                                  variant="body2"
                                  noWrap
                                  gutterBottom
                                >
                                  Sat
                                </Typography>
                                <Typography
                                  className={schedule.days_of_week_array.includes('7') ? classes.dayChipActive : classes.dayChip}
                                  variant="body2"
                                  noWrap
                                  gutterBottom
                                >
                                  Sun
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item sm={1} className={classes.borderLeft}>
                            <Grid item sm={6} className={classes.mAuto}>
                              <Tooltip
                                title="Edit Schedule"
                                placement="top"
                                onClick={() => handleEditSchedule(schedule.id)}
                                style={{ cursor: 'pointer' }}
                              >
                                <Icon>edit</Icon>
                              </Tooltip>
                            </Grid>
                            <Grid item sm={6} className={classes.mAuto}>
                              <Tooltip
                                title="Delete Schedule"
                                placement="top"
                                onClick={() => deleteDoctorSchedules(schedule.id)}
                                style={{ cursor: 'pointer' }}
                              >
                                <Icon>delete</Icon>
                              </Tooltip>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
                : (
                  <div className={classes.noDetails}>
                    <ErrorOutline style={{ fontSize: 80 }} />
                    <Typography>No Schedules Found</Typography>
                  </div>
                )
            }
          </>
        )}
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
    </Paper>
  );
}
Schedule.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  clinicDetails: state.get('profileReducer').clinicDetails,
});

export default connect(mapStateToProps, {})(withStyles(styles)(Schedule));
