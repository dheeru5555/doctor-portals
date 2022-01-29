import React, { useEffect } from 'react';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import CallIcon from 'enl-images/new-icons/call.png';
import ChatIcon from 'enl-images/new-icons/chat.png';
import WalkinIcon from 'enl-images/new-icons/walk-in.png';
import VideoIcon from 'enl-images/new-icons/video.png';
import API from '../../../../helpers/api';
import { FormHelperText } from '@material-ui/core';

const AddScheduleWrapper = styled('div')`
    background: #fff;
    padding: 15px;
    border-radius: 7px;
    .MuiStepLabel-label.MuiStepLabel-active {
        font-weight: 600;
    }
    .MuiStepLabel-label {
        font-weight: 600;
    }
    .MuiStepContent-root {
        margin-top: 0;
    }
    .MuiButton-root {
        font-size: 0.675rem;
    }
`;

const DayWrapper = styled('div')`
  .MuiToggleButton-root.Mui-selected {
    color: rgba(0, 0, 0, 0.54);
    background-color: #f4d5d1;
  }
  .MuiToggleButtonGroup-groupedHorizontal:not(:last-child) {
    border-radius: 20px;
    font-size: 12px;
    margin: 0px 4px;
    width: auto !important;
  }
  .MuiToggleButtonGroup-groupedHorizontal:not(:first-child) {
    border-radius: 20px;
    font-size: 12px;
    margin: 0px 4px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    width: auto !important;
  }
  .MuiIcon-root {
    display: none;
  }
  .MuiToggleButtonGroup-root {
    border: none;
  }
`;

const TimeWrapper = styled('div')`
    display: flex;
    align-items: flex-end;
    margin-top: 15px
`;

const CTypeWrapper = styled('div')`
    display: inline-grid;
    .MuiTypography-body1 {
        font-size: 0.775rem;
        color: #9e9e9e;
        font-weight: 600;
    }
    .MuiRadio-root {
        position: absolute;
        top: 0;
        right: 0;
    }
    .MuiSvgIcon-root {
        width: 0.7em;
        height: 0.7em;
    }
`;

const DurationWrapper = styled('div')`
  .MuiToggleButton-root.Mui-selected {
    color: rgba(0, 0, 0, 0.54);
    background-color: #f4d5d1;
  }
  .MuiToggleButtonGroup-groupedHorizontal:not(:last-child) {
    border-radius: 20px;
    font-size: 12px;
    margin: 0px 4px;
    width: auto !important;
  }
  .MuiToggleButtonGroup-groupedHorizontal:not(:first-child) {
    border-radius: 20px;
    font-size: 12px;
    margin: 0px 4px;
    border: 1px solid rgba(0, 0, 0, 0.12);
  }
  .MuiIcon-root {
    display: none;
  }
  .MuiToggleButtonGroup-root {
    border: none;
  }
  .MuiInput-root {
    border: none;
  }
  .Mui-focused:after {
    transform: none
  }
  .MuiInput-underline:after {
    border: none;
    box-shadow: none;
  }
  .MuiInputAdornment-positionEnd {
    margin-left: 8px;
    margin-right: 8px;
    } 
`;

