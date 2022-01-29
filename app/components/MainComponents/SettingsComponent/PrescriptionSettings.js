import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Type from 'enl-styles/Typography.scss';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import API from '../../../helpers/api';
import Rx from '../Rx';
import { fetchDoctorProfileDetails } from '../../../redux/actions/profileActions';
import Switch from '@material-ui/core/Switch';

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
    borderRadius: 5
  },
  bgGray: {
    background: '#f5f5f5'
  },
  textField: {
    marginTop: 5,
    border: 1,
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
  alignCenter: {
    display: 'flex',
    alignItems: 'center'
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
  leftPanel: {
    padding: '15px 20px',
  },
  rightPanel: {
    fontFamily: 'auto',
    border: '1px solid #dedede',
    padding: '15px 0px',
    borderRadius: 2,
    padding: 0
  },
  switchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

function Prescription(props) {
  const {
    classes, doctorProfileDetails, masterData, fetchDoctorProfileDetails
  } = props;
  const [prescriptionDetails, setPrescriptionDetails] = React.useState({
    pres_template_id: ((doctorProfileDetails.prescription_lang_id) && (doctorProfileDetails.prescription_lang_id !== null)) ? doctorProfileDetails.prescription_lang_id : 12,
    pres_language_id: ((doctorProfileDetails.prescription_lang_id) && (doctorProfileDetails.prescription_lang_id !== null)) ? doctorProfileDetails.prescription_lang_id : 1,
    pres_signature_type: false,
    header_image: false,
    footer_image: false,
  });

  const [snackBarInfo, setSnackbarInfo] = React.useState({
    isSnackBarOpen: false,
    snackBarText: '',
    snackBarSeverity: 'success',
  });

  const [prescriptionTemplate, setPrescriptionTemplate] = React.useState(null);
  const [logo, setLogo] = React.useState();
  const [signature, setSignature] = React.useState();

  useEffect(() => {
    if (prescriptionDetails.pres_language_id) {
      fetchPrescriptionTemplates(prescriptionDetails.pres_language_id);
    }
  }, [prescriptionDetails.pres_language_id, prescriptionDetails.pres_logo_type, prescriptionDetails.pres_signature_type]);

  const fetchPrescriptionTemplates = async (languageId) => {
    const api = new API();
    await api.ACCOUNTS_URI().get(`settings/prescription-templates/${languageId}`)
      .then((prescriptionTemp) => {
        if (
          (prescriptionTemp.data.success === true)
          && (prescriptionTemp.data.template)
        ) {
          let newData = {
            pres_template_id: prescriptionTemp.data.template.id,
            pres_language_id: prescriptionTemp.data.template.language_id,
            header_image: prescriptionTemp.data.template.header_required == 'y' ? true : false,
            footer_image: prescriptionTemp.data.template.footer_required == 'y' ? true : false,
            pres_signature_type: prescriptionTemp.data.template.signature_required == 'y' ? true : false,
          }
          setPrescriptionDetails(newData);

          console.log(newData)

          setLogo((prescriptionTemp.data.template.logo_required) == 'y' ? true : false)
          setSignature((prescriptionTemp.data.template.signature_required) == 'y' ? true : false)

          if (prescriptionTemp.data.template.prescription_template) {
            setPrescriptionTemplate(prescriptionTemp.data.template.preview_html);
          }
        }
      })
      .catch(() => {
        setSnackbarInfo({
          isSnackBarOpen: false,
          snackBarText: 'Could not fetch the requested template',
          snackBarSeverity: 'error',
        });
      });
  };

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

  const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

  const renderLangauges = () => {
    const { languages } = masterData;
    return languages.map((lang) => (
      <MenuItem
        key={`lang-${lang.id}`}
        value={lang.id}
      >
        {lang.name}
      </MenuItem>
    ));
  };

  const handlePrescriptionChange = (inputKey, inputVal) => {
    const intermediatePrescriptionObj = { ...prescriptionDetails };

    intermediatePrescriptionObj[inputKey] = inputVal;

    setPrescriptionDetails(intermediatePrescriptionObj);
  };

  const addPrescriptionTemplateChange = async (newObj) => {
    const api = new API();

    let data = {
      header_image: newObj.header_image ? 'y' : 'n',
      footer_image: newObj.footer_image ? 'y' : 'n',
      signature: newObj.pres_signature_type ? 'y' : 'n'
    }

    await api.ACCOUNTS_URI().post(`settings/prescription-templates/update/${prescriptionDetails.pres_template_id}`, data)
      .then(async (resp) => {
        if (resp.data.success === true) {
          await fetchDoctorProfileDetails();
          await fetchPrescriptionTemplates(prescriptionDetails.pres_language_id)
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: 'Successfully updated prescription template',
            snackBarSeverity: 'success',
          });
        } else if (resp.data.errorMessage && resp.data.errorMessage.signature) {
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: resp.data.errorMessage.signature[0],
            snackBarSeverity: 'error',
          });
        } else if (resp.data.errorMessage && resp.data.errorMessage.logo) {
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: resp.data.errorMessage.logo[0],
            snackBarSeverity: 'error',
          });
        } else {
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: resp.data.errorMessage,
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

  const handlePrescriptionUpdate = (name) => {
    if (name === 'header_image') {
      let newValue = {
        header_image: !prescriptionDetails.header_image ? 'y' : 'n',
        footer_image: prescriptionDetails.footer_image ? 'y' : 'n',
        signature: prescriptionDetails.pres_signature_type ? 'y' : 'n'
      }
      let newObj = { ...prescriptionDetails }
      newObj['header_image'] = !prescriptionDetails.header_image
      setPrescriptionDetails(newObj)
      addPrescriptionTemplateChange(newObj)
    }

    if (name === 'footer_image') {
      let newValue = {
        header_image: prescriptionDetails.header_image ? 'y' : 'n',
        footer_image: !prescriptionDetails.footer_image ? 'y' : 'n',
        signature: prescriptionDetails.pres_signature_type ? 'y' : 'n'
      }
      let newObj = { ...prescriptionDetails }
      newObj['footer_image'] = !prescriptionDetails.footer_image
      setPrescriptionDetails(newObj)
      addPrescriptionTemplateChange(newObj)
    }

    if (name === 'signature_logo') {
      let newValue = {
        header_image: prescriptionDetails.header_image ? 'y' : 'n',
        footer_image: prescriptionDetails.footer_image ? 'y' : 'n',
        signature: !prescriptionDetails.pres_signature_type ? 'y' : 'n'
      }
      let newObj = { ...prescriptionDetails }
      newObj['pres_signature_type'] = !prescriptionDetails.pres_signature_type
      setPrescriptionDetails(newObj)
      addPrescriptionTemplateChange(newObj)
    }
  }

  const disablePrescriptionSaveButton = !!((
    (prescriptionDetails.pres_font_family === '')
    || (prescriptionDetails.pres_signature_type === '')
  ));

  return (
    <div>
      <Grid container spacing={2} justify="center">
        <Grid item md={3}>
          <div className={classNames(classes.border, classes.bgGray)}>
            <Typography className={classes.title}>
              Prescription Template
            </Typography>
            <Divider style={{ margin: '15px 0 0' }} />
            <div className={classes.leftPanel}>
              <Grid container spacing={1}>
                <Grid item sm={12} style={{ marginBottom: 8 }}>
                  <Typography variant="button" className={classes.customButton}>
                    Default Laguage
                    {' '}
                    <span style={{ color: 'red' }}>*</span>
                  </Typography>
                  <TextField
                    id="standard-select-currency"
                    fullWidth
                    select
                    value={prescriptionDetails.pres_language_id}
                    onChange={(e) => handlePrescriptionChange('pres_language_id', e.target.value)}
                    className={classes.textField}
                  >
                    {renderLangauges()}
                  </TextField>
                </Grid>
                <Grid item sm={12}>
                  <Typography variant="button" className={classes.switchContainer}>
                    Header Image <Switch name="header_image" checked={prescriptionDetails.header_image} onChange={(e) => handlePrescriptionUpdate(e.target.name)} inputProps={{ 'aria-label': 'primary checkbox' }} />
                  </Typography>
                </Grid>

                <Grid item sm={12}>
                  <Typography variant="button" className={classes.switchContainer}>
                    Footer Image <Switch name="footer_image" checked={prescriptionDetails.footer_image} onChange={(e) => handlePrescriptionUpdate(e.target.name)} inputProps={{ 'aria-label': 'primary checkbox' }} />
                  </Typography>
                </Grid>

                <Grid item sm={12}>
                  <Typography variant="button" className={classes.switchContainer} style={{ marginBottom: 0 }}>
                    Signature <Switch name="signature_logo" checked={prescriptionDetails.pres_signature_type} onChange={(e) => handlePrescriptionUpdate(e.target.name)} inputProps={{ 'aria-label': 'primary checkbox' }} />
                  </Typography>
                </Grid>
                <Divider className={classes.divider} />
                {/* <Grid item sm={6}>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    className={classes.customButton}
                    disabled={disablePrescriptionSaveButton}
                    onClick={() => addPrescriptionTemplateChange()}
                  >
                    Save Changes
                  </Button>
                </Grid> */}
              </Grid>

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
          </div>
        </Grid>
        <Grid item md={7}>
          <div className={classes.rightPanel}>
            <Rx prescriptionTemplate={prescriptionTemplate} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

Prescription.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  doctorProfileDetails: state.get('profileReducer').doctorProfileDetails,
  masterData: state.get('dashboardReducer').masterData,
});

export default connect(mapStateToProps, { fetchDoctorProfileDetails })(withStyles(styles)(Prescription));
