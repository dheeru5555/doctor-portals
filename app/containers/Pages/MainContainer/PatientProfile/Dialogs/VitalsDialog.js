import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import BorderColor from '@material-ui/icons/BorderColor';
import { connect } from 'react-redux';
import API from '../../../../../helpers/api';
import { Loading } from 'enl-components'

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    actionButtons: {
        margin: 0,
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'space-between'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    Button: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    customButton: {
        justifyContent: 'space-between',
        background: 'none',
        padding: '15px 0px',
        '&:hover': {
            background: 'inherit',
        }
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 150,
    },
    withoutLabel: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(1),
    },
    bold: {
        fontWeight: 700
    },
    ml10: {
        marginLeft: 10
    },
    mb10: {
        marginBottom: 10
    },
    p4: {
        padding: 10
    },
    datePicker: {
        marginRight: 16,
        display: 'inline-block',
        verticalAlign: 'middle',
        alignItems: 'center',
        border: '1px solid #bdbdbd',
        background: '#fff',
        borderRadius: 10,
        '& .MuiInput-root': {
            border: 'none',
        },
        '& .MuiInput-underline:after': {
            border: 'none',
            boxShadow: 'none'
        },
        '& .MuiIcon-root': {
            cursor: 'pointer',
            verticalAlign: '-webkit-baseline-middle',
        }
    },
    danger: {
        background: '#f8d7da',
        paddingLeft: 30,
        borderRadius: 5,
        marginBottom: 5
    },
    warning: {
        background: '#fff3cd',
        paddingLeft: 30,
        borderRadius: 5,
        marginBottom: 5
    },
    success: {
        background: '#d1e7dd',
        paddingLeft: 30,
        borderRadius: 5,
        marginBottom: 5
    },
    normal: {
        paddingLeft: 30,
        borderRadius: 5,
        marginBottom: 5
    },
    verticalRule: {
        height: '90%',
        borderLeft: '5px solid #f5f5f5',
        position: 'absolute',
        left: '55%',
        marginLeft: -3,
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    secondary: {
        color: 'gray'
    },
    divider: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const {
        children, classes, handleNextDay, currentDate, handleVitalAdd,
        handlePreviousDay, setCurrentDate, onClose, handleOpenNewVitalForm, openForm, ...other
    } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.actionButtons} {...other}>
            <Typography variant="h6">{children}</Typography>
            <div>
                {!openForm ? (
                    <Button
                        variant="outlined"
                        className={classes.Button}
                        onClick={handleOpenNewVitalForm}
                    >
                        Add New Vital
                    </Button>
                ) : (
                    <Button
                        variant="outlined"
                        className={classes.Button}
                        onClick={handleOpenNewVitalForm}
                    >
                        Back
                    </Button>
                )}
                {!openForm && (
                    <div className={classes.datePicker}>
                        <Icon onClick={() => handlePreviousDay()}>
                            chevron_left
                        </Icon>
                        <TextField
                            id="date"
                            type="date"
                            value={currentDate}
                            onChange={(e) => setCurrentDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Icon onClick={() => handleNextDay()}>
                            chevron_right
                        </Icon>
                    </div>
                )}
                {onClose ? (
                    <Button autoFocus color="primary" variant="outlined" onClick={onClose} aria-label="close">
                        Close
                        <Close />
                    </Button>
                ) : null}
            </div>
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    }
}))(MuiDialogContent);

