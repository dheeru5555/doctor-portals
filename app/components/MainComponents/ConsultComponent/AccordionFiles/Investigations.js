import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Type from 'enl-styles/Typography.scss';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import API from "../../../../helpers/api";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
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
            borderBottomRightRadius: 0,
            height: 37,
            paddingLeft: 10
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

function Investigations(props) {
    const { investigationList, consultationDetails, setSidenavbarContent, sideNavbarContent,
        setRightContainerContent, fetchConsultationDetails, selectedQueueId } = props;
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [chipData, setChipData] = React.useState([]);
    const [chipData2, setChipData2] = React.useState([]);
    const [newValue, setNewValue] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [validate, setValidate] = React.useState(false);
    const [newInstruction, setNewInstruction] = React.useState("");
    const [instructions, setInstructions] = React.useState([]);
    const [openInstructionField, setOpenInstructionField] = React.useState(false);
    const [newInvestigation, setNewInvestigation] = React.useState({
        name: '',
        inv_type: '',
        instructions: []
    });
    const [errors, setErrors] = React.useState({
        name: '',
        inv_type: '',
        instructions: ""
    });

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

    const handleInputChange = (inputTarget, inputValue) => {
        const intermediateObj = { ...newInvestigation }

        intermediateObj[inputTarget] = inputValue;
        setNewInvestigation({ ...intermediateObj })
    };

    const addInstruction = () => {
        if (newInstruction !== '') {
            let interm = [...instructions]
            let intermInv = { ...newInvestigation }
            interm.push(newInstruction);
            intermInv['instructions'].push(newInstruction)
            setInstructions(interm)
            setNewInvestigation(intermInv)
            setOpenInstructionField(!openInstructionField)
            setErrors({
                ...errors,
                instructions: ""
            })
        } else {
            setErrors({
                ...errors,
                instructions: "Please Enter instruction"
            })
        }
    }

    const handleDelete = (chipToDelete) => () => {
        setInstructions((chips) =>
            chips.filter((chip) => chip !== chipToDelete)
        );
    }

    const addNewInv = () => {
        const api = new API();
        let params = {
            name: newInvestigation.name,
            inv_type: parseInt(newInvestigation.inv_type),
            instructions: newInvestigation.instructions
        }
        // if (newInvestigation.name == "") {
        //     setValidate(!validate)
        //     return null;
        // }
        // if (newInvestigation.inv_type == "") {
        //     setValidate(!validate)
        //     return null;
        // }
        // if (newInvestigation.instructions.length == 0) {
        //     setValidate(!validate)
        //     return null;
        // }
        api.ACCOUNTS_URI().post("appointments/consultation/addNewInvestigation", params)
            .then((resp) => {
                if (resp.data.success === true) {
                    handleClose();
                    props.fetchMasterData();
                    setSnackBarInfo({
                        isSnackBarOpen: true,
                        snackBarText: 'New Investigation added successfully',
                        snackBarSeverity: 'success',
                    });
                } else {
                    // setSnackBarInfo({
                    //     isSnackBarOpen: true,
                    //     snackBarText: 'Error while adding Investigation',
                    //     snackBarSeverity: 'error',
                    // });
                    setErrors(resp.data.errorMessage)
                }
            })
            .catch(() => {
                handleClose()
                setSnackBarInfo({
                    isSnackBarOpen: true,
                    snackBarText: 'Internal Server Error',
                    snackBarSeverity: 'error',
                });
            })
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setValidate(false)
        setInstructions([])
        setOpenInstructionField(false)
        setErrors({
            name: '',
            inv_type: '',
            instructions: ""
        })
    };

    React.useEffect(() => {

        if (
            (consultationDetails.investigations !== null) &&
            (consultationDetails.investigations.length > 0)
        ) {
            const filteredSymptons = consultationDetails.investigations.map((investigation) => {
                return ({
                    key: investigation.investigation_name.id,
                    label: investigation.investigation_name.name,
                    instructions: investigation.investigation_name.instructions,
                    selectedInst: investigation.investigation_instructions
                });
            });

            setChipData(filteredSymptons);
        }

        if (
            (investigationList) &&
            (investigationList !== null) &&
            (investigationList.length > 0)
        ) {
            const filteredSymptons = investigationList.map((symptom) => {
                return ({
                    key: symptom.id,
                    label: symptom.name,
                    instructions: symptom.instructions
                });
            });

            setChipData2(filteredSymptons);

        }

    }, [investigationList, consultationDetails])

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

    const addNewInvestigation = async (searchTerm) => {
        const api = new API();
        await api.ACCOUNTS_URI().post(("appointments/consultation/updateInvestigations"), {
            investigation: searchTerm,
            patient_id: consultationDetails.patient.id,
            appointment_id: consultationDetails.id,
        })
            .then(async (addInvestigationResp) => {
                if (
                    (addInvestigationResp.data) &&
                    (addInvestigationResp.data.success === true)
                ) {
                    let findIndex = addInvestigationResp.data.appointment_investigations.findIndex((data) => data.investigation_name.name === searchTerm)
                    let newChipData = {
                        key: addInvestigationResp.data.appointment_investigations[findIndex].investigation_name.id,
                        label: searchTerm
                    }
                    setChipData([...chipData, newChipData])
                    setSearchTerm('')
                    await fetchConsultationDetails(selectedQueueId)
                    await fetchMasterData()
                }
            })
            .catch((err) => {
                console.log("err is", err)
            })
    }

    const handleAddInvestigation = async (newChipData) => {
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
                invInstructionList: []
            })

            const api = new API();

            let investigationName = ''
            if (newChipData.label) {
                investigationName = newChipData.label;
            } else {
                investigationName = newChipData
            }

            await api.ACCOUNTS_URI().post(("appointments/consultation/updateInvestigations"), {
                investigation: investigationName,
                patient_id: consultationDetails.patient.id,
                appointment_id: consultationDetails.id,
            })
                .then(async (addInvestigationResp) => {
                    if (
                        (addInvestigationResp.data) &&
                        (addInvestigationResp.data.success === true)
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

    const handleRemoveInvestigation = async (newChipData) => {
        const api = new API();

        await api.ACCOUNTS_URI().post(("appointments/consultation/removeInvestigation"), {
            id: newChipData.key,
            appointment_id: consultationDetails.id,
        })
            .then(async (removeInvestigation) => {
                if (
                    (removeInvestigation.data) &&
                    (removeInvestigation.data.success === true)
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
        if(data.selectedInst !== null) {
            for (let i = 0; i < data.selectedInst.length; i++) {
                for (let j = 0; j < data.instructions.length; j++) {
                    if(data.selectedInst[i] == data.instructions[j].instruction) {
                        console.log("i", data.selectedInst[i])
                        console.log("j", data.instructions[j])
                        data.instructions[j].checked = true
                    }
                }
            }
        }
        if (
            (consultationDetails.investigations !== null) &&
            (consultationDetails.investigations.length > 0)
        ) {
            const filteredData = consultationDetails.investigations.find((sympt) => sympt.investigation_id === data.key);
            if (filteredData) {
                setSidenavbarContent({
                    ...sideNavbarContent,
                    remark: (filteredData.note !== null) ? filteredData.note : "",
                    quantity: "0",
                    type: "tablet",
                    frequency: "",
                    duration: "0",
                    dose_type: "",
                    invInstructionList: (filteredData.investigation_instructions !== null) ? filteredData.investigation_instructions : [],
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
                    invInstructionList: []
                })
            }
        }

        setRightContainerContent({
            title: data.label,
            section: "Investigation",
            investigationType: "",
            contentId: "",
            contentName: "investigation",
            invInstructionList: data.instructions,
            selectedInst: data.selectedInst
        })
    }

    return (
        <>
            <Grid container justify="flex-end" className={classes.Search}>
                <Grid item sm={4}>
                    <div className={classes.flexEnd}>
                        {/* <Search /> */}
                        <FormControl className={classes.textField}>
                            <Input
                                type="search"
                                placeholder="Search"
                                autoComplete="off"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </FormControl>
                        {/* <Button onClick={async () => addNewInvestigation(searchTerm)} variant="contained" className={classes.addBtn}>
                            Add
                        </Button> */}
                        <Button onClick={handleClickOpen} variant="contained" className={classes.addBtn}>
                            Add New
                        </Button>
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
                                    onDelete={async () => await handleRemoveInvestigation(data)}
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
                                    <li key={data.key}>
                                        <Chip
                                            label={data.label}
                                            variant="outlined"
                                            className={classes.chip}
                                            onClick={async () => handleAddInvestigation(data)}
                                        />
                                    </li>
                                );
                            })}
                        </>
                    )}
                    {searchResults.map((data) => {

                        return (
                            <li key={data.key}>
                                <Chip
                                    label={data.label}
                                    variant="outlined"
                                    className={classes.chip}
                                    onClick={async () => handleAddInvestigation(data)}
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
                        <p>Add New Investigation</p>
                    </div>
                    <Divider />
                    <Grid container alignItem="center" className={classes.popover}>
                        <Grid item sm={10}>
                            <label>Name<span style={{ color: 'red' }}>*</span></label>
                            <FormControl fullWidth error={errors.name && errors.name !== ''}>
                                <Input
                                    fullWidth
                                    error={validate}
                                    name="name"
                                    className={classes.input}
                                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                    inputProps={{
                                        'aria-label': 'Description',
                                    }}
                                />
                                <FormHelperText>{errors.name}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item sm={10}>
                            <label>Investigation Type<span style={{ color: 'red' }}>*</span></label>
                            <FormControl fullWidth error={errors.inv_type && errors.inv_type !== ''}>
                                <Select
                                    native
                                    error={validate}
                                    name="inv_type"
                                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                    className={classes.selectEmpty}
                                >
                                    <option value="" key={0}>Select Investigation Type</option>
                                    <option value={1} key={1}>Audiology</option>
                                    <option value={2} key={2}>Imaging</option>
                                    <option value={3} key={3}>Microsopy</option>
                                    <option value={4} key={4}>Pathology</option>
                                </Select>
                                <FormHelperText>{errors.inv_type}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item sm={10}>
                            <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 8 }}>
                                <label>Instructions<span style={{ color: 'red' }}>*</span></label>
                                {openInstructionField ? (
                                    <Button variant="contained" onClick={addInstruction}>Save Instruction</Button>
                                ) : (
                                    <Button variant="contained" onClick={() => setOpenInstructionField(!openInstructionField)}>Add</Button>
                                )}

                            </div>
                            <FormHelperText error={errors.instructions && errors.instructions !== ''}>{errors.instructions}</FormHelperText>
                            <>
                                {instructions.map((instruction) => <Chip label={instruction} onDelete={handleDelete(instruction)} size="small" style={{ marginRight: 4, marginBottom: 4 }} />)}
                            </>
                        </Grid>
                        {openInstructionField ? (
                            <Grid item sm={10}>
                                <TextField
                                    id="outlined-multiline-static"
                                    name="instructions"
                                    onChange={(e) => setNewInstruction(e.target.value)}
                                    multiline
                                    fullWidth
                                    rows={4}
                                />
                            </Grid>
                        ) : ''}
                        <Grid item sm={12} style={{ textAlign: 'center' }}>
                            <Button color="primary" disabled={openInstructionField} variant="contained" onClick={addNewInv}>Submit</Button>
                        </Grid>
                    </Grid>
                </div>
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
        </>
    );
}

const mapStateToProps = state => ({
    selectedQueueId: state.get('appointmentReducer').selectedQueueId,
});

export default connect(mapStateToProps, { fetchConsultationDetails, fetchMasterData })(Investigations);
