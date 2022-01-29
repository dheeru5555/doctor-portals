import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Print from '@material-ui/icons/Print';
import AddBill from './AddBill';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  Chip: {
    background: '#e0e0e075',
    padding: theme.spacing(1),
    maxWidth: '100%',
    border: '1px solid black'
  },
  bold: {
    fontWeight: 700,
    paddingTop: 5,
    paddingBottom: 5
  },
  Typography: {
    paddingTop: 5,
    paddingBottom: 5
  },
  row: {
    display: 'flex',
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  delete: {
    fontSize: 14,
    color: 'red',
    cursor: 'pointer'
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <Button aria-label="close" variant="outlined" color="primary" className={classes.closeButton} onClick={onClose}>
          Close<CloseIcon />
        </Button>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function BillsDialog(props) {
  const { classes } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: 'contents' }}>
      <Button variant="contained" onClick={handleClickOpen} style={{ marginLeft: 5, marginRight: 5 }}>
        Add Bill / Payment
      </Button>
      <Dialog fullWidth onClose={handleClose} maxWidth="md" aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Bill / Payment
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <Typography className={classes.Typography}>
                Bill History
              </Typography>
              <div className={classes.Chip}>
                <Typography className={classes.bold}>
                  Created by Dr.John Snow
                </Typography>
                <Typography className={classes.Typography}>
                  09 Mar 2021 at 1:24PM
                </Typography>
              </div>
            </Grid>
            <Grid item xs={8}>
              <Typography className={classes.Typography}>
                Bill No: YS/2020-2021/10000005
              </Typography>
              <Typography className={classes.bold}>
                Item Name
              </Typography>
              <div className={classes.spaceBetween}>
                <Typography className={classes.Typography}>
                  Consultation <Tooltip title="delete"><Icon className={classes.delete}>delete</Icon></Tooltip>
                </Typography>
                <Typography className={classes.Typography}>
                  Rs.30
                </Typography>
              </div>
              <Divider />
              <div className={classes.spaceBetween}>
                <Typography className={classes.Typography}>
                  Consultation <Tooltip title="delete"><Icon className={classes.delete}>delete</Icon></Tooltip>
                </Typography>
                <Typography className={classes.Typography}>
                  Rs.30
                </Typography>
              </div>
              <Divider />
              <Grid container>
                <Grid item sm={8} className={classes.flexEnd}>
                  <Typography className={classes.bold}>
                    Discount
                  </Typography>
                </Grid>
                <Grid item sm={4} className={classes.flexEnd}>
                  <Typography className={classes.Typography}>
                    Rs.30
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item sm={8} className={classes.flexEnd}>
                  <Typography className={classes.bold}>
                    GST
                  </Typography>
                </Grid>
                <Grid item sm={4} className={classes.flexEnd}>
                  <Typography className={classes.Typography}>
                    Rs.30
                  </Typography>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item sm={8} className={classes.flexEnd}>
                  <Typography className={classes.bold}>
                    Total
                  </Typography>
                </Grid>
                <Grid item sm={4} className={classes.flexEnd}>
                  <Typography className={classes.Typography}>
                    Rs.30
                  </Typography>
                </Grid>
              </Grid>
              <Typography className={classes.bold}>
                Payment
              </Typography>
              <div className={classes.spaceBetween}>
                <Typography className={classes.Typography}>
                  Cash
                </Typography>
                <Typography className={classes.Typography}>
                  Rs.30
                </Typography>
              </div>
              <Divider />
              <Grid container>
                <Grid item sm={8} className={classes.flexEnd}>
                  <Typography className={classes.bold}>
                    Total
                  </Typography>
                </Grid>
                <Grid item sm={4} className={classes.flexEnd}>
                  <Typography className={classes.Typography}>
                    Rs.30
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <AddBill />
          <Button variant="contained" onClick={handleClose}>
            Print
            <Print />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


BillsDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BillsDialog);
