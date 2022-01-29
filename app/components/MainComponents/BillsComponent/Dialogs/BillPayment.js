import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { generateInvoice } from 'enl-redux/actions/BillingAction.js';
import AddItem from './AddItem';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import API from '../../../../helpers/api';
import GenerateInvoice from './GenerateInvoice';
import { FormHelperText } from '@material-ui/core';

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
  alignItemsCenter: {
    display: 'flex',
    alignItems: 'center'
  },
  itemName: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  delete: {
    fontSize: 14,
    cursor: 'pointer',
    marginLeft: 10
  },
  edit: {
    fontSize: 14,
    cursor: 'pointer',
    // marginLeft: 10
  },
  nobills: {
    textAlign: 'center',
    color: '#dcdcdc'
  },
  textLink: {
    color: '#0089FF',
    cursor: 'pointer'
  },
  formControlMargin: {
    width: 100,
    margin: '8px 0',
    '& .MuiInput-root': {
      border: 'none'
    },
    '& input': {
      padding: 5
    },
    '& .MuiInput-underline:after': {
      boxShadow: 'none',
      borderRadius: 0
    }
  },
  formControl: {
    width: 100,
    '& .MuiInput-root': {
      border: 'none'
    },
    '& input': {
      padding: 5
    },
    '& .MuiInput-underline:after': {
      boxShadow: 'none',
      borderRadius: 0
    }
  },
  formControlBorder: {
    width: 100,
    margin: '8px 0',
    '& input': {
      padding: 5
    },
    '& .MuiInput-underline:after': {
      boxShadow: 'none',
      borderRadius: 0,
      border: 'none'
    }
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
          Close
          <CloseIcon />
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

const localUserInfo = localStorage.getItem('userInfo')
const parsedUserInfo = JSON.parse(localUserInfo)

const isFrontdesk = parsedUserInfo ? parsedUserInfo.frontdesk : false;

function BillPayment(props) {
  const api = new API();
  const {
    classes,
    createinvoiceInvoice,
    isData,
    payment_modes,
    cgst_persentage,
    sgst_persentage,
    appointmentId,
    invoiceDisplay,
    patientId,
    clinicId,
    getWalkinPatientList
  } = props;
  const [open, setOpen] = React.useState(false);
  const [edit3, setEdit3] = React.useState(true);
  const [edit4, setEdit4] = React.useState(true);
  const [billItems, setBillItems] = React.useState([]);
  const [billingId, setBillingId] = React.useState('');
  const [discount, setDiscount] = React.useState(0);
  const [discountError, setDiscountError] = React.useState(false);
  const [ritem, setRitem] = React.useState(false);
  const initialState = {
    appointment_id: null,
    product_item: [],
    cgst: 0,
    sgst: 0,
    discount: 0,
    payment_mode: 1,
    total_price: 0,
  };
  const [state, setState] = React.useState(initialState);
  const [slotRespons, setSlotRespons] = React.useState({
    open: false,
    message: ''
  });

  const chngeValue = () => {
    setRitem(!ritem);
  }

  function formatDate() {
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  React.useEffect(() => {
    getBills();
    // getWalkinPatientList({
    //   sortby: 'patient_name',
    //   sortorder: 'asc',
    //   page: '1',
    //   date_range: `${formatDate()} - ${formatDate()}`,
    //   length: 10,
    //   cr_id: (localStorage.getItem("cr_id") !== null && localStorage.getItem("cr_id") !== undefined) ? parseInt(localStorage.getItem("cr_id")) : ''
    // })
  }, [ritem, open])

  const getBills = () => {
    api.ACCOUNTS_URI().get(`appointments/consultation/getBillDetail/${props.appointmentId}`)
      .then((resp) => {
        if (resp.data.success == true) {
          setBillItems(resp.data.data.billing_details.bill_details);
          setBillingId(resp.data.data.billing_details.id);
          if (resp.data.data.billing_details.bill_details.length !== 0) {
            CalculateTotalAmount(resp.data.data.billing_details.bill_details)
          } else {
            setState(initialState)
          }
        } else {
          setState(initialState)
        }
      })
      .catch((err) => console.log(err))
  }

  const calculetParesentage = (totale, paresentage) => (totale * paresentage) / 100;

  const CalculateTotalAmount = (billItems) => {
    let bills = billItems.map((item) => {
      return ({
        id: item.doctor_billable_id,
        quantity: item.quantity,
        price: item.amount
      })
    })

    let totalPrice = 0;
    let grandTotalPrice = 0;
    bills.map((item) => {
      totalPrice = totalPrice + (item.price * item.quantity)
    })
    if (totalPrice !== 0) {

      grandTotalPrice = totalPrice;
      if (discount > totalPrice) {
        setEdit3(false);
        setDiscountError(true)
        setDiscount(0)
      } else {
        setDiscountError(false)
        let grandTotalPriceAfterDiscount = grandTotalPrice - discount;
        const sgs = calculetParesentage(grandTotalPriceAfterDiscount, sgst_persentage);
        const cgs = calculetParesentage(grandTotalPriceAfterDiscount, cgst_persentage);
        grandTotalPriceAfterDiscount = grandTotalPriceAfterDiscount + sgs + cgs;
        setState({
          ...state,
          cgst: cgs,
          discount: discount,
          sgst: sgs,
          total_price: grandTotalPriceAfterDiscount.toFixed(0)
        });
        setEdit3(true);
      }
    }
  }

  const submitInvoice = () => {
    let bills = billItems.map((item) => {
      return ({
        id: item.doctor_billable_id,
        quantity: item.quantity == null ? 1 : item.quantity
      })
    })
    let submitRespons = {
      appointment_id: appointmentId,
      product_item: bills,
      cgst: state.cgst,
      sgst: state.sgst,
      discount: state.discount,
      payment_mode: state.payment_mode,
      total_price: state.total_price
    };

    if (isFrontdesk) {
      submitRespons.cr_id = parseInt(localStorage.getItem("cr_id"))
    }

    if (bills.length > 0) {
      setOpen(false);
      createinvoiceInvoice(submitRespons);
      invoiceDisplay(true);
      getWalkinPatientList({
        sortby: 'patient_name',
        sortorder: 'desc',
        page: '1',
        length: 10
      })

    } else {
      setSlotRespons({ open: true, message: "Please Add Item" });
      setTimeout(() => {
        setSlotRespons({ ...slotRespons, open: false });
      }, 3000);
    }
  };

  const removeProducts = (product_id) => {
    let removeItem = {
      bill_item_id: product_id,
      bill_id: billingId,
      appointment_id: props.appointmentId
    }
    api.ACCOUNTS_URI().post("appointments/consultation/removeBillItem", removeItem)
      .then((resp) => {
        getBills()
        setRitem(true)
      })
      .catch((err) => console.log(err))
  };

  const onchangeDiscount = (event) => {
    setDiscount(event.target.value)
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const sumeTotalPrice = () => {
    const total_product_price = state.product_item.reduce((sum, prod) => (sum + prod.prod_total_price), 0);
    const totalprice = (total_product_price - state.discount);
    const sgs = calculetParesentage(totalprice, sgst_persentage);
    const cgs = calculetParesentage(totalprice, cgst_persentage);
    const grant_total = totalprice + sgs + cgs;
    setEdit3(true);
    setState({
      ...state,
      cgst: cgs,
      sgst: sgs,
      total_price: grant_total.toFixed(2),
    });
    // return totalprice;
  };


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit3 = () => {
    setEdit3(false);
  };


  return (
    <div style={{ display: 'contents' }}>
      {isData ? (
        <Button variant="contained" autoFocus onClick={handleClickOpen} style={{ marginLeft: 8 }}>
          Bill / Payment
        </Button>
      ) : (
        <Button variant="contained" onClick={handleClickOpen} style={{ marginLeft: 5 }}>
          Create New Bill
        </Button>
      )}
      <Dialog fullWidth onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Bill / Payment
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              {isData ? (
                <div>
                  <Typography className={classes.bold}>
                    Item Name
                  </Typography>

                  {billItems.map((product) => (
                    <div key={product.product_name}>
                      <div className={classes.spaceBetween}>
                        <Typography className={classes.itemName}>
                          {product.product_name}
                          {/* <Tooltip title="Edit"><Icon onClick={() => removeProducts(product.id)} className={classes.delete}>edit</Icon></Tooltip> */}
                          <Tooltip title="remove"><Icon onClick={() => removeProducts(product.id)} className={classes.delete}>delete</Icon></Tooltip>
                        </Typography>
                        <div>
                          <Typography variant="caption" style={{ marginLeft: 5, whiteSpace: 'nowrap' }}>Rs.</Typography>
                          <span>
                            {product.amount}
                            {' '}

                            ({product.quantity !== null ? (product.quantity) : ''})
                            {' '}
                          </span>
                        </div>
                      </div>
                      <Divider />
                    </div>
                  ))}


                  <Divider />
                  <Grid container alignItems="center">
                    <Grid item sm={9} className={classes.flexEnd}>
                      <Typography className={classNames(classes.bold, classes.alignItemsCenter)}>
                        Discount
                        {edit3 ? (
                          <Tooltip title="Edit"><Button vaiant="outlined" style={{ minWidth: 44 }} disabled={billItems.length == 0} onClick={handleEdit3}><Icon className={classes.edit}>border_color</Icon></Button></Tooltip>
                        ) : (
                          <Tooltip title="Save">
                            <Button vaiant="outlined" style={{ minWidth: 44 }} disabled={billItems.length == 0} onClick={() => CalculateTotalAmount(billItems)}>
                              <Icon className={classes.edit}>save</Icon>
                            </Button>
                          </Tooltip>
                        )}
                      </Typography>
                    </Grid>
                    <Grid item sm={3} className={classes.flexEnd}>
                      <FormControl
                        aria-describedby="weight-helper-text"
                        className={edit3 ? classes.formControl : classes.formControlBorder}
                        disabled={edit3}
                      >
                        <Input
                          id="adornment-weight"
                          defaultValue="0"
                          type="number"
                          onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                          onBlur={(e) => setDiscount(e.target.value)}
                          startAdornment={<InputAdornment position="start"><Typography variant="caption" style={{ marginLeft: 5, whiteSpace: 'nowrap' }}>Rs.</Typography></InputAdornment>}
                          inputProps={{
                            'aria-label': 'Weight',
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  {discountError && (
                    <Grid container>
                      <Grid item sm={12}>
                        <FormHelperText style={{ textAlign: 'right', color: 'red' }}>Discount cannot be grater than total price</FormHelperText>
                      </Grid>
                    </Grid>
                  )}
                  <Grid container alignItems="center">
                    <Grid item sm={8} className={classes.flexEnd}>
                      <Typography className={classNames(classes.bold, classes.alignItemsCenter)}>
                        SGST
                      </Typography>
                    </Grid>
                    <Grid item sm={4} className={classes.flexEnd}>
                      <FormControl
                        aria-describedby="weight-helper-text"
                        className={classes.formControl}
                        disabled
                      >
                        <Input
                          id="adornment-weight"
                          defaultValue="0"
                          value={state.sgst}
                          startAdornment={<InputAdornment position="start"><Typography variant="caption" style={{ marginLeft: 5, whiteSpace: 'nowrap' }}>Rs.</Typography></InputAdornment>}
                          inputProps={{
                            'aria-label': 'Weight',
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid container alignItems="center">
                    <Grid item sm={8} className={classes.flexEnd}>
                      <Typography className={classNames(classes.bold, classes.alignItemsCenter)}>
                        CGST
                      </Typography>
                    </Grid>
                    <Grid item sm={4} className={classes.flexEnd}>
                      <FormControl
                        aria-describedby="weight-helper-text"
                        className={edit4 ? classes.formControl : classes.formControlBorder}
                        disabled={edit4}
                      >
                        <Input
                          id="adornment-weight"
                          defaultValue="0"
                          value={state.cgst}
                          startAdornment={<InputAdornment position="start"><Typography variant="caption" style={{ marginLeft: 5, whiteSpace: 'nowrap' }}>Rs.</Typography></InputAdornment>}
                          inputProps={{
                            'aria-label': 'Weight',
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>

                  {/* <Grid container alignItems="center">
                    <Grid item sm={8} className={classes.flexEnd}>
                      <Typography className={classes.bold}>
                        Payment Mode
                      </Typography>
                    </Grid>
                    <Grid item sm={4} className={classes.flexEnd}>
                      <FormControl className={classes.formControl}>
                        <Select
                          value={state.payment_mode}
                          displayEmpty
                          name="payment"
                        >
                          {
                            ((payment_modes !== null) &&
                              (payment_modes !== undefined) &&
                              (payment_modes !== '')) ? (
                              <>
                                {
                                  payment_modes.map((payment) => (
                                    <MenuItem value={payment.id}>
                                      {' '}
                                      {payment.name}
                                      {' '}
                                    </MenuItem>
                                  ))
                                }
                              </>
                            ) : ('')
                          }
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid> */}
                  <Grid container alignItems="center">
                    <Grid item sm={8} className={classes.flexEnd}>
                      <Typography className={classes.bold}>
                        Total
                      </Typography>
                    </Grid>
                    <Grid item sm={4} className={classes.flexEnd}>
                      <FormControl
                        aria-describedby="weight-helper-text"
                        className={classes.formControl}
                        disabled
                      >
                        <Input
                          id="adornment-weight"
                          defaultValue="0"
                          value={state.total_price}
                          startAdornment={<InputAdornment position="start"><Typography variant="caption" style={{ marginLeft: 5, whiteSpace: 'nowrap' }}>Rs.</Typography></InputAdornment>}
                          inputProps={{
                            'aria-label': 'Weight',
                          }}
                        />
                      </FormControl>
                    </Grid>
                  </Grid>
                </div>
              ) : (
                <div className={classes.nobills}>
                  <Typography className={classes.bold}>
                    No bills Found
                  </Typography>
                  <small>Add New Bills to Generate Invoice</small>
                </div>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <AddItem
            billingId={billingId}
            onChangeValue={chngeValue}
            patientId={patientId}
            clinicId={clinicId}
            appointmentId={appointmentId}
          />
          <Button variant="contained" onClick={submitInvoice}>
            Generate Invoice
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        onClose={() => setSlotRespons({ ...slotRespons, open: false })}
        open={slotRespons.open}
        autoHideDuration={6000}
      >
        <Alert severity="warning">
          {slotRespons.message}
        </Alert>
      </Snackbar>
    </div>
  );
}


BillPayment.propTypes = {
  classes: PropTypes.object.isRequired,
  isData: PropTypes.bool.isRequired
};
const mapStateToprops = state => {
  const { dashboardReducer, BillingReducer, settingsReducer } = state.toJS();
  if (dashboardReducer.masterData !== null) {
    return {
      payment_modes: dashboardReducer.masterData.payment_modes,
      cgst_persentage: dashboardReducer.masterData.cgst,
      sgst_persentage: dashboardReducer.masterData.sgst,
    };
  } else {
    return null
  }
};
const mapDispatchToprops = dispatch => ({
  createinvoiceInvoice: data => dispatch(generateInvoice(data)),
});
export default connect(mapStateToprops, mapDispatchToprops)(withStyles(styles)(BillPayment));
