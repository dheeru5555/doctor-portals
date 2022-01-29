import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ChevronRight from '@material-ui/icons/ChevronRight';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import OtpInput from 'react-otp-input';
import styled from 'styled-components';
import _ from 'lodash';
import { connect } from 'react-redux';
import MedicalHistoryDialog from './Dialogs/MedicalHistoryDialog';
import VitalsDialog from './Dialogs/VitalsDialog';
import Medicines from './AccordionFiles/Medicines';
import Symptoms from './AccordionFiles/Symptoms';
import Observations from './AccordionFiles/Observations';
import Diagnosis from './AccordionFiles/Diagnosis';
import Investigations from './AccordionFiles/Investigations';
import Instructions from './AccordionFiles/Instructions';
import Procedures from './AccordionFiles/Procedures';
import API from '../../../helpers/api';
import DragabbleMedia from './DragabbleMedia';
import Chat from './Chat';
import { fetchConsultationDetails, fetchAllBillables } from "../../../redux/actions/appointmentAction";

const OtpWrapper = styled('div')`
  label + .MuiInput-formControl {
    margin-top: 0;
  }
  .MuiInputLabel-formControl {
    top: -5px;
  }
`;

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium
  },
  leftPanel: {
    border: '1px solid #dedede',
    padding: '0px 15px',
    background: '#fff',
  },
  rightPanelTitle: {
    border: '1px solid #dedede',
    padding: '15px 0px',
    background: '#fff',
  },
  rightPanel: {
    padding: '15px 20px',
    overflowY: 'scroll',
    height: '72vh',
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 12,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    '&:hover': {
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.3)',
      }
    }
  },
  customButton: {
    justifyContent: 'space-between',
    padding: '15px 0px !important',
    '&:hover': {
      background: 'inherit',
    }
  },
  textField: {
    marginTop: 5,
  },
  title: {
    padding: '15px 10px'
  },
  chip: {
    margin: theme.spacing(0.5),
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
  tabHeader: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  withoutLabel: {
    marginBottom: 5,
    marginRight: theme.spacing(1)
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  px2: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(2)
  },
  inputStyle: {
    width: '2rem !important',
    height: '2rem',
    margin: '0 .2rem',
    fontSize: '1rem',
    borderRadius: 4,
    border: '1px solid rgba(0,0,0,0.3)',
  },
  containerStyle: {
    justifyContent: 'center',
    marginTop: 5
  },
  danger: {
    background: '#f8d7da',
    paddingLeft: 8,
    borderRadius: 5,
    marginBottom: 5
  },
  warning: {
    background: '#fff3cd',
    paddingLeft: 8,
    borderRadius: 5,
    marginBottom: 5
  },
  success: {
    background: '#d1e7dd',
    paddingLeft: 8,
    borderRadius: 5,
    marginBottom: 5
  },
  normal: {
    paddingLeft: 8,
    borderRadius: 5,
    marginBottom: 5
  },
  dialog: {
    '& .Mui-expanded': {
      '& small': {
        display: 'none'
      }
    }
  },
  expansion: {
    '& .MuiAccordionSummary-content': {
      flexDirection: 'column'
    }
  },
});

