import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import API from "../../../../../helpers/api";

export default function CancelConsultDialog(props) {
  const {consultationDetails} = props;
  const [open, setOpen] = React.useState(false);

  const history = useHistory();

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const cancelAppointment = async () => {
    const api = new API();

    await api.ACCOUNTS_URI().post("appointments/updateAppointmentStatus", {
        ids: [consultationDetails.id],
        status: 6,
    })
    .then((cancelAppointmentResp) => {
        console.log("cancelAppointmentResp", cancelAppointmentResp)
    })
    .catch((err) => {
        console.log("Error is:", err)
    })
    .finally(() => {
        setOpen(false);
        history.push('/app/appointments');
    })    
  }

  return (
    <div style={{ display: 'contents' }}>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{ marginLeft: 5, marginRight: 5 }}
      >
        Cancel Consultation
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, you want to Cancel consutation?
          </DialogContentText>
          <Grid container>
            <Grid item xs={4}>
              <DialogContentText id="alert-dialog-description" style={{ color: 'red' }}>
                Reason* :
              </DialogContentText>
            </Grid>
            <Grid item xs={8}>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows="4"
                variant="outlined"
                inputProps={{ maxLength: 250 }}
                placeholder="Type reason for cancellation..."
                style={{ borderColor: 'red' }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            No
          </Button>
          <Button
            onClick={async () => await cancelAppointment()}
            variant="contained"
            autoFocus
            style={{ marginRight: 15 }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
