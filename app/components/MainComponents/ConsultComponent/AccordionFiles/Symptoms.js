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

function Symptoms(props) {
    const { symptomsList, consultationDetails, setSidenavbarContent, sideNavbarContent,
        setRightContainerContent, fetchConsultationDetails, selectedQueueId, fetchMasterData } = props;
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
            (consultationDetails.symptoms !== null) &&
            (consultationDetails.symptoms.length > 0)
        ) {
            const filteredSymptons = consultationDetails.symptoms.map((symptom) => {
                return ({
                    key: symptom.symptom_name.id,
                    label: symptom.symptom_name.name,
                });
            });

            setChipData(filteredSymptons);
        }

        if (
            (symptomsList !== null) &&
            (symptomsList.length > 0)
        ) {
            const filteredSymptons = symptomsList.map((symptom) => {
                return ({
                    key: symptom.id,
                    label: symptom.name,
                });
            });

            setChipData2(filteredSymptons);

        }

    }, [symptomsList, consultationDetails])

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

    const addNewSymptom = async () => {
        const api = new API();
        await api.ACCOUNTS_URI().post(("appointments/consultation/updateSymptoms"), {
            symptom: searchTerm,
            patient_id: consultationDetails.patient.id,
            appointment_id: consultationDetails.id,
        })
            .then(async (addSymptomsResp) => {
                if (
                    (addSymptomsResp.data) &&
                    (addSymptomsResp.data.success === true)
                ) {
                    let findIndex = addSymptomsResp.data.appointment_symptoms.findIndex((data) => data.symptom_name.name === searchTerm)
                    let newChipData = {
                        key: addSymptomsResp.data.appointment_symptoms[findIndex].symptom_name.id,
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

    const addSymptoms = async (newChipData) => {
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
            let symptomName = ''
            if (newChipData.label) {
                symptomName = newChipData.label;
            } else {
                symptomName = newChipData
            }
            await api.ACCOUNTS_URI().post(("appointments/consultation/updateSymptoms"), {
                symptom: symptomName,
                patient_id: consultationDetails.patient.id,
                appointment_id: consultationDetails.id,
            })
                .then(async (addSymptomsResp) => {
                    if (
                        (addSymptomsResp.data) &&
                        (addSymptomsResp.data.success === true)
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

    const handleRemoveSymptom = async (newChipData) => {
        const api = new API();

        await api.ACCOUNTS_URI().post(("appointments/consultation/removeSymptom"), {
            id: newChipData.key,
            appointment_id: consultationDetails.id,
        })
            .then(async (removeSymptomResp) => {
                if (
                    (removeSymptomResp.data) &&
                    (removeSymptomResp.data.success === true)
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
            (consultationDetails.symptoms !== null) &&
            (consultationDetails.symptoms.length > 0)
        ) {
            const filteredData = consultationDetails.symptoms.find((sympt) => sympt.symptom_id === data.key);
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
            section: "Symptoms",
            investigationType: "",
            contentId: "",
            contentName: "symptom",
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
                                type="text"
                                placeholder="Search"
                                autoComplete="off"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </FormControl>
                        <Button variant="contained" onClick={async () => addNewSymptom(searchTerm)} className={classes.addBtn}>
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
                                    onDelete={async () => handleRemoveSymptom(data)}
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
                                        onClick={async () => await addSymptoms(data)}
                                    />
                                </li>
                            ))}
                        </>
                    )}
                    {searchResults.map((data) => {

                        return (
                            <li key={`symptoms-${data.key}`}>
                                <Chip
                                    label={data.label}
                                    variant="outlined"
                                    className={classes.chip}
                                    value={data.key}
                                    onClick={async () => addSymptoms(data)}
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

export default connect(mapStateToProps, { fetchConsultationDetails, fetchMasterData })(Symptoms);
