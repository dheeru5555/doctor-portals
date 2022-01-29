import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Cancel from '@material-ui/icons/Cancel';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  center: {
    display: 'flex',
    justifyContent: 'center'
  },
  italic: {
    fontStyle: 'italic'
  },
  danger: {
    background: '#ff210047',
    color: 'black',
    margin: theme.spacing(0.5),
  },
  infoIcon: {
    fontSize: 85,
    margin: 'auto'
  }
}));

export default function AlertDialogSlide() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
                Schedule Interfere
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <div className={classes.column}>
            <Cancel className={classes.infoIcon} color="primary" />
            <Typography variant="button" align="center">
                        Schedule Interference
            </Typography>
          </div>
          <Typography>
                        You already have shift schedule for this particular Time & Date
          </Typography>
          <DialogContentText id="alert-dialog-description">
            <Typography className={classes.italic}>
                            Note* : Change Shift Timings
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.center} style={{ paddingBottom: 20 }}>
          <Button onClick={handleClose} variant="contained" autoFocus>
                        Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
