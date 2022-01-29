import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Grid from '@material-ui/core/Grid';
import { Prescription } from 'enl-components';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import flag from 'enl-images/flag-lang.png';
import Checkbox from '@material-ui/core/Checkbox';
import Popover from '@material-ui/core/Popover';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { connect } from 'react-redux';
import { AssertionError } from 'chai';
import { useReactToPrint } from 'react-to-print';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import API from '../../../../../helpers/api';
import CompleteConsultation from './CompleteConsultation';
import CancelConsultation from './CancelConsultation';

const flagIcon = {
  width: 16,
  height: 16,
  borderRadius: '50%',
  display: 'inline-block',
  position: 'relative',
  marginRight: 5,
  top: 1,
  background: `url(${flag}) no-repeat transparent`,
  backgroundSize: '16px auto',
  '&[class="ar"]': {
    backgroundPosition: '0 3px'
  },
  '&[class="zh"]': {
    backgroundPosition: '0 -12px'
  },
  '&[class="en"]': {
    backgroundPosition: '0 -28px'
  },
  '&[class="de"]': {
    backgroundPosition: '0 -44px'
  },
  '&[class="id"]': {
    backgroundPosition: '0 -62px'
  },
  '&[class="es"]': {
    backgroundPosition: '0 -79px'
  },
};

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  actionButtons: {
    color: '#000000a3',
    backgroundColor: '#e0e0e0',
    margin: theme.spacing(1),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  rightPanelTitle: {
    padding: '15px 0px',
    border: '1px solid #dedede',
    background: '#fff',
    marginTop: 58
  },
  title: {
    padding: '15px 10px'
  },
  rightPanel: {
    padding: '15px 20px',
  },
  customButton: {
    justifyContent: 'space-between',
    padding: '15px 0px',
    '&:hover': {
      background: 'inherit',
    }
  },
  textField: {
    marginTop: 0,
    marginBottom: 0,
    backgroundColor: 'white'
  },
  inputLang: {
    maxWidth: 260,
    background: 'white',
    border: 'none',
    paddingBottom: 5,
    '& i': {
      ...flagIcon
    }
  },
  options: {
    width: '100%',
    background: 'white',
    '& .MuiSelect-select.MuiSelect-select': {
      padding: 9
    }
  },
  formControl: {
    width: '100%'
  },
  optionsButton: {
    background: 'white',
    border: 'none',
    height: '100%',
    width: '100%',
    fontWeight: 500,
    textTransform: 'capitalize'
  },
  popover: {
    padding: 20,
    background: '#f5f5f5'
  },
  optionsTitle: {
    paddingLeft: 27,
    paddingTop: 10
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, saveRx, consultationDetails, onClose, handlePrint, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <div className={classes.header}>
        {onClose ? (
          <Button aria-label="close" className={classes.textWhite} onClick={onClose}>
            <KeyboardArrowLeft />
            Back to Consult
          </Button>
        ) : null}
        <div>
          {/* <Button
            variant="contained"
            className={classes.actionButtons}
            onClick={async () => await saveRx()}
          >
            Save Rx
          </Button> */}
          <Button variant="contained" className={classes.actionButtons} onClick={handlePrint}>
            Print Rx
          </Button>
          <CancelConsultation consultationDetails={consultationDetails} />
          <CompleteConsultation consultationDetails={consultationDetails} />
        </div>
      </div>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: '#f5f5f5'
  },
}))(MuiDialogContent);

