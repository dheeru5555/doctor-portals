import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import PhoneAndroidOutlined from '@material-ui/icons/PhoneAndroidOutlined';
import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';
import styled from 'styled-components';
import { Add } from '@material-ui/icons';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import API from '../../../helpers/api';
import styles from './user-jss';

// initialization
const api = new API();

const UploadDocWrapper = styled('div')`
  width: 70%;
  margin: 0 auto;
`;

const DropZoneWrapper = styled.div`
  .MuiDropzoneArea-root {
    min-height: 160px;
    width: 95%;
    padding: 0 10px;
  }
  .MuiGrid-container {
    position: absolute;
    margin: 0;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .MuiDropzonePreviewList-imageContainer:hover .MuiDropzonePreviewList-image {
    opacity: 1;
  }
  .MuiGrid-spacing-xs-8 > .MuiGrid-item {
    padding: 0;
  }
  .MuiGrid-grid-xs-4 {
    flex-grow: 0;
    max-width: 100%;
    flex-basis: 100%;
  }
  .MuiDropzonePreviewList-image {
    height: auto;
  }
  .MuiDropzoneArea-text {
    font-size: 15px;
    height: 25px;
  }
  .MuiDropzonePreviewList-removeButton {
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 40px;
    height: 40px;
    opacity: 0;
    position: absolute;
    transition: .5s ease;
  }
`;

