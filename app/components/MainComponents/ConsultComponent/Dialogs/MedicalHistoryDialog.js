import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Close from '@material-ui/icons/Close';
import AddMedicalHistory from './AddMedicalHistory';
import { connect } from "react-redux";
import API from '../../../../helpers/api';

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
    padding: '15px 0px !important',
    '&:hover': {
      background: 'inherit',
    }
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  p0: {
    padding: 0
  },
  mb10: {
    marginBottom: 10
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, patientMedicalHistory, fetchMedicalHistory, mhId, onClose, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.actionButtons} {...other}>
      <Typography variant="h6">{children}</Typography>
      <div className={classes.row}>
        <AddMedicalHistory
          mhId={mhId}
          patientMedicalHistory={patientMedicalHistory}
          fetchMedicalHistory={fetchMedicalHistory}
        />
        {onClose ? (
          <Button variant="outlined" autoFocus color="primary" onClick={onClose} aria-label="close">
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
  },
}))(MuiDialogContent);

function MedicalHistoryDialog(props) {
  const { classes, consultationDetails } = props;
  const [open, setOpen] = React.useState(false);
  const [mhId, setMhId] = React.useState('')
  const [prevRecord, setPrevRecord] = React.useState({})
  const [updateUi, setUpdateUi] = React.useState(false)
  const { patient } = consultationDetails;
  const api = new API();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const fetchMedicalHistory = async () => {
    await api.ACCOUNTS_URI().get(`patients/getMedicalHistory/${consultationDetails.patient.id}`)
      .then((resp) => {
        if(resp.data.success === true) {
          setPrevRecord(resp.data.medicalHistory)
          setMhId(resp.data.medicalHistory.id)
        }
      })
      .catch((err) => console.log(err))
  }


  React.useEffect(() => {
    fetchMedicalHistory();
  },[open])

  return (
    <div>
      <Button fullWidth className={classes.customButton} onClick={handleClickOpen}>
        Medical History
        <ChevronRight className={classes.rightIcon} />
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" maxWidth="sm" fullWidth open={open}>
        <DialogTitle
          id="customized-dialog-title"
          mhId={mhId}
          onClose={handleClose}
          patientMedicalHistory={prevRecord}
          fetchMedicalHistory={fetchMedicalHistory}
        >
          Medical History
        </DialogTitle>
        {((Object.keys(prevRecord).length === 0 && prevRecord.constructor === Object)) ? (
          <Typography component="p" align="center" style={{ padding: 50 }}>No Medical History Found</Typography>
        ) : (
          <DialogContent dividers>
            {
              ((prevRecord.medical_problems_array) &&
                (prevRecord.medical_problems_array !== null) &&
                (prevRecord.medical_problems_array !== undefined)) && (
                <div className={classes.mb10}>
                  <b>Medical Problems</b>
                  <Typography>{prevRecord.medical_problems_array.map((name) => `${name.name}`).join(', ')}</Typography>
                </div>
              )
            }
            {
              ((prevRecord.allergies_array) &&
                (prevRecord.allergies_array !== null) &&
                (prevRecord.allergies_array !== undefined)) && (
                <div className={classes.mb10}>
                  <b>Allergies</b>
                  <Typography>{prevRecord.allergies_array.map((name) => `${name.name}`).join(', ')}</Typography>
                </div>
              )
            }
            {
              ((prevRecord.family_histories_array) &&
                (prevRecord.family_histories_array !== null) &&
                (prevRecord.family_histories_array !== undefined)) && (
                <div className={classes.mb10}>
                  <b>Family History</b>
                  <Typography>{prevRecord.family_histories_array.map((name) => `${name.name}`).join(', ')}</Typography>
                </div>
              )
            }
            {
              ((prevRecord.lifestyles_array) &&
                (prevRecord.lifestyles_array !== null) &&
                (prevRecord.lifestyles_array !== undefined)) && (
                <div className={classes.mb10}>
                  <b>Life Style</b>
                  <Typography>{prevRecord.lifestyles_array.map((name) => `${name.name}`).join(', ')}</Typography>
                </div>
              )
            }
            {
              ((prevRecord.procedures_array) &&
                (prevRecord.procedures_array !== null) &&
                (prevRecord.procedures_array !== undefined)) && (
                <div className={classes.mb10}>
                  <b>Procedures</b>
                  <Typography>{prevRecord.procedures_array.map((name) => `${name.name}`).join(', ')}</Typography>
                </div>
              )
            }
            {
              ((prevRecord.risk_factors_array) &&
                (prevRecord.risk_factors_array !== null) &&
                (prevRecord.risk_factors_array !== undefined)) && (
                <div className={classes.mb10}>
                  <b>Risk Factor</b>
                  <Typography>{prevRecord.risk_factors_array.map((name) => `${name.name}`).join(', ')}</Typography>
                </div>
              )
            }
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}


MedicalHistoryDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  consultationDetails: state.get('appointmentReducer').consultaitionDetails,
});

export default connect(mapStateToProps, {})(withStyles(styles)(MedicalHistoryDialog));
