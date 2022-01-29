import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function MoveToQueue(props) {
  const {
    updateStatus, appId, showDialog
  } = props;
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleMoveToQueue() {
    updateStatus(appId, 2);
    setOpen(false);
    // setQueueDialog(false);
  }

  return (
    <div style={{ display: 'contents' }}>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{ marginLeft: 8 }}
      >
                Move to Queue
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          {/* <img src="/images/tenor.gif" style={{ display: 'block', margin: '0 auto', width: 106 }} /> */}
          <DialogContentText id="alert-dialog-description">
                        Are you sure, you want to move patient to Queue?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" autoFocus style={{ marginRight: 15, fontSize: 12 }}>
                        No
          </Button>
          <Button variant="contained" onClick={handleMoveToQueue} color="primary" style={{ marginRight: 15, fontSize: 12 }}>
                        Yes, Move to Queue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
