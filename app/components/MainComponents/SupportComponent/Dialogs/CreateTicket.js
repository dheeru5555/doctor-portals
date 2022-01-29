import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import API from "../../../../helpers/api";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { createSportTicket, supportList } from 'enl-redux/actions/supportActions';

const useStyles = makeStyles((theme) => ({
  createTicket: {
    '& .MuiDialogTitle-root h2': {
      fontSize: 14,
    },
    '& .MuiDialog-paperWidthSm': {
      border: '1px solid #ff4a2f',
    },
    '& .MuiDialogActions-root': {
      background: 'rgba(136,136,136,0.15)',
      border: 'none',
      justifyContent: 'space-between',
    },
    '& .MuiButton-root': {
      fontSize: '0.675rem',
    },
    '& .MuiFormControl-marginNormal': {
      margin: 0,
      marginTop: theme.spacing(1),
      '& input, textarea': {
        padding: 10,
        fontSize: 11,
      },
    },
    '& .MuiOutlinedInput-multiline': {
      padding: 0,
    },
    '& .MuiIcon-root': {
      fontSize: '1rem',
    },
  },
  note: {
    fontSize: 12,
    color: 'gray',
    margin: 0,
  },
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: '100%',
    '& select': {
      padding: 10,
      fontSize: 11,
      color: 'grey',
      height: theme.spacing(2)
    },
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function ScrollDialog() {
  const api = new API()
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [snackBarInfo, setSnackbarInfo] = React.useState({
    isSnackBarOpen: false,
    snackBarText: "",
    snackBarSeverity: "success",
  });

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

  const defultState = {
    fields: {
      support_category: '',
      booking_id: '',
      ticket_subject: '',
      ticket_description: '',
    },
    errors: {
      support_category: '',
      booking_id: '',
      ticket_subject: '',
      ticket_description: '',
    }
  };

  const [state, setState] = React.useState(defultState);
  const [selectCategory, setselectCategory] = React.useState([]);
  const [errorMessages, setErrorMessages] = React.useState(null);

  const handleChange = (event) => {
    const { name } = event.target;
    const { fields, errors } = state;
    const filabel = { ...fields, [name]: event.target.value, };
    // setState({fields:filabel,errors})
    validateForm(filabel, name);
  };

  const dispatch = useDispatch();
  const selectState = useSelector((state) => state.toJS());
  const { dashboardReducer, supportReducer } = selectState;
  const { create_ticket_respons } = supportReducer;
  const validateForm = (fields, filed_name) => {
    let validate = true;
    const { errors } = state;

    switch (filed_name) {
      case 'support_category':
        if (fields.support_category == '') {
          errors.support_category = 'Select your category';
          validate = false;
        } else {
          errors.support_category = '';
        }
        break;
      case 'ticket_subject':
        if (fields.ticket_subject == '') {
          errors.ticket_subject = 'Enter your subject';
          validate = false;
        } else {
          errors.ticket_subject = '';
        }

        break;
      case 'ticket_description':
        if (fields.ticket_description == '') {
          errors.ticket_description = 'Enter your ticket message';
          validate = false;
        } else {
          errors.ticket_description = '';
        }
        break;
    }
    setState({ fields, errors });
    return validate;
  };

  const submitValidate = () => {
    const { fields } = state;
    let validate = true;
    for (const key in fields) {
      if (!validateForm(fields, key)) {
        validate = false;
      }
    }
    return validate;
  };

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
    setState(defultState)
  };

  const createTicket = (event) => {
    event.preventDefault();
    if (submitValidate()) {
      let data = {
        support_category: state.fields.support_category,
        ticket_subject: state.fields.ticket_subject,
        booking_id: state.fields.booking_id,
        ticket_description: state.fields.ticket_description,
        cr_id: localStorage.getItem('cr_id')
      }
      api.ACCOUNTS_URI().post("/support/add", data)
        .then((resp) => {
          if (resp.data.success === true) {
            dispatch(supportList());
            handleClose();
            setState(defultState)
          } else {
            // setErrorMessages(resp.data.errorMessage)
            setSnackbarInfo({
                isSnackBarOpen: true,
                snackBarText: resp.data.errorMessage,
                snackBarSeverity: "error",
            })
          }
        })
        .catch(() => {
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: "Internal server error",
            snackBarSeverity: "error",
          })
        })
      // dispatch(createSportTicket(
      //   {
      //     support_category: state.fields.support_category,
      //     ticket_subject: state.fields.ticket_subject,
      //     booking_id: state.fields.booking_id,
      //     ticket_description: state.fields.ticket_description
      //   }
      // ));
      // dispatch(supportList());
      // handleClose();
      // setState(defultState)
    }
  };
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      const { supportCategories } = dashboardReducer.masterData;
      setselectCategory(supportCategories);
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    if (create_ticket_respons != null) {
      if (!create_ticket_respons.success) {
        if (create_ticket_respons.errors) {
          const errorsPatient = create_ticket_respons.errors;
          const { fields, errors } = state;
          for (const key in errorsPatient) {
            const invalid_message = errorsPatient[key];
            errors[key] = invalid_message[0];
          }
          setState({ fields, errors });
        } else {
          alert(create_ticket_respons.errorMessage);
        }
      } else {
        setState(defultState);
        handleClose();
      }
    }
  }, [create_ticket_respons]);

  return (
    <>
      <Button onClick={handleClickOpen('paper')}>Create new Ticket</Button>
      <Dialog
        open={open}
        // onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className={classes.createTicket}
      >
        <DialogTitle id="scroll-dialog-title" style={{ margin: 0 }}>
          Create New Ticket
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClose}
            style={{ float: 'right' }}
          >
            Close
            <Icon>close</Icon>
          </Button>
        </DialogTitle>
        <form onSubmit={createTicket} action="">
          <DialogContent dividers={scroll === 'paper'}>
            <Grid container spacing={2}>
              <Grid item sm={12}>
                <label>Category<span style={{color: 'red'}}>*</span></label>
                <FormControl variant="outlined" onChange={handleChange} className={classes.formControl}>
                  <Select
                    native
                    value={state.fields.support_category}
                    onChange={handleChange}
                    name="support_category"
                    error={errorMessages !== null}
                  >
                    <option value=''>Select Category</option>
                    {
                      selectCategory.map((category) => (<option key={category.id} value={category.id}>{category.name}</option>))
                    }
                  </Select>
                  <FormHelperText error>{errorMessages !== null ? errorMessages : ''}</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item sm={12}>
                <label>Booking ID</label>
                <TextField
                  id="outlined-name"
                  placeholder="Enter Booking ID"
                  fullWidth
                  onChange={handleChange}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  name="booking_id"
                  value={state.fields.booking_id}
                  error={errorMessages !== null}
                  helperText={errorMessages !== null ? errorMessages : ''}
                />
              </Grid>
              <Grid item sm={12}>
                <label>Subject<span style={{color: 'red'}}>*</span></label>
                <TextField
                  id="outlined-name"
                  placeholder="Enter Subject title"
                  fullWidth
                  onChange={handleChange}
                  className={classes.textField}
                  margin="normal"
                  variant="outlined"
                  value={state.fields.ticket_subject}
                  name="ticket_subject"
                  error={errorMessages !== null}
                  helperText={errorMessages !== null ? errorMessages : ''}
                />
              </Grid>
              <Grid item sm={12}>
                <label>Message<span style={{color: 'red'}}>*</span></label>
                <TextField
                  onChange={handleChange}
                  id="outlined-multiline-static"
                  placeholder="Describe your issue (Max 255 Characters)"
                  fullWidth
                  multiline
                  rows="4"
                  margin="normal"
                  variant="outlined"
                  name="ticket_description"
                  value={state.fields.ticket_description}
                  error={errorMessages !== null}
                  inputProps={{ maxLength: 250 }}
                  helperText={errorMessages !== null ? errorMessages : '' }
                />
              </Grid>
            </Grid>

          </DialogContent>
          <DialogActions>
            <p className={classes.note}>
              Once you submit, our support team will reach out through chat
              {' '}
              <br />
              {' '}
              within 24 to 48hrs.
            </p>
            <div>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </DialogActions>
        </form>
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
      </Dialog>
    </>
  );
}
