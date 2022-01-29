import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MedHistoryAccord from '../MedHistoryAccord';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from "react-redux";
import Loading from 'enl-components/Loading';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import ChipData from '../ChipData';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import API from "../../../../helpers/api";
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
    justifyContent: 'space-between'
  },
  rightPanelTitle: {
    padding: '15px 0px',
    border: '1px solid #dedede',
    background: '#fff',
  },
  title: {
    padding: '15px 10px'
  },
  rightPanel: {
    padding: '15px 20px',
  },
  addBtn: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: '1px solid rgba(0,0,0,0.32)',
    borderLeft: 0
  },
  textField: {
    '& .MuiInput-root': {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    },
    '& .MuiInput-underline:after': {
      borderBottom: 'none',
      boxShadow: 'none'
    }
  },
  Panel: {
    border: '1px solid #dedede'
  },
  customButton1: {
    justifyContent: 'space-between',
    padding: '15px 0px 0px',
    fontWeight: '700',
    '&:hover': {
      background: 'inherit',
    }
  },
  bgWhite: {
    backgroundColor: 'white',
    padding: 10,
  },
  bold: {
    fontWeight: 700
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
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
  heading: {
    fontWeight: 600
  },
  selected: {
    marginTop: 8,
    marginBottom: 0
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, handleReset, handleClickOnSave, onClose, ...other
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
          {/* <Button
            onClick={() => handleReset()}
            variant="outlined">
            Reset
          </Button> */}
          <Button
            variant="contained"
            className={classes.actionButtons}
            onClick={async () => await handleClickOnSave()}
          >
            Save
          </Button>
          {onClose ? (
            <Button aria-label="close" className={classes.actionButtons} onClick={onClose}>
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
    background: '#f5f5f5'
  },
}))(MuiDialogContent);

let id = 0;
function createData(title, question, section, selected) {
  id += 1;
  return {
    id,
    title,
    question,
    section,
    selected
  };
}

const data = [
  createData('Medical Problems', 'Do you have any Medical Problems ?', 'medical', 'selectedMedicalProblemsChipData'),
  createData('Allergies', 'Do you have any allergies ?', 'allergies', 'selectedAllergiesChipData'),
  createData('Family History', 'What are the illnesses that run in your family ?', 'family', 'selectedFamilyChipData'),
  createData('Life Style', 'Lifestyle Details', 'lifestyle', 'selectedLifeStylesChipData'),
  createData('Procedure', 'Have you undergone any procedure ?', 'procedures', 'selectedProceduresChipData'),
  createData('Risk Factor', 'Any high Risk factor ?', 'riskFactor', 'selectedDiagnosisChipData'),
];

