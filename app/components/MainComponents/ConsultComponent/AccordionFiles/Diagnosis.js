import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Type from 'enl-styles/Typography.scss';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import API from "../../../../helpers/api";
import { connect } from "react-redux";
import { fetchConsultationDetails } from "../../../../redux/actions/appointmentAction";
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { fetchMasterData } from '../../../../redux/actions/dashboardActions';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(0.5),
        margin: 0
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
}));

function Diagnosis(props) {
    const { diagnosisList, consultationDetails, setSidenavbarContent, sideNavbarContent,
        setRightContainerContent, fetchConsultationDetails, selectedQueueId } = props;
    const classes = useStyles();
    const [diagnosisType, setDiagnosisType] = React.useState('d');

    const handleDiagnosisTypeChange = (event) => {
        setDiagnosisType(event.target.value);
    };

    const [open, setOpen] = React.useState(false);
    const [chipData, setChipData] = React.useState([]);

    const [chipData2, setChipData2] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [newDiagnosis, setNewDiagnosis] = React.useState({
        name: '',
        icd_code: ''
    });

    let defaultErrors = {
        name: '',
        icd_code: ''
    }

    const [errors, setErrors] = React.useState(defaultErrors);

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

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
        let emptyForm = {
            name: '',
            icd_code: ''
        }
        setNewDiagnosis(emptyForm)
    };

    const handleClose = () => {
        setOpen(false);
        let emptyForm = {
            name: '',
            icd_code: ''
        }
        setNewDiagnosis(emptyForm)
        setErrors(defaultErrors)
    };

    React.useEffect(() => {

        if (
            (consultationDetails.diagnosis !== null) &&
            (consultationDetails.diagnosis.length > 0)
        ) {
            const filteredDiagnosis = consultationDetails.diagnosis.map((data) => {
                return ({
                    key: data.diagnosis_name.id,
                    label: data.diagnosis_name.name,
                    icdCode: data.diagnosis_name.icd_code
                });
            });

            setChipData(filteredDiagnosis);
            setDiagnosisType(consultationDetails.diagnosis[0].type)

        }

        if (
            (diagnosisList !== null) &&
            (diagnosisList.length > 0)
        ) {
            const filteredSymptons = diagnosisList.map((symptom) => {
                return ({
                    key: symptom.id,
                    label: symptom.name,
                    icdCode: symptom.icd_code
                });
            });

            setChipData2(filteredSymptons);

        }

    }, [diagnosisList, consultationDetails])

    React.useEffect(() => {
        if (searchResults.length == 0) {
            setSearchResults([...chipData2])
        }
        const results = chipData2.filter((person) =>
            person.label.toLowerCase().includes(searchTerm)
        );
        setSearchResults(results);
    }, [searchTerm]);

    const handleChipSelection = (newChipData) => {
        setChipData([...chipData, newChipData]);
    }

    const handleChipCancel = (cancelChipData) => {
        const intermediateArr = [...chipData];
        const indexOfIntermArr = intermediateArr.indexOf(cancelChipData);
        if (indexOfIntermArr > -1) {
            intermediateArr.splice(indexOfIntermArr, 1);
        }
        setChipData(intermediateArr);
    }

    const addNewDiagnosis = async (searchTerm) => {
        const api = new API();
        await api.ACCOUNTS_URI().post(("appointments/consultation/updateDiagnosis"), {
            diagnosis: searchTerm,
            patient_id: consultationDetails.patient.id,
            appointment_id: consultationDetails.id,
            type: diagnosisType,
        })
            .then(async (diagnosisResp) => {
                if (
                    (diagnosisResp.data) &&
                    (diagnosisResp.data.success === true)
                ) {
                    let findIndex = diagnosisResp.data.appointment_diagnosis.findIndex((data) => data.diagnosis_name.name === searchTerm)
                    let newChipData = {
                        key: diagnosisResp.data.appointment_diagnosis[findIndex].diagnosis_name.id,
                        label: searchTerm
                    }
                    setChipData([...chipData, newChipData])
                    setSearchTerm('')
                    await fetchConsultationDetails(selectedQueueId);
                    await fetchMasterData()
                }
            })
            .catch((err) => {
                console.log("err is", err)
            })
    }

    const handleAddObservation = async (newChipData) => {

        const filterNewChipData2 = chipData.find((cData) => cData.label === newChipData.label)
        if (filterNewChipData2 !== undefined) {
            return;
        } else {
            setRightContainerContent({
                title: "",
                section: "",
                investigationType: "",
                contentId: "",
                contentName: "",
            })

            const api = new API();

            await api.ACCOUNTS_URI().post(("appointments/consultation/updateDiagnosis"), {
                diagnosis: newChipData.label,
                patient_id: consultationDetails.patient.id,
                appointment_id: consultationDetails.id,
                type: diagnosisType,
            })
                .then(async (diagnosisResp) => {
                    if (
                        (diagnosisResp.data) &&
                        (diagnosisResp.data.success === true)
                    ) {
                        handleChipSelection(newChipData)
                        await fetchConsultationDetails(selectedQueueId)
                    }
                })
                .catch((err) => {
                    console.log("err is", err)
                })
        }
    }

    const handleRemoveObservation = async (newChipData) => {
        const api = new API();

        await api.ACCOUNTS_URI().post(("appointments/consultation/removeDiagnosis"), {
            id: newChipData.key,
            appointment_id: consultationDetails.id,
        })
            .then(async (removeDiagnosis) => {
                if (
                    (removeDiagnosis.data) &&
                    (removeDiagnosis.data.success === true)
                ) {
                    handleChipCancel(newChipData)
                    await fetchConsultationDetails(selectedQueueId)
                }
            })
            .catch((err) => {
                console.log("err is", err)
            })
    }

    const handleSelectedClick = (data) => {

        if (
            (consultationDetails.diagnosis !== null) &&
            (consultationDetails.diagnosis.length > 0)
        ) {
            const filteredData = consultationDetails.diagnosis.find((sympt) => sympt.diagnosis_id === data.key);
            if (filteredData) {
                setSidenavbarContent({
                    ...sideNavbarContent,
                    remark: (filteredData.note !== null) ? filteredData.note : "",
                    quantity: "0",
                    type: "tablet",
                    frequency: "",
                    duration: "0",
                    dose_type: "",
                })
            } else {
                setSidenavbarContent({
                    ...sideNavbarContent,
                    remark: "",
                    quantity: "0",
                    type: "tablet",
                    frequency: "",
                    duration: "0",
                    dose_type: "",
                })
            }
        }

        setRightContainerContent({
            title: data.label,
            section: "Diagnosis",
            investigationType: diagnosisType,
            contentId: "",
            contentName: "diagnosis",
            icdCode: data.icdCode
        })
    }

    const handleInputChange = (inputTarget, inputValue) => {
        const intermediateObj = { ...newDiagnosis }

        intermediateObj[inputTarget] = inputValue;
        setNewDiagnosis({ ...intermediateObj })
    }

    const saveNewDiangnosis = () => {

        const api = new API();

        let newDiagnosisObj = {
            name: newDiagnosis.name,
            icd_code: newDiagnosis.icd_code
        }

        api.ACCOUNTS_URI().post("patients/addNewDiagnosis", newDiagnosisObj)
            .then((resp) => {
                if (resp.data.success === true) {
                    handleClose()
                    props.fetchMasterData();
                    setSnackBarInfo({
                        isSnackBarOpen: true,
                        snackBarText: 'New Diagnosis added successfully',
                        snackBarSeverity: 'success',
                    });
                } else {
                    // setSnackBarInfo({
                    //     isSnackBarOpen: true,
                    //     snackBarText: 'Error while adding Diagnosis',
                    //     snackBarSeverity: 'error',
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
                        {/* <Button variant="contained"  onClick={() => addNewDiagnosis(searchTerm)} className={classes.addBtn}> */}
                        <Button variant="contained" onClick={handleClickOpen} className={classes.addBtn}>
                            Add New
                        </Button>
                    </div>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item sm={8}>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="gender"
                            className={classes.row}
                            name="gender1"
                            value={diagnosisType}
                            onChange={handleDiagnosisTypeChange}
                        >
                            <FormControlLabel
                                value="d"
                                control={<Radio />}
                                label="Differential Diagnosis"
                            />
                            <FormControlLabel
                                value="f"
                                control={<Radio />}
                                label="Final Diagnosis"
                            />
                        </RadioGroup>
                    </FormControl>
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
                                    onDelete={async () => await handleRemoveObservation(data)}
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
                            {chipData2.map((data) => {
                                return (
                                    <li key={`diagnosis-${data.key}`}>
                                        <Chip
                                            label={data.label}
                                            variant="outlined"
                                            className={classes.chip}
                                            onClick={async () => await handleAddObservation(data)}
                                        />
                                    </li>
                                );
                            })}
                        </>
                    )}
                    {searchResults.map((data) => {
                        return (
                            <li key={`diagnosis-${data.key}`}>
                                <Chip
                                    label={data.label}
                                    variant="outlined"
                                    className={classes.chip}
                                    onClick={async () => await handleAddObservation(data)}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div style={{ backgroundColor: '#f5f5f5' }}>
                    <div className={classes.header}>
                        <p>Add New Diagnosis</p>
                    </div>
                    <Divider />
                    <Grid container alignItem="center" className={classes.popover}>
                        <Grid item sm={10}>
                            <label>Name<span style={{ color: 'red' }}>*</span></label>
                            <FormControl fullWidth error={errors.name && errors.name !== ''}>
                                <Input
                                    fullWidth
                                    name="name"
                                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                    className={classes.input}
                                    inputProps={{
                                        'aria-label': 'Description',
                                    }}
                                />
                                <FormHelperText id="standard-weight-helper-text">{errors.name}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item sm={10}>
                            <label>ICD Code<span style={{ color: 'red' }}>*</span></label>
                            <FormControl fullWidth error={errors.icd_code && errors.icd_code !== ''}>
                                <Input
                                    fullWidth
                                    className={classes.input}
                                    name="icd_code"
                                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                    inputProps={{
                                        'aria-label': 'Description',
                                    }}
                                />
                                <FormHelperText id="standard-weight-helper-text">{errors.icd_code}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item sm={12} style={{ textAlign: 'center' }}>
                            <Button color="primary" variant="contained" onClick={saveNewDiangnosis}>Submit</Button>
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
});

export default connect(mapStateToProps, { fetchConsultationDetails, fetchMasterData })(Diagnosis);