import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import API from '../../../helpers/api';
import ItemTable from './ItemTable';
import { fetchSingleClinicData } from '../../../redux/actions/profileActions';
import { fetchAllBillables } from '../../../redux/actions/settingsActions';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightMedium,
    padding: 10
  },
  border: {
    border: '1px solid #dedede',
    padding: '15px 0px',
    background: '#f5f5f5',
    borderRadius: 5
  },
  textField: {
    marginTop: 5,
    '& input': {
      padding: 10
    }
  },
  title: {
    padding: '5px 15px',
    fontWeight: 700
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  flexEnd: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  spaceBetween: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  button: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  customButton: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  typography: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  py3: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  bold: {
    fontWeight: 700
  },
  rightPanel: {
    padding: '15px 20px',
  },
  unitPrice: {
    marginBottom: theme.spacing(1),
    '& label + .MuiInput-formControl': {
      marginTop: 5,
      borderRadius: theme.spacing(1 / 2)
    },
    '& .MuiInputLabel-formControl': {
      top: 0
    }
  },
  select: {
    marginBottom: theme.spacing(1),
    '& label + .MuiInput-formControl': {
      marginTop: 5,
      borderRadius: theme.spacing(1 / 2)
    },
    '& .MuiInputLabel-formControl': {
      top: 0
    }
  },
  root1: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root1} {...other}>
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
  },
}))(MuiDialogActions);

