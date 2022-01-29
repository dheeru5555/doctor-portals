import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
// import TagFacesIcon from '@material-ui/icons/TagFaces';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import DialogTitle from '@material-ui/core/DialogTitle';
import Info from '@material-ui/icons/Info';
import MenuItem from '@material-ui/core/MenuItem'
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Input from '@material-ui/core/Input';
import API from '../../../../helpers/api';
import { connect } from "react-redux";
import { fetchConsultationDetails, fetchNewMedicineOptions } from "../../../../redux/actions/appointmentAction";
import { parseInt } from 'lodash';
import { fetchMasterData } from '../../../../redux/actions/dashboardActions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    maxHeight: 80,
    overflow: 'hidden'
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
  center: {
    display: 'flex',
    justifyContent: 'center'
  },
  italic: {
    fontStyle: 'italic'
  },
  danger: {
    background: '#eb233047',
    color: 'black',
    margin: theme.spacing(0.5),
  },
  infoIcon: {
    fontSize: 85,
    color: '#ffa50061',
    margin: 'auto'
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  Search: {
    position: 'absolute',
    top: 15,
    right: 70
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
  popover: {
    fontSize: 13,
    maxWidth: 500,
    padding: 20,
    alignItems: 'baseline',
    justifyContent: 'space-around',
    '& label': {
      fontWeight: 600,
      color: '#878787',
      marginTop: 8,
      display: 'inline-block'
    },
    '& .MuiInput-root': {
      // marginBottom: 8
    },
    '& input': {
      fontSize: 12,
      padding: 7
    },
    '& select': {
      fontSize: 12,
      padding: 8,
      height: 16
    },
    '& .MuiSelect-selectMenu': {
      fontSize: 12,
      padding: 6
    },
    '& button': {
      padding: 3,
      fontSize: 12,
      marginTop: 15,
      paddingLeft: 16,
      paddingRight: 16,
      marginLeft: 8
    }
  },
  header: {
    fontSize: 13,
    fontWeight: 600,
    padding: '10px 15px',
    '& p': {
      margin: 0
    }
  },
  formControlCus: {
    margin: 0,
    minWidth: 120,
    maxWidth: '100%',
  },
  noLabel: {
    marginTop: 0,
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Medicines(props) {
  const {
    medicinesList, consultationDetails, setSidenavbarContent, sideNavbarContent,
    setRightContainerContent, fetchConsultationDetails, fetchNewMedicineOptions, selectedQueueId,
    addMedOptions, newMedicineOptions
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [chipData, setChipData] = React.useState([]);
  const [chipData2, setChipData2] = React.useState([]);

  const [medTypes, setMedTypes] = React.useState();
  
  const [open, setOpen] = React.useState(false);
  const [proceedWithInterference, setProceedWithInterference] = React.useState(false);
  const [openComposition, setOpenComposition] = React.useState(false);
  const [composition, setComposition] = React.useState({
    ce_id: '',
    type: '',
    percentage: ''
  });
  const [compErrors, setCompErrors] = React.useState({
    ce_id: '',
    type: '',
    percentage: ''
  });
  const [compositions, setCompositions] = React.useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [newMed, setNewMed] = React.useState({
    name: "",
    generic_name: "",
    manufacturer: "",
    medicine_type_id: "",
    administering_rule_id: "",
    schedule_classification_id: "",
    food_relationship_ids: [],
    medicine_compositions: []
  });
  const [errors, setErrors] = React.useState({
    name: "",
    generic_name: "",
    manufacturer: "",
    medicine_type_id: "",
    administering_rule_id: "",
    schedule_classification_id: "",
    food_relationship_ids: "",
    medicine_compositions: ""
  });

  const [searchTerm, setSearchTerm] = React.useState("");
  const [interferenceMed, setInterferenceMed] = React.useState([]);
  const [searchResults, setSearchResults] = React.useState([]);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  // const handleMedOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMedClose = () => {
  //   setAnchorEl(null);
  // };

  const [snackBarInfo, setSnackBarInfo] = React.useState({
    isSnackBarOpen: false,
    snackBarText: '',
    snackBarSeverity: 'success',
  });

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

  const [open2, setOpen2] = React.useState(false);

  const handleMedOpen = () => {
    setOpen2(true);
    let emptyVal = {
      name: "",
      generic_name: "",
      manufacturer: "",
      medicine_type_id: "",
      administering_rule_id: "",
      schedule_classification_id: "",
      food_relationship_ids: "",
      medicine_compositions: []
    }
    setNewMed(emptyVal)
  };

  const handleMedClose = () => {
    setOpen2(false);
    let emptyVal = {
      name: "",
      generic_name: "",
      manufacturer: "",
      medicine_type_id: "",
      administering_rule_id: "",
      schedule_classification_id: "",
      food_relationship_ids: [],
      medicine_compositions: []
    }
    setNewMed(emptyVal)
    setErrors({
      name: "",
      generic_name: "",
      manufacturer: "",
      medicine_type_id: "",
      administering_rule_id: "",
      schedule_classification_id: "",
      food_relationship_ids: "",
      medicine_compositions: ""
    })
  };

  const [personName, setPersonName] = React.useState([]);

  const handleInputChange = (inputTarget, inputValue) => {
    const intermediateObj = { ...newMed }

    intermediateObj[inputTarget] = inputValue;
    setNewMed({ ...intermediateObj })
    console.log(intermediateObj)
  };

  const handleComposition = (inputTarget, inputValue) => {

    let newComposition = { ...composition }

    newComposition[inputTarget] = inputValue;
    setComposition({ ...newComposition })
  }

  const addComposition = () => {
    // setCompositions([...compositions, composition])
    if (composition.ce_id == '') {
      setCompErrors({
        ...compErrors,
        ce_id: 'Please Select Composition Name'
      })
    } else if (composition.type == '') {
      setCompErrors({
        ...compErrors,
        type: 'Please Select UOM'
      })
    } else if (composition.percentage == '') {
      setCompErrors({
        ...compErrors,
        percentage: 'Please Enter Value'
      })
    } else {
      let interm = { ...newMed }
      interm['medicine_compositions'].push(composition)
      setNewMed(interm)
      setOpenComposition(!openComposition)
    }

  }


  const open1 = Boolean(anchorEl);
  const id = open1 ? 'simple-popover' : undefined;

  React.useEffect(() => {
    if (newMedicineOptions == null) {
      fetchNewMedicineOptions()
    }
  }, [])

  React.useEffect(() => {
    if (
      consultationDetails.medicines
      && (consultationDetails.medicines !== null)
      && (consultationDetails.medicines.length > 0)
    ) {
      const filteredMedicines = consultationDetails.medicines.map((medicine) => ({
        key: medicine.medicine_name.id,
        label: medicine.medicine_name.name,
        food_relationships: medicine.medicine_name.food_relationships,
        selected_food_relationships: medicine.food_relationships == null ? [] : medicine.food_relationships
      }));

      setChipData(filteredMedicines);
    }

    if (
      (medicinesList !== null)
      && (medicinesList.length > 0)
    ) {
      const filteredSymptons = medicinesList.map((symptom) => ({
        key: symptom.id,
        label: symptom.name,
        food_relationships: symptom.food_relationships,
        selected_food_relationships: symptom.food_relationships == null ? [] : symptom.food_relationships
      }));

      setChipData2(filteredSymptons);
    }
  }, [medicinesList, consultationDetails]);

  React.useEffect(() => {
    if (searchResults.length == 0) {
      setSearchResults([...chipData2])
    }
    const results = chipData2.filter((person) =>
      person.label.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const dropMed = () => {
    setProceedWithInterference(true)
    handleClose()
  }

  const continueInterfere = () => {
    setProceedWithInterference(false)
    handleClose()
  }

  const handleChipSelection = (newChipData) => {
    setChipData([...chipData, newChipData]);
  };

  const handleChipCancel = (cancelChipData) => {
    const intermediateArr = [...chipData];
    const indexOfIntermArr = intermediateArr.indexOf(cancelChipData);
    if (indexOfIntermArr > -1) {
      intermediateArr.splice(indexOfIntermArr, 1);
    }
    setChipData(intermediateArr);
  };

  const handleAddMedicines = async (newChipData) => {
    const filterNewChipData2 = chipData.find((cData) => cData.label === newChipData.label)
    if (filterNewChipData2 !== undefined) {
      return;
    } else {
      setRightContainerContent({
        title: '',
        section: '',
        investigationType: '',
        contentId: '',
        contentName: '',
      });
      const api = new API();

      await api.ACCOUNTS_URI().post('appointments/consultation/updateMedicines', {
        patient_id: consultationDetails.patient.id,
        appointment_id: consultationDetails.id,
        doses: {
          quantity: 0,
          type: 'tablet',
          frequency: '',
          duration: 0,
        },
        medicine_id: newChipData.key,
      })
        .then(async (addMedicineResp) => {
          if (
            (addMedicineResp.data)
            && (addMedicineResp.data.success === true)
          ) {
            handleChipSelection(newChipData);
            console.log("addMedicineResp.data.interference_with", addMedicineResp.data.interference_with)
            if((addMedicineResp.data.interference_with).length > 0) {
              handleClickOpen()
              setInterferenceMed(addMedicineResp.data.interference_with)
              if(!proceedWithInterference) {
                handleRemoveMedicines(newChipData)
              }
              await fetchConsultationDetails(selectedQueueId);
            } else {
              await fetchConsultationDetails(selectedQueueId);
            }
          }
        })
        .catch((err) => {
          console.log('err is', err);
        })
        .finally(() => handleChipSelection(newChipData));
    }
  };

  const handleRemoveMedicines = async (newChipData) => {
    const api = new API();

    await api.ACCOUNTS_URI().post(('appointments/consultation/removeMedicine'), {
      id: newChipData.key,
      appointment_id: consultationDetails.id,
    })
      .then(async (removeMedicineResp) => {
        if (
          (removeMedicineResp.data)
          && (removeMedicineResp.data.success === true)
        ) {
          handleChipCancel(newChipData);
          await fetchConsultationDetails(selectedQueueId);
        }
      })
      .catch((err) => {
        console.log('err is', err);
      });
  };

  const handleSelectedClick = (data) => {
    console.log("slkd", data)
    if(data.selected_food_relationships !== null && data.selected_food_relationships !== undefined) {
      for (let i = 0; i < data.selected_food_relationships.length; i++) {
        for (let j = 0; j < data.food_relationships.length; j++) {
          if (data.selected_food_relationships[i] == data.food_relationships[j].name) {
            data.food_relationships[j].checked = true
          }
        }
      }
    }

    if (
      (consultationDetails.medicines !== null) &&
      (consultationDetails.medicines.length > 0)
    ) {
      const filteredData = consultationDetails.medicines.find((sympt) => sympt.medicine_id === data.key);
      if (
        (filteredData) &&
        (filteredData.doses_array) &&
        (filteredData.doses_array !== null)
      ) {
        console.log("data", data)
        setSidenavbarContent({
          ...sideNavbarContent,
          remark: "",
          quantity: ((filteredData.doses_array.quantity) && (filteredData.doses_array.quantity !== null)) ? filteredData.doses_array.quantity.toString() : "",
          type: ((filteredData.doses_array.type) && (filteredData.doses_array.type !== null)) ? filteredData.doses_array.type : "",
          frequency: ((filteredData.doses_array.frequency) && (filteredData.doses_array.frequency !== null)) ? filteredData.doses_array.frequency : "",
          duration: ((filteredData.doses_array.duration) && (filteredData.doses_array.duration !== null)) ? filteredData.doses_array.duration.toString() : "",
          dose_type: ((filteredData.doses_array.dose_type) && (filteredData.doses_array.dose_type !== null)) ? filteredData.doses_array.dose_type : "",
          food_relationships: data.food_relationships,
        })
      } else {
        console.log("data1", data)
        setSidenavbarContent({
          ...sideNavbarContent,
          remark: "",
          quantity: "0",
          type: "tablet",
          frequency: "",
          duration: "0",
          dose_type: "",
          food_relationships: data.food_relationships,
        })
      }
    }

    setRightContainerContent({
      title: data.label,
      section: 'Medicines',
      investigationType: '',
      contentId: data.key,
      contentName: 'medicine_id',
    });
  };

  const validateForm = (fields, filed_name) => {
    let validate = true;
    let error = { ...errors }

    switch (filed_name) {
      case 'name':
        if (fields.name == '') {
          error.name = 'Enter Medicine Name';
          validate = false;
        } else {
          error.name = '';
        }
        break;

      case 'generic_name':
        if (fields.generic_name == '') {
          error.generic_name = 'Enter Generic Name';
          validate = false;
        } else {
          error.generic_name = '';
        }
        break;

      case 'manufacturer':
        if (fields.manufacturer == '') {
          error.manufacturer = 'Enter Manufacturer Name';
          validate = false;
        } else {
          error.manufacturer = '';
        }
        break;

      case 'medicine_type_id':
        if (fields.medicine_type_id == '') {
          error.medicine_type_id = 'Select Medicine Type';
          validate = false;
        } else {
          error.medicine_type_id = '';
        }
        break;

      case 'administering_rule_id':
        if (fields.administering_rule_id == '') {
          error.administering_rule_id = 'Select Administering Rule';
          validate = false;
        } else {
          error.administering_rule_id = '';
        }
        break;

      case 'schedule_classification_id':
        if (fields.schedule_classification_id == '') {
          error.schedule_classification_id = 'Select Schedule Classification';
          validate = false;
        } else {
          error.schedule_classification_id = '';
        }
        break;

      case 'food_relationship_ids':
        if (fields.food_relationship_ids == '') {
          error.food_relationship_ids = 'Select Food Relationship';
          validate = false;
        } else {
          error.food_relationship_ids = '';
        }
        break;

      case 'medicine_compositions':
        if (fields.medicine_compositions.length == 0) {
          error.medicine_compositions = 'Add Medicine Composition';
          validate = false;
        } else {
          error.medicine_compositions = '';
        }
        break;
    }
    setErrors({ error });
    return validate;
  };

  const submitvalidate = () => {
    let validate = true;
    for (const key in newMed) {
      if (!validateForm(newMed, key)) {
        validate = false;
      }
    }
    return validate;
  };

  const addNewMedicine = () => {
    const api = new API();

    let newMedObj = {
      name: newMed.name,
      generic_name: newMed.generic_name,
      manufacturer: newMed.manufacturer,
      medicine_type_id: parseInt(newMed.medicine_type_id),
      administering_rule_id: parseInt(newMed.administering_rule_id),
      schedule_classification_id: parseInt(newMed.schedule_classification_id),
      food_relationship_ids: newMed.food_relationship_ids,
      medicine_compositions: newMed.medicine_compositions
    }

    api.ACCOUNTS_URI().post("appointments/consultation/addNewMedicine", newMedObj)
      .then((resp) => {
        if (resp.data.success === true) {
          handleMedClose()
          setSearchTerm('')
          props.fetchMasterData();
          setSnackBarInfo({
            isSnackBarOpen: true,
            snackBarText: 'New Medicine added successfully',
            snackBarSeverity: 'success',
          });
        } else {
          // setSnackBarInfo({
          //   isSnackBarOpen: true,
          //   snackBarText: 'Error while adding Medicine',
          //   snackBarSeverity: 'error',
          // });
          setErrors(resp.data.errorMessage)
        }
      })
      .catch(() => {
        setSnackBarInfo({
          isSnackBarOpen: true,
          snackBarText: 'Internal Server Error',
          snackBarSeverity: 'error',
        });
      })
  }

  const handleDelete = (chipToDelete) => {
    let intermediateObj = { ...newMed }
    intermediateObj.medicine_compositions = intermediateObj.medicine_compositions.filter((chip) => chip.ce_id !== chipToDelete.ce_id)
    setNewMed(intermediateObj)
  };

  const findCompositionName = (id) => {
    let Index = (newMedicineOptions.compositions).findIndex((data) => data.id == id)
    let name = (newMedicineOptions.compositions)[Index].name
    return name
  }

  return (
    <>
      <Grid container justify="flex-end" className={classes.Search}>
        <Grid item sm={6}>
          <div className={classes.flexEnd}>
            {/* <Search /> */}
            <FormControl className={classes.textField}>
              <Input
                type="text"
                placeholder="Search"
                autoComplete="off"
                value={searchTerm}
                onChange={handleSearch}
              />
            </FormControl>
            <Button variant="contained" className={classes.addBtn} onClick={handleMedOpen}>
              Add New
            </Button>
            <Popover
              id={id}
              open={open1}
              anchorEl={anchorEl}
              onClose={handleMedClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >

            </Popover>
          </div>
        </Grid>
      </Grid>
      <div>
        <ul className={classes.root}>
          {chipData.map((data) => {
            let icon;

            return (
              <li key={data.key}>
                <Chip
                  icon={icon}
                  label={data.label}
                  onDelete={async () => await handleRemoveMedicines(data)}
                  onClick={() => handleSelectedClick(data)}
                  className={classes.chip}
                />
              </li>
            );
          })}
        </ul>
        <ul className={classes.list}>
          {searchTerm === '' && (
            <>
              {chipData2.map((data) => (
                <li key={data.key}>
                  <Chip
                    label={data.label}
                    variant="outlined"
                    className={classes.chip}
                    onClick={async () => await handleAddMedicines(data)}
                  />
                </li>
              ))}
            </>
          )}
          {searchResults.map((data) => (
            <li key={data.key}>
              <Chip
                label={data.label}
                variant="outlined"
                className={classes.chip}
                onClick={async () => await handleAddMedicines(data)}
              />
            </li>
          ))}
        </ul>

        <Dialog
          open={open}
          // onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <div className={classes.column}>
              <Info className={classes.infoIcon} />
              <Typography variant="button" align="center">
                Drug Interference
              </Typography>
            </div>
            <div className={classes.center}>
              {interferenceMed.length > 0 && (
              <>
                {interferenceMed.map((n) => {
                  return (
                    <Chip
                      label={n}
                      variant="outlined"
                      className={classes.danger}
                    />
                  )
                })}
              </>
              )}
            </div>
            <Typography>
              These drugs are not suggested to be taken at same time.
              Do you want to proceed?
            </Typography>
            {/* <DialogContentText id="alert-dialog-description">
              <Typography className={classes.italic}>
                Note* : Instructions to be given here
              </Typography>
            </DialogContentText> */}
          </DialogContent>
          <DialogActions className={classes.center} style={{ paddingBottom: 20 }}>
            <Button onClick={continueInterfere} color="primary" variant="contained">
              Ignore, Proceed with interference
            </Button>
            <Button onClick={dropMed} variant="contained" autoFocus>
              Drop the Medicine
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Dialog
        open={open2}
        onClose={handleMedClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div style={{ backgroundColor: '#f5f5f5' }}>
          <div className={classes.header}>
            <p>Add New Medicine</p>
          </div>
          <Divider />
          <Grid container alignItem="center" className={classes.popover}>
            <Grid item sm={5}>
              <label>Name<span style={{ color: 'red' }}>*</span></label>
              <FormControl fullWidth error={errors.name && errors.name !== ''}>
                <Input
                  fullWidth
                  name="name"
                  className={classes.input}
                  value={newMed.name}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  inputProps={{
                    'aria-label': 'Description',
                  }}
                />
                <FormHelperText>{errors.name}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sm={5}>
              <label>Generic Name<span style={{ color: 'red' }}>*</span></label>
              <FormControl fullWidth error={errors.generic_name && errors.generic_name !== ''}>
                <Input
                  fullWidth
                  className={classes.input}
                  name="generic_name"
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  inputProps={{
                    'aria-label': 'Description',
                  }}
                />
                <FormHelperText>{errors.generic_name}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sm={5}>
              <label>Manufacturer<span style={{ color: 'red' }}>*</span></label>
              <FormControl fullWidth error={errors.manufacturer && errors.manufacturer !== ''}>
                <Input
                  fullWidth
                  name="manufacturer"
                  className={classes.input}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  inputProps={{
                    'aria-label': 'Description',
                  }}
                />
                <FormHelperText>{errors.manufacturer}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sm={5}>
              <label>Medicine Type<span style={{ color: 'red' }}>*</span></label>
              <FormControl fullWidth error={errors.medicine_type_id && errors.medicine_type_id !== ''} className={classes.formControl}>
                <Select
                  native
                  name="medicine_type_id"
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  className={classes.selectEmpty}
                >
                  <option value=''>Select Medicine Type</option>
                  {newMedicineOptions !== null && newMedicineOptions.medicine_types.map((type) => <option value={type.id} key={type.id}>{type.name}</option>)}
                </Select>
                <FormHelperText>{errors.medicine_type_id}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sm={5}>
              <label>Administering Rule<span style={{ color: 'red' }}>*</span></label>
              <FormControl fullWidth error={errors.administering_rule_id && errors.administering_rule_id !== ''} className={classes.formControl}>
                <Select
                  native
                  name="administering_rule_id"
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  className={classes.selectEmpty}
                >
                  <option value=''>Select Administering Rule</option>
                  {newMedicineOptions !== null && newMedicineOptions.administering_rules.map((type) => <option value={type.id} key={type.id}>{type.name}</option>)}
                </Select>
                <FormHelperText>{errors.administering_rule_id}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sm={5}>
              <label>Schedule Classification<span style={{ color: 'red' }}>*</span></label>
              <FormControl fullWidth error={errors.schedule_classification_id && errors.schedule_classification_id !== ''} className={classes.formControl}>
                <Select
                  native
                  name="schedule_classification_id"
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  className={classes.selectEmpty}
                >
                  <option value=''>Select Schedule Classification</option>
                  {newMedicineOptions !== null && newMedicineOptions.schedule_classifications.map((type) => <option value={type.id} key={type.id}>{type.name}</option>)}
                </Select>
                <FormHelperText>{errors.schedule_classification_id}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sm={11}>
              <label>Food Relationship<span style={{ color: 'red' }}>*</span></label>
              <FormControl fullWidth error={errors.food_relationship_ids && errors.food_relationship_ids !== ''} className={classes.formControl}>
                <Select
                  name="food_relationship_ids"
                  multiple
                  value={[...newMed.food_relationship_ids]}
                  onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                  className={classes.selectEmpty}
                >
                  {newMedicineOptions !== null && newMedicineOptions.food_relationships.map((type) => <MenuItem value={type.id} key={type.id}>{type.name}</MenuItem>)}
                </Select>
                <FormHelperText>{errors.food_relationship_ids}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item sm={11}>
              <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 8 }}>
                <label>Compositions<span style={{ color: 'red' }}>*</span></label>
                {openComposition ? (
                  <Button variant="contained" onClick={addComposition}>Save Composition</Button>
                ) : (
                  <Button variant="contained" onClick={() => setOpenComposition(!openComposition)}>Add</Button>
                )}

              </div>
              <FormHelperText>{errors.composition}</FormHelperText>
              <div>
                {newMed.medicine_compositions.map((type) => <Chip color="secondary" label={findCompositionName(type.ce_id)} size="small" margin="normal" style={{ marginRight: 4, marginBottom: 4 }} onDelete={() => handleDelete(type)} />)}
              </div>
            </Grid>
            {openComposition ? (
              <Grid item sm={11}>
                <Grid container style={{ justifyContent: 'space-between' }}>
                  <Grid item sm={4}>
                    <label>Name<span style={{ color: 'red' }}>*</span></label>
                    <FormControl fullWidth className={classes.formControl}>
                      <Select
                        native
                        name="ce_id"
                        onChange={(e) => handleComposition(e.target.name, e.target.value)}
                        className={classes.selectEmpty}
                      >
                        <option value=''>Select Name</option>
                        {newMedicineOptions.compositions.map((type) => <option value={type.id} key={type.id}>{type.name}</option>)}
                      </Select>
                      <FormHelperText error={compErrors.ce_id && compErrors.ce_id !== ''}>{compErrors.ce_id}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item sm={3}>
                    <label>UOM<span style={{ color: 'red' }}>*</span></label>
                    <FormControl fullWidth className={classes.formControl}>
                      <Select
                        native
                        name="type"
                        onChange={(e) => handleComposition(e.target.name, e.target.value)}
                        className={classes.selectEmpty}
                      >
                        <option value=''>Select UOM</option>
                        <option value="w">Weight</option>
                        <option value="v">Volume</option>
                      </Select>
                      <FormHelperText error={compErrors.type && compErrors.type !== ''}>{compErrors.type}</FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item sm={4}>
                    <label>Value/Quantity<span style={{ color: 'red' }}>*</span> </label>
                    <Input
                      fullWidth
                      name="percentage"
                      className={classes.input}
                      onChange={(e) => handleComposition(e.target.name, e.target.value)}
                      inputProps={{
                        'aria-label': 'Description',
                      }}
                    />
                    <FormHelperText error={compErrors.percentage && compErrors.percentage !== ''}>{compErrors.percentage}</FormHelperText>
                  </Grid>
                </Grid>
              </Grid>
            ) : ''}

            <Grid item sm={12} style={{ textAlign: 'center' }}>
              <Button color="primary" variant="contained" disabled={openComposition} onClick={addNewMedicine}>Submit</Button>
            </Grid>
          </Grid>
        </div>
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
      </Dialog>
    </>
  );
}

const mapStateToProps = state => ({
  selectedQueueId: state.get('appointmentReducer').selectedQueueId,
  newMedicineOptions: state.get('appointmentReducer').newMedicineOptions,
});

export default connect(mapStateToProps, { fetchConsultationDetails, fetchNewMedicineOptions, fetchMasterData })(Medicines);
