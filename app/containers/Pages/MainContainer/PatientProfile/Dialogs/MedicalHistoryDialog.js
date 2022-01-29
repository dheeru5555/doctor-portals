import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Close from '@material-ui/icons/Close';
import Favorite from '@material-ui/icons/Favorite';
import API from "../../../../../helpers/api";
import Loading from 'enl-components/Loading';

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
    padding: 20
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.actionButtons} {...other}>
      <Typography variant="h6">{children}</Typography>
      <div>
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
  },
}))(MuiDialogContent);

function MedicalHistoryDialog(props) {
  const { classes, patientMedicalHistory } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>Medical History</Button>
      <div style={{ display: 'inline-flex' }}>
        <Dialog onClose={handleClose} fullWidth={true} maxWidth={'sm'} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Medical History
          </DialogTitle>
          {patientMedicalHistory === null ? (
            <Typography component="p" align="center" style={{ padding: 50 }}>No Medical History Found</Typography>
          ) : (
            <DialogContent dividers>
              {
                ((patientMedicalHistory.medical_problems_array.length !== 0) &&
                  (patientMedicalHistory.medical_problems_array !== null) &&
                  (patientMedicalHistory.medical_problems_array !== undefined)) && (
                  <div className={classes.mb10}>
                    <b>Medical Problems</b>
                    <Typography>{patientMedicalHistory.medical_problems_array.map((name) => `${name.name}, `)}</Typography>
                  </div>
                )
              }
              {
                ((patientMedicalHistory.allergies_array.length !== 0) &&
                  (patientMedicalHistory.allergies_array !== null) &&
                  (patientMedicalHistory.allergies_array !== undefined)) && (
                  <div className={classes.mb10}>
                    <b>Allergies</b>
                    <Typography>{patientMedicalHistory.allergies_array.map((name) => `${name.name}, `)}</Typography>
                  </div>
                )
              }
              {
                ((patientMedicalHistory.family_histories_array.length !== 0) &&
                  (patientMedicalHistory.family_histories_array !== null) &&
                  (patientMedicalHistory.family_histories_array !== undefined)) && (
                  <div className={classes.mb10}>
                    <b>Family History</b>
                    <Typography>{patientMedicalHistory.family_histories_array.map((name) => `${name.name}, `)}</Typography>
                  </div>
                )
              }
              {
                ((patientMedicalHistory.lifestyles_array.length !== 0) &&
                  (patientMedicalHistory.lifestyles_array !== null) &&
                  (patientMedicalHistory.lifestyles_array !== undefined)) && (
                  <div className={classes.mb10}>
                    <b>Life Style</b>
                    <Typography>{patientMedicalHistory.lifestyles_array.map((name) => `${name.name}, `)}</Typography>
                  </div>
                )
              }
              {
                ((patientMedicalHistory.procedures_array.length !== 0) &&
                  (patientMedicalHistory.procedures_array !== null) &&
                  (patientMedicalHistory.procedures_array !== undefined)) && (
                  <div className={classes.mb10}>
                    <b>Procedures</b>
                    <Typography>{patientMedicalHistory.procedures_array.map((name) => `${name.name}, `)}</Typography>
                  </div>
                )
              }
              {
                ((patientMedicalHistory.risk_factors_array.length !== 0) &&
                  (patientMedicalHistory.risk_factors_array !== null) &&
                  (patientMedicalHistory.risk_factors_array !== undefined)) && (
                  <div className={classes.mb10}>
                    <b>Risk Factor</b>
                    <Typography>{patientMedicalHistory.risk_factors_array.map((name) => `${name.name}, `)}</Typography>
                  </div>
                )
              }
            </DialogContent>
          )}
        </Dialog>
      </div>
    </>
  );
}

MedicalHistoryDialog.propTypes = {
  isProfile: PropTypes.object.isRequired,
};

export default withStyles(styles)(MedicalHistoryDialog);
