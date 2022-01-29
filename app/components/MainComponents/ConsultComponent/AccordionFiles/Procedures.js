import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Type from 'enl-styles/Typography.scss';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import API from "../../../../helpers/api";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';
import { connect } from "react-redux";
import { fetchConsultationDetails } from "../../../../redux/actions/appointmentAction";
import { fetchMasterData } from "../../../../redux/actions/dashboardActions";


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
    }
}));

function Procedures(props) {
    const { procedureList, consultationDetails, setRightContainerContent,
        setSidenavbarContent, sideNavbarContent, fetchConsultationDetails, selectedQueueId } = props;
    const classes = useStyles();
    const [chipData, setChipData] = React.useState([]);
    const [newValue, setNewValue] = React.useState([]);

    const [chipData2, setChipData2] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    React.useEffect(() => {

        if (
            (consultationDetails.procedures !== null) &&
            (consultationDetails.procedures.length > 0)
        ) {
            const filteredSymptons = consultationDetails.procedures.map((procedure) => {
                return ({
                    key: procedure.procedure_name.id,
                    label: procedure.procedure_name.name,
                });
            });

            setChipData(filteredSymptons);
        }

        if (
            (procedureList !== null) &&
            (procedureList.length > 0)
        ) {
            const filteredSymptons = procedureList.map((symptom) => {
                return ({
                    key: symptom.id,
                    label: symptom.name,
                });
            });

            setChipData2(filteredSymptons);

        }

    }, [procedureList, consultationDetails])

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

    const addNewProcedure = async (searchTerm) => {
        const api = new API();
        await api.ACCOUNTS_URI().post(("appointments/consultation/updateProcedures"), {
            procedure: searchTerm,
            patient_id: consultationDetails.patient.id,
            appointment_id: consultationDetails.id,
        })
            .then(async (addProcedureResp) => {
                if (
                    (addProcedureResp.data) &&
                    (addProcedureResp.data.success === true)
                ) {
                    let findIndex = addProcedureResp.data.appointment_procedures.findIndex((data) => data.procedure_name.name === searchTerm)
                    let newChipData = {
                        key: addProcedureResp.data.appointment_procedures[findIndex].procedure_name.id,
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

    const handleAddProcedure = async (newChipData) => {
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

            let procedureName = ''
            if (newChipData.label) {
                procedureName = newChipData.label;
            } else {
                procedureName = newChipData
            }

            await api.ACCOUNTS_URI().post(("appointments/consultation/updateProcedures"), {
                procedure: procedureName,
                patient_id: consultationDetails.patient.id,
                appointment_id: consultationDetails.id,
            })
                .then(async (addProcedureResp) => {
                    if (
                        (addProcedureResp.data) &&
                        (addProcedureResp.data.success === true)
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

    const handleRemoveProcedure = async (newChipData) => {
        const api = new API();

        await api.ACCOUNTS_URI().post(("appointments/consultation/removeProcedure"), {
            id: newChipData.key,
            appointment_id: consultationDetails.id,
        })
            .then(async (removeProcedureResp) => {
                if (
                    (removeProcedureResp.data) &&
                    (removeProcedureResp.data.success === true)
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
            (consultationDetails.procedures !== null) &&
            (consultationDetails.procedures.length > 0)
        ) {
            const filteredData = consultationDetails.procedures.find((sympt) => sympt.procedure_id === data.key);
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
            section: "Procedures",
            investigationType: "",
            contentId: "",
            contentName: "procedure",
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
                        <Button onClick={async () => addNewProcedure(searchTerm)} variant="contained" className={classes.addBtn}>
                            Add
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
                                    onDelete={async () => handleRemoveProcedure(data)}
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
                                            onClick={async () => handleAddProcedure(data)}
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
                                    onClick={async () => handleAddProcedure(data)}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    selectedQueueId: state.get('appointmentReducer').selectedQueueId,
});

export default connect(mapStateToProps, { fetchConsultationDetails, fetchMasterData })(Procedures);