function AddBill(props) {
  const api = new API();

  const {
    classes, clinicDetails, fetchAllBillables, fetchSingleClinicData, singleCLinicDetails
  } = props;

  const [open, setOpen] = React.useState(false);
  const [currentSelClinicId, setCurrentSelClinicId] = React.useState(
    (
      clinicDetails
      && (clinicDetails !== null)
      && (clinicDetails.length > 0)
    ) ? clinicDetails[0].id : 0
  );
  const [editInvoiceTemplate, setEditInvoiceTemplate] = React.useState({
    gstin_no: (
      (singleCLinicDetails !== null)
      && (singleCLinicDetails.gstin_no)
      && (singleCLinicDetails.gstin_no !== null)
    ) ? singleCLinicDetails.gstin_no : '',
    bill_sequence: (
      (singleCLinicDetails !== null)
      && (singleCLinicDetails.bill_sequence)
      && (singleCLinicDetails.bill_sequence !== null)
    ) ? singleCLinicDetails.bill_sequence : '',
    receipt_no: (
      (singleCLinicDetails !== null)
      && (singleCLinicDetails.receipt_no)
      && (singleCLinicDetails.receipt_no !== null)
    ) ? singleCLinicDetails.receipt_no : '',
    note: (
      (singleCLinicDetails !== null)
      && (singleCLinicDetails.note)
      && (singleCLinicDetails.note !== null)
    ) ? singleCLinicDetails.note : '',
    signature: (
      (singleCLinicDetails !== null)
      && (singleCLinicDetails.signature)
      && (singleCLinicDetails.signature !== null)
    ) ? singleCLinicDetails.signature : '',
    errorMessages: null,
  });
  const [snackBarInfo, setSnackbarInfo] = React.useState({
    isSnackBarOpen: false,
    snackBarText: '',
    snackBarSeverity: 'success',
  });
  const [addBillable, setAddBillable] = React.useState({
    name: '',
    amount: '',
    billable_type: '',
  });

  useEffect(() => {
    if (
      clinicDetails
      && (clinicDetails !== null)
      && (clinicDetails.length > 0)
    ) {
      fetchSingleClinicData(clinicDetails[0].id);
    }
  }, []);

  useEffect(() => {
    fetchSingleClinicData(currentSelClinicId);
  }, [currentSelClinicId]);

  useEffect(() => {
    setEditInvoiceTemplate({
      gstin_no: (
        (singleCLinicDetails !== null)
        && (singleCLinicDetails.gstin_no)
        && (singleCLinicDetails.gstin_no !== null)
      ) ? singleCLinicDetails.gstin_no : '',
      bill_sequence: (
        (singleCLinicDetails !== null)
        && (singleCLinicDetails.bill_sequence)
        && (singleCLinicDetails.bill_sequence !== null)
      ) ? singleCLinicDetails.bill_sequence : '',
      receipt_no: (
        (singleCLinicDetails !== null)
        && (singleCLinicDetails.receipt_no)
        && (singleCLinicDetails.receipt_no !== null)
      ) ? singleCLinicDetails.receipt_no : '',
      note: (
        (singleCLinicDetails !== null)
        && (singleCLinicDetails.note)
        && (singleCLinicDetails.note !== null)
      ) ? singleCLinicDetails.note : '',
      signature: (
        (singleCLinicDetails !== null)
        && (singleCLinicDetails.signature)
        && (singleCLinicDetails.signature !== null)
      ) ? singleCLinicDetails.signature : '',
      errorMessages: null,
    });
  }, [singleCLinicDetails]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const renderClinicOptions = () => {
    if (
      clinicDetails
      && (clinicDetails !== null)
      && (clinicDetails.length !== 0)
    ) {
      return clinicDetails.map((clinicDetail) => (
        <option
          key={`clinic-${clinicDetail.id}`}
          value={clinicDetail.id}
        >
          {clinicDetail.name}
        </option>
      ));
    }
    return null;
  };

  const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarInfo({
      isSnackBarOpen: false,
      snackBarText: '',
      snackBarSeverity: 'success',
    });
  };

  const disableSaveChangesButton = !!((
    (editInvoiceTemplate.gstin_no === '')
    // || (editInvoiceTemplate.bill_sequence === '')
    // || (editInvoiceTemplate.receipt_no === '')
    || (editInvoiceTemplate.note === '')
    // || (editInvoiceTemplate.signature === '')
  ));

  const handleEditInvoiceTemplate = (editInvoiceName, editInvoiceValue) => {
    const intermediateEditInvoiceTemplate = { ...editInvoiceTemplate };

    if (
      (intermediateEditInvoiceTemplate.errorMessages !== null)
      && (intermediateEditInvoiceTemplate.errorMessages[editInvoiceName])
    ) {
      delete intermediateEditInvoiceTemplate.errorMessages[editInvoiceName];
    }

    intermediateEditInvoiceTemplate[editInvoiceName] = editInvoiceValue;

    setEditInvoiceTemplate(intermediateEditInvoiceTemplate);
  };

  const updateClinicTemplate = async () => {
    const updateClinicRequestBody = {
      gstin_no: editInvoiceTemplate.gstin_no,
      bill_sequence: editInvoiceTemplate.bill_sequence,
      receipt_no: parseInt(editInvoiceTemplate.receipt_no, 10),
      note: editInvoiceTemplate.note,
      signature: editInvoiceTemplate.signature,
      cr_id: localStorage.getItem("cr_id")
    };

    await api.ACCOUNTS_URI().put(`settings/update-clinic-template/${currentSelClinicId}`, {
      ...updateClinicRequestBody
    })
      .then(async (updateClinicTemplateResp) => {
        if (updateClinicTemplateResp.status === 200) {
          if ((updateClinicTemplateResp.data.success === true)) {
            await fetchSingleClinicData(currentSelClinicId);
            setSnackbarInfo({
              isSnackBarOpen: true,
              snackBarText: 'Details submitted successfully',
              snackBarSeverity: 'success',
            });
            handleClose();
          } else if (
            (typeof updateClinicTemplateResp.data.errorMessage === 'object')
            && (Object.keys(updateClinicTemplateResp.data.errorMessage).length > 0)
          ) {
            const intermediateStateObj = {
              ...editInvoiceTemplate
            };

            intermediateStateObj.errorMessages = updateClinicTemplateResp.data.errorMessage;

            setEditInvoiceTemplate(intermediateEditInvoiceTemplate);
          } else {
            setSnackbarInfo({
              isSnackBarOpen: true,
              snackBarText: updateClinicTemplateResp.data.errorMessage,
              snackBarSeverity: 'error',
            });
          }
        } else {
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: 'Error while submitting the document',
            snackBarSeverity: 'error',
          });
        }
      })
      .catch(() => {
        setSnackbarInfo({
          isSnackBarOpen: true,
          snackBarText: 'Internal server error',
          snackBarSeverity: 'error',
        });
        handleClose();
      });
  };

  const handleAddBillablesInput = (addBillableName, addBillableValue) => {
    const intermedaiteAddBillableObj = { ...addBillable };

    intermedaiteAddBillableObj[addBillableName] = addBillableValue;

    setAddBillable(intermedaiteAddBillableObj);
  };

  const handleAddBillSubmit = async () => {
    const addBillReqObj = {
      name: addBillable.name,
      amount: parseInt(addBillable.amount, 10),
      billable_type: addBillable.billable_type,
      cr_id: localStorage.getItem("cr_id")
    };

    await api.ACCOUNTS_URI().post('settings/billables/add', {
      ...addBillReqObj
    })
      .then(async (addBillResp) => {
        if (addBillResp.status === 200) {
          if ((addBillResp.data.success === true)) {
            setSnackbarInfo({
              isSnackBarOpen: true,
              snackBarText: 'Bill Added Successfully',
              snackBarSeverity: 'success',
            });
            setAddBillable({
              name: '',
              amount: '',
              billable_type: '',
            });
            await fetchAllBillables();
          } else if (
            (typeof addBillResp.data.errorMessage === 'object')
            && (Object.keys(addBillResp.data.errorMessage).length > 0)
          ) {
            setSnackbarInfo({
              isSnackBarOpen: true,
              snackBarText: addBillResp.data.errorMessage.name ? addBillResp.data.errorMessage.name[0] : 'Please check the inputs',
              snackBarSeverity: 'error',
            });
          } else {
            setSnackbarInfo({
              isSnackBarOpen: true,
              snackBarText: addBillResp.data.errorMessage,
              snackBarSeverity: 'error',
            });
          }
        } else {
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: 'Error while adding the bill',
            snackBarSeverity: 'error',
          });
        }
      })
      .catch(() => {
        setSnackbarInfo({
          isSnackBarOpen: true,
          snackBarText: 'Internal server error',
          snackBarSeverity: 'error',
        });
      });
  };

  const disableAddBillButton = !!((
    (addBillable.name.length === 0)
    || (addBillable.amount.length === 0)
    || (addBillable.billable_type.length === 0)));

  return (
    <div>
      <Grid container spacing={2} justify="center">
        <Grid item lg={10} sm={12}>
          <div className={classes.border}>
            <div className={classes.spaceBetween}>
              <div className={classes.row}>
                <Typography className={classes.title}>
                  Print Template
                </Typography>
                <FormControl className={classes.formControl}>
                  <Select
                    native
                    fullWidth
                    value={currentSelClinicId}
                    onChange={(e) => setCurrentSelClinicId(e.target.value)}
                    disabled={!!(((clinicDetails === null) || (clinicDetails.length === 0)))}
                    className={classes.selectEmpty}
                    style={{ width: '150px' }}
                  >
                    {renderClinicOptions()}
                  </Select>
                </FormControl>
              </div>
              <Button className={classes.button} onClick={handleClickOpen}>Edit</Button>
            </div>
            <Divider style={{ margin: '15px 0 0' }} />
            <Grid container className={classes.py3}>
              <Grid item sm={4}>
                <Typography className={classes.typography}>
                  Clinic Details :
                  <span className={classes.bold}>
                    {
                      (
                        (singleCLinicDetails !== null)
                        && (singleCLinicDetails.name)
                        && (singleCLinicDetails.name !== null)
                      ) ? singleCLinicDetails.name : ''
                    }
                  </span>
                </Typography>
                <Typography className={classes.typography}>
                  GSTIN Number :
                  <span className={classes.bold}>
                    {
                      (
                        (singleCLinicDetails !== null)
                        && (singleCLinicDetails.gstin_no)
                        && (singleCLinicDetails.gstin_no !== null)
                      ) ? singleCLinicDetails.gstin_no : ''
                    }
                  </span>
                </Typography>

              </Grid>
              <Grid item sm={4}>
                <Typography className={classes.typography}>
                  Default Note :
                  <span className={classes.bold}>
                    {
                      (
                        (singleCLinicDetails !== null)
                        && (singleCLinicDetails.note)
                        && (singleCLinicDetails.note !== null)
                      ) ? singleCLinicDetails.note : ''
                    }
                  </span>
                </Typography>
                {/* <Typography className={classes.typography}>
                                    Bill Sequence :
                                    <span className={classes.bold}>
                                        {
                                            (
                                                (singleCLinicDetails !== null) &&
                                                (singleCLinicDetails.bill_sequence) &&
                                                (singleCLinicDetails.bill_sequence !== null)
                                            ) ? singleCLinicDetails.bill_sequence : ""
                                        }
                                    </span>
                                </Typography> */}
                <Typography className={classes.typography}>
                  Signature :
                  <span className={classes.bold}>
                    {
                      (
                        (singleCLinicDetails !== null)
                        && (singleCLinicDetails.signature)
                        && (singleCLinicDetails.signature !== null)
                      ) ? singleCLinicDetails.signature : ''
                    }
                  </span>
                </Typography>
              </Grid>

              <Grid item sm={4}>
                {/* <Typography className={classes.typography}>
                                    Receipt No :
                                    <span className={classes.bold}>
                                        {
                                            (
                                                (singleCLinicDetails !== null) &&
                                                (singleCLinicDetails.receipt_no) &&
                                                (singleCLinicDetails.receipt_no !== null)
                                            ) ? singleCLinicDetails.receipt_no : ""
                                        }
                                    </span>
                                </Typography> */}

              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item sm={4} lg={3}>
          <div className={classes.border}>
            <Typography className={classes.title}>
              Add New Billable
            </Typography>
            <Divider style={{ margin: '15px 0 0' }} />
            <div className={classes.rightPanel}>
              <Typography variant="button" className={classes.customButton}>
                Item Name
                {' '}
                <span style={{ color: 'red' }}>*</span>
              </Typography>
              <TextField
                id="outlined-multiline-static"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                fullWidth
                name="name"
                onChange={(e) => handleAddBillablesInput(e.target.name, e.target.value)}
                value={addBillable.name}
              />
              <Typography variant="button" className={classes.customButton}>
                Unit price
                {' '}
                <span style={{ color: 'red' }}>*</span>
              </Typography>
              <FormControl fullWidth className={classes.unitPrice}>
                <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
                <Input
                  id="adornment-amount"
                  name="amount"
                  type="number"
                  onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                  onChange={(e) => handleAddBillablesInput(e.target.name, e.target.value)}
                  startAdornment={<InputAdornment position="start">&#8377;</InputAdornment>}
                  value={addBillable.amount}
                />
              </FormControl>
              <Divider className={classes.divider} />
              <FormControl component="fieldset">
                <FormLabel component="legend" className={classes.bold}>
                  Type
                  <span style={{ color: 'red' }}>*</span>
                </FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="billable_type"
                  onChange={(e) => handleAddBillablesInput(e.target.name, e.target.value)}
                  value={addBillable.billable_type}
                  row
                >
                  <FormControlLabel value="s" control={<Radio />} label="Sevice" />
                  <FormControlLabel value="c" control={<Radio />} label="Consumable" />
                </RadioGroup>
              </FormControl>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                className={classes.customButton}
                disabled={disableAddBillButton}
                onClick={async () => await handleAddBillSubmit()}
              >
                Add Bill
              </Button>
            </div>
          </div>
        </Grid>
        <Grid item sm={8} lg={7}>
          <div className={classes.border} style={{ padding: 0 }}>
            <ItemTable />
          </div>
        </Grid>
      </Grid>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit Invoice Template
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} alignItems="center">
            {/* <Grid item sm={3}>
                            <Typography variant="subtitle2" className={classes.customButton}>
                                Bill No. Sequence <span style={{ color: 'red' }}>*</span>
                            </Typography>
                        </Grid>
                        <Grid item sm={9}>
                            <TextField
                                id="outlined-multiline-static"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                name="bill_sequence"
                                value={editInvoiceTemplate.bill_sequence}
                                onChange={(e) => handleEditInvoiceTemplate(e.target.name , e.target.value)}
                                fullWidth
                            />
                        </Grid> */}
            <Grid item sm={3}>
              <Typography variant="subtitle2" className={classes.customButton}>
                GSTIN Number
                {' '}
                <span style={{ color: 'red' }}>*</span>
              </Typography>
            </Grid>
            <Grid item sm={9}>
              <TextField
                id="outlined-multiline-static"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                name="gstin_no"
                value={editInvoiceTemplate.gstin_no}
                onChange={(e) => handleEditInvoiceTemplate(e.target.name, e.target.value)}
                fullWidth
              />
            </Grid>
            {/* <Grid item sm={3}>
                            <Typography variant="subtitle2" className={classes.customButton}>
                                Clinic Name <span style={{ color: 'red' }}>*</span>
                            </Typography>
                        </Grid>
                        <Grid item sm={9}>
                            <TextField
                                id="outlined-multiline-static"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <Typography variant="subtitle2" className={classes.customButton}>
                                Clinic Contact <span style={{ color: 'red' }}>*</span>
                            </Typography>
                        </Grid>
                        <Grid item sm={9}>
                            <TextField
                                id="outlined-multiline-static"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <Typography variant="subtitle2" className={classes.customButton}>
                                Clinic Address <span style={{ color: 'red' }}>*</span>
                            </Typography>
                        </Grid>
                        <Grid item sm={9}>
                            <TextField
                                id="outlined-multiline-static"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid> */}
            <Grid item sm={3}>
              <Typography variant="subtitle2" className={classes.customButton}>
                Default Note
                {' '}
                <span style={{ color: 'red' }}>*</span>
              </Typography>
            </Grid>
            <Grid item sm={9}>
              <TextField
                id="outlined-multiline-static"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                name="note"
                value={editInvoiceTemplate.note}
                onChange={(e) => handleEditInvoiceTemplate(e.target.name, e.target.value)}
                fullWidth
              />
            </Grid>
            {/* <Grid item sm={3}>
                            <Typography variant="subtitle2" className={classes.customButton}>
                                Recipt No. <span style={{ color: 'red' }}>*</span>
                            </Typography>
                        </Grid>
                        <Grid item sm={9}>
                            <TextField
                                id="outlined-multiline-static"
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                name="receipt_no"
                                value={editInvoiceTemplate.receipt_no}
                                onChange={(e) => handleEditInvoiceTemplate(e.target.name , e.target.value)}
                                fullWidth
                            />
                        </Grid> */}
            {/* <Grid item sm={3}>
              <Typography variant="subtitle2" className={classes.customButton}>
                                Signature.
                {' '}
                <span style={{ color: 'red' }}>*</span>
              </Typography>
            </Grid>
            <Grid item sm={9}>
              <RadioGroup
                aria-label="gender"
                name="signature"
                value={editInvoiceTemplate.signature}
                onChange={(e) => handleEditInvoiceTemplate(e.target.name, e.target.value)}
                row
              >
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid> */}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={disableSaveChangesButton}
            autoFocus
            onClick={async () => await updateClinicTemplate()}
            color="primary"
          >
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={snackBarInfo.isSnackBarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert
          severity={snackBarInfo.snackBarSeverity}
          onClose={handleSnackbarClose}
        >
          {snackBarInfo.snackBarText}
        </Alert>
      </Snackbar>
    </div>
  );
}

AddBill.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  clinicDetails: state.get('profileReducer').clinicDetails,
  singleCLinicDetails: state.get('profileReducer').singleCLinicDetails,
});

export default connect(mapStateToProps, { fetchAllBillables, fetchSingleClinicData })(withStyles(styles)(AddBill));
