import React from 'react';
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
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import API from "../../../helpers/api";
import MuiAlert from '@material-ui/lab/Alert';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AccountCircle from '@material-ui/icons/AccountCircle';

// initialization
const api = new API();

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
  link: {
    color: '#5A8DEE',
    fontWeight: 600,
    textDecoration: 'underline'
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
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
  },
}))(MuiDialogActions);

export default function CustomizedDialogs() {

  const [changePasswordForm, setChangePasswordForm] = React.useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    errorMessages: {},
    showSuccessSnackbar: false,
  });
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false)
  const [showPassword1, setShowPassword1] = React.useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1)
  }

  const updateFormInputValues = (e) => {
    const obj = { ...changePasswordForm };


    if ((Object.keys(obj.errorMessages).length > 0) &&
      (obj.errorMessages[e.target.name])) {
      const intermediateErrorMessages = { ...obj.errorMessages };
      delete intermediateErrorMessages[e.target.name];
      obj.errorMessages = intermediateErrorMessages;
    }

    obj[e.target.id] = e.target.value;

    setChangePasswordForm(obj);
  }

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const changePasswordOnSave = async () => {

    const changePassResponse = await api.ACCOUNTS_URI().put("profile/changePassword", {
      current_password: changePasswordForm.oldPassword,
      new_password: changePasswordForm.newPassword,
      new_password_confirmation: changePasswordForm.confirmPassword,
    });

    if ((Object.keys(changePassResponse.data).length > 0) && (changePassResponse.data.success === true)) {

      setChangePasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        errorMessages: {},
        showSuccessSnackbar: true
      })
      setOpen(false);

    } else {

      if (changePassResponse.data && (changePassResponse.data.success === false) && changePassResponse.data.errorMessage) {
        setChangePasswordForm({
          ...changePasswordForm,
          errorMessages: changePassResponse.data.errorMessage
        });
      }

    }
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setChangePasswordForm({
      showSuccessSnackbar: false,
    })
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setChangePasswordForm({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      errorMessages: {},
      showSuccessSnackbar: false
    })
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} style={{ color: '#5A8DEE', fontWeight: 600, textDecoration: 'underline', textTransform: 'capitalize' }}>
        Change
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Change Password
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={1} justify="center">
            <Grid item xs={12}>
              <TextField
                error={
                  (changePasswordForm.errorMessages &&
                    (Object.keys(changePasswordForm.errorMessages).length > 0) &&
                    changePasswordForm.errorMessages.current_password) ? true : false
                }
                required
                id="oldPassword"
                name="current_password"
                label="Old Password"
                autoComplete="off"
                type={showPassword?"text":"password"}
                fullWidth
                inputProps={{ maxLength: 30}}
                InputProps={{ 
                  endAdornment:(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={handleClickShowPassword}
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                
                onChange={(e) => updateFormInputValues(e)}
                helperText={
                  changePasswordForm.errorMessages &&
                  (Object.keys(changePasswordForm.errorMessages).length > 0) &&
                  changePasswordForm.errorMessages.current_password &&
                  changePasswordForm.errorMessages.current_password[0]
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={
                  (changePasswordForm.errorMessages &&
                    (Object.keys(changePasswordForm.errorMessages).length > 0) &&
                    changePasswordForm.errorMessages.new_password) ? true : false
                }
                required
                id="newPassword"
                name="new_password"
                label="New Password"
                fullWidth
                type={showPassword1?"text":"password"}
                onChange={(e) => updateFormInputValues(e)}
                inputProps={{ maxLength: 30}}
                InputProps={{ 
                  endAdornment:(
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={handleClickShowPassword1}
                        >
                        {showPassword1 ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                helperText={
                  changePasswordForm.errorMessages &&
                  (Object.keys(changePasswordForm.errorMessages).length > 0) &&
                  changePasswordForm.errorMessages.new_password &&
                  changePasswordForm.errorMessages.new_password[0]
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={
                  (changePasswordForm.errorMessages &&
                    (Object.keys(changePasswordForm.errorMessages).length > 0) &&
                    changePasswordForm.errorMessages.new_password) ? true : false
                }
                required
                id="confirmPassword"
                name="new_password_confirmation"
                label="Confirm Password"
                fullWidth
                onChange={(e) => updateFormInputValues(e)}
                inputProps={{ maxLength: 30}}
                helperText={
                  changePasswordForm.errorMessages &&
                  (Object.keys(changePasswordForm.errorMessages).length > 0) &&
                  changePasswordForm.errorMessages.new_password &&
                  changePasswordForm.errorMessages.new_password[0]
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={async () => await changePasswordOnSave()}
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
        open={changePasswordForm.showSuccessSnackbar}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert severity="success" onClose={handleSnackbarClose}>
          Password Updated Successfully
        </Alert>
      </Snackbar>
    </div>
  );
}
