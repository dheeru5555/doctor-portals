import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import frontdesk1Banner from 'enl-images/new-icons/frontdesk-banner-white.png';
import FrontdeskCard from './Card';
import FrontdeskCardDialog from './FrontDeskCardDialog';
import styles from './cardStyle-jss';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Loading from 'enl-components/Loading';
import { connect } from "react-redux";
import { fetchAllClinics } from "../../../redux/actions/profileActions";
import { fetchAllReceptionists, fetchAllSearchReceptionists } from "../../../redux/actions/receptionistActions";
import API from "../../../helpers/api";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Frontdesk(props) {
  const {
    classes,
    fetchAllReceptionists,
    fetchAllSearchReceptionists,
    searchAllReceptionist,
    allReceptionist,
    clinicDetails,
    fetchAllClinics
  } = props;

  React.useEffect(() => {
    if (
      (allReceptionist === undefined) ||
      (allReceptionist === null)
    ) {
      fetchAllReceptionists();
    }
    if (
      (searchAllReceptionist === undefined) ||
      (searchAllReceptionist === null)
    ) {
      fetchAllSearchReceptionists();
    }
    if (clinicDetails === null) {
      fetchAllClinics();
    }

  }, []);

  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [selectedFrontDesk, setSelectedFrontDesk] = React.useState(null);
  const [selectedClinicId, setSelectedClinicId] = React.useState(null);
  const [snackBarInfo, setSnackBarInfo] = React.useState({
    isSnackBarOpen: false,
    snackBarText: "",
    snackBarSeverity: "success",
  });

  const handleClickOpen = (selectedFrontdeskId) => {
    setSelectedFrontDesk(selectedFrontdeskId)
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedFrontDesk(null);
    setSelectedClinicId(null);
    setOpen(false);
  };

  const handleMultipleClinic = (value) => {
    // if(value.length === 0) {
    //   setSelectedClinicId = null;
    // } else {
    //   const selClinicIdArr = value.map((val) => val.id);
    //   setSelectedClinicId(selClinicIdArr);
    // }
    setSelectedClinicId(value)
  }

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarInfo({
      isSnackBarOpen: false,
      snackBarText: "",
      snackBarSeverity: "success",
    })
  };

  let receptionList = [];

  if (
    (allReceptionist) &&
    (allReceptionist !== null)
  ) {
    receptionList = allReceptionist.map((receptionist) => {
      return {
        id: receptionist.receptionist_id,
        title: receptionist.receptionist.first_name + " " + receptionist.receptionist.last_name,
      }
    })
  }

  let searchReceptionList = [];

  if (
    (searchAllReceptionist) &&
    (searchAllReceptionist !== null)
  ) {
    searchReceptionList = searchAllReceptionist.map((receptionist) => {
      return {
        id: receptionist.id,
        title: receptionist.first_name + " " + receptionist.last_name,
        email: receptionist.email
      }
    })
  }

  const assignReceptionistToClinic = async () => {
    const api = new API();

    await api.ACCOUNTS_URI().post("receptionists/add-clinic", {
      clinic_id: parseInt(selectedClinicId, 10),
      receptionist_id: parseInt(selectedFrontDesk, 10)
    })
      .then((assignResp) => {

        if (
          (assignResp.status === 200) &&
          assignResp.data &&
          (assignResp.data.success === true)
        ) {
          fetchAllReceptionists();
          setSnackBarInfo({
            isSnackBarOpen: true,
            snackBarText: "Assigned Receptionist Successfully",
            snackBarSeverity: "success",
          })
        } else {
          if (assignResp.data.errorMessage) {
            if (assignResp.data.errorMessage.exists) {
              setSnackBarInfo({
                isSnackBarOpen: true,
                snackBarText: assignResp.data.errorMessage.exists[0],
                snackBarSeverity: "error",
              })
            } else if (assignResp.data.errorMessage.clinic_id) {
              setSnackBarInfo({
                isSnackBarOpen: true,
                snackBarText: assignResp.data.errorMessage.clinic_id[0],
                snackBarSeverity: "error",
              })
            } else if (assignResp.data.errorMessage.receptionist_id) {
              setSnackBarInfo({
                isSnackBarOpen: true,
                snackBarText: assignResp.data.errorMessage.receptionist_id[0],
                snackBarSeverity: "error",
              })
            }
          } else {
            setSnackBarInfo({
              isSnackBarOpen: true,
              snackBarText: "Error while assigning receptionist",
              snackBarSeverity: "error",
            })
          }

        }
      })
      .catch((err) => {
        setSnackBarInfo({
          isSnackBarOpen: true,
          snackBarText: "Internal Server Error",
          snackBarSeverity: "error",
        })
      })
      .finally(() => {
        handleClose();
      })
  }

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: 'searchText',
    options: searchReceptionList,
    getOptionLabel: (option) => option.title,
  });

  const routeChange = () => {
    const path = '/app/new-frontdesk';
    history.push(path);
  };

  if (
    (allReceptionist === undefined) ||
    (allReceptionist === null) ||
    (clinicDetails === null)
  ) {
    return <Loading />
  } else {
    return (
      <>
        <div className={classes.positionRelative}>
          <img src={frontdesk1Banner} style={{ borderRadius: 8, border: '1px solid #dedede' }} />
          <Card className={classNames(classes.positionAbsolute, classes.top0, classes.banner)} elevation={0}>
            <CardContent className={classes.bannerForms} style={{ padding: '0 25px 0' }}>
              <Typography variant="h5" className={classes.fdHeader}>Hi, Doctor</Typography>
              <p className={classes.fdSubheader} style={{ fontSize: 12 }}>
                Search by:
                <span className={classes.bold}>Frontdesk Name, Mobile Number</span>
              </p>
              <div className={classes.searchWrapper}>
                <FormControl className={classes.textField}>
                  <div>
                    <div {...getRootProps()}>
                      <input className={classes.fdSearch} placeholder="Search by Name or Mobile" {...getInputProps()} />
                    </div>
                    {groupedOptions.length > 0 ? (
                      <ul className={classes.listbox} {...getListboxProps()}>
                        {groupedOptions.map((option, index) => (
                          <li
                            {...getOptionProps({ option, index })}
                            onClick={() => handleClickOpen(option.id)}
                          >
                            <b>{option.title}</b> - <small>{option.email}</small>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </FormControl>
              </div>
              <Button
                variant="outlined"
                className={classes.createButton}
                onClick={routeChange}
              >
                Create New Frontdesk
              </Button>
            </CardContent>
          </Card>
        </div>

        <Grid container spacing={4} justify="center">
          {
            (allReceptionist.length > 0) ?
              allReceptionist.map((receptionist) => (
                <Grid key={receptionist.id} item md={3}>
                  <FrontdeskCard receptionist={receptionist} />
                </Grid>
              ))
              :
              null
          }
        </Grid>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          {/* <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle> */}
          <DialogContent>
            <FrontdeskCardDialog
              handleMultipleClinic={handleMultipleClinic}
              selectedFrontDesk={selectedFrontDesk}
              selectedClinicId={selectedClinicId}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => assignReceptionistToClinic()}
              // variant="primary"
              disabled={
                ((selectedFrontDesk === null) ||
                  (selectedClinicId === null)) ? true : false
              }
            >
              Assign
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
      </>
    );
  }


}

Frontdesk.propTypes = {
  classes: PropTypes.object.isRequired
};


const mapStateToProps = state => {
  return {
    allReceptionist: state.get("receptionistReducer").allReceptionist,
    searchAllReceptionist: state.get("receptionistReducer").searchAllReceptionist,
    clinicDetails: state.get("profileReducer").clinicDetails,
  }
}

export default connect(mapStateToProps, { fetchAllReceptionists, fetchAllClinics, fetchAllSearchReceptionists })(withStyles(styles)(Frontdesk));
