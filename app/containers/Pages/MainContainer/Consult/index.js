import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
  ConsultTab, Attachments, DragabbleMedia, CallComponent,
  AudioCall,
  VideoCall,
  // NewVideoCall
} from 'enl-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';
import Loading from 'enl-components/Loading';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import styled from 'styled-components';
import API from '../../../../helpers/api';
import helper from '../../../../helpers/helpers';
import {fetchMasterData, fetchImageOrDocument} from '../../../../redux/actions/dashboardActions';
import { fetchConsultationDetails, fetchNewMedicineOptions, setSelectedQueueId, resetConsultationDetails } from '../../../../redux/actions/appointmentAction';
import BillPayment from '../PatientProfile/Dialogs/BillPayment';
import CancelConsultation from './Dialogs/CancelConsultation';
import CompleteConsultation from './Dialogs/CompleteConsultation';
import PreviewRx from './Dialogs/PreviewRx';

const CallWrapper = styled('div')`
    .MuiDialog-root {
        position: sticky;
    }
`;

const styles = theme => ({
  container: {
    textAlign: 'center'
  },
  root: {
    display: 'flex',
    height: '100%',
    background: '#f5f5f5',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    // top: 66,
    width: '100%',
    // height: '100%',
    paddingTop: 50
  },
  flex: {
    flex: 1,
  },
  actionButtons: {
    color: '#000000a3',
    backgroundColor: '#e0e0e0',
    margin: theme.spacing(1),
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 0,
    boxShadow: '0px 1px 6px 0px rgb(142 142 142 / 20%), 0px 1px 1px 0px rgb(243 243 243 / 14%), 0px 2px 1px -1px rgb(204 204 204 / 12%)',
    '& button': {
      fontSize: '10px !important'
    }
  },
  hSection1: {
    display: 'flex',
    alignItems: 'center',
    '&$selected': {
      color: '#1890ff',
      fontWeight: 900,
    },
  },
  tabList: {
    borderRadius: 0
  },
  tab: {
    minHeight: 65
  },
  callBtn: {
    background: '#5b9bd3',
    color: 'white',
    marginRight: 5,
    '&:hover': {
      background: '#5b9bd3'
    }
  },
  avatar: {
    borderRadius: 5
  }
});

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

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

