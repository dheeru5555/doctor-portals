import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
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
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  BillformControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: '100%',
  },
  formControl: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 150,
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
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
    justifyContent: 'center'
  },
}))(MuiDialogActions);

function AddBillDialog(props) {
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
      <Button variant="contained" autoFocus onClick={handleClickOpen} style={{marginLeft: 8}}>
        Add Bill
      </Button>
      <Dialog fullWidth onClose={handleClose} maxWidth="sm" aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Bill / Payment
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={4} justify="center">
            <Grid item xs={10}>
              <Typography className={classes.Typography}>
                Bill No: YS/2020-2021/10000005
              </Typography>
              <Typography className={classes.bold}>
                Bill Item
              </Typography>
              <FormControl className={classes.BillformControl}>
                <Select
                  fullWidth
                  value=""
                  displayEmpty
                  name="age"
                  className={classes.selectEmpty}
                >
                  <MenuItem value="" selected>
                    <em>Select Bill</em>
                  </MenuItem>
                  <MenuItem value={10}>Bill 1</MenuItem>
                  <MenuItem value={20}>Bill 2</MenuItem>
                  <MenuItem value={30}>Bill 3</MenuItem>
                </Select>
              </FormControl>
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
              <Typography className={classes.bold}>
                Payment
              </Typography>
              <div className={classes.spaceBetween}>
                <FormControl className={classes.formControl}>
                  <Select
                    value=""
                    displayEmpty
                    name="age"
                    className={classes.selectEmpty}
                  >
                    <MenuItem value="" selected>
                      <em>Select Payment</em>
                    </MenuItem>
                    <MenuItem value={10}>Cash</MenuItem>
                    <MenuItem value={20}>Card</MenuItem>
                  </Select>
                </FormControl>
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
          <Button variant="contained" autoFocus onClick={handleClose}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


AddBillDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddBillDialog);
