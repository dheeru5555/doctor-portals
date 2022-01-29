import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch, connect } from 'react-redux';
import { setMedicalhistory } from 'enl-redux/actions/newAppointmentAction';
import ChipData from './ChipData';
import API from '../../../../helpers/api';
import { fetchMasterData } from '../../../../redux/actions/dashboardActions';

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
    justifyContent: 'space-between',
  },
  rightPanelTitle: {
    padding: '15px 0px',
    border: '1px solid #dedede',
    background: '#fff',
  },
  title: {
    padding: '15px 10px',
  },
  rightPanel: {
    padding: '15px 20px',
  },
  customButton: {
    justifyContent: 'space-between',
    padding: '15px 0px',
    '&:hover': {
      background: 'inherit',
    },
  },
  textField: {
    marginTop: 5,
  },
  search: {
    marginRight: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  },
  Panel: {
    border: '1px solid #dedede',
    position: 'fixed',
    width: 350
  },
  customButton: {
    justifyContent: 'space-between',
    padding: '15px 0px 0px',
    fontWeight: '700',
    '&:hover': {
      background: 'inherit',
    },
  },
  bgWhite: {
    backgroundColor: 'white',
    padding: 10,
  },
  bold: {
    fontWeight: 700,
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& .MuiAutocomplete-inputRoot': {
      borderRight: 0,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      height: 38
    },
    '& input': {
      paddingLeft: '10px !important'
    },
    '& .MuiInput-underline:after': {
      boxShadow: 'none',
      borderBottom: 'none'
    }
  },
  addBtn: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: '1px solid rgba(0,0,0,0.32)',
    borderLeft: 0
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  dialog: {
    '& .Mui-expanded': {
      '& small': {
        display: 'none'
      }
    }
  },
  expansion: {
    '& .MuiExpansionPanelSummary-content': {
      flexDirection: 'column'
    }
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose, onReset, onSave, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <div className={classes.header}>
        <Button aria-label="close" className={classes.textWhite}>
          Medical History
        </Button>
        <div>
          {/* <Button variant="contained" className={classes.actionButtons}>
            Add New Question
          </Button> */}
          {/* <Button onClick={onReset} variant="outlined">
            Reset
          </Button> */}
          {/* <Button
            variant="contained"
            onClick={onSave}
            className={classes.actionButtons}
          >
            Save
          </Button> */}
          {onClose ? (
            <Button
              aria-label="close"
              className={classes.actionButtons}
              onClick={onSave}
            >
              Close
            </Button>
          ) : null}
        </div>
      </div>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    background: '#f5f5f5',
  },
}))(MuiDialogContent);