function PreviewRxDialog(props) {
  const api = new API();
  const { classes, consultationDetails, masterData } = props;
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [followUpDates, setFollowUpDates] = React.useState(consultationDetails.follow_up_date);
  const [followUpNotes, setFollowUpNotes] = React.useState(consultationDetails.follow_up_note);
  const [selLang, setSelLang] = React.useState(1);
  const [printSettings, setPrintSettings] = React.useState({
    follow_up_note: true,
    follow_up_date: true,
    chief_complaint: true,
    symptoms: true,
    vitals: true,
    observations: true,
    diagnosis: true,
    investigations: true,
    medical_history: true,
    instructions: true,
    procedures: true,
    medicines: true,
  });
  const [rx, setRx] = React.useState({});

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  React.useEffect(() => {
    if (open === true) {
      api.ACCOUNTS_URI().put('appointments/consultation/previewRx', {
        appointment_id: consultationDetails.id,
        language_id: selLang,
        follow_up_date: followUpDates,
        follow_up_note: followUpNotes,
        print_options: printSettings
      })
        .then((previewRxResp) => {
          setRx(previewRxResp.data.previewHtml);
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }, [open, followUpDates, followUpNotes, printSettings, selLang]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionsClose = () => {
    setAnchorEl(null);
  };

  const resetDate = () => {
    setFollowUpDates(null);
  };

  const open1 = Boolean(anchorEl);
  const id = open1 ? 'simple-popover' : undefined;

  // const handleChange = (event) => {
  //   const { name } = event.target;
  //   setState({
  //     ...state,
  //     [name]: event.target.value,
  //   });
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const renderLangDetails = () => {
    const { languages } = masterData;

    return languages.map((lang) => <option key={lang.id} value={lang.id}>{lang.name}</option>);
  };

  const saveRx = async () => {
    const saveRxObj = {
      appointment_id: consultationDetails.id,
      prescription_lang_id: selLang,
      follow_up_date: followUpDates,
      follow_up_note: followUpNotes
    };

    // if (follow_up_note.length > 0) {
    //   saveRxObj["follow_up_note"] = followUpNotes;
    // }

    // if (Object.keys(printSettings).length > 0) {
    //   saveRxObj["printSettings"] = printSettings;
    // }

    await api.ACCOUNTS_URI().put('appointments/consultation/saveRx', saveRxObj)
      .then((saveRxResp) => {
        console.log('saveRxResp', saveRxResp);
      })
      .catch(() => {
        console.log('saveRx err', AssertionError);
      });
  };

  const handlePrintOptions = (key) => {
    const intermediatePrintOptions = { ...printSettings };

    if (intermediatePrintOptions[key] === true) {
      intermediatePrintOptions[key] = false;
      setPrintSettings(intermediatePrintOptions);
    } else {
      intermediatePrintOptions[key] = true;
      setPrintSettings(intermediatePrintOptions);
    }

    // if (intermediatePrintOptions[key]) {
    //   delete intermediatePrintOptions[key];
    // } else {
    //   intermediatePrintOptions[key] = true;
    // }

    // setPrintSettings(intermediatePrintOptions);
  };

  const handleDateChange = (date) => {
    setFollowUpDates(date);
  };

  return (
    <div style={{ display: 'contents' }}>
      <Button variant="contained" onClick={handleClickOpen} style={{ marginLeft: 5, marginRight: 5 }}>
        Preview Rx
      </Button>
      <Dialog fullScreen onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle
          id="customized-dialog-title"
          saveRx={saveRx}
          onClose={handleClose}
          consultationDetails={consultationDetails}
          handlePrint={handlePrint}
        >
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} justify="center">
            <Grid item sm={4}>
              <div className={classes.rightPanelTitle}>
                <div className={classes.rightPanel}>
                  <Button fullWidth className={classes.customButton}>
                    Follow Up
                  </Button>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      format="dd/MM/yyyy"
                      disablePast
                      placeholder="Select Date"
                      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                      value={followUpDates !== '' ? followUpDates : ''}
                      onChange={handleDateChange}
                      animateYearScrolling={false}
                    />
                  </MuiPickersUtilsProvider>
                  <Tooltip
                    title="Reset"
                    onClick={() => resetDate()}
                  >
                    <IconButton style={{ padding: '8px 10px', marginLeft: 10 }}>
                      <Icon>replay</Icon>
                    </IconButton>
                  </Tooltip>
                </div>
                <Divider style={{ margin: '15px 0 0' }} />
                <div className={classes.rightPanel}>
                  <Button fullWidth className={classes.customButton}>
                    Notes
                  </Button>
                  <TextField
                    id="outlined-multiline-static"
                    label="Add Follow up Notes"
                    multiline
                    rows="4"
                    className={classes.textField}
                    value={followUpNotes}
                    onChange={(e) => setFollowUpNotes(e.target.value)}
                    margin="normal"
                    inputProps={{ maxLength: 250 }}
                    variant="outlined"
                    fullWidth
                  />
                </div>
              </div>
            </Grid>
            <Grid item sm={8}>
              <Grid container spacing={2} justify="flex-end">
                <Grid item sm={2}>
                  <FormControl className={classes.formControl}>
                    <Select
                      fullWidth
                      native
                      value={selLang}
                      onChange={(e) => setSelLang(e.target.value)}
                      label="Age"
                      inputProps={{
                        name: 'age',
                        id: 'outlined-age-native-simple',
                      }}
                      className={classes.inputLang}
                    >
                      <option value="">Select Language *</option>
                      {renderLangDetails()}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item sm={2}>
                  <Button className={classes.optionsButton} variant="outlined" onClick={handleClick}>
                    Print Options
                  </Button>

                  <Popover
                    id={id}
                    open={open1}
                    anchorEl={anchorEl}
                    onClose={handleOptionsClose}
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
                      <FormControl component="fieldset" className={classes.formControl}>
                        <FormGroup>
                          <FormControlLabel
                            control={(
                              <Checkbox
                                size="small"
                                name="follow_up_note"
                                checked={printSettings.follow_up_note}
                                onChange={() => handlePrintOptions('follow_up_note')}
                              />
                            )}
                            label="Follow Up Notes"
                          />
                          <FormControlLabel
                            control={(
                              <Checkbox
                                size="small"
                                name="follow_up_date"
                                checked={printSettings.follow_up_date}
                                onChange={() => handlePrintOptions('follow_up_date')}
                              />
                            )}
                            label="Follow Up date"
                          />
                          <FormControlLabel
                            control={(
                              <Checkbox
                                size="small"
                                name="chief_complaint"
                                checked={printSettings.chief_complaint}
                                onChange={() => handlePrintOptions('chief_complaint')}
                              />
                            )}
                            label="Chief Complaint"
                          />
                          <FormControlLabel
                            control={(
                              <Checkbox
                                size="small"
                                name="symptoms"
                                checked={printSettings.symptoms}
                                onChange={() => handlePrintOptions('symptoms')}
                              />
                            )}
                            label="Symptoms"
                          />
                          <FormControlLabel
                            control={(
                              <Checkbox
                                size="small"
                                name="observations"
                                checked={printSettings.observations}
                                onChange={() => handlePrintOptions('observations')}
                              />
                            )}
                            label="Observations"
                          />
                          <FormControlLabel
                            control={(
                              <Checkbox
                                size="small"
                                name="diagnosis"
                                checked={printSettings.diagnosis}
                                onChange={() => handlePrintOptions('diagnosis')}
                              />
                            )}
                            label="Diagnosis"
                          />
                          <FormControlLabel
                            control={(
                              <Checkbox
                                size="small"
                                name="investigations"
                                checked={printSettings.investigations}
                                onChange={() => handlePrintOptions('investigations')}
                              />
                            )}
                            label="Investigation results"
                          />
                          {/* <FormControlLabel
                            control={
                              <Checkbox
                                size="small"
                                name="familyHistories"
                                checked={printSettings["familyHistories"]}
                                onChange={() => handlePrintOptions("familyHistories")}
                              />
                            }
                            label="Family History"
                          /> */}
                          <FormControlLabel
                            control={(
                              <Checkbox
                                size="small"
                                name="medical_history"
                                checked={printSettings.medical_history}
                                onChange={() => handlePrintOptions('medical_history')}
                              />
                            )}
                            label="Medical History"
                          />
                          <FormControlLabel
                            control={(
                              <Checkbox
                                size="small"
                                name="vitals"
                                checked={printSettings.vitals}
                                onChange={() => handlePrintOptions('vitals')}
                              />
                            )}
                            label="Vitals"
                          />
                          <FormControlLabel
                            control={(
                              <Checkbox
                                size="small"
                                name="instructions"
                                checked={printSettings.instructions}
                                onChange={() => handlePrintOptions('instructions')}
                              />
                            )}
                            label="Instructions"
                          />
                          <FormControlLabel
                            control={(
                              <Checkbox
                                size="small"
                                name="followUp"
                                checked={printSettings.procedures}
                                onChange={() => handlePrintOptions('procedures')}
                              />
                            )}
                            label="Procedures"
                          />
                          <FormControlLabel
                            control={(
                              <Checkbox
                                size="small"
                                name="medicines"
                                checked={printSettings.medicines}
                                onChange={() => handlePrintOptions('medicines')}
                              />
                            )}
                            label="Medicines"
                          />
                        </FormGroup>
                      </FormControl>
                    </div>
                  </Popover>
                </Grid>
                <Grid item sm={12} ref={componentRef}>
                  <Prescription prescriptionTemplate={rx} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

PreviewRxDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  masterData: state.get('dashboardReducer').masterData,
  consultationDetails: state.get('appointmentReducer').consultaitionDetails,
});

export default connect(mapStateToProps, {})(withStyles(styles)(PreviewRxDialog));