const UploadDocuments = (props) => {
  const {
    classes, handleBack, handleNext, hashedKey, masterData
  } = props;

  const [verificationDocs, setVerificationDocs] = useState({
    skip: 0,
    med_reg_certificate: '',
    id_proof: '',
    super_speciality_proof: '',
  });

  const [isVerficationSubmitBtnDisabled, setVerificationSubmitBtn] = useState(true);

  const [snackBarInfo, setSnackbarInfo] = useState({
    isSnackBarOpen: false,
    snackBarText: '',
    snackBarSeverity: 'success',
  });

  useEffect(() => {
    if (
      (verificationDocs.med_reg_certificate != '')
      && (verificationDocs.id_proof != '')
      && (verificationDocs.super_speciality_proof != '')
    ) {
      setVerificationSubmitBtn(false);
    }
  }, [
    verificationDocs.med_reg_certificate,
    verificationDocs.id_proof,
    verificationDocs.super_speciality_proof,
  ]);

  const intermediateObj = { ...verificationDocs };
  const handleInputChange = (inputKey, inputValue) => {
    // verificationDocsDetails.inputKey = inputValue

    intermediateObj[inputKey] = inputValue;

    setVerificationDocs({ ...intermediateObj });
  };

  const handleUploadDocSubmit = async (skipStatus) => {
    const hashedKeyValue = (hashedKey === null)
      ? 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL29hYXJvZ3lhLWFkbWluXC9hcGlcL3BhdGllbnRcL2F1dGhcL3ZlcmlmeU90cCIsImlhdCI6MTYxOTcwNDAwNCwiZXhwIjoxNjUxMjQwMDA0LCJuYmYiOjE2MTk3MDQwMDQsImp0aSI6IlBNVEE5bWNvZGtBY1hmaU8iLCJzdWIiOjMsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.dwGelEZnFrvh8Y0KeDt1kIIe1l51F9EIGkCkGaxboE8'
      : hashedKey;

    const verificationDocsDetails = { ...verificationDocs };
    verificationDocsDetails.skip = skipStatus;

    const formData = new FormData();
    { skipStatus == 0; }
    if (skipStatus == 0) {
      formData.append('med_reg_certificate', verificationDocsDetails.med_reg_certificate);
      formData.append('super_speciality_proof', verificationDocsDetails.super_speciality_proof);
      formData.append('id_proof', verificationDocsDetails.id_proof);
      // formData.append("skip", verificationDocsDetails.skip)
    }
    formData.append('skip', verificationDocsDetails.skip);

    await api.CORE_URI().post('profile/updateCertificates', formData,
      {
        headers: { Authorization: `Bearer ${hashedKeyValue}`, 'Content-Type': 'multipart/form-data' }
      })
      .then((responseData) => {
        if (responseData.status === 200) {
          if ((responseData.data.success === true)) {
            handleNext();
          } else {
            setSnackbarInfo({
              isSnackBarOpen: true,
              snackBarText: 'Error while submitting the form',
              snackBarSeverity: 'error',
            });
          }
        } else {
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: 'Error while submitting the form',
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

  return (
    <UploadDocWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            gutterBottom
            style={{ display: 'flex', marginTop: 20, justifyContent: 'center' }}
            align="center"
          >
            Upload Documents for verification
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            We are delighted to have you on board and can nott wait for you to get
            started. Simply upload your medical certificates (Photo of degree,
            medical registration number if applicable) and government issues
            photo id. Other Certificates(certifications, Accolades, memberships and qualifications)
          </Typography>
          <Typography variant="body1" gutterBottom>
            Note*: Only PDF's, JPEG, PNG, etc., File formats can be Uploaded
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.dropzoneBlock}>
            <Grid container spacing={2} justify="center">
              <Grid item md={4}>
                <DropZoneWrapper>
                  <DropzoneArea
                    onChange={(files) => {
                      handleInputChange(
                        'med_reg_certificate',
                        (files[0]) ? files[0] : ''
                      );
                    }
                    }
                    acceptedFiles={['image/*', 'application/pdf']}
                    filesLimit={1}
                    Icon={Add}
                    dropzoneText="Medical Registration Certificate"
                  />
                </DropZoneWrapper>
              </Grid>

              <Grid item md={4}>
                <DropZoneWrapper>
                  <DropzoneArea
                    acceptedFiles={['image/*', 'application/pdf']}
                    onChange={(files) => handleInputChange(
                      'id_proof',
                      (files[0]) ? files[0] : ''
                    )
                    }
                    filesLimit={1}
                    Icon={Add}
                    dropzoneText="Govt Issued Photo Id"
                  />
                </DropZoneWrapper>
              </Grid>

              <Grid item md={4}>
                <DropZoneWrapper>
                  <DropzoneArea
                    acceptedFiles={['image/*', 'application/pdf']}
                    onChange={(files) => handleInputChange(
                      'super_speciality_proof',
                      (files[0]) ? files[0] : ''
                    )
                    }
                    filesLimit={1}
                    Icon={Add}
                    dropzoneText="Super Specialization Proof"
                  />
                </DropZoneWrapper>

              </Grid>
            </Grid>
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="center" gutterBottom>
            You can alternatively submit documents over Whatsapp (or) Email at
            {' '}
            <Link>
              +91-
              <a href={masterData !== null ? `tel:+91-${masterData.phone}` : ""} style={{ textDecoration: 'none', color: '#ff2100' }}>+91-{masterData !== null ? masterData.phone : ""}</a>
            </Link>
            {' '}
            Or
            {' '}
            <Link>
              <a href={masterData !== null ? `mailto:${masterData.email}` : ""} style={{ textDecoration: 'none', color: '#ff2100', textTransform: 'lowercase' }}>{masterData !== null ? masterData.email : ""}</a>
            </Link>
          </Typography>
          <div align="center" style={{ marginTop: 20 }}>
            <Button
              variant="contained"
              style={{ marginRight: 10 }}
              href={masterData !== null ? `mailto:${masterData.email}` : ""}
            >
              <MailOutlineOutlined style={{ marginRight: 10 }} />
              Mail Us
            </Button>
            <Button variant="contained" color="primary">
              <PhoneAndroidOutlined style={{ marginRight: 10 }} />
              WhatsApp Us
            </Button>
          </div>
        </Grid>
      </Grid>
      <div
        style={{ display: 'flex', marginTop: 50, justifyContent: 'flex-end' }}
      >
        {/* <Button
          variant="contained"
          color="default"
          disabled={
            props.basicDoctorInfo
            && (props.basicDoctorInfo !== null)
            && (Object.keys(props.basicDoctorInfo).length > 0)
          }
          onClick={handleBack}
          style={{ marginRight: 10 }}
        >
          Back
        </Button> */}
        <Button
          variant="contained"
          color=""
          onClick={async () => await handleUploadDocSubmit(1)}
          style={{ marginRight: 10 }}
        >
          I Will do it later
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={isVerficationSubmitBtnDisabled}
          onClick={async () => await handleUploadDocSubmit(0)}
        >
          Save & Continue
        </Button>
      </div>
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
    </UploadDocWrapper>
  );
};

UploadDocuments.propTypes = {
  classes: PropTypes.object.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  basicDoctorInfo: state.get('authReducer').basicDoctorInfo,
  hashedKey: state.get('authReducer').hashedKey,
});

export default connect(mapStateToProps, null)(withStyles(styles)(UploadDocuments));