function AddMedicalHistory(props) {
  const {
    classes, saveMedicalHistory, dependId, setDepend
  } = props;

  const api = new API()

  const [open, setOpen] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = React.useState({
    isSnackBarOpen: false,
    snackBarText: '',
    snackBarSeverity: 'success',
  });
  const selected_item = {
    medical_problems: [],
    allergies: [],
    procedures: [],
    lifestyles: [],
    // diagnosis: [],
    // findings: [],
    risk_factors: [],
    family_histories: [],
  };

  const defult_data = {
    selected_item,
    defult_item: {
      medical_problems: [],
      allergies: [],
      procedures: [],
      lifestyles: [],
      // diagnosis: [],
      // findings: [],
      risk_factors: [],
      family_histories: [],
    },
    search_item: {
      medical_problems: [],
      allergies: [],
      procedures: [],
      lifestyles: [],
      // diagnosis: [],
      // findings: [],
      risk_factors: [],
      family_histories: [],
    },
  };

  const [medicalHistory, setMedicalHistory] = useState(defult_data);
  const [historyType, setHistoryType] = useState(null);
  const [medicalHistoryId, setMedicalHistoryId] = useState(null);
  const [newMedicalHistory, setNewMedicalHistory] = useState({
    medical_problems: '',
    allergies: '',
    procedures: '',
    lifestyles: '',
    // diagnosis: '',
    // findings: '',
    risk_factors: '',
    family_histories: '',
  });

  const selectState = useSelector((state) => state.toJS());
  const dispatch = useDispatch();
  const { dashboardReducer, newAppointmentReducer } = selectState;
  const { masterData } = dashboardReducer;
  const {
    newPatient,
    medicalHistory: medical_history_list,
  } = newAppointmentReducer;

  useEffect(() => {
    if (masterData != null) {
      setMedicalHistory({
        ...medicalHistory,
        defult_item: {
          ...medicalHistory.defult_item,
          medical_problems: masterData.medicalProblems.slice(0, 10),
          allergies: masterData.allergies.slice(0, 10),
          procedures: masterData.procedures.slice(0, 10),
          // diagnosis: masterData.diagnosis.slice(0, 10),
          // findings: masterData.findings.slice(0, 10),
          lifestyles: masterData.lifestyles.slice(0, 10),
          risk_factors: masterData.riskFactors.slice(0, 10),
          family_histories: masterData.familyHistories.slice(0, 10),
        },
        search_item: {
          ...medicalHistory.defult_item,
          medical_problems: masterData.medicalProblems,
          allergies: masterData.allergies,
          procedures: masterData.procedures,
          // diagnosis: masterData.diagnosis,
          // findings: masterData.findings,
          lifestyles: masterData.lifestyles,
          risk_factors: masterData.riskFactors,
          family_histories: masterData.familyHistories,
        },
      });
    }
  }, [dashboardReducer]);

  let id = 0;
  function createData(title, question, type) {
    id += 1;
    return {
      id,
      title,
      question,
      type,
    };
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

  const defultSelectHistory = () => {
    const medical_index = -1;
    let selectValues = selected_item;
    let parent_id = null;
    let family_id = null;
    let get_data = null;
    if (newPatient != null) {
      parent_id = newPatient.id;
    }
    if (dependId != null) {
      family_id = dependId;
    }

    if (family_id != null) {
      get_data = medical_history_list.find(
        (data) => data.patient_fm_id == family_id
      );
    }
    if (parent_id == null) {
      get_data = medical_history_list.find(
        (data) => data.patient_id == parent_id
      );
    }
    if (get_data != null) {
      selectValues = {
        medical_problems:
          get_data.medical_problems != null ? get_data.medical_problems : [],
        allergies: get_data.allergies != null ? get_data.allergies : [],
        procedures: get_data.procedures != null ? get_data.procedures : [],
        lifestyles: get_data.lifestyles != null ? get_data.lifestyles : [],
        // diagnosis: get_data.diagnosis != null ? get_data.diagnosis : [],
        // findings: get_data.findings != null ? get_data.findings : [],
        risk_factors:
          get_data.risk_factors != null ? get_data.risk_factors : [],
        family_histories:
          get_data.family_histories != null ? get_data.family_histories : [],
      };
      setMedicalHistoryId(get_data.id);
    } else {
      setMedicalHistoryId(null);
    }
    setMedicalHistory({
      ...medicalHistory,
      selected_item: selectValues,
    });
  };

  const searchChange = (type, value) => {
    setNewMedicalHistory({
      ...newMedicalHistory,
      [type]: value,
    });
  };

  const addNewAttribute = (type) => {
    let navbarEndPoint = '';
    switch (type) {
      case "medical_problems":
        navbarEndPoint = 'patients/addNewMedicalProblem'
        break;
      case "allergies":
        navbarEndPoint = 'patients/addNewAllergy'
        break;
      case "family_histories":
        navbarEndPoint = 'patients/addNewFamilyHistory'
        break;
      case "lifestyles":
        navbarEndPoint = 'patients/addNewLifestyle'
        break;
      case "procedures":
        navbarEndPoint = 'patients/addNewProcedure'
        break;
      case "risk_factors":
        navbarEndPoint = 'patients/addNewRiskFactor'
        break;
      default:
        navbarEndPoint = 'patients/addNewMedicalProblem'
        break;
    }
    addHistoryType(type, newMedicalHistory[type]);
    setNewMedicalHistory({
      ...newMedicalHistory,
      [type]: '',
    });
    api.ACCOUNTS_URI().post(navbarEndPoint, { name: newMedicalHistory[type] })
      .then((resp) => {
        if (resp.data.success == true) {
          props.fetchMasterData()
          setSnackBarInfo({
            isSnackBarOpen: true,
            snackBarText: 'Added Successfully',
            snackBarSeverity: 'success',
          });
        } else {
          setSnackBarInfo({
            isSnackBarOpen: true,
            snackBarText: resp.data.errorMessage.name[0],
            snackBarSeverity: 'error',
          });
          console.log(resp.data.errorMessage.name[0])
        }
      })
  };

  const handleClickOpen = () => {
    if (dependId != null) {
      setDepend(dependId);
    }
    if (newPatient != null) {
      defultSelectHistory();
    }
    setOpen(true);
  };

  const resetHistory = () => {
    setMedicalHistory({
      ...medicalHistory,
      selected_item,
    });
    setHistoryType(null);
  };

  const resetData = () => {
  };

  const saveHistory = () => {
    const select_item = medicalHistory.selected_item;
    const saveMedicalDetail = {
      medical_problems:
        select_item.medical_problems.length > 0
          ? select_item.medical_problems
          : null,
      allergies:
        select_item.allergies.length > 0 ? select_item.allergies : null,
      procedures:
        select_item.procedures.length > 0 ? select_item.procedures : null,
      lifestyles:
        select_item.lifestyles.length > 0 ? select_item.lifestyles : null,
      // diagnosis:
      //   select_item.diagnosis.length > 0 ? select_item.diagnosis : null,
      // findings: select_item.findings.length > 0 ? select_item.findings : null,
      risk_factors:
        select_item.risk_factors.length > 0 ? select_item.risk_factors : null,
      family_histories:
        select_item.family_histories.length > 0
          ? select_item.family_histories
          : null,
      id: medicalHistoryId,
    };
    saveMedicalHistory(saveMedicalDetail);
    setOpen(false);
    setHistoryType(null);
    handleClose()
  };

  const addHistoryType = (type, value, id = null) => {
    let previusData = [];

    previusData = [...medicalHistory.selected_item[type]];
    if (previusData.findIndex((data) => data.name == value) < 0) {
      previusData.push({
        id,
        name: value,
        note: '',
        since: '',
      });

      setMedicalHistory({
        ...medicalHistory,
        selected_item: {
          ...medicalHistory.selected_item,
          [type]: previusData,
        },
      });
    }
  };

  const removeHistoryType = (type, value) => {
    let previusData = [];
    let remove_index = null;
    previusData = [...medicalHistory.selected_item[type]];
    remove_index = previusData.findIndex((data) => data.name == value);
    let remove_Data = previusData.find((data) => data.name == value);
    previusData.splice(remove_index, 1);
    setMedicalHistory({
      ...medicalHistory,
      selected_item: {
        ...medicalHistory.selected_item,
        [type]: previusData,
      },
    });

    if (historyType != null) {
      if (historyType.name == value) {
        setHistoryType(null);
      }
    }


  };

  const selectHistoryType = (type, value) => {
    const getData = [...medicalHistory.selected_item[type]];
    const index = getData.findIndex((data) => data.name == value);
    const data = getData.find((data) => data.name == value);
    setHistoryType({
      ...data,
      index,
      type,
    });
  };

  const editHistoryType = (event) => {
    const { name, value } = event.target;
    setHistoryType({
      ...historyType,
      [name]: value,
    });

    saveHistoryType();
  };

  const saveHistoryType = () => {
    if (historyType != null) {
      const previusData = [...medicalHistory.selected_item[historyType.type]];
      previusData[historyType.index] = {
        name: historyType.name,
        note: historyType.note,
        since: historyType.since,
      };

      setMedicalHistory({
        ...medicalHistory,
        selected_item: {
          ...medicalHistory.selected_item,
          [historyType.type]: previusData,
        },
      });
      //  setHistoryType(null)
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const data = [
    createData(
      'Medical Problem',
      'Do you have any Medical Problems?',
      'medical_problems'
    ),
    createData(
      'Allergies',
      'Do you have any allergies?',
      'allergies'
    ),
    // createData('Family History', 'What are the illnesses that run in your family ?',familyHistory,availableFamilyHistory,addHistoryType,removeHistoryType),

    createData(
      'Life Style',
      'Lifestyle Details',
      'lifestyles'
    ),
    createData(
      'Procedures',
      'Procedures Details',
      'procedures'
    ),
    // createData(
    //   'Diagnosis',
    //   'Diagnosis Details',
    //   'diagnosis'
    // ),
    // createData(
    //   'Findings',
    //   'Findings Details',
    //   'findings'
    // ),
    createData('Risk Factor',
      'Any high Risk factor?',
      'risk_factors'
    ),
    createData('Family History',
      'Any Family History?',
      'family_histories'
    ),

    // createData('Procedure', 'Have you undergone any procedure ?'),
  ];

  const getSelectedData = (title, type) => {
    let data = []
    data = medicalHistory.selected_item[type].map((item) => {
      return item.name
    })
    return data.join(" • ")
  }

  return (
    <div style={{ display: 'contents' }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        style={{ marginLeft: 5, marginRight: 5, backgroundColor: 'white' }}
      >
        Add Medical History
      </Button>
      <Dialog
        fullScreen
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        className={classes.dialog}
      >
        <DialogTitle
          id="customized-dialog-title"
          onReset={resetHistory}
          onSave={saveHistory}
          onClose={handleClose}
        >
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          {/* <MedHistoryAccord /> */}
          <div className={classes.root}>
            <Grid container spacing={2} justify="center">
              <Grid item sm={7}>
                {data.map((section) => (
                  <ExpansionPanel key={section.title}>
                    <ExpansionPanelSummary className={classes.expansion} expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>
                        {section.title}
                      </Typography>
                      <small className={classes.selected}>{getSelectedData(section.title, section.type)}</small>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails className={classes.column}>
                      <Grid container>
                        <Grid item sm={7}>
                          <Typography
                            variant="subtitle1"
                            className={classes.bold}
                            gutterBottom
                          >
                            {section.question}
                          </Typography>
                        </Grid>
                        <Grid item sm={5}>
                          <div className={classes.flexEnd}>
                            <Autocomplete
                              id="free-solo-demo"
                              freeSolo
                              fullWidth
                              value={newMedicalHistory[section.type]}
                              options={medicalHistory.search_item[
                                section.type
                              ].map((option) => option.name)}
                              name={section.type}
                              onInputChange={(event, value) => {
                                searchChange(section.type, value);
                              }}
                              renderInput={(params) => (
                                <TextField {...params} />
                              )}
                            />
                            <Button
                              variant="contained"
                              className={classes.addBtn}
                              disabled={newMedicalHistory[section.type] == ''}
                              onClick={() => addNewAttribute(section.type)}
                            >
                              {' '}
                              Add
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                      <ChipData
                        selectedItem={medicalHistory.selected_item[section.type]}
                        type={section.type}
                        selectFunction={selectHistoryType}
                        addFunction={addHistoryType}
                        removeFunction={removeHistoryType}
                        avelavelItem={medicalHistory.defult_item[section.type]}
                      />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))}
              </Grid>
              <Grid item sm={3}>
                {historyType != null ? (
                  <div className={classes.Panel}>
                    <div className={classes.bgWhite}>
                      <Typography variant="button" className={classes.title}>
                        {' '}
                        {historyType.name}
                        {' '}
                      </Typography>

                      <Divider style={{ margin: '15px 0 0' }} />
                      <div className={classes.rightPanel}>
                        <Typography className={classes.customButton}>
                          Notes
                        </Typography>
                        <TextField
                          id="outlined-multiline-static"
                          label="Write Notes"
                          multiline
                          rows="4"
                          className={classes.textField}
                          inputProps={{ maxLength: 250 }}
                          margin="normal"
                          variant="outlined"
                          name="note"
                          onChange={editHistoryType}
                          value={historyType.note}
                          fullWidth
                        />
                        <Divider className={classes.divider} />
                        <Typography className={classes.customButton}>
                          Since
                        </Typography>
                        <TextField
                          id="outlined-multiline-static"
                          label="Write Since"
                          multiline
                          rows="4"
                          className={classes.textField}
                          inputProps={{ maxLength: 250 }}
                          onChange={editHistoryType}
                          onBlur={editHistoryType}
                          margin="normal"
                          variant="outlined"
                          name="since"
                          value={historyType.since}
                          fullWidth
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )}
              </Grid>
            </Grid>
          </div>
        </DialogContent>
      </Dialog>
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
    </div >
  );
}

const mapStateToProps = state => ({
  masterData: state.get('dashboardReducer').masterData,
});

export default connect(mapStateToProps, { fetchMasterData })(withStyles(styles)(AddMedicalHistory));