function Vitals(props) {
    const {
        classes, isProfile, patientId, fetchVitals
    } = props;
    const [patientVitals, setPatientVitals] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [newVital, setNewVital] = React.useState({
        name: '',
        uom: '',
        glcl: '',
        gucl: '',
        olcl: '',
        oucl: '',
        rlcl: '',
        rucl: '',
    });
    const [isUpdated, setIsUpdated] = React.useState(true);
    const [dateChange, setDateChange] = React.useState(false);
    const [openForm, setOpenForm] = React.useState(false);
    const [currentDate, setCurrentDate] = React.useState(`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`);
    const api = new API();

    const [snackBarInfo, setSnackBarInfo] = React.useState({
        isSnackBarOpen: false,
        snackBarText: '',
        snackBarSeverity: 'success',
    });

    const handleDateChange = (date) => {
        console.log(date)
    }

    const Alert = (prop) => <MuiAlert elevation={6} variant="filled" {...prop} />;

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

    const handlePreviousDay = () => {
        const dateOffset = (24 * 60 * 60 * 1000) * 1;
        const currentDay = new Date(currentDate);
        currentDay.setTime(currentDay.getTime() - dateOffset);

        const previousDate = `${new Date(currentDay).getFullYear()}-${(new Date(currentDay).getMonth() + 1).toString().padStart(2, '0')}-${new Date(currentDay).getDate().toString().padStart(2, '0')}`;
        setCurrentDate(previousDate);
        setDateChange(true)
    };

    const handleNextDay = () => {
        const dateOffset = (24 * 60 * 60 * 1000) * 1;
        const currentDay = new Date(currentDate);
        currentDay.setTime(currentDay.getTime() + dateOffset);

        const nextDate = `${new Date(currentDay).getFullYear()}-${(new Date(currentDay).getMonth() + 1).toString().padStart(2, '0')}-${new Date(currentDay).getDate().toString().padStart(2, '0')}`;
        setCurrentDate(nextDate);
        setDateChange(true)
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setOpenForm(false);
        fetchVitals()
        setCurrentDate(`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`)
    };
    
    const getVitals = () => {
        if(dateChange) {
            setPatientVitals([])
            setDateChange(false)
        }
        const dateFormat = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`;
        const params = {
            patient_id: patientId,
            date: currentDate
        };
        api.ACCOUNTS_URI().get('patients/getVitalsByDate', { params })
            .then((resp) => {
                if (resp.data.patient_vital.length > 0) {
                    const respVital = resp.data.patient_vital;
                    setPatientVitals(respVital);
                }
            })
            .catch((err) => console.log(err));
    };

    React.useEffect(() => {
        getVitals();
    }, [isUpdated, open, currentDate]);

    const renderSeverity = (value, greenLcl, greenUcl, orangeLcl, orangeUcl, redLcl, redUcl) => {
        if ((value > 0) && (value <= greenUcl)) {
            console.log('Green');
            return 1;
        } if ((value >= orangeLcl) && (value <= orangeUcl)) {
            console.log('Orange');
            return 2;
        } if (value >= redLcl) {
            console.log('Red');
            return 3;
        }
    };

    const handleVitalAdd = async (event, greenLcl, greenUcl, orangeLcl, orangeUcl, redLcl, redUcl) => {
        const { id, value } = event.target;

        const inpVital = {
            vital_id: parseInt(id),
            value: parseInt(value)
        };

        const inputParams = {
            patient_id: patientId,
            measured_time: currentDate,
            vitals: inpVital,
            severity: renderSeverity(value, greenLcl, greenUcl, orangeLcl, orangeUcl, redLcl, redUcl)
        };


        await api.ACCOUNTS_URI().post('patients/addEditVitals', inputParams)
            .then((addVitalResp) => {
                if(addVitalResp.data.success) {
                    setIsUpdated(!isUpdated);
                } else {
                    setSnackBarInfo({
                        isSnackBarOpen: true,
                        snackBarText: 'Some Error occured',
                        snackBarSeverity: 'error',
                    });
                }
            })
            .catch((err) => console.log('err is', err));
    };

    const renderColors = (value, greenLcl, greenUcl, orangeLcl, orangeUcl, redLcl, redUcl) => {
        if ((value > 0) && (value <= greenUcl)) {
            return classes.success;
        } if ((value >= orangeLcl) && (value <= orangeUcl)) {
            return classes.warning;
        } if (value >= redLcl) {
            return classes.danger;
        }
        return classes.normal;
    };


    const handleOpenNewVitalForm = () => {
        setOpenForm(!openForm);
    };

    const handleNewVital = (name, value) => {
        const intermNewVital = { ...newVital };

        intermNewVital[name] = value;
        setNewVital({ ...intermNewVital });
    };

    const addNewVital = () => {
        const data = { ...newVital };

        api.ACCOUNTS_URI().post('appointments/consultation/addNewVital', data)
            .then((resp) => {
                if (resp.data.success === true) {
                    setOpenForm(!openForm);
                    setIsUpdated(!isUpdated);
                    setSnackBarInfo({
                        isSnackBarOpen: true,
                        snackBarText: 'Vital Added Successfully',
                        snackBarSeverity: 'success',
                    });
                } else {
                    setSnackBarInfo({
                        isSnackBarOpen: true,
                        snackBarText: 'Error While Adding New Vital',
                        snackBarSeverity: 'error',
                    });
                }
            })
            .catch(() => {
                setSnackBarInfo({
                    isSnackBarOpen: true,
                    snackBarText: 'Internal Server Error',
                    snackBarSeverity: 'error',
                });
            });
    };

    if(patientVitals.length == 0) {
        return <Loading />
    }

    return (
        <>
            {isProfile ? (
                <IconButton onClick={handleClickOpen}>
                    <BorderColor />
                </IconButton>
            ) : (
                <Button variant="contained" onClick={handleClickOpen} style={{ marginRight: 10 }}>Add Vital</Button>
            )}
            <Dialog fullWidth aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                    currentDate={currentDate}
                    setCurrentDate={handleDateChange}
                    handlePreviousDay={handlePreviousDay}
                    handleNextDay={handleNextDay}
                    handleVitalAdd={handleVitalAdd}
                    handleOpenNewVitalForm={handleOpenNewVitalForm}
                    openForm={openForm}
                >
                    Vitals
                </DialogTitle>
                {/* classes.danger
                classes.warning
                classes.success
                classes.normal */}
                {!openForm ? (
                    <DialogContent dividers>
                        <Grid container style={{ justifyContent: 'space-between', position: 'relative' }}>
                            <Grid item sm={12}>
                                {patientVitals.map(n => (
                                    <Grid container justify="space-between" alignItems="center" key={n.id} className={renderColors(n.vital_value, n.green_lcl, n.green_ucl, n.orange_lcl, n.orange_ucl, n.red_lcl, n.red_ucl)}>
                                        <Grid item sm={4}>
                                            <Typography>
                                                {n.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item sm={4}>
                                            <FormControl
                                                className={classNames(classes.withoutLabel, classes.textField)}
                                                aria-describedby="weight-helper-text"
                                                style={{ float: 'right' }}
                                            >
                                                <Input
                                                    id={n.id}
                                                    type="number"
                                                    defaultValue={n.vital_value == null ? '' : n.vital_value}
                                                    onBlur={(e) => handleVitalAdd(e, n.green_lcl, n.green_ucl, n.orange_lcl, n.orange_ucl, n.red_lcl, n.red_ucl)}
                                                    endAdornment={(
                                                        <InputAdornment position="end">
                                                            <Typography variant="caption" style={{ marginRight: 5, whiteSpace: 'nowrap' }}>
                                                                /
                                                                {n.uom}
                                                            </Typography>
                                                        </InputAdornment>
                                                    )}
                                                    inputProps={{
                                                        'aria-label': 'Weight',
                                                    }}
                                                />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </DialogContent>
                ) : (
                    <>
                        <div style={{ padding: 20 }}>
                            <Grid container spacing={2}>
                                <Grid item sm={6}>
                                    <small><b>Vital Name</b></small>
                                    <Input
                                        fullWidth
                                        name="name"
                                        onChange={(e) => handleNewVital(e.target.name, e.target.value)}
                                        className={classes.input}
                                        autoComplete="off"
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <small><b>UOM</b></small>
                                    <Input
                                        fullWidth
                                        name="uom"
                                        onChange={(e) => handleNewVital(e.target.name, e.target.value)}
                                        className={classes.input}
                                        autoComplete="off"
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <small><b>Green LCL</b></small>
                                    <Input
                                        fullWidth
                                        name="glcl"
                                        type="number"
                                        onChange={(e) => handleNewVital(e.target.name, e.target.value)}
                                        className={classes.input}
                                        autoComplete="off"
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <small><b>Green UCL</b></small>
                                    <Input
                                        fullWidth
                                        name="gucl"
                                        type="number"
                                        onChange={(e) => handleNewVital(e.target.name, e.target.value)}
                                        className={classes.input}
                                        autoComplete="off"
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <small><b>Orange LCL</b></small>
                                    <Input
                                        fullWidth
                                        name="olcl"
                                        type="number"
                                        onChange={(e) => handleNewVital(e.target.name, e.target.value)}
                                        className={classes.input}
                                        autoComplete="off"
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <small><b>Orange UCL</b></small>
                                    <Input
                                        fullWidth
                                        name="oucl"
                                        type="number"
                                        onChange={(e) => handleNewVital(e.target.name, e.target.value)}
                                        className={classes.input}
                                        autoComplete="off"
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <small><b>Red LCL</b></small>
                                    <Input
                                        fullWidth
                                        name="rlcl"
                                        type="number"
                                        onChange={(e) => handleNewVital(e.target.name, e.target.value)}
                                        className={classes.input}
                                        autoComplete="off"
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <small><b>Red UCL</b></small>
                                    <Input
                                        fullWidth
                                        name="rucl"
                                        type="number"
                                        onChange={(e) => handleNewVital(e.target.name, e.target.value)}
                                        className={classes.input}
                                        autoComplete="off"
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={12} style={{ textAlign: 'center' }}>
                                    <Button color="primary" variant="contained" onClick={addNewVital}>Save</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </>
                )}
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


Vitals.propTypes = {
    classes: PropTypes.object.isRequired,
    isProfile: PropTypes.bool,
};

const mapStateToProps = state => ({
    masterData: state.get('dashboardReducer').masterData,
});

export default connect(mapStateToProps)(withStyles(styles)(Vitals));
