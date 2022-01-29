import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import Prescription from './previousRx';
import Icon from '@material-ui/core/Icon';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { connect } from 'react-redux';
import Loading from 'enl-components/Loading';
import { fetchConsultationDetails, fetchPatientDetails, setSelectedQueueId, setSelectedPatientId } from '../../../../redux/actions/appointmentAction';
import { Typography } from '@material-ui/core';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import BillPayment from './Dialogs/BillPayment';
import MedicalHistoryDialog from './Dialogs/MedicalHistoryDialog';
import AddVitalDialog from './Dialogs/VitalsDialog';
import helper from '../../../../helpers/helpers';
import API from '../../../../helpers/api';

const ActionButtons = styled('div')`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    spaceBetween: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    btnLink: {
        color: 'blue',
        textDecoration: 'underline',
        cursor: 'pointer'
    },
    profileCard: {
        display: 'flex',
        alignItems: 'center',
        background: '#fff',
        border: '1px solid #9090909c',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10
    },
    rightcontent: {
        marginLeft: 15,
        fontSize: 14,
        width: '100%',
        '& h4': {
            margin: 0
        },
        '& span': {
            margin: 0
        }
    },
    details: {
        display: 'flex',
        justifyContent: 'space-between',
        background: '#f2f5f8',
        color: '#000',
        padding: '5px 10px',
        borderRadius: 4,
        marginBottom: 5,
        marginTop: 5,
        fontSize: 14,
        '& .column': {
            display: 'flex',
            flexDirection: 'column',
            '& .heading': {
                fontSize: 11,
                color: '#a1aab9'
            },
            '& .number1': {
                fontWeight: 600
            }
        }
    },
    vitalsCard: {
        display: 'flex',
        background: '#fff',
        border: '1px solid #9090909c',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10,
        fontSize: 14
    },
    vitalcontent: {
        width: '100%',
        '& h4': {
            margin: 0
        },
        '& span': {
            margin: 0
        }
    },
    vitalsDetails: {
        // background: '#f2f5f8',
        // padding: 15,
        borderRadius: 4,
        height: 190,
        marginTop: 7,
        overflow: 'auto',
        '& p': {
            borderBottom: '1px solid #dedede',
            paddingBottom: 7,
            paddingTop: 7,
            margin: 0,
            marginRight: 5,
        },
        '& p:lastchild': {
            borderBottom: 'none',
            paddingBottom: 7,
            paddingTop: 7,
            margin: 0
        },
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
    vitalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    complaintCard: {
        display: 'flex',
        background: '#fff',
        border: '1px solid #9090909c',
        borderRadius: 8,
        padding: 15,
        marginBottom: 10
    },
    complaintcontent: {
        width: '100%',
        '& h4': {
            margin: 0
        },
        '& span': {
            margin: 0
        }
    },
    complaintDetails: {
        // background: '#f2f5f8',
        // padding: 15,
        borderRadius: 8,
        marginTop: 15,
        maxHeight: 110,
        '& p': {
            paddingBottom: 7,
            paddingTop: 7,
            margin: 0
        }
    },
    complaintHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    RxHeader: {
        border: '1px solid #dedede',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 'auto',
        padding: 11,
        background: 'white',
        '& p': {
            margin: 0
        }
    },
    navigation: {
        margin: 'auto 0',
        display: 'flex',
        '& span': {
            width: '2rem',
            height: '2rem',
            textAlign: 'center',
            verticalAlign: 'middle',
            border: '1px solid #dedede',
            borderRadius: 5,
            marginRight: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: '#eeeeee'
        }
    },
    RxDatepicker: {
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: theme.spacing(1),
        '& .MuiFormControl-marginNormal': {
            margin: 0
        },
        '& .MuiInput-root': {
            border: 0
        },
        '& input': {
            fontSize: 16,
            width: 100
        },
        '& .MuiInput-underline:after': {
            boxShadow: 'none',
            border: 'none'
        }
    },
    rightHeader: {
        display: 'flex',
        '& button': {
            marginRight: theme.spacing(1)
        },
        '& .MuiIcon-root': {
            fontSize: '1rem'
        }
    }
}));

function PatientProfile(props) {
    const localUserInfo = localStorage.getItem('userInfo')
    const parsedUserInfo = JSON.parse(localUserInfo)

    const isFrontdesk = parsedUserInfo ? parsedUserInfo.frontdesk : false;
    const api = new API();
    const classes = useStyles();
    const history = useHistory();
    const title = brand.name + ' - Consult';
    const description = brand.desc;
    const { location } = props;
    const [patientVitals, setPatientVitals] = React.useState([])
    const [isUpdated, setIsUpdated] = React.useState(false)
    const routeChange = () => {
        const path = '/app/appointments';
        history.push(path);
    };
    const [isLoading, setIsLoading] = React.useState(true);

    let imageAvatarUrl = '';


    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 500);
        if (location && location.state && location.state.patientId) {
            props.setSelectedQueueId(location.state.appointmentId);
            props.setSelectedPatientId(location.state.patientId)
            props.fetchPatientDetails(location.state.patientId)
            // props.fetchConsultationDetails(location.state.appointmentId)
        }
    }, [])

    React.useEffect(() => {
        if (location.state.appointmentId !== undefined) {
            props.fetchConsultationDetails(location.state.appointmentId)
        }
    }, [])

    React.useEffect(() => {
        if (props.patientDetails == null) {
            props.fetchPatientDetails(location.state.patientId)
        }
        getVitals();
    }, [])

    const getVitals = () => {
        const dateFormat = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`;
        const params = {
            patient_id: location.state.patientId,
            date: dateFormat
        };
        api.ACCOUNTS_URI().get('patients/getVitalsByDate', { params })
            .then((resp) => {
                if (resp.data.patient_vital.length > 0) {
                    console.log("jhj")
                    let respVital = resp.data.patient_vital
                    let enteredVitals = respVital.filter((vital) => vital.value !== "")
                    setPatientVitals(enteredVitals)
                }
            })
            .catch((err) => console.log(err));
    };

    if ((props.imagesOrDocs && props.imagesOrDocs.patient_avatar_prefix_url)
        && ((props.patientDetails) && (props.patientDetails.avatar) && (props.patientDetails.avatar !== null))
    ) {
        imageAvatarUrl = props.imagesOrDocs.patient_avatar_prefix_url + props.patientDetails.avatar;
    } else {
        imageAvatarUrl = "https://www.kindpng.com/picc/m/252-2524695_dummy-profile-image-jpg-hd-png-download.png"
    }

    const startConsultation = async (consultationId) => {
        const api = new API();

        await api.ACCOUNTS_URI().post('appointments/updateCounsultationStatus', {
            appointment_id: consultationId,
            consultation_status: 's',
        })
            .then((updateConsultResp) => {
                if (
                    (updateConsultResp.status === 200)
                    && (updateConsultResp.data.success === true)
                ) {
                    window.sessionStorage.setItem("selectedQueueId", consultationId)
                    props.setSelectedQueueId(consultationId);
                    history.push('/consult');
                }
            })
            .catch((err) => {
                console.log('error is:', err);
            });
    };

    if (isLoading) {
        return <Loading />
    }

    if (props.patientDetails == null) {
        return <Loading />
    }

    return (
        <div style={{ fontSize: 14 }}>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
            </Helmet>

            <ActionButtons>
                <div></div>
                <div>
                    {(!isFrontdesk && location.state.appointmentId !== undefined && props.consultationDetails.appointment_status_id !== 4 && props.consultationDetails.appointment_status_id !== 3 && props.consultationDetails.appointment_status_id !== 6) && (
                        <>
                            <Button variant="contained" style={{ marginRight: 8 }} onClick={() => startConsultation(location.state.appointmentId)}>{props.consultationDetails.appointment_status_id === 9 ? 'Resume Consultation' : 'Start Consultation'}</Button>
                            {/* <Button variant="contained">Bills / Payment</Button> */}
                            {/* <BillPayment consultationDetails={props.consultationDetails} isData /> */}
                        </>
                    )}
                </div>
            </ActionButtons>
            <Grid container spacing={2}>
                <Grid item sm={5}>
                    <div className={classes.profileCard}>
                        <div className={classes.Image}>
                            <img
                                src={imageAvatarUrl}
                                style={{ width: 150, height: 120, objectFit: 'cover', borderRadius: 8 }}
                            />
                        </div>
                        <div className={classes.rightcontent}>
                            <h4>{props.patientDetails.first_name} {props.patientDetails.last_name}</h4>
                            <span style={{ marginBottom: 5 }}>{props.patientDetails.email}</span>
                            <br />
                            <span>{props.patientDetails.mobile}</span>
                            <div className={classes.details}>
                                <div><b>Gender</b><br /><span>{helper.genderName(props.patientDetails.gender)}</span></div>
                                <div>
                                    <b>Age</b>
                                    <br />
                                    <span>{helper.getAge(props.patientDetails.dob)}</span>
                                </div>
                                <div>
                                    <b>Blood group</b>
                                    <br />
                                    <span>{helper.bloodGroup(props.patientDetails.blood_group_id)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    {(localStorage.getItem("selectedTag") !== '') && (localStorage.getItem("selectedTag") !== null) && (JSON.parse(localStorage.getItem("selectedTag")).access_array.includes("vitals")) && (
                        <div className={classes.vitalsCard}>
                            <div className={classes.vitalcontent}>
                                <div className={classes.vitalHeader}>
                                    <h4>
                                        Vitals
                                        <small style={{
                                            fontSize: 10, color: 'green', fontWeight: 500, marginLeft: 5
                                        }}
                                        >
                                            {`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`}
                                        </small>
                                    </h4>
                                    <AddVitalDialog patientId={location.state.patientId} fetchVitals={getVitals} isProfile />
                                </div>
                                <div className={classes.vitalsDetails}>
                                    {patientVitals.length !== 0 ? (
                                        <>
                                            {patientVitals.map((vital) => {
                                                return (
                                                    <>
                                                        <p className={classes.spaceBetween}>
                                                            <span>{vital.name}(/{vital.uom})</span>
                                                            <span>{vital.vital_value}</span>
                                                        </p>
                                                    </>
                                                )
                                            })}
                                        </>
                                    ) : (
                                        <div className={classes.complaintDetails}>
                                            <div style={{
                                                display: 'flex', color: '#e0e0e0', alignItems: 'center', justifyContent: 'center'
                                            }}
                                            >
                                                <ErrorOutline style={{ fontSize: 80 }} />
                                                <Typography>No Records Found</Typography>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {!isFrontdesk && (
                        <div className={classes.vitalsCard}>
                            <div className={classes.vitalcontent}>
                                <div className={classes.vitalHeader}>
                                    <h4>
                                        Vitals
                                        <small style={{
                                            fontSize: 10, color: 'green', fontWeight: 500, marginLeft: 5
                                        }}
                                        >
                                            {`${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getDate().toString().padStart(2, '0')}`}
                                        </small>
                                    </h4>
                                    <AddVitalDialog patientId={location.state.patientId} fetchVitals={getVitals} isProfile />
                                </div>
                                <div className={classes.vitalsDetails}>
                                    {patientVitals.length !== 0 ? (
                                        <>
                                            {patientVitals.map((vital) => {
                                                return (
                                                    <>
                                                        <p className={classes.spaceBetween}>
                                                            <span>{vital.name}(/{vital.uom})</span>
                                                            <span>{vital.vital_value}</span>
                                                        </p>
                                                    </>
                                                )
                                            })}
                                        </>
                                    ) : (
                                        <div className={classes.complaintDetails}>
                                            <div style={{
                                                display: 'flex', color: '#e0e0e0', alignItems: 'center', justifyContent: 'center'
                                            }}
                                            >
                                                <ErrorOutline style={{ fontSize: 80 }} />
                                                <Typography>No Records Found</Typography>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {location.state.appointmentId !== undefined && (
                        <div className={classes.complaintCard}>
                            <div className={classes.complaintcontent}>
                                <div className={classes.complaintHeader}>
                                    <h4>Chief Complaint</h4>
                                </div>
                                <div className={classes.complaintDetails}>
                                    {props.consultationDetails.chief_complaint !== null && props.consultationDetails.chief_complaint !== '' ? (
                                        props.consultationDetails.chief_complaint
                                    ) : (
                                        <div style={{
                                            display: 'flex', color: '#e0e0e0', alignItems: 'center', justifyContent: 'center'
                                        }}
                                        >
                                            <ErrorOutline style={{ fontSize: 80 }} />
                                            <Typography>No Records Found</Typography>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    {(localStorage.getItem("selectedTag") !== '') && (localStorage.getItem("selectedTag") !== null) && (JSON.parse(localStorage.getItem("selectedTag")).access_array.includes("critical_notes")) && (
                        <div className={classes.complaintCard}>
                            <div className={classes.complaintcontent}>
                                <div className={classes.complaintHeader}>
                                    <h4>Critical notes</h4>
                                </div>
                                <div className={classes.complaintDetails}>
                                    {(props.patientDetails.critical_note !== '' && props.patientDetails.critical_note !== null) ? props.patientDetails.critical_note : (
                                        <div style={{
                                            display: 'flex', color: '#e0e0e0', alignItems: 'center', justifyContent: 'center'
                                        }}
                                        >
                                            <ErrorOutline style={{ fontSize: 80 }} />
                                            <Typography>No Records Found</Typography>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {!isFrontdesk && (
                        <div className={classes.complaintCard}>
                            <div className={classes.complaintcontent}>
                                <div className={classes.complaintHeader}>
                                    <h4>Critical notes</h4>
                                </div>
                                <div className={classes.complaintDetails}>
                                    {(props.patientDetails.critical_note !== '' && props.patientDetails.critical_note !== null) ? props.patientDetails.critical_note : (
                                        <div style={{
                                            display: 'flex', color: '#e0e0e0', alignItems: 'center', justifyContent: 'center'
                                        }}
                                        >
                                            <ErrorOutline style={{ fontSize: 80 }} />
                                            <Typography>No Records Found</Typography>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </Grid>
                <Grid item sm={7}>
                    <div style={{ background: '#fff', border: '1px solid #dedede' }}>
                        <Prescription prescriptionTemplates={props.patientDetails.appointments} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

PatientProfile.propTypes = {
    intl: intlShape.isRequired
};

const mapStateToProps = state => ({
    selectedQueueId: state.get('appointmentReducer').selectedQueueId,
    selectedPatientId: state.get('appointmentReducer').selectedPatientId,
    masterData: state.get('dashboardReducer').masterData,
    consultationDetails: state.get('appointmentReducer').consultaitionDetails,
    patientDetails: state.get('appointmentReducer').patientDetails,
    imagesOrDocs: state.get('dashboardReducer').imagesOrDocs,
    billables: state.get('appointmentReducer').billables
});


export default connect(mapStateToProps, { fetchConsultationDetails, fetchPatientDetails, setSelectedQueueId, setSelectedPatientId })(injectIntl(PatientProfile));