function Consult(props) {
  const api = new API();
  const title = brand.name + ' - Consultation';
  const description = brand.desc;
  const { classes } = props;

  const selQueueId = window.sessionStorage.getItem("selectedQueueId")

  const [open, setOpen] = React.useState(false);
  const [call, setCall] = React.useState(false);

  const handleCallOpen = () => {
    setCall(true);
  };

  const handleCallClose = () => {
    setCall(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const history = useHistory();

  const routeChange = () => {
    const path = '/app/appointments';
    history.push(path);
  };

  React.useEffect(() => {    
    if (
      (selQueueId !== null) ||
      (selQueueId !== undefined)
    ) {
      props.fetchConsultationDetails(selQueueId);
      props.setSelectedQueueId(selQueueId); 
      props.fetchNewMedicineOptions();
    }

    if(props.masterData === null) {
      props.fetchMasterData()
    }

    if(props.imagesOrDocs === null) {
      props.fetchImageOrDocument()
    }

    return () => {
      props.setSelectedQueueId(null); 
      props.resetConsultationDetails();
    }
  }, []);

  let avatar = 'https://i1.wp.com/playeateasy.com/wp-content/uploads/2018/10/dummy-snapcode-avatar@2x.png?fit=240%2C240&ssl=1';
  if (
    (selQueueId === null) ||
    (selQueueId === undefined) ||
    (props.consultationDetails === null) ||
    (props.masterData === null) ||
    (props.imagesOrDocs === null)
  ) {
    return (
      <Loading />
    );
  }

  
  const { patient, id, patient_family_member } = props.consultationDetails;
  // avatar = patient.avatar;
  avatar = `${props.imagesOrDocs.patient_avatar_prefix_url}${patient.avatar}`
  const cancelAppointment = async () => {
    await api.ACCOUNTS_URI().post('appointments/updateAppointmentStatus', {
      ids: [id],
      status: 6,
    })
      .then((cancelAppointmentResp) => {
        console.log('cancelAppointmentResp', cancelAppointmentResp);
      })
      .catch((err) => {
        console.log('Error is:', err);
      })
      .finally(() => {
        setOpen(false);
        history.push('/app/appointments');
      });
  };

  const pauseConsultation = async () => {
    await api.ACCOUNTS_URI().post('appointments/updateCounsultationStatus', {
      appointment_id: id,
      consultation_status: 'p',
    })
      .then((pauseConsultation) => {
        console.log('pauseConsultation', pauseConsultation);
      })
      .catch((err) => {
        console.log('Error is:', err);
      })
      .finally(() => {
        setOpen(false);
        history.push('/app/appointments');
      });
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

  return (
    <div className={classes.root}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <TabContext value={value}>
        <AppBar>
          <Toolbar className={classes.header}>
            <div className={classes.hSection1}>
              <IconButton color="inherit" aria-label="Close" onClick={handleClickOpen} style={{ height: '100%' }}>
                <KeyboardArrowLeft />
              </IconButton>

              <Dialog
                open={open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle style={{ marginBottom: 12 }} id="alert-dialog-title">Go Back?</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <span style={{ color: '#000' }}>Consulation is not been completed yet, Are you sure you want to Go Back?</span><br />
                    <small>Note: If you go back Consultation will be Paused</small>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    style={{ fontSize: 12 }}
                  >
                    Continue with Consulation
                  </Button>
                  <Button
                    onClick={() => pauseConsultation()}
                    color="primary"
                    variant="contained"
                    style={{ fontSize: 12 }}
                    autoFocus
                  >
                    Pause Consultation
                  </Button>
                </DialogActions>
              </Dialog>
              <CardHeader
                avatar={
                  <Avatar alt="avatar" src={avatar} className={classes.avatar} />
                }
                title={(
                  <>
                    <p style={{ marginBottom: 0 }}>
                      {patient_family_member !== null ? patient_family_member.first_name : patient.first_name}
                      {' '}
                      {patient_family_member !== null ? patient_family_member.last_name : patient.last_name}
                    </p>
                    <p style={{ marginBottom: 0 }}>
                      {patient_family_member !== null ? helper.genderName(props.consultationDetails.patient_family_member.gender) : helper.genderName(props.consultationDetails.patient.gender)}
                      ,
                      {' '}
                      {patient_family_member !== null ? helper.getAge(props.consultationDetails.patient_family_member.dob) : helper.getAge(props.consultationDetails.patient.dob)}
                      y
                    </p>
                  </>
                )}
                subheader={(
                  <>
                    <Chip size="small" label={props.consultationDetails.appointment_type.name} style={{ marginRight: 5, fontSize: 9, height: 17 }} />
                    <Chip size="small" label={fetchConsultationType(props.consultationDetails.consultation_type)} style={{ fontSize: 9, height: 17 }} />
                  </>
                )}
                style={{ padding: '5px 16px' }}
              />
              <TabList onChange={handleChange} aria-label="simple tabs example" className={classes.tabList}>
                <Tab label="Consult" value="1" className={classes.tab} />
                <Tab label="Attachments" value="2" />
              </TabList>
            </div>
            <div style={{ display: 'flex' }}>
            {/* <VideoCall tokenId={props.consultationDetails.agora_token} channelName={props.consultationDetails.agora_channel} appointmentId={props.consultationDetails.id} /> */}
              {props.consultationDetails.appointment_type.name === 'Walk-In' && <BillPayment consultationDetails={props.consultationDetails} invoiceDisplay appointmentId={patient.id} isData />}
              {props.consultationDetails.appointment_type.name === 'Audio' && <AudioCall tokenId={props.consultationDetails.agora_token} channelName={props.consultationDetails.agora_channel} appointmentId={props.consultationDetails.id} avatar={avatar} />}
              {props.consultationDetails.appointment_type.name === 'Video' && <VideoCall tokenId={props.consultationDetails.agora_token} channelName={props.consultationDetails.agora_channel} appointmentId={props.consultationDetails.id} />}
              {/* {props.consultationDetails.appointment_type.name === 'Video' && <NewVideoCall />} */}
              <PreviewRx />
              <CancelConsultation consultationDetails={props.consultationDetails} />
              {/* <CompleteConsultation consultationDetails={props.consultationDetails} /> */}
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.appBar} style={{ backgroundColor: '#f5f5f5' }}>
          <TabPanel value="1">
            <ConsultTab avatar={avatar} />
          </TabPanel>
          <TabPanel value="2">
            <Attachments />
          </TabPanel>
        </div>
      </TabContext>
    </div>
  );
}

Consult.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  selectedQueueId: state.get('appointmentReducer').selectedQueueId,
  masterData: state.get('dashboardReducer').masterData,
  consultationDetails: state.get('appointmentReducer').consultaitionDetails,
  imagesOrDocs: state.get('dashboardReducer').imagesOrDocs,
});

export default connect(mapStateToProps, { fetchConsultationDetails, fetchNewMedicineOptions, fetchMasterData, setSelectedQueueId, resetConsultationDetails, fetchImageOrDocument })(withStyles(styles)(Consult));
