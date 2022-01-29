import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import API from "../../../../../helpers/api";

export default function CompletelConsultDialog(props) {
  const { consultationDetails } = props;
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  const history = useHistory();

  function routeChange() {
    const path = '/completed';
    history.push(path);
  };

  const completeConsultation = async () => {
    const api = new API();
    console.log(consultationDetails.id)
    await api.ACCOUNTS_URI().post("appointments/updateCounsultationStatus", {
      appointment_id: consultationDetails.id,
      consultation_status: "c",
    })
      .then((completeConsultationResp) => {
        console.log("completeConsultationResp", completeConsultationResp)
      })
      .catch((err) => {
        console.log("Error is:", err)
      })
      .finally(() => {
        setOpen(false);
        history.push({
          pathname: '/completed',
          state: { 
            id: consultationDetails.id,
            name: `${consultationDetails.patient.first_name} ${consultationDetails.last_name}`
          }
        });
      })
  }

  return (
    <div style={{ display: 'contents' }}>
      <Button variant="contained" onClick={handleClickOpen} style={{ marginLeft: 5, marginRight: 5 }}>
        Complete Consultation
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, you want to Complete consutation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            No
          </Button>
          <Button
            onClick={async () => await completeConsultation()}
            variant="contained"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
