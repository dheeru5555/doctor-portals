import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import EditIcon from '@material-ui/icons/BorderColor';
import Delete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import ItemTable from './ItemTable';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import API from "../../../helpers/api";
import { fetchAllBillables } from "../../../redux/actions/settingsActions";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from "react-redux";
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(2),
  },
});

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  tableRow: {
    padding: '-1px'
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
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

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();

  const {
    count, page, rowsPerPage, onChangePage
  } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


const useStyles2 = makeStyles((theme) => ({
  table: {
    minWidth: 500,
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
  }
}));

function CustomPaginationActionsTable(props) {
  const classes = useStyles2();
  const { allBillables, fetchAllBillables } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [open, setOpen] = React.useState(false);
  const [snackBarInfo, setSnackbarInfo] = React.useState({
    isSnackBarOpen: false,
    snackBarText: "",
    snackBarSeverity: "success",
  });
  const [editBillable, setEditBillable] = React.useState({
    id: "",
    name: "",
    amount: "",
    billable_type: "",
  });
  const [deleteModal, setDeleteModal] = React.useState(false);
  const [currentSelbill, setCurrentSelBill] = React.useState("");


  const api = new API();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = (billId) => {

    if (
      (allBillables !== null) &&
      (allBillables.length > 0)
    ) {
      const findBill = allBillables.find((bill) => bill.id === billId);
      if (findBill && Object.keys(findBill).length > 0) {
        setEditBillable({
          id: findBill.id,
          name: findBill.name,
          amount: findBill.amount.toString(),
          billable_type: findBill.billable_type,
        })
      }
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (
    (allBillables === null) ||
    (allBillables.length === 0)
  ) {
    return (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan="6" component="th" scope="row" style={{ width: 160, padding: '0 16px' }}>
                <div style={{
                  display: 'flex', color: '#e0e0e0', alignItems: 'center', justifyContent: 'center'
                }}
                >
                  <ErrorOutline style={{ fontSize: 80 }} />
                  <Typography>No Records Found</Typography>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const rows = allBillables;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleBillDelete = async (billId) => {
    await api.ACCOUNTS_URI().delete(`settings/billables/delete/${billId}`)
      .then(async (deleteBillResp) => {
        if (deleteBillResp.status === 200) {
          if ((deleteBillResp.data.success === true)) {
            setSnackbarInfo({
              isSnackBarOpen: true,
              snackBarText: "Bill Deleted Successfully",
              snackBarSeverity: "success",
            });
            setDeleteModal(false);
            await fetchAllBillables();
          } else {
            if (
              (typeof deleteBillResp.data.errorMessage === "object") &&
              (Object.keys(deleteBillResp.data.errorMessage).length > 0)
            ) {
              const intermediateStateObj = {
                ...editInvoiceTemplate
              };

              intermediateStateObj["errorMessages"] = deleteBillResp.data.errorMessage;

              setEditInvoiceTemplate(intermediateEditInvoiceTemplate);

            } else {
              setSnackbarInfo({
                isSnackBarOpen: true,
                snackBarText: deleteBillResp.data.errorMessage,
                snackBarSeverity: "error",
              });
            }
          }
        } else {
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: "Error while deleting the bill",
            snackBarSeverity: "error",
          })
        }
      })
      .catch(() => {
        setSnackbarInfo({
          isSnackBarOpen: true,
          snackBarText: "Internal server error",
          snackBarSeverity: "error",
        });
      })
      .finally(() => {
        setDeleteModal(false);
      })
  }

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbarInfo({
      isSnackBarOpen: false,
      snackBarText: "",
      snackBarSeverity: "success",
    })
  };

  const handleEditAddBill = async (billId) => {
    await api.ACCOUNTS_URI().put(`settings/billables/edit/${billId}`, {
      name: editBillable.name,
      amount: parseInt(editBillable.amount, 10),
      billable_type: editBillable.billable_type,
    })
      .then(async (editBillResp) => {
        if (editBillResp.status === 200) {
          if ((editBillResp.data.success === true)) {
            setSnackbarInfo({
              isSnackBarOpen: true,
              snackBarText: "Bill Updated Successfully",
              snackBarSeverity: "success",
            });
            await fetchAllBillables();
          } else if (
            (typeof editBillResp.data.errorMessage === 'object')
            && (Object.keys(editBillResp.data.errorMessage).length > 0)
          ) {
            setSnackbarInfo({
              isSnackBarOpen: true,
              snackBarText: editBillResp.data.errorMessage.name ? editBillResp.data.errorMessage.name[0] : 'Please check the inputs',
              snackBarSeverity: 'error',
            });
          } else {
            setSnackbarInfo({
              isSnackBarOpen: true,
              snackBarText: editBillResp.data.errorMessage,
              snackBarSeverity: 'error',
            });
          }
        } else {
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: "Error while updating the bill",
            snackBarSeverity: "error",
          })
        }
      })
      .catch((err) => {
        setSnackbarInfo({
          isSnackBarOpen: true,
          snackBarText: "Internal server error",
          snackBarSeverity: "error",
        });
      })
      .finally(() => {
        handleClose();
      });
  }

  const handleEditInputChange = (editName, editValue) => {
    const intermediateEditObj = { ...editBillable };

    intermediateEditObj[editName] = editValue;

    setEditBillable(intermediateEditObj);
  }

  const handleDeleteModalClse = () => {
    setDeleteModal(false);
  };

  const openDeleteModal = (rowId) => {
    setDeleteModal(true);
    setCurrentSelBill(rowId)
  }

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Amount</TableCell>
              {/* <TableCell align="right">Dicount</TableCell> */}
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {console.log("rows", rows)}
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={`billable-${row.id}`}>
                <TableCell component="th" scope="row" style={{ width: 160, padding: '0 16px' }}>
                  {row.name}
                </TableCell>
                <TableCell style={{ width: 160, padding: '0 16px' }} align="right">
                  {row.billable_type === "s" ? "Sevice" : "Consumable"}
                </TableCell>
                <TableCell style={{ width: 160, padding: '0 16px' }} align="right">
                  &#8377;{row.amount}
                </TableCell>
                {/* <TableCell style={{ width: 160, padding: '0 16px' }} align="right">
                  {row.discount ? row.discount : 0}
                </TableCell> */}
                <TableCell style={{ width: 160, padding: '0 16px' }} align="right">
                  <IconButton onClick={() => handleClickOpen(row.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => openDeleteModal(row.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={6}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Item Bill Name
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="button" className={classes.customButton}>
            Item Name <span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            id="outlined-multiline-static"
            className={classes.textField}
            margin="normal"
            variant="outlined"
            fullWidth
            value={editBillable.name}
            name="name"
            onChange={(e) => handleEditInputChange(e.target.name, e.target.value)}
          />
          <Typography variant="button" className={classes.customButton}>
            Unit price <span style={{ color: 'red' }}>*</span>
          </Typography>
          <FormControl fullWidth className={classes.unitPrice}>
            <InputLabel htmlFor="adornment-amount">Amount</InputLabel>
            <Input
              id="adornment-amount"
              startAdornment={<InputAdornment position="start">&#8377;</InputAdornment>}
              value={editBillable.amount}
              name="amount"
              onChange={(e) => handleEditInputChange(e.target.name, e.target.value)}
            />
          </FormControl>
          <FormControl component="fieldset" style={{ marginTop: 10 }}>
            <FormLabel component="legend" className={classes.bold}>Type <span style={{ color: 'red' }}>*</span></FormLabel>
            <RadioGroup
              aria-label="gender"
              row
              name="billable_type"
              onChange={(e) => handleEditInputChange(e.target.name, e.target.value)}
              value={editBillable.billable_type}
            >
              <FormControlLabel value="s" control={<Radio />} label="Sevices" />
              <FormControlLabel value="c" control={<Radio />} label="Consumable" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => handleEditAddBill(editBillable.id)}
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
      {
        (deleteModal === true) &&
        (
          <Dialog
            open={deleteModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setDeleteModal(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
            className={classes.root}
          >
            <DialogTitle id="alert-dialog-slide-title">{"Are you Sure, Delete Billing?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                on Agree, your billing will be delete permanantly and wont be recoverable.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteModal(false)} variant="contained">
                No
              </Button>
              <Button onClick={async () => await handleBillDelete(currentSelbill)} variant="contained">
                Yes, Proceed to Delete
              </Button>
            </DialogActions>
          </Dialog>
        )
      }
    </>
  );
}

const mapStateToProps = state => {
  return {
    allBillables: state.get("settingsReducer").allBillables,
  }
}

export default connect(mapStateToProps, { fetchAllBillables })(CustomPaginationActionsTable);