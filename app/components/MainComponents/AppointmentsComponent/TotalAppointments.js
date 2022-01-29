import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Pagination from '@material-ui/lab/Pagination';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import Loading from 'enl-components/Loading';
import EnhancedTableHead from '../AppointmentTables/TableHeader';
import EnhancedTableToolbar from '../AppointmentTables/TableToolbar';
import styles from '../AppointmentTables/tableStyle-jss';
import API from '../../../helpers/api';
import helper from '../../../helpers/helpers';
import { fetchAppointmentsByDate, setSelectedQueueId, setSelectedPatientId } from '../../../redux/actions/appointmentAction';
import loader from 'enl-images/loader.gif';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Cancel from './Dialogs/Cancel';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

let counter = 0;
function createData(
    id,
    patientId,
    patientName,
    dependentName,
    patientMobile,
    patientAge,
    dependentAge,
    patientGender,
    dependentGender,
    patientImage,
    appointmentStatus,
    appointmentType,
    appointmentRefId,
    clinicName,
    clinicId,
    slotDate,
    slotStartDate,
    slotEndDate,
    consultationType,
    canceledAt,
    consultationStart,
) {
    counter += 1;
    return {
        id,
        patientId,
        patientName,
        dependentName,
        patientMobile,
        patientAge,
        dependentAge,
        patientGender,
        dependentGender,
        patientImage,
        appointmentStatus,
        appointmentType,
        appointmentRefId,
        clinicName,
        clinicId,
        slotDate,
        slotStartDate,
        slotEndDate,
        consultationType,
        canceledAt,
        consultationStart,
    };
}

