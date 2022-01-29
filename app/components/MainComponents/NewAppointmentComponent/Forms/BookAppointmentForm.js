import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import helper from '../../../../helpers/helpers';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: 30,
    marginLeft: 8
  },
  field: {
    width: '100%',
    marginBottom: 20,
    '& .MuiInput-root': {
      paddingTop: 8
    }
  },
  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  },
  customRadio: {
    background: 'white',
    color: '#e91e63',
    border: '1px solid #e91e63',
    borderRadius: 25,
    paddingRight: 15,
    marginBottom: 15,
    marginRight: 23
  },
  buttonInit: {
    margin: theme.spacing(4),
    textAlign: 'center'
  },
  Typography: {
    marginTop: 16,
    fontWeight: 'bold'
  },
  TypographyRadio: {
    marginTop: 10,
    fontWeight: 'bold'
  },
  AlignCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  demo: {
    height: 240,
  },
  divider: {
    display: 'block',
    margin: `${theme.spacing(3)}px 0`,
  },
  picker: {
    margin: `${theme.spacing(3)}px 5px`,
  }
});

class BookAppointmentForm extends Component {
  state = {
    fields: {
      patient_id: '',
      doctor_id: '',
      patient_fm_id: '',
      clinic_id: '',
      booking_type: "",
      slot_id: "",
      chief_complaint: '',
      booked_date: '',
      selectedDate: '',
      cr_id: localStorage.getItem("cr_id")
    },
    errors: {
      patient_id: '',
      doctor_id: '',
      patient_fm_id: '',
      clinic_id: '',
      booking_type: '',
      slot_id: '',
      chief_complaint: '',
      booked_date: '',
      selectedDate: '',
      cr_id: ''
    }
  }