function ConsultTab(props) {
  const api = new API();
  const { classes, masterData, consultationDetails,
    selectedQueueId, fetchConsultationDetails, fetchAllBillables, avatar } = props;
  let vt;
  if (props.masterData) {
    const filteredVitals = props.masterData.vitals.map((vital) => ({
      id: vital.id,
      name: vital.name,
      value: vital.value
    }));
    vt = filteredVitals;
  }
  const [patientVitals, setPatientVitals] = React.useState([]);

  const [value, setValue] = React.useState('differentialDiagnosis');

  const [isMedicine, setIsMedicine] = React.useState(true);
  const [otp, setOtp] = React.useState('');
  const [vitalDetails, setVitalDetails] = React.useState([]);
  const [isUpdated, setIsUpdated] = React.useState(true);
  const [medOptions, setMedOptions] = React.useState();
  const [selectedInstructions, setSelectedInstructions] = React.useState([]);

  const [rightContainerContent, setRightContainerContent] = React.useState({
    title: '',
    section: '',
    investigationType: '',
    contentId: '',
    contentName: '',
    icdCode: '',
    invInstructionList: selectedInstructions,
    selectedInst: []
  });

  const [sideNavbarContent, setSidenavbarContent] = React.useState({
    remark: '',
    quantity: '0',
    type: 'tablet',
    frequency: '',
    duration: '0',
    dose_type: '',
    note: '',
    invInstructionList: [],
    food_relationships: [],
    selected_food_relationships: []
  });

  function updateMedicineSection() {
    setIsMedicine(false);
  }

  function updateRightSection() {
    setIsMedicine(true);
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleOtp = (otp) => {
    setOtp(otp);
  };

  const [chiefComplaint, setChiefComplaint] = React.useState((props.consultationDetails.chief_complaint !== null) ? props.consultationDetails.chief_complaint : "");
  const [criticalNote, setCriticalNote] = React.useState((props.consultationDetails.patient.critical_note !== null) ? props.consultationDetails.patient.critical_note : "");

  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
    gilad: false,
    jason: false,
    antoine: false,
    gilad1: false,
    antoine1: false,
    jason1: false
  });

  const debounceLoadData = React.useCallback(
    _.debounce((complaintText) => updateChiefComplaintSection(complaintText), 2000),
    []);

  React.useEffect(() => {
    if (chiefComplaint) {
      debounceLoadData(chiefComplaint);
    }
  }, [chiefComplaint]);

  React.useEffect(() => {
    fetchAllBillables()
  }, [])

  const getVitals = () => {
    const dateFormat = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`;
    const params = {
      patient_id: consultationDetails.patient.id,
      date: dateFormat
    };
    api.ACCOUNTS_URI().get('patients/getVitalsByDate', { params })
      .then((resp) => {
        // resp.data.patient_vital.map((n) => {
        //   // const getIndex = patientVitals.findIndex((data) => data.id === n.vital_id);
        //   // patientVitals[getIndex] = {
        //   //   ...patientVitals[getIndex],
        //   //   value: n.vital_value
        //   // };

        //   console.warn("called in main Component")
        // });
        if (resp.data.patient_vital.length > 0) {
          let respVital = resp.data.patient_vital
          setPatientVitals(respVital)
        }
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getVitals();
  }, []);

  const selecthandleChange = (event) => {
    const { name } = event.target;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const updateChiefComplaintSection = async (complaintText) => {
    if (
      (selectedQueueId) &&
      (selectedQueueId !== null)
    ) {
      await api.ACCOUNTS_URI().post('appointments/consultation/updateChiefComplaint', {
        appointment_id: consultationDetails.id,
        chief_complaint: complaintText,
      })
        .then(async (chilefCompResp) => {
          if (chilefCompResp.data.success !== true) {
            console.log('Error while updating chief complaint');
          } else {
            await fetchConsultationDetails(selectedQueueId);
          }
        })
        .catch((err) => console.log('Chief complaint', err));
    }
  };

  const checkboxhandleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const {
    gilad, jason, antoine, gilad1, jason1, antoine1
  } = state;
  const error = [gilad, jason, antoine, gilad1, jason1, antoine1].filter((v) => v).length !== 2;
  const loremIpsum = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  if (
    (masterData === null)
  ) {
    return null;
  }

  const handleSideNavbarChange = (contentKey, contentValue) => {
    const intermediateSideNavbar = { ...sideNavbarContent };
    const intermediateRightContainer = { ...rightContainerContent };
    if (contentKey == "invInstructionList") {
      intermediateSideNavbar['invInstructionList'].push(contentValue)
      intermediateRightContainer['selectedInst'].push(contentValue)
    } else if (contentKey == "selected_food_relationships") {
      if((intermediateSideNavbar.selected_food_relationships).indexOf(contentValue) > -1) {
        console.log("Already Present", intermediateSideNavbar.selected_food_relationships)
      } else {
        intermediateSideNavbar['selected_food_relationships'] = [ ...intermediateSideNavbar.selected_food_relationships, contentValue]
        let getIndex = intermediateSideNavbar.food_relationships.findIndex((item) => item.name === contentValue)
        intermediateSideNavbar.food_relationships[getIndex].checked = true
      }
    } else {
      intermediateSideNavbar[contentKey] = contentValue;
    }
    setSidenavbarContent(intermediateSideNavbar);
    setRightContainerContent(intermediateRightContainer);
  };

  const updateSideNavbarSection = async () => {
    let navbarEndPoint = '';

    switch (rightContainerContent.section) {
      case 'Symptoms':
        navbarEndPoint = 'appointments/consultation/updateSymptoms';
        break;
      case 'Observations':
        navbarEndPoint = 'appointments/consultation/updateObservations';
        break;
      case 'Diagnosis':
        navbarEndPoint = 'appointments/consultation/updateDiagnosis';
        break;
      case 'Investigation':
        navbarEndPoint = 'appointments/consultation/updateInvestigations';
        break;
      case 'Medicines':
        navbarEndPoint = 'appointments/consultation/updateMedicines';
        break;
      case 'Instructions':
        navbarEndPoint = 'appointments/consultation/updateInstructions';
        break;
      case 'Procedures':
        navbarEndPoint = 'appointments/consultation/updateProcedures';
        break;
      default:
        navbarEndPoint = 'appointments/consultation/updateSymptoms';
        break;
    }

    const inputParameters = {};

    if (rightContainerContent.section === 'Medicines') {
      inputParameters.medicine_id = rightContainerContent.contentId;
      inputParameters.patient_id = consultationDetails.patient.id;
      inputParameters.appointment_id = consultationDetails.id;
      // inputParameters.note = sideNavbarContent.note;
      inputParameters.doses = {
        quantity: parseInt(sideNavbarContent.quantity, 10),
        type: sideNavbarContent.type,
        frequency: sideNavbarContent.frequency,
        duration: parseInt(sideNavbarContent.duration, 10),
        dose_type: sideNavbarContent.dose_type,
        note: sideNavbarContent.note,
      };
      inputParameters.food_relationships = sideNavbarContent.selected_food_relationships
    } else if (rightContainerContent.section === 'Diagnosis') {
      inputParameters[rightContainerContent.contentName] = rightContainerContent.title;
      inputParameters.type = rightContainerContent.investigationType;
      inputParameters.patient_id = consultationDetails.patient.id;
      inputParameters.appointment_id = consultationDetails.id;
      inputParameters.note = sideNavbarContent.remark;
    } else if (rightContainerContent.section === 'Investigation') {
      inputParameters[rightContainerContent.contentName] = rightContainerContent.title;
      inputParameters.patient_id = consultationDetails.patient.id;
      inputParameters.appointment_id = consultationDetails.id;
      inputParameters.note = sideNavbarContent.remark;
      inputParameters.invInstructionList = sideNavbarContent.invInstructionList;
    } else {
      inputParameters[rightContainerContent.contentName] = rightContainerContent.title;
      inputParameters.patient_id = consultationDetails.patient.id;
      inputParameters.appointment_id = consultationDetails.id;
      inputParameters.note = sideNavbarContent.remark;
    }

    await api.ACCOUNTS_URI().post(navbarEndPoint, inputParameters)
      .then((resp) => {
        fetchConsultationDetails(selectedQueueId)
      })
      .catch((err) => console.log('err', err));
  };

  const updateCriticalNotes = (criticalNoteText) => {
    api.ACCOUNTS_URI().put('patients/updateCriticalNote', {
      patient_id: consultationDetails.patient.id,
      critical_note: criticalNoteText
    }).then((chilefCompResp) => {
      if (chilefCompResp.data.success !== true) {
        console.log('Error while updating chief complaint');
      } else {
        setCriticalNote(criticalNoteText);
      }
    }).catch((err) => console.log('Critical Note', err));
  };

  const getSelectedData = (title) => {
    let data = []
    if (title === 'Symptoms') {
      data = props.consultationDetails.symptoms.map((item) => {
        return item.symptom_name.name
      })
    } else if (title === 'Observations') {
      data = props.consultationDetails.observations.map((item) => {
        return item.observation_name.name
      })
    } else if (title === 'Diagnosis') {
      data = props.consultationDetails.diagnosis.map((item) => {
        return item.diagnosis_name.name
      })
    } else if (title === 'Investigations') {
      data = props.consultationDetails.investigations.map((item) => {
        return item.investigation_name.name
      })
    } else if (title === 'Medicines') {
      data = props.consultationDetails.medicines.map((item) => {
        return item.medicine_name.name
      })
    } else if (title === 'Instructions') {
      data = props.consultationDetails.instructions.map((item) => {
        return item.instruction_name.name
      })
    }

    return data.join(" • ")
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={3}>
          <div className={classes.leftPanel} style={{ position: 'fixed', width: '23%' }}>
            <MedicalHistoryDialog />
            <Divider />
            <VitalsDialog patientId={consultationDetails.patient.id} />
            <Divider />
            <Button fullWidth className={classes.customButton}>
              Critical Notes
              {/* <ChevronRight className={classes.rightIcon} /> */}
            </Button>
            <TextField
              id="outlined-multiline-static"
              label=""
              multiline
              rows="4"
              inputProps={{ maxLength: 250 }}
              defaultValue={criticalNote}
              onBlur={(e) => updateCriticalNotes(e.target.value)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={classes.dialog}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Chief Complaint</Typography>
            </AccordionSummary >
            <AccordionDetails className={classes.column}>
              <TextField
                id="outlined-multiline-static"
                label="Chief Complaint"
                placeholder="Write Chief Complaint here..."
                multiline
                rows="4"
                inputProps={{ maxLength: 250 }}
                value={chiefComplaint}
                onChange={(e) => setChiefComplaint(e.target.value)}
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary className={classes.expansion} expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Symptoms</Typography>
              <small className={classes.selected}>{getSelectedData('Symptoms')}</small>
            </AccordionSummary >
            <AccordionDetails className={classes.column}>
              <Symptoms
                symptomsList={
                  (masterData.symptoms && (masterData.symptoms !== null)) ? masterData.symptoms : []
                }
                consultationDetails={props.consultationDetails}
                setRightContainerContent={setRightContainerContent}
                sideNavbarContent={sideNavbarContent}
                setSidenavbarContent={setSidenavbarContent}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary className={classes.expansion} expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Observations</Typography>
              <small className={classes.selected}>{getSelectedData('Observations')}</small>
            </AccordionSummary >
            <AccordionDetails className={classes.column}>
              <Observations
                observationList={
                  (masterData.observations && (masterData.observations !== null)) ? masterData.observations : []
                }
                consultationDetails={props.consultationDetails}
                setRightContainerContent={setRightContainerContent}
                sideNavbarContent={sideNavbarContent}
                setSidenavbarContent={setSidenavbarContent}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary className={classes.expansion} expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Diagnosis</Typography>
              <small className={classes.selected}>{getSelectedData('Diagnosis')}</small>
            </AccordionSummary >
            <AccordionDetails className={classes.column}>
              <Diagnosis
                diagnosisList={
                  (masterData.diagnosis && (masterData.diagnosis !== null)) ? masterData.diagnosis : []
                }
                consultationDetails={props.consultationDetails}
                setRightContainerContent={setRightContainerContent}
                sideNavbarContent={sideNavbarContent}
                setSidenavbarContent={setSidenavbarContent}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary className={classes.expansion} expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Investigations</Typography>
              <small className={classes.selected}>{getSelectedData('Investigations')}</small>
            </AccordionSummary >
            <AccordionDetails className={classes.column}>
              <Investigations
                investigationList={
                  (masterData.investigations && (masterData.investigations !== null)) ? masterData.investigations : []
                }
                consultationDetails={props.consultationDetails}
                setRightContainerContent={setRightContainerContent}
                sideNavbarContent={sideNavbarContent}
                setSidenavbarContent={setSidenavbarContent}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary className={classes.expansion} expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Medicines</Typography>
              <small className={classes.selected}>{getSelectedData('Medicines')}</small>
            </AccordionSummary >
            <AccordionDetails className={classes.column}>
              <Medicines
                medicinesList={
                  (masterData.medicines && (masterData.medicines !== null)) ? masterData.medicines : []
                }
                consultationDetails={props.consultationDetails}
                setRightContainerContent={setRightContainerContent}
                sideNavbarContent={sideNavbarContent}
                setSidenavbarContent={setSidenavbarContent}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary className={classes.expansion} expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Instructions</Typography>
              <small className={classes.selected}>{getSelectedData('Instructions')}</small>
            </AccordionSummary >
            <AccordionDetails className={classes.column}>
              <Instructions
                instructionList={
                  (masterData.instructions && (masterData.instructions !== null)) ? masterData.instructions : []
                }
                consultationDetails={props.consultationDetails}
                setRightContainerContent={setRightContainerContent}
                sideNavbarContent={sideNavbarContent}
                setSidenavbarContent={setSidenavbarContent}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary className={classes.expansion} expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Procedures</Typography>
              <small className={classes.selected}>{getSelectedData('Procedures')}</small>
            </AccordionSummary >
            <AccordionDetails className={classes.column}>
              <Procedures
                procedureList={
                  (masterData.procedures && (masterData.procedures !== null)) ? masterData.procedures : []
                }
                consultationDetails={props.consultationDetails}
                setRightContainerContent={setRightContainerContent}
                sideNavbarContent={sideNavbarContent}
                setSidenavbarContent={setSidenavbarContent}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
        {
          (rightContainerContent.section !== '')
          && (
            <Grid item xs={12} md={3} onBlur={async () => await updateSideNavbarSection()}>
              <div className={classes.rightPanelTitle} style={{ position: 'fixed', width: '25%' }}>
                <Typography variant="button" className={classes.title}>
                  {rightContainerContent.title}
                </Typography>
                {rightContainerContent.section !== 'Diagnosis' ? ('') : (
                  <Typography variant="body2" className={classes.px2} style={{ paddingLeft: 2 }}>
                    <b>ICD Code : </b>{rightContainerContent.icdCode}
                  </Typography>
                )}
                {/* {(rightContainerContent.section !== 'Medicines') ? ('') : (
                  <Typography variant="body2" className={classes.px2}>
                    Tab composition & uom %
                  </Typography>
                )} */}
                <Divider style={{ margin: '15px 0 0' }} />

                {rightContainerContent.section !== 'Medicines' ? (
                  <div className={classes.rightPanel}>
                    <Button fullWidth className={classes.customButton}>
                      Remarks
                    </Button>
                    <TextField
                      id="outlined-multiline-static"
                      label="Write Notes"
                      multiline
                      rows="4"
                      inputProps={{ maxLength: 250 }}
                      className={classes.textField}
                      value={sideNavbarContent.remark}
                      onChange={(e) => handleSideNavbarChange('remark', e.target.value)}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                    {rightContainerContent.section == "Investigation" && (
                      <>
                        <Button fullWidth className={classes.customButton}>
                          Instructions
                        </Button>
                        <FormControl component="fieldset" className={classes.formControl}>
                          <FormGroup>
                            {rightContainerContent.invInstructionList.map((instruction) => {
                              return (
                                <>
                                  <FormControlLabel
                                    key={instruction.instruction}
                                    control={(
                                      <Checkbox
                                        // defaultChecked={rightContainerContent.selectedInst !== null && (rightContainerContent.selectedInst.map((item) => item == instruction.instruction).some(x => x))}
                                        // checked={rightContainerContent.selectedInst !== null && (rightContainerContent.selectedInst.map((item) => item == instruction.instruction).some(x => x))}
                                        checked={instruction.checked}
                                        onChange={(e) => handleSideNavbarChange('invInstructionList', e.target.name)}
                                        size="small"
                                        name={instruction.instruction}
                                      />
                                    )}
                                    label={instruction.instruction}
                                  />
                                </>
                              )
                            })}
                          </FormGroup>
                        </FormControl>
                      </>
                    )}
                  </div>
                ) : (
                  <div className={classes.rightPanel}>
                    <Typography variant="button" className={classes.customButton}>
                      Quantity
                      {' '}
                      <small style={{ textTransform: 'lowercase', fontWeight: 'normal' }}>/ dose</small>
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item md={8}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Enter Quantity"
                          className={classes.textField}
                          type="number"
                          value={sideNavbarContent.quantity}
                          onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                          onChange={(e) => handleSideNavbarChange('quantity', e.target.value)}
                          margin="normal"
                          variant="outlined"
                          fullWidth
                        />
                      </Grid>
                      <Grid item md={4}>
                        <FormControl variant="outlined" fullWidth className={classes.textField}>
                          <InputLabel htmlFor="outlined-age-native-simple">Type</InputLabel>
                          <Select
                            native
                            value={sideNavbarContent.type}
                            onChange={(e) => handleSideNavbarChange('type', e.target.value)}
                            label="Age"
                            inputProps={{
                              name: 'age',
                              id: 'outlined-age-native-simple',
                            }}
                          >
                            <option value="tablets">tablets</option>
                            <option value="units">ml</option>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Typography variant="button" className={classes.customButton}>
                      Default Food Relationship
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item sm={6}>
                        <FormControl component="fieldset" className={classes.formControl}>
                          <FormGroup>
                            {console.log("sideNavbarContent", sideNavbarContent)}
                            {sideNavbarContent.food_relationships.map((n) => {
                              console.log("n", n.checked)
                              return (
                                <FormControlLabel
                                  control={
                                  <Checkbox 
                                    checked={n.checked !== undefined ? true : false} 
                                    size="small"
                                    name={n.name}
                                    onChange={(e) => handleSideNavbarChange("selected_food_relationships", e.target.name)} 
                                  />}
                                  label={n.name}
                                />
                              )
                            })}
                          </FormGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Typography variant="button" className={classes.customButton}>
                      Dose Frequency
                    </Typography>
                    <OtpInput
                      numInputs={6}
                      value={sideNavbarContent.frequency}
                      onChange={(otpVal) => handleSideNavbarChange('frequency', otpVal)}
                      isInputNum
                      separator={<span>-</span>}
                      inputStyle={classes.inputStyle}
                      containerStyle={classes.containerStyle}
                    />
                    <Divider className={classes.divider} />
                    <Typography variant="button" className={classes.customButton}>
                      Duration
                    </Typography>
                    <TextField
                      id="outlined-multiline-static"
                      label="No. of days"
                      className={classes.textField}
                      type="number"
                      onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                      value={sideNavbarContent.duration}
                      onChange={(e) => handleSideNavbarChange('duration', e.target.value)}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="gender"
                        className={classes.row}
                        name="gender1"
                        value={sideNavbarContent.dose_type}
                        onChange={(e) => handleSideNavbarChange('dose_type', e.target.value)}
                      >
                        <FormControlLabel value="sos" control={<Radio />} label="SOS" />
                        <FormControlLabel value="stat" control={<Radio />} label="Stat" />
                      </RadioGroup>
                    </FormControl>
                    <Divider className={classes.divider} />
                    <Typography variant="button" className={classes.customButton}>
                      Note
                    </Typography>
                    <TextField
                      id="outlined-multiline-static"
                      multiline
                      placeholder="Max 255 characters"
                      inputProps={{ maxLength: 250 }}
                      rows="4"
                      className={classes.textField}
                      margin="normal"
                      variant="outlined"
                      value={sideNavbarContent.note}
                      onChange={(e) => handleSideNavbarChange('note', e.target.value)}
                      fullWidth
                    />
                    <Divider className={classes.divider} />
                    <Typography variant="button" className={classes.customButton}>
                      <span style={{ textTransform: 'capitalize' }}>Total Quantity</span> - {sideNavbarContent.quantity * sideNavbarContent.duration}
                    </Typography>
                  </div>
                )}
              </div>
            </Grid>
          )
        }
      </Grid>
      {props.consultationDetails.appointment_type.name === "Chat" && <Chat consultationDetails={props.consultationDetails} avatar={avatar} />}
      {/* <Chat /> */}
    </div>
  );
}

ConsultTab.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  masterData: state.get('dashboardReducer').masterData,
  consultationDetails: state.get('appointmentReducer').consultaitionDetails,
  selectedQueueId: state.get('appointmentReducer').selectedQueueId,
});

export default connect(mapStateToProps, { fetchConsultationDetails, fetchAllBillables })(withStyles(styles)(ConsultTab));
