import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function Cancel(props) {
  const {
    updateCancelStatus, appId, showDialog, setQueueDialog
  } = props;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(showDialog);
  }, [showDialog]);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleCancel() {
    updateCancelStatus(appId, 6);
    setOpen(false);
    setQueueDialog(false);
  }

  return (
    <div style={{ display: 'contents' }}>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{ marginLeft: 8 }}
      >
                Cancel
      </Button>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
                        Are you sure, you want to cancel appointment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" autoFocus style={{ marginRight: 15, fontSize: 12 }}>
                        No
          </Button>
          <Button variant="contained" onClick={handleCancel} color="primary" style={{ marginRight: 15, fontSize: 12 }}>
                        Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