  bookingSubmit = () => {
    if (this.submitvalidate()) {
      this.props.bookNowAppointment(this.state.fields);
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    const { fields, errors } = this.state;
    let filabel = { ...fields };

    if (name == 'booking_type' || name == 'clinic_id') {
      this.props.resetTokenSlot();
    }

    if (name == 'selectedDate') {
      filabel = { ...fields, [name]: value };
      this.props.getTimeSlot(date);
    } else if (name == 'booking_type' || name == 'clinic_id') {
      this.props.resetTokenSlot();
      filabel = { ...fields, [name]: value, ['slot_id']: '' };
    } else {
      filabel = { ...fields, [name]: value };
    }

    this.validateForm(filabel, name);
  };

  validateForm = (fields, filed_name) => {
    let validate = true;
    const { errors } = this.state;

    switch (filed_name) {
      case 'clinic_id':
        if (this.props.isFrontdesk) {
          validate = true;
        } else {
          if (fields.clinic_id == '') {
            errors.clinic_id = 'Select your clinic';
            validate = false;
          } else {
            errors.clinic_id = '';
          }
        }
        break;
      case 'cr_id':
        if (this.props.isFrontdesk) {
          if (fields.cr_id == '') {
            errors.cr_id = 'Select Doctor and Clinic Combination in Header';
            validate = false;
          } else {
            errors.cr_id = '';
          }
        }
        break;
      case 'booking_type':
        if (fields.booking_type == '') {
          errors.booking_type = 'Select your Appointment Type';
          validate = false;
        } else {
          errors.booking_type = '';
        }
        break;
      case 'selectedDate':
        if (fields.selectedDate == '') {
          errors.selectedDate = 'Select your Booking date';
          validate = false;
        } else {
          errors.selectedDate = '';
        }
        break;

      case 'chief_complaint':
        if (fields.chief_complaint == '') {
          errors.chief_complaint = 'Enter your Chief Complaint';
          validate = false;
        } else {
          errors.chief_complaint = '';
        }
        break;

      case 'slot_id':
        if (fields.slot_id == '' && fields.booking_type == 's') {
          errors.slot_id = 'The slot is required when appointment type is Slot';
          validate = false;
        } else {
          errors.chief_complaint = '';
        }
        break;
    }

    this.setState({ fields, errors });
    return validate;
  };

  submitvalidate = () => {
    const { fields } = this.state;
    let validate = true;
    for (const key in fields) {
      if (!this.validateForm(fields, key)) {
        validate = false;
      }
    }
    return validate;
  };


  handleType = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleDateChange = (date) => {
    const name = 'selectedDate';
    const format_date = date.format('YYYY-MM-DD');
    const { fields, errors } = this.state;
    let filabel = { ...fields };
    filabel = { ...fields, [name]: date, booked_date: format_date };
    this.validateForm(filabel, name);
    this.props.getTimeSlot(date, this.state.fields.booking_type, this.state.fields.clinic_id, localStorage.getItem("cr_id"));
  }

  handleMenuOpen = (event) => {
    event.stopPropagation();
    this.setState({ anchorEl: event.currentTarget });
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  selectLocale = (selectedLocale) => {
    this.setState({
      currentLocale: selectedLocale,
      anchorEl: null,
    });
  }

  componentDidMount() {
    const { fields, errors } = this.state;
    let filabel = { ...fields };
    const curent_date = new Date();
    const formatDate = curent_date.getFullYear() + '-' + curent_date.getMonth() + '-' + curent_date.getDate();
    filabel = {
      ...fields, patient_id: this.props.pasentId, doctor_id: this.props.docuterDetail.id, booked_date: formatDate
    };
    this.setState({ fields: filabel, errors });
  }

  componentDidUpdate() {

  }

  render() {
    const trueBool = true;
    const {
      classes,
      docuterDetail,
      timeSlot,
      appointmentToken,
      depandendes,
      resetTokenSlot
    } = this.props;

    const { selectedDate } = this.state;

    const arr = []

    let selectedDoctorClinic = ''

    if (
      localStorage.getItem("selectedTag") !== ""
      && JSON.parse(localStorage.getItem("selectedTag")) !== null
      && JSON.parse(localStorage.getItem("selectedTag")) !== undefined
      && JSON.parse(localStorage.getItem("selectedTag")) !== ''
    ) {
      selectedDoctorClinic = JSON.parse(localStorage.getItem("selectedTag"))
    }

    return (
      <Paper className={classes.root}>
        <div>
          <Grid container>
            <Grid item xs={12} md={2}>
              <Typography className={classes.TypographyRadio}>Booked For<span style={{color: 'red'}}>*</span> :</Typography>
            </Grid>
            <Grid item xs={12} md={10}>
              <FormControl component="fieldset" required>
                <RadioGroup
                  aria-label="gender"
                  name="patient_fm_id"
                  defaultValue=""
                  value={this.state.patient_fm_id}
                  onChange={this.handleChange}
                  row
                >
                  <FormControlLabel selected value="" control={<Radio />} label="For You" />
                  {
                    depandendes.map((member) => (<FormControlLabel value={'' + member.id} control={<Radio />} label={member.title + ' ' + member.first_name} />))
                  }
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography className={classes.Typography}>Clinic<span style={{color: 'red'}}>*</span> :</Typography>
            </Grid>
            <Grid item xs={12} md={10} style={{ display: 'flex', alignItems: 'end' }}>
              {this.props.isFrontdesk ? (
                <>
                  {this.props.parsedUserInfo.clinics.length == 0 ? (
                    <>
                      <h6 style={{ margin: 0 }}>No Clinics Added</h6>
                    </>
                  ) : (
                    <>
                      <TextField
                        fullWidth
                        margin="normal"
                        name="cr_id"
                        disabled
                        value={selectedDoctorClinic !== '' ? `${selectedDoctorClinic.doctor.first_name} ${selectedDoctorClinic.doctor.last_name} - ${selectedDoctorClinic.clinic.name}` : ''}
                        error={(localStorage.getItem("cr_id") == '')}
                        helperText={localStorage.getItem("cr_id") == '' ? 'Clinic is not Selected in Header' : ''}
                      />
                    </>
                  )}
                </>
              ) : (
                <>
                  {this.props.clinics.length == 0 ? (
                    <>
                      <h6 style={{ margin: 0 }}>No Clinics Added</h6>
                    </>
                  ) : (
                    <>
                      <TextField
                        select
                        label="Select your clinic"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        name="clinic_id"
                        value={this.state.fields.clinic_id}
                        error={(this.state.errors.clinic_id != '')}
                        helperText={this.state.errors.clinic_id}
                        onChange={this.handleChange}
                      >
                        {
                          this.props.clinics.map((clinic) => (<option key={clinic.id} value={clinic.id}>{clinic.name}</option>))
                        }
                      </TextField>
                    </>
                  )}
                </>
              )}
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography className={classes.Typography}>Appointment Type<span style={{color: 'red'}}>*</span> :</Typography>
            </Grid>
            <Grid item xs={12} md={10} style={{ marginBottom: 16 }}>

              <TextField
                select
                label="Select your type"
                fullWidth
                // margin="normal"
                // variant="outlined"
                name="booking_type"
                value={this.state.fields.booking_type}
                error={(this.state.errors.booking_type != '')}
                helperText={this.state.errors.booking_type}
                onChange={this.handleChange}
              >
                <option value="">Sellect your appointment type </option>
                <option value="s">Appointment by Slot</option>
                <option value="t">Appointment by Token</option>
              </TextField>
            </Grid>
            <Grid item xs={12} md={2}>
              <Typography className={classes.Typography} style={{ marginTop: 0 }}>Date<span style={{color: 'red'}}>*</span> :</Typography>
            </Grid>
            <Grid item xs={12} md={10} style={{ marginBottom: 8 }}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                  format="DD/MM/YYYY"
                  placeholder="dd/mm/yyyy"
                  mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                  value={this.state.fields.selectedDate}
                  onChange={this.handleDateChange}
                  animateYearScrolling={false}
                  minDate={new Date()}
                  error={(this.state.errors.selectedDate != '')}
                  helperText={this.state.errors.selectedDate}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            {(() => {
              switch (this.state.fields.booking_type) {
                case 's':
                  return (<>
                    <Grid item xs={12} md={2}>
                      <Typography className={classes.Typography}>Slot<span style={{color: 'red'}}>*</span> :</Typography>
                    </Grid>
                    <Grid item xs={12} md={10} style={{ marginBottom: 8, marginTop: 16 }}>

                      {(this.state.fields.selectedDate !== '') && timeSlot.length == 0 ? (
                        <h6>No Slots Found</h6>
                      ) : (
                        <FormControl
                          component="fieldset"
                          required
                          className={classes.formControl}
                        >
                          <RadioGroup
                            name="slot_id"
                            className={classes.inlineWrap}
                            value={this.state.slot_id}
                            error={(this.state.errors.slot_id != '')}
                            helperText={this.state.errors.slot_id}
                            onChange={this.handleChange}
                          >
                            {timeSlot.map((appointment) => (<FormControlLabel key={appointment.id} className={classes.customRadio} value={'' + appointment.id} control={<Radio />} label={helper.tConvert((appointment.start_time).slice(0, -3)) + ' -  ' + helper.tConvert((appointment.end_time).slice(0, -3))} />))}
                          </RadioGroup>
                        </FormControl>

                      )}
                      {(this.state.errors.slot_id != '') ? (
                        <small>
                          {' '}
                          {this.state.errors.slot_id}
                          {' '}
                        </small>
                      ) : ''}

                    </Grid>
                  </>)
                  break;
                case 't':
                  return (<>
                    <Grid item xs={12} md={2}>
                      <Typography className={classes.Typography}>Token<span style={{color: 'red'}}>*</span> :</Typography>
                    </Grid>
                    <Grid item xs={12} md={10} style={{ marginBottom: 8, marginTop: 16 }}>
                      {(appointmentToken != null) ? (<h6  > {appointmentToken}  Token available </h6>) : ""}
                    </Grid>
                  </>)
                  break;

                default:
                  break;
              }
            })()}


            <Grid item xs={12} md={2}>
              <Typography className={classes.Typography}>Chief Complaint<span style={{color: 'red'}}>*</span> :</Typography>
            </Grid>
            <Grid item xs={12} md={10} style={{ marginTop: 16 }}>
              <TextField
                name="chief_complaint"
                className={classes.field}
                // component={TextFieldRedux}
                onChange={this.handleChange}
                placeholder="Type here ....."
                value={this.state.chief_complaint}
                multiline={trueBool}
                error={(this.state.errors.chief_complaint != '')}
                helperText={this.state.errors.chief_complaint}
                rows={4}
                inputProps={{ maxLength: 250 }}
              />
            </Grid>
          </Grid>
        </div >
        <div className={classes.AlignCenter}>

          <Button onClick={this.bookingSubmit} variant="contained" color="secondary" type="submit">
            Book Appointment
          </Button>
        </div>
      </Paper >
    );
  }
}

BookAppointmentForm.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(BookAppointmentForm);
