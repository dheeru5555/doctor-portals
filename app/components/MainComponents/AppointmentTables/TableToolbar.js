import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Popover from '@material-ui/core/Popover';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import SearchIcon from '@material-ui/icons/Search';
import CloudDownload from '@material-ui/icons/CloudDownload';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Close from '@material-ui/icons/Close';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import { connect } from 'react-redux';
import styles from './tableStyle-jss';
import history from '../../../utils/history';
import MoveToQueue from '../AppointmentsComponent/Dialogs/MoveToQueue'
import { fetchMasterData } from '../../../redux/actions/dashboardActions';

function TableToolbar(props) {
  const {
    numSelected,
    classes,
    filterText,
    placeholder,
    title,
    onUserInput,
    handleCheckboxChange,
    bookingTypes,
    fetchAppointments,
    todayAppointmentList,
    masterData,
    selectedAppointmens,
    updateStatus,
    fetchMasterData
  } = props;

  const [showSearch, setShowSearch] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  let today = new Date();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
    await fetchAppointments();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const toggleSearch = useCallback(() => {
    setShowSearch(show => !show);
  }, []);

  React.useEffect(() => {
    if(masterData === null) {
      fetchMasterData()
    }
  },[])


  const handlePreviousDay = () => {
    const dateOffset = (24 * 60 * 60 * 1000) * 1;
    const currentDay = new Date(bookingTypes.slot_date);
    currentDay.setTime(currentDay.getTime() - dateOffset);

    const previousDate = `${new Date(currentDay).getFullYear()}-${(new Date(currentDay).getMonth() + 1).toString().padStart(2, '0')}-${new Date(currentDay).getDate().toString().padStart(2, '0')}`;
    onUserInput('slot_date', previousDate);
  };

  const handleNextDay = () => {
    const dateOffset = (24 * 60 * 60 * 1000) * 1;
    const currentDay = new Date(bookingTypes.slot_date);
    currentDay.setTime(currentDay.getTime() + dateOffset);

    const nextDate = `${new Date(currentDay).getFullYear()}-${(new Date(currentDay).getMonth() + 1).toString().padStart(2, '0')}-${new Date(currentDay).getDate().toString().padStart(2, '0')}`;

    onUserInput('slot_date', nextDate);
  };

  const handleDownloadCSV = () => {
    const csvDataHeader = ['Patient Name', 'Patient Mobile Number', 'Patient DOB', 'Patient Gender', 'Clinic Name'];
    const fileName = new Date().getTime().toString() + 'todayBooking' + '.csv';

    let csvKeys = '';
    csvKeys += csvDataHeader.join(',') + '\r\n';
    todayAppointmentList.map((appList) => csvKeys += `${appList.patient_name},${appList.patient_mobile},${appList.patient_dob},${((appList.patient_gender !== null) && (appList.patient_gender === 'm')) ? 'Male' : 'Female'},${appList.clinic_name}\r\n`);
    if (!csvKeys.match(/^data:text\/csv/i)) {
      csvKeys = 'data:text/csv;charset=utf-8,' + csvKeys;
    }

    const encodedeUri = encodeURI(csvKeys);
    const link = document.createElement('a');
    link.setAttribute('href', encodedeUri);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
  };

  if (
    (bookingTypes === undefined) || 
    (Object.keys(bookingTypes).length === 0) ||
    (masterData === null) ||
    (!masterData.appointmentTypes)
  ) {
    return null;
  } else {
    const { appointmentTypes } = masterData;

    return (
      <Toolbar
        className={classNames(classes.toolbar, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="inherit" variant="subtitle1">
              {numSelected}
              &nbsp;selected
            </Typography>
          ) : (
            <Typography variant="h6">{title}</Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actionsToolbar}>
          {numSelected > 0 ? (
            <div>
              {title === 'Today Bookings' || title === 'Waitlist' || title === 'No Show' ? (
                <>
                  <MoveToQueue
                    updateStatus={updateStatus}
                    appId={selectedAppointmens}
                    // showDialog={queueDialog}
                  />
                  {/* <Button variant="contained" style={{ marginLeft: 8 }}>Move to Queue</Button> */}
                  {/* <Button variant="outlined" color="primary" style={{ marginLeft: 8 }}>Cancel Appointments</Button> */}
                </>
              ) : ('')}
            </div>
          ) : (
            <div className={classes.actions}>
              {showSearch ? (
                <FormControl className={classNames(classes.textField)}>
                  <Input
                    id="search"
                    type="text"
                    placeholder="Search by Name or Mobile"
                    value={bookingTypes.search}
                    onChange={(event) => {
                      onUserInput(event.target.id, event.target.value);
                      fetchAppointments();
                    }}
                    endAdornment={(
                      <InputAdornment position="end">
                        <IconButton aria-label="Search filter" onClick={() => {
                          toggleSearch()
                          bookingTypes.search = ""
                          onUserInput("search", "")
                        }}>
                          <Close />
                        </IconButton>
                      </InputAdornment>
                    )}
                  // onBlur={async () => await fetchAppointments()}
                  />
                </FormControl>
              ) : ('')}
              <Tooltip title="Search list">
                <IconButton
                  aria-label="Search list"
                  className={classes.filterBtn}
                  onClick={() => toggleSearch()}
                >
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              {(
                ((title === 'Today Bookings')
                  || (title === 'WalkIn Payments')
                  || (title === 'Online Payments'))
                && (
                  (todayAppointmentList !== undefined)
                  && (todayAppointmentList.length > 0)
                )
              ) ? (
                <Tooltip
                  title="Download CSV"
                  onClick={() => handleDownloadCSV()}
                >
                  <IconButton
                    aria-label="download list"
                    className={classes.filterBtn}
                  >
                    <CloudDownload />
                  </IconButton>
                </Tooltip>
              ) : ('')}
              {title === 'Waitlist' ? '' : (
                <Tooltip title="Filter list">
                  <IconButton
                    aria-label="Filter list"
                    className={classes.filterBtn}
                    onClick={handleClick}
                  >
                    <FilterListIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 50,
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <div className={classes.popover}>
                  {title === 'Online Payments' || title === 'WalkIn Payments' ? (
                    <FormControl component="fieldset" className={classes.formControl}>
                      <FormLabel component="legend">Filter By Type</FormLabel>
                      <FormGroup>
                        <FormControlLabel
                          control={<Checkbox name="gilad" />}
                          label={title === 'Online Payments' ? 'Settled' : 'Received'}
                        />
                        <FormControlLabel
                          control={<Checkbox name="jason" />}
                          label={title === 'Online Payments' ? 'Due to Settle' : 'Not Received'}
                        />
                      </FormGroup>
                    </FormControl>
                  ) : (
                    <FormControl
                      component="fieldset"
                      className={classes.formControl}
                    >
                      <Grid container spacing={2}>
                        <Grid item sm={6}>
                          <FormLabel component="legend">Appointment Type</FormLabel>
                          <FormGroup>
                            {/* {renderAppointmentTypesList()} */}
                            {appointmentTypes.map((aType) => {
                              return (
                                <FormControlLabel
                                key={`aType-${aType.id}`}
                                label={aType.name}
                                control={(
                                  <Checkbox
                                    id={aType.id}
                                    size="small"
                                    name="gilad"
                                    value={aType.id}
                                    checked={
                                      (bookingTypes.appointment_type_id.includes(aType.id.toString()))
                                    }
                                    onChange={(e) => handleCheckboxChange('appointment_type_id', e.target.id, e.target.checked)}
                                  />
                                )}
                              />
                              )
                            })}
                          </FormGroup>
                        </Grid>
                        <Grid item sm={6}>
                          <FormLabel component="legend">Appointment Ref</FormLabel>
                          <FormGroup>
                            <FormControlLabel
                              control={(
                                <Checkbox
                                  id="i"
                                  size="small"
                                  name="gilad"
                                  value="i"
                                  checked={
                                    (bookingTypes.consultation_type.includes('i'))
                                  }
                                  onChange={(e) => handleCheckboxChange('consultation_type', e.target.id, e.target.checked)}
                                />
                              )}
                              label="New"
                            />
                            <FormControlLabel
                              control={(
                                <Checkbox
                                  id="f"
                                  size="small"
                                  name="jason"
                                  value="f"
                                  checked={
                                    (bookingTypes.consultation_type.includes('f'))
                                  }
                                  onChange={(e) => handleCheckboxChange('consultation_type', e.target.id, e.target.checked)}
                                />
                              )}
                              label="Follow up"
                            />
                            <FormControlLabel
                              control={(
                                <Checkbox
                                  id="r"
                                  size="small"
                                  name="jason"
                                  value="r"
                                  checked={
                                    (bookingTypes.consultation_type.includes('r'))
                                  }
                                  onChange={(e) => handleCheckboxChange('consultation_type', e.target.id, e.target.checked)}
                                />
                              )}
                              label="Repeat"
                            />
                          </FormGroup>
                        </Grid>
                      </Grid>
                    </FormControl>
                  )}
                </div>
              </Popover>
              {
                (title === 'Waitlist')
                && (
                  <Button
                    className={classes.blueButton}
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 8 }}
                    onClick={() => history.push('/app/new-appointment')}
                  >
                    New Appointment
                  </Button>
                )
              }
              {title === 'Today Bookings' || title === 'Online Payments' || title === 'WalkIn Payments' || title === 'Waitlist' || title === 'In Queue' || title === 'No Show' ? ('') : (
                <div className={classes.datePicker}>
                  <Icon onClick={() => handlePreviousDay()}>chevron_left</Icon>
                  <TextField
                    id="date"
                    type="date"
                    onChange={(e) => onUserInput(e.target.id, e.target.value)}
                    value={bookingTypes.slot_date}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{ inputProps: { max: today } }}
                    id="slot_date"
                    onBlur={async () => await fetchAppointments()}
                  />
                  <Icon onClick={() => handleNextDay()}>chevron_right</Icon>
                </div>
              )}
            </div>
          )}
        </div>
      </Toolbar>
    );
  }

}

TableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  filterText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onUserInput: PropTypes.func.isRequired,
  numSelected: PropTypes.number.isRequired,
  handleCheckboxChange: PropTypes.any,
  fetchAppointments: PropTypes.any,
};

const mapStateToProps = state => ({
  masterData: state.get('dashboardReducer').masterData,
});

export default connect(mapStateToProps, { fetchMasterData })(withStyles(styles)(TableToolbar));