function AddMedicalHistory(props) {
  const { classes, masterData, consultationDetails, patientMedicalHistory, fetchMedicalHistory, mhId } = props;
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = React.useState(true);
  const [rightContent, setRightContent] = React.useState({
    title: "",
    notes: "",
    since: "",
    id: "",
  });

  const [snackBarInfo, setSnackBarInfo] = React.useState({
    isSnackBarOpen: false,
    snackBarText: '',
    snackBarSeverity: 'success',
  });

  const [medicalProblemsChipData, setMedicalProblemChipData] = React.useState([]);
  const [selectedMedicalProblemsChipData, setSelectedMedicalProblemsChipData] = React.useState([]);

  const [allergiesChipData, setAllergiesChipData] = React.useState([]);
  const [selectedAllergiesChipData, setSelectedAllergiesChipData] = React.useState([]);

  const [proceduriesChipData, setProceduresChipData] = React.useState([]);
  const [selectedProceduresChipData, setSelectedProceudresChipData] = React.useState([]);

  const [lifestylesChipData, setLifeStylesChipData] = React.useState([]);
  const [selectedLifeStylesChipData, setSelectedLifeStylesChipData] = React.useState([]);

  const [diagnosisChipData, setDiagnosisChipData] = React.useState([]);
  const [selectedDiagnosisChipData, setSelectedDiagnosisChipData] = React.useState([]);

  const [familyChipData, setFamilyChipData] = React.useState([]);
  const [selectedFamilyChipData, setSelectedFamilyChipData] = React.useState([]);

  const [searchTerm, setSearchTerm] = React.useState([]);
  const [searchText, setSearchText] = React.useState('');

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

  const resetMedicalHistory = () => {
    setSelectedMedicalProblemsChipData([])
    setSelectedAllergiesChipData([])
    setSelectedProceudresChipData([])
    setSelectedLifeStylesChipData([])
    setSelectedDiagnosisChipData([])
    setSelectedFamilyChipData([])
  }

  const handleSearch = (name, value) => {
    setSearchText(value)
    const findSearchTerm = searchTerm.find((searchText) => searchText.name === name)
    if (findSearchTerm) {
      const interSearchArr = [...searchTerm];
      const indexOfSearchTerm = interSearchArr.indexOf(findSearchTerm)
      if (indexOfSearchTerm > -1) {
        interSearchArr[indexOfSearchTerm].value = value;
      } else {
        interSearchArr.push({
          name: name,
          value: value
        })
      }
      setSearchTerm(interSearchArr)
    } else {
      const defaultSearchTerm = [...searchTerm];
      defaultSearchTerm.push({
        name: name,
        value: value
      })
      setSearchTerm(defaultSearchTerm)
    }

    switch (name) {
      case "medical":
        const filteredMedProbs = masterData.medicalProblems.filter((medProb) => medProb.name.includes(value.toLowerCase()));
        setMedicalProblemChipData(filteredMedProbs)
        break;
      case "allergies":
        const filteredAllerProbs = masterData.allergies.filter((medProb) => medProb.name.includes(value.toLowerCase()));
        setAllergiesChipData(filteredAllerProbs)
        break;
      case "family":
        const filteredFamProbs = masterData.familyHistories.filter((medProb) => medProb.name.includes(value.toLowerCase()));
        setFamilyChipData(filteredFamProbs)
        break;
      case "lifestyle":
        const filteredLifProbs = masterData.lifestyles.filter((medProb) => medProb.name.includes(value.toLowerCase()));
        setLifeStylesChipData(filteredLifProbs)
        break;
      case "procedures":
        const filteredProcProbs = masterData.procedures.filter((medProb) => medProb.name.includes(value.toLowerCase()));
        setProceduresChipData(filteredProcProbs)
        break;
      case "riskFactor":
        const filteredDiagProbs = masterData.riskFactors.filter((medProb) => medProb.name.includes(value.toLowerCase()));
        setDiagnosisChipData(filteredDiagProbs)
        break;
      default:
        const filteredDefaultMedProbs = masterData.medicalProblems.filter((medProb) => medProb.name.toLowerCase().startsWith(value.toLowerCase()));
        setMedicalProblemChipData(filteredDefaultMedProbs)
        break;
    }
  };

  const addNewMedicalRecord = (section) => {
    const api = new API();
    const findSearchSection = searchTerm.find((term) => term.name === section)
    if (
      (findSearchSection !== undefined) &&
      (findSearchSection.value.length > 0)
    ) {
      switch (section) {
        case "medical":
          api.ACCOUNTS_URI().post("patients/addNewMedicalProblem", {
            name: findSearchSection.value
          })
            .then((resp) => {
              if (resp.data.success == true) {
                props.fetchMasterData();
                setSelectedMedicalProblemsChipData([...selectedMedicalProblemsChipData, {
                  name: findSearchSection.value,
                  notes: "",
                  since: "",
                  section: "medicalProblemsChipData",
                  key: selectedMedicalProblemsChipData.length + 1,
                }]);

                setRightContent({
                  title: findSearchSection.value,
                  notes: "",
                  since: "",
                  id: "medicalProblemsChipData",
                });
                setSearchText("")
              } else {
                setSnackBarInfo({
                  isSnackBarOpen: true,
                  snackBarText: resp.data.errorMessage.name[0],
                  snackBarSeverity: 'error',
                });
              }
            })
            .catch((err) => console.log(err))
          break;
        case "allergies":
          api.ACCOUNTS_URI().post("patients/addNewAllergy", {
            name: findSearchSection.value
          })
            .then((resp) => {
              if (resp.data.success == true) {
                props.fetchMasterData();
                setSelectedAllergiesChipData([...selectedAllergiesChipData, {
                  name: findSearchSection.value,
                  notes: "",
                  since: "",
                  section: "allergiesChipData",
                  key: selectedAllergiesChipData.length + 1,
                }]);

                setRightContent({
                  title: findSearchSection.value,
                  notes: "",
                  since: "",
                  id: "allergiesChipData",
                });
                setSearchText("")
              } else {
                setSnackBarInfo({
                  isSnackBarOpen: true,
                  snackBarText: resp.data.errorMessage.name[0],
                  snackBarSeverity: 'error',
                });
              }
            })
            .catch((err) => console.log(err))
          break;
        case "family":
          api.ACCOUNTS_URI().post("patients/addNewFamilyHistory", {
            name: findSearchSection.value
          })
            .then((resp) => {
              if (resp.data.success == true) {
                props.fetchMasterData();
                setSelectedFamilyChipData([...selectedFamilyChipData, {
                  name: findSearchSection.value,
                  notes: "",
                  since: "",
                  section: "familyChipData",
                  key: selectedFamilyChipData.length + 1,
                }]);

                setRightContent({
                  title: findSearchSection.value,
                  notes: "",
                  since: "",
                  id: "familyChipData",
                });
                setSearchText("")
              } else {
                setSnackBarInfo({
                  isSnackBarOpen: true,
                  snackBarText: resp.data.errorMessage.name[0],
                  snackBarSeverity: 'error',
                });
              }
            })
            .catch((err) => console.log(err))
          break;
        case "lifestyle":
          api.ACCOUNTS_URI().post("patients/addNewLifestyle", {
            name: findSearchSection.value
          })
            .then((resp) => {
              if (resp.data.success == true) {
                props.fetchMasterData();
                setSelectedLifeStylesChipData([...selectedLifeStylesChipData, {
                  name: findSearchSection.value,
                  notes: "",
                  since: "",
                  section: "lifestylesChipData",
                  key: selectedLifeStylesChipData.length + 1,
                }]);

                setRightContent({
                  title: findSearchSection.value,
                  notes: "",
                  since: "",
                  id: "lifestylesChipData",
                });
                setSearchText("")
              } else {
                setSnackBarInfo({
                  isSnackBarOpen: true,
                  snackBarText: resp.data.errorMessage.name[0],
                  snackBarSeverity: 'error',
                });
              }
            })
            .catch((err) => console.log(err))
          break;
        case "procedures":
          api.ACCOUNTS_URI().post("patients/addNewProcedure", {
            name: findSearchSection.value
          })
            .then((resp) => {
              if (resp.data.success == true) {
                props.fetchMasterData();
                setSelectedProceudresChipData([...selectedProceduresChipData, {
                  name: findSearchSection.value,
                  notes: "",
                  since: "",
                  section: "proceduriesChipData",
                  key: selectedProceduresChipData.length + 1,
                }]);

                setRightContent({
                  title: findSearchSection.value,
                  notes: "",
                  since: "",
                  id: "proceduriesChipData",
                });
                setSearchText("")
              } else {
                setSnackBarInfo({
                  isSnackBarOpen: true,
                  snackBarText: resp.data.errorMessage.name[0],
                  snackBarSeverity: 'error',
                });
              }
            })
            .catch((err) => console.log(err))
          break;
        case "riskFactor":
          api.ACCOUNTS_URI().post("patients/addNewRiskFactor", {
            name: findSearchSection.value
          })
            .then((resp) => {
              if (resp.data.success == true) {
                props.fetchMasterData();
                setSelectedDiagnosisChipData([...selectedDiagnosisChipData, {
                  name: findSearchSection.value,
                  notes: "",
                  since: "",
                  section: "diagnosisChipData",
                  key: selectedDiagnosisChipData + 1,
                }]);

                setRightContent({
                  title: findSearchSection.value,
                  notes: "",
                  since: "",
                  id: "diagnosisChipData",
                });
                setSearchText("")
              } else {
                setSnackBarInfo({
                  isSnackBarOpen: true,
                  snackBarText: resp.data.errorMessage.name[0],
                  snackBarSeverity: 'error',
                });
              }
            })
            .catch((err) => console.log(err))
          break;
        default:
          const filteredDefaultMedProbs = masterData.medicalProblems.filter((medProb) => medProb.name.toLowerCase().startsWith(value.toLowerCase()));
          setMedicalProblemChipData(filteredDefaultMedProbs)
          break;
      }
    }
  }

  React.useEffect(() => {
    if (masterData !== null) {
      const filteredMedicalProblems = masterData.medicalProblems.map((medicalProblem) => {
        return ({
          key: medicalProblem.id,
          name: medicalProblem.name,
          section: "medicalProblemsChipData"
        });
      });

      setMedicalProblemChipData(filteredMedicalProblems);

      const filteredAllergies = masterData.allergies.map((allergy) => {
        return ({
          key: allergy.id,
          name: allergy.name,
          section: "allergiesChipData"
        });
      });

      setAllergiesChipData(filteredAllergies);

      const filteredProcedures = masterData.procedures.map((procedure) => {
        return ({
          key: procedure.id,
          name: procedure.name,
          section: "proceduriesChipData"
        });
      });

      setProceduresChipData(filteredProcedures);

      const filteredLifestyles = masterData.lifestyles.map((lifestyle) => {
        return ({
          key: lifestyle.id,
          name: lifestyle.name,
          section: "lifestylesChipData"
        });
      });

      setLifeStylesChipData(filteredLifestyles);

      const filteredDiagnosis = masterData.riskFactors.map((data) => {
        return ({
          key: data.id,
          name: data.name,
          section: "diagnosisChipData"
        });
      });

      setDiagnosisChipData(filteredDiagnosis);

      const filteredFamilyHistories = masterData.familyHistories.map((familyHistory) => {
        return ({
          key: familyHistory.id,
          name: familyHistory.name,
          section: "familyChipData"
        });
      });

      setFamilyChipData(filteredFamilyHistories);
    }

    if (
      (!(Object.keys(patientMedicalHistory).length === 0 && patientMedicalHistory.constructor === Object)) &&
      (patientMedicalHistory !== null)
    ) {
      const selectedMedicalProblems = patientMedicalHistory.medical_problems_array.map((medicalProblem) => {
        return ({
          key: medicalProblem.id,
          name: medicalProblem.name,
          section: "medicalProblemsChipData"
        });
      });

      setSelectedMedicalProblemsChipData(selectedMedicalProblems);

      const selectedAllergies = patientMedicalHistory.allergies_array.map((allergy) => {
        return ({
          key: allergy.id,
          name: allergy.name,
          section: "allergiesChipData"
        });
      });

      setSelectedAllergiesChipData(selectedAllergies);

      const selectedProcedures = patientMedicalHistory.procedures_array.map((procedure) => {
        return ({
          key: procedure.id,
          name: procedure.name,
          section: "proceduriesChipData"
        });
      });

      setSelectedProceudresChipData(selectedProcedures);

      const selectedLifestyles = patientMedicalHistory.lifestyles_array.map((lifestyle) => {
        return ({
          key: lifestyle.id,
          name: lifestyle.name,
          section: "lifestylesChipData"
        });
      });

      setSelectedLifeStylesChipData(selectedLifestyles);

      const selectedDiagnosis = patientMedicalHistory.risk_factors_array.map((data) => {
        return ({
          key: data.id,
          name: data.name,
          section: "diagnosisChipData"
        });
      });

      setSelectedDiagnosisChipData(selectedDiagnosis);

      const selectedFamilyHistories = patientMedicalHistory.family_histories_array.map((familyHistory) => {
        return ({
          key: familyHistory.id,
          name: familyHistory.name,
          section: "familyChipData"
        });
      });

      setSelectedFamilyChipData(selectedFamilyHistories);
    }

  }, [patientMedicalHistory])

  const handleClickOpen = async () => {
    await fetchMedicalHistory().finally(() => setOpen(true))
  };
  const handleClose = () => {
    setRightContent({
      title: "",
      notes: "",
      since: "",
      id: "",
    });
    setOpen(false);
  };

  if (
    (masterData === null) ||
    (consultationDetails === null)
  ) {
    return <Loading />
  } else {

    const handleRightContentChange = (key, value) => {
      const interRightContent = { ...rightContent };
      interRightContent[key] = value;
      setRightContent(interRightContent);
    }

    const handleClickOnSave = async () => {
      let medical_problems = null;
      let allergies = null;
      let procedures = null;
      let lifestyles = null;
      let diagnosis = null;
      let findings = null;
      let risk_factors = null;
      let family_histories = null;

      if (selectedMedicalProblemsChipData.length > 0) {
        let intermMedical = [...selectedMedicalProblemsChipData];
        medical_problems = intermMedical.map((med) => {
          delete med.key;
          delete med.section;
          return med;
        })
      }

      if (selectedAllergiesChipData.length > 0) {
        let intAllergies = [...selectedAllergiesChipData];
        allergies = intAllergies.map((med) => {
          delete med.key;
          delete med.section;
          return med;
        })
      }

      if (selectedFamilyChipData.length > 0) {
        let intFamily = [...selectedFamilyChipData];
        family_histories = intFamily.map((med) => {
          delete med.key;
          delete med.section;
          return med;
        })
      }

      if (selectedLifeStylesChipData.length > 0) {
        let intLifeStyle = [...selectedLifeStylesChipData];
        lifestyles = intLifeStyle.map((med) => {
          delete med.key;
          delete med.section;
          return med;
        })
      }

      if (selectedProceduresChipData.length > 0) {
        let intProcedures = [...selectedProceduresChipData];
        procedures = intProcedures.map((med) => {
          delete med.key;
          delete med.section;
          return med;
        })
      }

      if (selectedDiagnosisChipData.length > 0) {
        let intDiag = [...selectedDiagnosisChipData];
        risk_factors = intDiag.map((med) => {
          delete med.key;
          delete med.section;
          return med;
        })
      }

      const inputParams = {
        patient_id: consultationDetails.patient.id,
        patient_fm_id: consultationDetails.patient.patient_fm_id ? consultationDetails.patient.patient_fm_id : null,
        id: mhId !== '' ? mhId : null,
        medical_problems,
        allergies,
        procedures,
        lifestyles,
        diagnosis,
        findings,
        risk_factors,
        family_histories,
      }

      const api = new API();

      await api.ACCOUNTS_URI().post("patients/addEditMedicalHistory", inputParams)
        .then(async () => {
          await fetchMedicalHistory()
          handleClose()
        })
        .catch((err) => console.log("err is: ", err))

    }

    const getSelectedData = (title) => {
      let data = []
      if(title === 'Medical Problems') {
        data = selectedMedicalProblemsChipData.map((item) => {
          return item.name
        })
      } else if(title === 'Allergies') {
        data = selectedAllergiesChipData.map((item) => {
          return item.name
        })
      } else if(title === 'Family History') {
        data = selectedFamilyChipData.map((item) => {
          return item.name
        })
      } else if(title === 'Life Style') {
        data = selectedLifeStylesChipData.map((item) => {
          return item.name
        })
      } else if(title === 'Procedure') {
        data = selectedProceduresChipData.map((item) => {
          return item.name
        })
      } else if(title === 'Risk Factor') {
        data = selectedDiagnosisChipData.map((item) => {
          return item.name
        })
      }

      return data.join(" • ")
    }

    return (
      <div style={{ display: 'contents' }}>
        <Button variant="contained" onClick={handleClickOpen} style={{ marginLeft: 5, marginRight: 5 }}>
          Edit
        </Button>
        <Dialog
          fullScreen
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
          className={classes.dialog}
          RootProps={{
            style: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
            },
          }}
        >
          <DialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            handleReset={resetMedicalHistory}
            handleClickOnSave={handleClickOnSave}
          >
            Modal title
          </DialogTitle>
          <DialogContent dividers>
            {/* <MedHistoryAccord /> */}
            <Grid container spacing={2} justify="center">
              <Grid item sm={7}>
                {data.map(n => (
                  <ExpansionPanel key={n.title} onChange={(e,expanded) => expanded ? setShow(false) : setShow(true)}>
                    <ExpansionPanelSummary className={classes.expansion} expandIcon={<ExpandMoreIcon />}>
                      <Typography className={classes.heading}>{n.title}</Typography>
                      <small className={classes.selected}>{getSelectedData(n.title)}</small>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.column}>
                      <Grid container>
                        <Grid item sm={7}>
                          <Typography variant="subtitle1" className={classes.bold} gutterBottom>{n.question}</Typography>
                        </Grid>
                        <Grid item sm={5}>
                          <div style={{ float: 'right' }}>
                            {/* <Search /> */}
                            <FormControl className={classes.textField}>
                              <Input
                                type="search"
                                placeholder="Search"
                                name={n.section}
                                value={searchText}
                                onChange={(e) => handleSearch(e.target.name, e.target.value)}
                              />
                            </FormControl>
                            <Button
                              variant="contained"
                              className={classes.addBtn}
                              onClick={() => addNewMedicalRecord(n.section)}
                            >
                              Add
                            </Button>
                          </div>
                        </Grid>
                      </Grid>
                      <ChipData
                        section={n.section}
                        patientMedicalHistory={patientMedicalHistory}
                        setRightContent={setRightContent}
                        rightContent={rightContent}
                        medicalProblemsChipData={medicalProblemsChipData}
                        setMedicalProblemChipData={setMedicalProblemChipData}
                        selectedMedicalProblemsChipData={selectedMedicalProblemsChipData}
                        setSelectedMedicalProblemsChipData={setSelectedMedicalProblemsChipData}
                        allergiesChipData={allergiesChipData}
                        setAllergiesChipData={setAllergiesChipData}
                        selectedAllergiesChipData={selectedAllergiesChipData}
                        setSelectedAllergiesChipData={setSelectedAllergiesChipData}
                        proceduriesChipData={proceduriesChipData}
                        setProceduresChipData={setProceduresChipData}
                        selectedProceduresChipData={selectedProceduresChipData}
                        setSelectedProceudresChipData={setSelectedProceudresChipData}
                        lifestylesChipData={lifestylesChipData}
                        setLifeStylesChipData={setLifeStylesChipData}
                        selectedLifeStylesChipData={selectedLifeStylesChipData}
                        setSelectedLifeStylesChipData={setSelectedLifeStylesChipData}
                        diagnosisChipData={diagnosisChipData}
                        setDiagnosisChipData={setDiagnosisChipData}
                        setSelectedDiagnosisChipData={setSelectedDiagnosisChipData}
                        familyChipData={familyChipData}
                        setFamilyChipData={setFamilyChipData}
                        selectedFamilyChipData={selectedFamilyChipData}
                        setSelectedFamilyChipData={setSelectedFamilyChipData}
                        selectedDiagnosisChipData={selectedDiagnosisChipData}
                      />
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                ))}
              </Grid>
              <Grid item sm={3}>
                {
                  (rightContent.title !== "") &&
                  (
                    <div className={classes.Panel}>
                      <div className={classes.bgWhite}>
                        <Typography variant="button" className={classes.title}>
                          {rightContent.title}
                        </Typography>
                        <Divider style={{ margin: '15px 0 0' }} />
                        <div className={classes.rightPanel}>
                          {console.log("notes", rightContent)}
                          <Typography className={classes.customButton}>Notes</Typography>
                          <TextField
                            id="outlined-multiline-static"
                            multiline
                            placeholder="Max 255 characters"
                            inputProps={{ maxLength: 250 }}
                            rows="4"
                            className={classes.textField}
                            value={rightContent.notes}
                            onChange={(e) => handleRightContentChange("notes", e.target.value)}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                          />
                          <Divider className={classes.divider} />
                          <Typography className={classes.customButton}>Since</Typography>
                          <TextField
                            id="outlined-multiline-static"
                            multiline
                            inputProps={{ maxLength: 250 }}
                            rows="4"
                            className={classes.textField}
                            value={rightContent.since}
                            onChange={(e) => handleRightContentChange("since", e.target.value)}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                          />
                        </div>
                      </div>
                    </div>
                  )
                }
              </Grid>
            </Grid>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  masterData: state.get('dashboardReducer').masterData,
  consultationDetails: state.get('appointmentReducer').consultaitionDetails,
});

export default connect(mapStateToProps, { fetchMasterData })(withStyles(styles)(AddMedicalHistory));