function Queue(props) {
    const api = new API()
    const [formState, setFormState] = useState({
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        columnData: [
            {
                id: 'name',
                numeric: false,
                disablePadding: false,
                label: 'Patient'
            }, {
                id: 'calories',
                numeric: false,
                disablePadding: false,
                label: 'Consultation type'
            }, {
                id: 'fat',
                numeric: false,
                disablePadding: false,
                label: 'Slot / Token'
            }, {
                id: 'carbs',
                numeric: false,
                disablePadding: false,
                label: 'Appointment Details'
            }, {
                id: 'protein',
                numeric: true,
                disablePadding: false,
                label: 'Action'
            },
        ],
        data: [],
        page: 0,
        rowsPerPage: 10,
        defaultPerPage: 5,
        filterText: '',
        size: 'medium',
        bordered: false,
        stripped: false,
        hovered: true,
        toolbar: true,
        checkcell: false,
        pagination: true
    });

    const localUserInfo = localStorage.getItem('userInfo')
    const parsedUserInfo = JSON.parse(localUserInfo)

    const isFrontdesk = parsedUserInfo ? parsedUserInfo.frontdesk : false;

    let storedClinics = localStorage.getItem('selectedClinics')
    let parsedClinics = storedClinics !== '[]' ? JSON.parse(storedClinics) : []
    const [selectedClinics, setSelectedClinics] = React.useState(parsedClinics)

    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [pageNum, setPageNum] = useState(1);

    const [queueBooking, setQueueBooking] = useState({
        date: props.slotDate == undefined ? `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}` : props.slotDate,
        cr_id: (localStorage.getItem("cr_id") !== null && localStorage.getItem("cr_id") !== undefined) ? parseInt(localStorage.getItem("cr_id")) : ''
    });


    React.useEffect(() => {
        fetchQueueAppointments()
    }, [queueBooking]);

    const handlePagination = (event, value) => {
        setPageNum(value)
        queueBooking['page'] = value;
        fetchQueueAppointments();
    }

    const [snackBarInfo, setSnackBarInfo] = React.useState({
        isSnackBarOpen: false,
        snackBarText: '',
        snackBarSeverity: 'success',
    });

    React.useEffect(() => {

    })

    const [cancelDialog, setCancelDialog] = React.useState(false);
    React.useEffect(() => {
        if (
            (props.masterData !== null)
            && (props.appointmentsByDate !== null)
            && (props.appointmentsByDate.length > 0)
        ) {
            console.log()
            const bookedAppointmentsData = props.appointmentsByDate.map((bAppointment) => {
                const appointmentStatus = (bAppointment.appointment_status_id !== null) ? bAppointment.appointment_status_id : '';
                const appointmentType = (bAppointment.appointment_type_id !== null) ? fetchAppointmentType(bAppointment.appointment_type_id) : '';
                const patientName = (bAppointment.patient.first_name !== null) ? `${bAppointment.patient.first_name} ${bAppointment.patient.last_name}` : '';
                const dependentName = (bAppointment.patient_family_member !== null) ? bAppointment.patient_family_member.first_name : '';
                const patientMobile = (bAppointment.patient.mobile !== null) ? bAppointment.patient.mobile : '';
                const patientAge = (bAppointment.patient.dob !== null) ? getAge(bAppointment.patient.dob) : '';
                const dependentAge = (bAppointment.patient_family_member !== null) ? getAge(bAppointment.patient_family_member.dob) : '';
                const patientGender = (bAppointment.patient.gender !== null) ? getGender(bAppointment.patient.gender) : getGender();
                const dependentGender = (bAppointment.patient_family_member !== null) ? getGender(bAppointment.patient_family_member.gender) : getGender();
                const clinicName = (bAppointment.clinic !== null) ? bAppointment.clinic.name : '';
                const clinicId = (bAppointment.clinic !== null) ? bAppointment.clinic.id : '';
                const slotStartDate = (bAppointment.slot_start !== null) ? helper.tConvert((bAppointment.slot_start).substring(0, bAppointment.slot_start.length - 3)) : '';
                const slotEndDate = (bAppointment.slot_end !== null) ? helper.tConvert((bAppointment.slot_end).substring(0, bAppointment.slot_end.length - 3)) : '';
                const consultationType = (bAppointment.consultation_type !== null) ? fetchConsultationType(bAppointment.consultation_type) : '';
                const slotDate = (bAppointment.slot_date !== null) ? bAppointment.slot_date : '';
                const canceledAt = (bAppointment.cancelled_at !== null) ? bAppointment.cancelled_at : '';
                const consultationStart = (bAppointment.consultation_start !== null) ? bAppointment.consultation_start : '';
                let patientImage = '';
                if (
                    (bAppointment.patient_image !== null)
                    && (bAppointment.patient_image !== '')
                    && (props.imagesOrDocs !== null)
                    && props.imagesOrDocs.patient_avatar_prefix_url
                ) {
                    patientImage = props.imagesOrDocs.patient_avatar_prefix_url + bAppointment.patient_image;
                }

                return createData(
                    bAppointment.id,
                    bAppointment.patient_id,
                    patientName,
                    dependentName,
                    patientMobile,
                    patientAge,
                    dependentAge,
                    patientGender,
                    dependentGender,
                    patientImage,
                    appointmentStatus,
                    appointmentType,
                    bAppointment.appointment_ref_id,
                    clinicName,
                    clinicId,
                    slotDate,
                    slotStartDate,
                    slotEndDate,
                    consultationType,
                    canceledAt,
                    consultationStart,
                );
            });
            const intermediateFormData = { ...formState };
            intermediateFormData.data = bookedAppointmentsData;
            setFormState(intermediateFormData);
        } else {
            const intermediateFormData = { ...formState };
            intermediateFormData.data = [];
            setFormState(formState);
        }
    }, [props.appointmentsByDate]);

    const getAge = (dateString) => {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const getGender = (gender) => {
        switch (gender) {
            case 'm':
                return 'Male';
            case 'f':
                return 'Female';
            case 'o':
                return 'Other';
            default:
                return 'Male';
        }
    };

    const fetchConsultationType = (consultationId) => {
        switch (consultationId) {
            case 'i':
                return 'New';
            case 'r':
                return 'Repeat';
            case 'f':
                return 'Follow Up';
            default:
                return 'New';
        }
    };


    const fetchAppointmentType = (appointmentId) => {
        let selectedAppointments = '';
        const filteredConsultation = props.masterData.appointmentTypes.find((appType) => appType.id === appointmentId);

        if (filteredConsultation) {
            selectedAppointments = filteredConsultation.name;
        } else {
            selectedAppointments = 'Video';
        }

        return selectedAppointments;
    };

    const handleRequestSort = () => {
        const intermediateTodayBooking = { ...queueBooking };
        intermediateTodayBooking.sortorder = (queueBooking.sortorder === 'asc') ? 'desc' : 'asc';
        setQueueBooking(intermediateTodayBooking);
    };

    const handleSelectAllClick = event => {
        const { data } = formState;
        if (event.target.checked) {
            setFormState({
                ...formState,
                selected: data.map(n => n.id)
            });
            return;
        }
        setFormState({
            ...formState,
            selected: []
        });
    };

    const handleClick = (event, id) => {
        const { checkcell } = formState;
        if (!checkcell) {
            return;
        }
        const { selected } = formState;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setFormState({
            ...formState,
            selected: newSelected
        });
    };

    const handleChangePage = (event, page) => {
        setFormState({
            ...formState,
            page
        });
    };

    const handleChangeRowsPerPage = event => {
        setFormState({
            ...formState,
            rowsPerPage: event.target.value
        });
    };

    const thisIsSelected = id => formState.selected.indexOf(id) !== -1; // eslint-disable-line

    const { classes, intl } = props;
    const {
        data,
        order,
        orderBy,
        selected,
        rowsPerPage,
        page,
        filterText,
        size,
        columnData,
        toolbar, pagination, checkcell,
        bordered, stripped, hovered,
    } = formState;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - (page * rowsPerPage));
    const renderCell = (dataArray, keyArray) => keyArray.map((itemCell, index) => (
        <TableCell align={itemCell.numeric ? 'right' : 'left'} key={index.toString()}>{dataArray[itemCell.id]}</TableCell>
    ));

    const history = useHistory();


    const handleViewProfileConsultationClick = (consultationId, patientId) => {
        console.log("cons", consultationId)
        props.setSelectedQueueId(consultationId);
        props.setSelectedPatientId(patientId)
        history.push({
            pathname: "/app/appointments/patient-profile",
            state: {
                appointmentId: consultationId,
                patientId: patientId
            }
        });
        // history.push('/app/appointments/patient-profile');
    };


    const fetchQueueAppointments = async () => {
        await props.fetchAppointmentsByDate(queueBooking)
            .finally(() => setIsLoading(false));
    };

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

    const renderActionButtons = (appointmentStatus) => {
        if (appointmentStatus === 2) {
            return (
                <>
                    <Button style={{ color: '#00800054', marginRight: 8 }}>In Queue</Button>
                </>
            )
        } else if (appointmentStatus === 3) {
            return (
                <>
                    <Button style={{ color: '#ffc107', marginRight: 8 }}>Waitlist</Button>
                </>
            )
        } else if (appointmentStatus === 4) {
            return (
                <>
                    <Button style={{ color: '#00800054', marginRight: 8 }}>Checked Out</Button>
                </>
            )
        } else if (appointmentStatus === 5) {
            return (
                <>
                    <Button color="primary" style={{ marginRight: 8 }}>No Show</Button>
                </>
            )
        } else if (appointmentStatus === 6) {
            return (
                <>
                    <Button color="primary" style={{ marginRight: 8 }}>Cancelled</Button>
                </>
            )
        } else if (appointmentStatus === 9) {
            return (
                <>
                    <Button style={{ color: '#ffc107', marginRight: 8 }}>Paused</Button>
                </>
            )
        }
    };

    return (
        <div>
            <Grid container className={classes.rootTable}>
                <Grid item xs={12}>
                    <Paper className={classes.rootTable} elevation={0}>
                        <div className={classes.tableWrapper}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader className={
                                    classNames(
                                        classes.table,
                                        hovered && classes.hover,
                                        stripped && classes.stripped,
                                        bordered && classes.bordered,
                                        classes[size]
                                    )}
                                >
                                    <EnhancedTableHead
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={queueBooking.sortorder}
                                        onSelectAllClick={(e) => handleSelectAllClick(e)}
                                        onRequestSort={handleRequestSort}
                                        rowCount={data.length}
                                        columnData={columnData}
                                        checkcell={checkcell}
                                    />
                                    {isLoading ? (
                                        <TableBody>
                                            <TableRow>
                                                <TableCell colSpan={6} padding="checkbox" align="center">
                                                    <img src={loader} />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    ) : (
                                        <>
                                            {((props.appointmentsByDate === undefined)
                                                || (props.appointmentsByDate === null)
                                                || (props.appointmentsByDate.length === 0)) ? (
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell colSpan={6} padding="checkbox" align="center">
                                                            <div className={classes.noDetails}>
                                                                <ErrorOutline style={{ fontSize: 80 }} />
                                                                <Typography>No Records Found</Typography>
                                                            </div>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            ) : (
                                                <TableBody>
                                                    {data.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((n) => {
                                                        const isSelected = thisIsSelected(n.id);
                                                        // if (n.name.toLowerCase().indexOf(filterText) === -1 && n.mobile.toLowerCase().indexOf(filterText) === -1) {
                                                        //   return false;
                                                        // }
                                                        return (
                                                            <TableRow
                                                                onClick={(event) => handleClick(event, n.id)}
                                                                role="checkbox"
                                                                aria-checked={isSelected}
                                                                tabIndex={-1}
                                                                key={n.id}
                                                                selected={isSelected}
                                                            >
                                                                {checkcell && (
                                                                    <TableCell padding="checkbox">
                                                                        <Checkbox checked={isSelected} size="small" />
                                                                    </TableCell>
                                                                )}
                                                                <TableCell component="th" scope="row" padding="none">
                                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                        {/* <Avatar className={classes.avatar}>A</Avatar> */}
                                                                        <Avatar className={classes.avatar} src={n.patientImage === '' ? '' : n.patientImage}>
                                                                            {n.patientImage === '' ?
                                                                                ((n.patientName.length > 0) ? n.patientName.charAt(0) : '')
                                                                                : ''
                                                                            }
                                                                        </Avatar>
                                                                        <div style={{ marginLeft: '10px', textTransform: 'capitalize' }}>
                                                                            {n.dependentName !== '' && n.dependentName !== null ? n.dependentName : n.patientName}
                                                                            <br />
                                                                            {n.dependentGender !== '' && n.dependentGender !== null ? n.dependentGender : n.patientGender}
                                                                            ,
                                                                            {`${n.dependentAge !== '' && n.dependentAge !== null ? n.dependentAge : n.patientAge} y`}
                                                                            <br />
                                                                            {`+91 ${n.patientMobile}`}
                                                                        </div>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    {n.appointmentType === 'Video' ? (
                                                                        <div className={classes.bgVideo}>
                                                                            <p>{n.appointmentType}</p>
                                                                        </div>
                                                                    ) : ('')}
                                                                    {n.appointmentType === 'Audio' ? (
                                                                        <div className={classes.bgAudio}>
                                                                            <p>{n.appointmentType}</p>
                                                                        </div>
                                                                    ) : ('')}
                                                                    {n.appointmentType === 'Chat' ? (
                                                                        <div className={classes.bgChat}>
                                                                            <p>{n.appointmentType}</p>
                                                                        </div>
                                                                    ) : ('')}
                                                                    {n.appointmentType === 'Walk-In' ? (
                                                                        <div className={classes.bgWalkIn}>
                                                                            <p>{n.appointmentType}</p>
                                                                            {n.appointmentType === 'Walk-In' ? (<p>{n.clinicName}</p>) : ('')}
                                                                        </div>
                                                                    ) : ('')}
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    {`${n.slotStartDate} - ${n.slotEndDate}`}
                                                                    {' '}
                                                                    <br />
                                                                    {' '}
                                                                    {n.slotDate}
                                                                    {n.token ? (
                                                                        <p style={{ margin: 0 }}>
                                                                            TKN no:
                                                                            {n.token}
                                                                        </p>
                                                                    ) : ('')}
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    <p>
                                                                        <b>Booking ID: </b>
                                                                        <span>{n.appointmentRefId}</span>
                                                                    </p>
                                                                    <div>
                                                                        <b>Ref: </b>
                                                                        <span><Chip label={n.consultationType} /></span>
                                                                    </div>
                                                                </TableCell>
                                                                {/* <TableCell align="right">{row.name}</TableCell> */}
                                                                <TableCell align="right">
                                                                    {renderActionButtons(n.appointmentStatus)}
                                                                    {console.log(n.appId)}
                                                                    <Button
                                                                        variant="contained"
                                                                        onClick={() => handleViewProfileConsultationClick(n.id, n.patientId)}
                                                                        className={classes.button}
                                                                    >
                                                                        View Profile
                                                                    </Button>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                    {emptyRows > 0 && (
                                                        <TableRow style={{ height: 49 * emptyRows }}>
                                                            <TableCell colSpan={6} />
                                                        </TableRow>
                                                    )}
                                                </TableBody>
                                            )}
                                        </>
                                    )}
                                </Table>
                            </TableContainer>
                        </div>
                    </Paper>

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
                </Grid>
            </Grid>
        </div>
    );
}

Queue.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: intlShape.isRequired
};

const mapStateToProps = state => ({
    appointmentsByDate: state.get('appointmentReducer').appointmentsByDate,
    selectedQueueId: state.get('appointmentReducer').selectedQueueId,
    selectedPatientId: state.get('appointmentReducer').selectedPatientId,
    masterData: state.get('dashboardReducer').masterData,
    imagesOrDocs: state.get('dashboardReducer').imagesOrDocs,
});

export default connect(mapStateToProps, { fetchAppointmentsByDate, setSelectedQueueId, setSelectedPatientId })(withStyles(styles)(injectIntl(Queue)));