const SummaryWrapper = styled('div')`
    background: #f5f5f5;
    border-radius: 10px;
    padding: 24px 16px;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  inlineGrid: {
    display: 'inline-grid'
  },
  separator: {
    marginLeft: 15,
    marginRight: 15,
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
  TypeBoxDisabled: {
    border: 'none',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginRight: 5,
    padding: 7,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '& img': {
      filter: 'grayscale(1)'
    }
  },
  mt2: {
    marginTop: theme.spacing(2)
  },
  margin: {
    margin: theme.spacing(3),
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    flexBasis: 120,
  },
  subtitle: {
    fontWeight: 600,
    color: 'grey',
    // marginBottom: 5
  },
  secondary: {
    color: 'gray'
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  summaryContent: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

// initialization
const api = new API();

function VerticalLinearStepper(props) {
  const classes = useStyles();

  const { currentSelId, masterData, clinicDetails } = props;
  const { appointmentTypes } = masterData;
  const [clinic, setClinic] = React.useState(
    ((clinicDetails !== null) && (clinicDetails !== undefined) && (clinicDetails.length > 0)) ? clinicDetails[0].id : '',
  );
  const [noOfSlots, setNoOfSlots] = React.useState(0)
  const [addScheduleInfo, setAddScheduleInfo] = React.useState({
    days_of_week: [],
    start_time: '06:30',
    end_time: '07:30',
    booking_type: 's',
    slot_duration: 15,
    amount: 0,
    appointment_type_id: 1,
    startTimeInSeconds: 23400,
    endTimeInSeconds: 27000,
    numberOfTokens: 10,
  });
  const [activeStep, setActiveStep] = React.useState(0);
  const [snackBarInfo, setSnackBarInfo] = React.useState({
    isSnackBarOpen: false,
    snackBarText: '',
    snackBarSeverity: 'success',
  });
  const [scheduleError, handleScheduleError] = React.useState({
    errorMessage: '',
    errorStatus: false,
  });
  const [slotsError, handleSlotsError] = React.useState({
    errorMessage: '',
    errorStatus: false,
  });

  const [errorCase1, setErrorCase1] = React.useState("")
  const [errorCase3, setErrorCase3] = React.useState("")
  const steps = getSteps();

  useEffect(() => {
    if (currentSelId !== '') {
      getDoctorScheduleDetails();
    }
  }, []);

  useEffect(() => {
    if (scheduleError.errorStatus === true) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  }, [scheduleError.errorStatus]);

  const checkSlotAvailability = async () => {
    await api.ACCOUNTS_URI().post('schedules/slot-availability', {
      days_of_week: addScheduleInfo.days_of_week,
      start_time: addScheduleInfo.start_time,
      end_time: addScheduleInfo.end_time,
      id: currentSelId,
      cr_id: localStorage.getItem('cr_id')
    })
      .then((responseData) => {
        if (
          (responseData.status === 200)
          && responseData.data
          && (responseData.data.success === true)) {
          if (responseData.data.available && responseData.data.available === true) {
            handleScheduleError({
              errorMessage: '',
              errorStatus: false,
            });
          } else {
            handleScheduleError({
              errorMessage: 'Slots unavailable for selected date and time.',
              errorStatus: true,
            });
          }
        } else {
          handleScheduleError({
            errorMessage: 'Could not check availability.',
            errorStatus: true,
          });
        }
      })
      .catch((err) => {
        handleScheduleError({
          errorMessage: 'Internal Server Error',
          errorStatus: true,
        });
      });
  };

  const daysOfWeek = {
    1: 'Mon',
    2: 'Tue',
    3: 'Wed',
    4: 'Thu',
    5: 'Fri',
    6: 'Sat',
    7: 'Sun',
  };

  let daysText = '';

  if (addScheduleInfo.days_of_week.length > 0) {
    const daysOfWeekIntermediateArr = [];
    addScheduleInfo.days_of_week.map((day) => {
      daysOfWeekIntermediateArr.push(daysOfWeek[day]);
    });

    daysText = daysOfWeekIntermediateArr.join(', ');
  } else {
    daysText = 'Please select a day';
  }

  const getDoctorScheduleDetails = async () => {
    await api.ACCOUNTS_URI().get(`schedules/detail/${currentSelId}`, {
      params: {
        cr_id: localStorage.getItem('cr_id')
      }
    })
      .then((scheduleInfo) => {
        if ((scheduleInfo.status === 200) && (Object.keys(scheduleInfo.data).length > 0)) {
          setAddScheduleInfo({
            days_of_week: scheduleInfo.data.schedule.days_of_week_array,
            start_time: scheduleInfo.data.schedule.start_time,
            end_time: scheduleInfo.data.schedule.end_time,
            booking_type: scheduleInfo.data.schedule.booking_type,
            slot_duration: scheduleInfo.data.schedule.slot_duration,
            numberOfTokens: scheduleInfo.data.schedule.slot_duration,
            appointment_type_id: scheduleInfo.data.schedule.appointment_type_id,
            amount: scheduleInfo.data.schedule.amount
          });
          setClinic(scheduleInfo.data.schedule.clinic.id)
        }
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

  const handleSubmit = async () => {
    const newSlotObj = {
      clinic_id: clinic,
      id: currentSelId,
      days_of_week: addScheduleInfo.days_of_week,
      booking_type: addScheduleInfo.booking_type,
      // appointment_type_id: 1,
      start_time: addScheduleInfo.start_time,
      end_time: addScheduleInfo.end_time,
      amount: parseInt(addScheduleInfo.amount, 10),
      appointment_type_id: addScheduleInfo.appointment_type_id,
      cr_id: localStorage.getItem('cr_id')
    };

    if(addScheduleInfo.booking_type === 's') {
      newSlotObj.slot_duration = addScheduleInfo.slot_duration
    } else {
      newSlotObj.slot_duration = addScheduleInfo.numberOfTokens
    }
    
    if (currentSelId !== '') {
      await api.ACCOUNTS_URI().put(`schedules/edit/${currentSelId}`, {
        ...newSlotObj
      }).finally(() => {
        props.handleDialogClose();
      });
    } else {
      await api.ACCOUNTS_URI().post('schedules/add', {
        ...newSlotObj
      })
        .then((addScheduleRespObj) => {
          if (addScheduleRespObj && addScheduleRespObj.data
            && (addScheduleRespObj.data.success === false) && addScheduleRespObj.data.errorMessage) {
            setSnackBarInfo({
              isSnackBarOpen: true,
              snackBarText: addScheduleRespObj.data.errorMessage,
              snackBarSeverity: 'error',
            });
          } else {
            setSnackBarInfo({
              isSnackBarOpen: true,
              snackBarText: 'Schedule Added Successfully',
              snackBarSeverity: 'success',
            });
            props.handleDialogClose();
          }
        })
        .catch((err) => {
          setSnackBarInfo({
            isSnackBarOpen: true,
            snackBarText: 'Internal Server Error',
            snackBarSeverity: 'error',
          });
          props.handleDialogClose();
        });
    }
  };

  const handleNext = async () => {
    if (activeStep === 0) {
      if (addScheduleInfo.days_of_week.length > 0) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setErrorCase1("")
      } else {
        setErrorCase1("Select atleast one day")
      }
    } else if (activeStep === 1) {
      console.log("noofSlots", noOfSlots)
      let numberOfSlots = 10;
      let tokenTime = '';
      let type = 'Slots';

      if (addScheduleInfo.booking_type === 's') {
        const timeDiff = convertHoursToSeconds(addScheduleInfo.end_time) - convertHoursToSeconds(addScheduleInfo.start_time);
        numberOfSlots = Math.floor(timeDiff / (addScheduleInfo.slot_duration * 60));
      } else {
        type = 'token';
        const timeDiff = convertHoursToSeconds(addScheduleInfo.end_time) - convertHoursToSeconds(addScheduleInfo.start_time);
        tokenTime = Math.floor(timeDiff / (addScheduleInfo.numberOfTokens) / 60);
      }

      if (numberOfSlots < 0) {
        console.log("sod")
        handleSlotsError({
          errorMessage: 'Timings cannot be choosen between Two days.',
          errorStatus: true,
        });
      } else {
        handleSlotsError({
          errorMessage: '',
          errorStatus: false,
        });
        await checkSlotAvailability()
          .then(() => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          });
      }
    } else if (activeStep === 2) {
      if (addScheduleInfo.amount > 0) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setErrorCase3("")
      } else {
        setErrorCase3("Please Enter Fees")
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getSteps() {
    return ['Select days for which you want to create shift', 'Shift timings', 'Consultation type', 'Slot Duration'];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return case1();
      case 1:
        return case2();
      case 2:
        return case3();
      case 3:
        return case4();
      default:
        return 'Unknown step';
    }
  }

  const case1 = () => {
    const classes = useStyles();

    const handleFormat = (event, newFormats) => {
      if (scheduleError.errorStatus === true) {
        handleScheduleError({
          errorStatus: false,
          errorMessage: '',
        });
      }
      setAddScheduleInfo({
        ...addScheduleInfo,
        days_of_week: newFormats,
      });
    };

    return (
      <DayWrapper>
        <small className={classes.subtitle}>You can select multiple days for the shifts</small>
        <br />
        <br />
        <ToggleButtonGroup
          size="large"
          value={addScheduleInfo.days_of_week}
          onChange={handleFormat}
          aria-label="text formatting"
        >
          <ToggleButton value="1" aria-label="monday" style={{ width: 150 }}>
            <Icon style={{ marginRight: 5 }}>event_available</Icon>
            Mon
          </ToggleButton>
          <ToggleButton value="2" aria-label="tuesday" style={{ width: 155 }}>
            <Icon style={{ marginRight: 5 }}>event_available</Icon>
            Tue
          </ToggleButton>
          <ToggleButton value="3" aria-label="wednesday" style={{ width: 155 }}>
            <Icon style={{ marginRight: 5 }}>event_available</Icon>
            Wed
          </ToggleButton>
          <ToggleButton value="4" aria-label="thursday" style={{ width: 155 }}>
            <Icon style={{ marginRight: 5 }}>event_available</Icon>
            Thu
          </ToggleButton>
          <ToggleButton value="5" aria-label="friday" style={{ width: 155 }}>
            <Icon style={{ marginRight: 5 }}>event_available</Icon>
            Fri
          </ToggleButton>
          <ToggleButton value="6" aria-label="saturday" style={{ width: 155 }}>
            <Icon style={{ marginRight: 5 }}>event_available</Icon>
            Sat
          </ToggleButton>
          <ToggleButton value="7" aria-label="sunday" style={{ width: 155 }}>
            <Icon style={{ marginRight: 5 }}>event_available</Icon>
            Sun
          </ToggleButton>
        </ToggleButtonGroup>
        <FormHelperText style={{ color: 'red' }}>{errorCase1}</FormHelperText>
      </DayWrapper>
    );
  };

  const case2 = () => {
    const classes = useStyles();

    const handleTimeChange = (event) => {
      const obj = { ...addScheduleInfo };

      if (event.target.id === 'start_time') {
        const startTimeInSeconds = convertHoursToSeconds(event.target.value);
        obj.startTimeInSeconds = startTimeInSeconds;
        obj[event.target.id] = event.target.value;
      } else {
        const endTimeInSeconds = convertHoursToSeconds(event.target.value);
        obj.endTimeInSeconds = endTimeInSeconds;
        obj[event.target.id] = event.target.value;
      }

      if (scheduleError.errorStatus === true) {
        handleScheduleError({
          errorStatus: false,
          errorMessage: '',
        });
      }
      const timeDiff = obj.endTimeInSeconds - obj.startTimeInSeconds;
      let numberOfSlots = Math.floor(timeDiff / (addScheduleInfo.slot_duration * 60));
      setNoOfSlots(numberOfSlots)
      setAddScheduleInfo({ ...obj });

    };

    const convertHoursToSeconds = (timeInString) => {
      const splitTime = timeInString.split(':');
      const seconds = (+splitTime[0]) * 60 * 60 + (+splitTime[1]) * 60;

      return seconds;
    };

    return (
      <>
        <small className={classes.subtitle}>Set your shift timings</small>
        <br />
        <TimeWrapper>
          <div className={classes.inlineGrid}>
            <label>From</label>
            <FormControl fullwidth>
              <TextField
                fullwidth
                id="start_time"
                type="time"
                onChange={handleTimeChange}
                value={addScheduleInfo.start_time}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                style={{ width: 150 }}
              />
            </FormControl>
          </div>
          <div>
            <p className={classes.separator}> - </p>
          </div>
          <div className={classes.inlineGrid}>
            <label>To</label>
            <FormControl fullwidth>
              <TextField
                fullwidth
                id="end_time"
                type="time"
                onChange={handleTimeChange}
                value={addScheduleInfo.end_time}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min
                }}
                style={{ width: 150 }}
              />
            </FormControl>
          </div>
        </TimeWrapper>
        {
          (
            scheduleError
            && (scheduleError.errorStatus === true)
            && (scheduleError.errorMessage.length > 0)
          )
          && (
            <small style={{
              color: '#ff2100',
            }}
            >
              {scheduleError.errorMessage}
            </small>
          )

        }

        {
          (
            slotsError
            && (slotsError.errorStatus === true)
            && (slotsError.errorMessage.length > 0)
          )
          && (
            <small style={{
              color: '#ff2100',
            }}
            >
              {slotsError.errorMessage}
            </small>
          )

        }

      </>
    );
  };

  const case3 = () => {
    const classes = useStyles();

    const handleType = (event) => {
      const intermediateScheduleInfo = { ...addScheduleInfo };
      intermediateScheduleInfo.appointment_type_id = parseInt(event.target.value, 10);
      if(addScheduleInfo.appointment_type_id == 1 || addScheduleInfo.appointment_type_id == 2 || addScheduleInfo.appointment_type_id == 3) {
        console.log("lkjkkj")
        intermediateScheduleInfo.booking_type = 's'
        console.log("bookingType", intermediateScheduleInfo.booking_type)
      }
      setAddScheduleInfo(intermediateScheduleInfo);
    };

    const handleClinic = (event) => {
      setClinic(event.target.value);
    };

    const handleBasis = (event) => {
      const intermediateObj = { ...addScheduleInfo };
      intermediateObj.booking_type = event.target.value;
      setAddScheduleInfo(intermediateObj);
    };

    const updateFees = (event) => {
      const intermediateObj = { ...addScheduleInfo };
      intermediateObj.amount = event.target.value;
      setAddScheduleInfo(intermediateObj);
    };

    return (
      <CTypeWrapper>
        <small className={classes.subtitle}>How do you want to consult patients in this shift?</small>
        <br />
        <FormControl fullwidth component="fieldset">
          <RadioGroup
            row
            aria-label="consultation"
            name="consultation"
            value={addScheduleInfo.appointment_type_id}
            onChange={handleType}
          >
            <div className={classes.TypeBox}>
              <img src={VideoIcon} style={{ width: 35 }} />
              <FormControlLabel
                value={1}
                control={<Radio />}
                label="Video Consultation"
                labelPlacement="start"
                style={{ margin: 5, height: 20 }}
              />
            </div>
            <div className={classes.TypeBox}>
              <img src={CallIcon} style={{ width: 35 }} />
              <FormControlLabel
                value={2}
                control={<Radio />}
                label="Audio Consultation"
                labelPlacement="start"
                style={{ margin: 5, height: 20 }}
              />
            </div>
            <div className={classes.TypeBox}>
              <img src={ChatIcon} style={{ width: 35 }} />
              <FormControlLabel
                value={3}
                control={<Radio />}
                label="Chat Consultation"
                labelPlacement="start"
                style={{ margin: 5, height: 20 }}
              />
            </div>
            <div title={clinicDetailsMap.length <= 0 ? ('No Clinic Found') : ('')} className={clinicDetailsMap.length <= 0 ? (classes.TypeBoxDisabled) : (classes.TypeBox)}>
              <img src={WalkinIcon} style={{ width: 35 }} />
              <FormControlLabel
                value={4}
                control={<Radio />}
                label="Walk In Consultation"
                disabled={clinicDetailsMap.length <= 0}
                labelPlacement="start"
                style={{ margin: 5, height: 20 }}
              />
            </div>
          </RadioGroup>
        </FormControl>
        <div className={classes.mt2}>
          {(addScheduleInfo.appointment_type_id == 4) ? (
            <>
              <FormControl style={{ width: 250, marginRight: 20 }}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ marginBottom: 5 }}
                >
                  Clinic Location:
                </Typography>
                <Select
                  value={clinic}
                  onChange={handleClinic}
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
              <FormControl style={{ width: 250 }}>
                <Typography
                  variant="subtitle2"
                  gutterBottom
                  style={{ marginBottom: 5 }}
                >
                  Booking Basis:
                </Typography>
                <Select
                  value={addScheduleInfo.booking_type}
                  onChange={handleBasis}
                >
                  <MenuItem value="s">
                    Appointment with Slot
                  </MenuItem>
                  <MenuItem value="t">
                    Appointment with Token
                  </MenuItem>
                </Select>
              </FormControl>
            </>
          ) : ('')}
        </div>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          style={{ paddingTop: '10px', paddingBottom: 0, marginBottom: 0 }}
        >
          <Typography variant="subtitle2">
            Consultation Fees
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={3}
          style={{ paddingTop: 0, paddingBottom: 0 }}
        >
          <FormControl variant="outlined" fullWidth>
            <TextField
              fullWidth
              label="Fees"
              name="fees"
              placeholder="Fees"
              type="number"
              required
              onKeyDown={(e) => e.key === '.' && e.preventDefault()}
              value={addScheduleInfo.amount}
              onChange={updateFees}
              error={errorCase3 !== ''}
              helperText={errorCase3}
            />
          </FormControl>
        </Grid>


      </CTypeWrapper>
    );
  };

  const case4 = () => {
    const classes = useStyles();

    const handleSlotDurationChange = (event) => {
      event.stopPropagation();
      const slotObj = { ...addScheduleInfo };
      if(addScheduleInfo.appointment_type_id == 1 || addScheduleInfo.appointment_type_id == 2 || addScheduleInfo.appointment_type_id == 3) {
        addScheduleInfo.booking_type === 's'
      }

      if (addScheduleInfo.booking_type === 's') {
        slotObj.slot_duration = parseInt(event.target.value, 10);
      } else {
        slotObj.numberOfTokens = parseInt(event.target.value, 10);
      }

      setAddScheduleInfo({ ...slotObj });
    };

    const handleTokenSlotDuration = (event) => {
      event.stopPropagation();
      const slotObj = { ...addScheduleInfo };

      slotObj.slot_duration = parseInt(event.target.value, 10);

      setAddScheduleInfo({ ...slotObj });
    };

    console.log("addScheduleInfo.appointment_type_id", addScheduleInfo.appointment_type_id)
    
    const handleSlotDurationToggleButton = (event, scheduleTimeStamp) => {
      event.stopPropagation();
      const slotObj = { ...addScheduleInfo };
      if (addScheduleInfo.booking_type === 's') {
        slotObj.slot_duration = parseInt(scheduleTimeStamp, 10);
      } else {
        slotObj.numberOfTokens = parseInt(scheduleTimeStamp, 10);
      }


      setAddScheduleInfo({ ...slotObj });
    };

    return (
      <DurationWrapper>
        <small className={classes.subtitle}>
          {
            (addScheduleInfo.booking_type === 's')
              ? ('How much time do you want to spend per patient ?')
              : ('How many Tokens you want to Create ?')
          }
        </small>
        <br />
        <br />
        <ToggleButtonGroup
          size="large"
          value={(addScheduleInfo.booking_type === 's') ? addScheduleInfo.slot_duration.toString() : Math.floor(addScheduleInfo.numberOfTokens).toString()}
          onChange={handleSlotDurationToggleButton}
          aria-label="text formatting"
          exclusive
        >
          <ToggleButton
            value="5"
            aria-label={5}
            style={{ width: 150 }}
          >
            <Icon style={{ marginRight: 5 }}>event_available</Icon>
            5
            {' '}
            {(addScheduleInfo.booking_type === 's') ? ('mins') : ('tokens')}
          </ToggleButton>
          <ToggleButton
            value="10"
            aria-label={10}
            style={{ width: 155 }}
          >
            <Icon style={{ marginRight: 5 }}>event_available</Icon>
            10
            {' '}
            {(addScheduleInfo.booking_type === 's') ? ('mins') : ('tokens')}
          </ToggleButton>
          <ToggleButton
            value="15"
            aria-label={15}
            style={{ width: 155 }}
          >
            <Icon style={{ marginRight: 5 }}>event_available</Icon>
            15
            {' '}
            {(addScheduleInfo.booking_type === 's') ? ('mins') : ('tokens')}
          </ToggleButton>
          <ToggleButton
            value="20"
            aria-label={20}
            style={{ width: 155 }}
          >
            <Icon style={{ marginRight: 5 }}>event_available</Icon>
            20
            {' '}
            {(addScheduleInfo.booking_type === 's') ? ('mins') : ('tokens')}
          </ToggleButton>
          <ToggleButton
            value="25"
            aria-label={25}
            style={{ width: 155 }}
          >
            <Icon style={{ marginRight: 5 }}>event_available</Icon>
            25
            {' '}
            {(addScheduleInfo.booking_type === 's') ? ('mins') : ('tokens')}
          </ToggleButton>
          <ToggleButton
            value="30"
            aria-label={30}
            style={{ width: 155 }}
          >
            <Icon style={{ marginRight: 5 }}>event_available</Icon>
            30
            {' '}
            {(addScheduleInfo.booking_type === 's') ? ('mins') : ('tokens')}
          </ToggleButton>
        </ToggleButtonGroup>
      </DurationWrapper>
    );
  };

  let consultationType = 'Video Consultation';

  if (appointmentTypes && (appointmentTypes !== null)
    && (appointmentTypes.length > 0) && addScheduleInfo.appointment_type_id) {
    const appointTypeFiltered = appointmentTypes.find((type) => type.id === addScheduleInfo.appointment_type_id);

    if (appointTypeFiltered) {
      consultationType = `${appointTypeFiltered.name} Consultation`;
    }
  }

  let bookingType = 'Appointment With Slot';

  if (addScheduleInfo.booking_type === 't') {
    bookingType = 'Appointment With Tokens';
  }

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

  const convertHoursToSeconds = (timeInString) => {
    const splitTime = timeInString.split(':');
    const seconds = (+splitTime[0]) * 60 * 60 + (+splitTime[1]) * 60;

    return seconds;
  };

  const renderShiftSummary = () => {
    let numberOfSlots = 10;
    let tokenTime = '';
    let type = 'Slots';

    if (addScheduleInfo.booking_type === 's') {
      const timeDiff = convertHoursToSeconds(addScheduleInfo.end_time) - convertHoursToSeconds(addScheduleInfo.start_time);
      numberOfSlots = Math.ceil(timeDiff / (addScheduleInfo.slot_duration * 60));
    } else {
      type = 'token';
      const timeDiff = convertHoursToSeconds(addScheduleInfo.end_time) - convertHoursToSeconds(addScheduleInfo.start_time);
      tokenTime = (timeDiff / (addScheduleInfo.numberOfTokens) / 60).toFixed(2);
    }

    return (
      <SummaryWrapper>
        <Typography variant="h6" className={classes.secondary}>Shift Summary</Typography>
        <Divider className={classes.divider} />
        <Grid container>
          <Grid className={classes.summaryContent} item sm={9}>
            <Typography>
              {daysText}
            </Typography>
            <Typography>
              {`${addScheduleInfo.start_time > '12:00' ? `${addScheduleInfo.start_time} PM` : `${addScheduleInfo.start_time} AM`} to ${addScheduleInfo.end_time > '12:00' ? `${addScheduleInfo.end_time} PM` : `${addScheduleInfo.end_time} AM`}`}
            </Typography>
            <Typography>{consultationType}</Typography>
            <Typography>{bookingType}</Typography>
            <Typography>{`₹ ${addScheduleInfo.amount} consultation fees`}</Typography>
            {addScheduleInfo.booking_type == 's' ? (
              <small>{`${numberOfSlots} ${type} created each of ${addScheduleInfo.slot_duration} min in this shift.`}</small>
            ) : (
              <small>{`${addScheduleInfo.numberOfTokens} ${type} created each of ${tokenTime} min in this shift.`}</small>
            )}
          </Grid>
          <Grid item sm={3}>
            <img src="https://emr-assets.docon.co.in/webapp/static/media/home.1d8387e7.png" width="72px" />
          </Grid>
        </Grid>
      </SummaryWrapper>
    );
  };

  return (
    <AddScheduleWrapper className={classes.root}>
      <Grid container spacing={2}>
        <Grid item sm={8}>
          <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((label, index) => (
                <Step key={index.toString()}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography component="span">{getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          variant="outlined"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        {activeStep === steps.length - 1 ? (
                          <Button
                            variant="contained"
                            // onClick={handleNext}
                            className={classes.button}
                            onClick={handleSubmit}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            className={classes.button}
                            disabled={scheduleError.errorStatus}
                          >
                            Next
                          </Button>
                        )}
                      </div>
                    </div>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </div>
        </Grid>
        <Grid item sm={4}>
          {renderShiftSummary()}
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

    </AddScheduleWrapper>
  );
}

const mapStateToProps = state => ({
  clinicDetails: state.get('profileReducer').clinicDetails,
  masterData: state.get('dashboardReducer').masterData,
});

export default connect(mapStateToProps, {})(VerticalLinearStepper);
