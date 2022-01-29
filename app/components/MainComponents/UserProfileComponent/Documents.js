import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DropzoneArea } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import imgApi from 'enl-api/images/photos';
import { Link } from '@material-ui/core';
import PhoneAndroidOutlined from '@material-ui/icons/PhoneAndroidOutlined';
import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';
import { Add } from '@material-ui/icons';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import PictureAsPdf from '@material-ui/icons/Attachment';
import Panorama from '@material-ui/icons/Attachment';
import GetApp from '@material-ui/icons/GetApp';
import API from '../../../helpers/api';
import styles from './profile-jss';
import { fetchDoctorProfileDetails } from '../../../redux/actions/profileActions';

// Styled component named StyledButton
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

// initialization
const api = new API();

function Documents(props) {
  const {
    classes, doctorProfileDetails, imagesOrDocs, masterData
  } = props;

  if (imagesOrDocs === null) {
    return null;
  }

  const userInLocalStorage = localStorage.getItem('userInfo');
  const parsedUserInfo = JSON.parse(userInLocalStorage);

  const { documents_prefix_url } = imagesOrDocs;
  const {
    id_proof, med_reg_certificate, super_speciality_proof, optional_certificates
  } = doctorProfileDetails;


  const [verificationDocs, setVerificationDocs] = useState({
    skip: 0,
    med_reg_certificate: med_reg_certificate || null,
    id_proof: id_proof || null,
    super_speciality_proof: super_speciality_proof || null,
    optional_certificates: optional_certificates || null,
    optional_certificate_names: [],
    certificateName: '',
  });

  const [snackBarInfo, setSnackbarInfo] = useState({
    isSnackBarOpen: false,
    snackBarText: '',
    snackBarSeverity: 'success',
  });

  const isVerified = (parsedUserInfo !== null && parsedUserInfo !== undefined) ? ((Object.keys(parsedUserInfo).length !== 0) ? parsedUserInfo.verified : false) : false;

  const handleInputChange = (eventId, eventValue) => {
    const intermediateVerificationObj = { ...verificationDocs };

    intermediateVerificationObj[eventId] = eventValue;

    // setVerificationDocs(intermediateVerificationObj, async () => await updateDocuments());
    setVerificationDocs(intermediateVerificationObj);
  };

  const updateDocuments = async () => {
    const formData = new FormData();

    // formData.append('skip', verificationDocs.skip);
    // if (!(documents_prefix_url && (documents_prefix_url !== null) && med_reg_certificate && (med_reg_certificate !== null))) {
    //   formData.append('med_reg_certificate', verificationDocs.med_reg_certificate);
    // }
    // if (!(documents_prefix_url && (documents_prefix_url !== null) && super_speciality_proof && (super_speciality_proof !== null))) {
    //   formData.append('super_speciality_proof', verificationDocs.super_speciality_proof);
    // }
    // if (!(documents_prefix_url && (documents_prefix_url !== null) && id_proof && (id_proof !== null))) {
    //   formData.append('id_proof', verificationDocs.id_proof);
    // }
    // console.log(verificationDocs.optional_certificates)
    if (verificationDocs.optional_certificates) {
      const names = [];
      names.push(verificationDocs.certificateName);
      formData.append('optional_certificate', verificationDocs.optional_certificates);
      formData.append('optional_certificate_name', names);
    }

    await api.ACCOUNTS_URI().post('profile/modifyCertificates', formData)
      .then((responseData) => {
        if (responseData.status === 200) {
          if ((responseData.data.success === true)) {
            props.fetchDoctorProfileDetails();
            setVerificationDocs({
              ...verificationDocs,
              certificateName: '',
              optional_certificate_names: [],
              optional_certificates: null
            });
            setSnackbarInfo({
              isSnackBarOpen: true,
              snackBarText: 'Document uploaded successfully',
              snackBarSeverity: 'success',
            });
          } else {
            setSnackbarInfo({
              isSnackBarOpen: true,
              snackBarText: 'Error while submitting the document',
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
      });
  };

  const updateVerificationDocuments = async () => {
    const formData = new FormData();

    formData.append('skip', verificationDocs.skip);
    if (!(documents_prefix_url && (documents_prefix_url !== null) && med_reg_certificate && (med_reg_certificate !== null))) {
      formData.append('med_reg_certificate', verificationDocs.med_reg_certificate);
    }
    if (!(documents_prefix_url && (documents_prefix_url !== null) && super_speciality_proof && (super_speciality_proof !== null))) {
      formData.append('super_speciality_proof', verificationDocs.super_speciality_proof);
    }
    if (!(documents_prefix_url && (documents_prefix_url !== null) && id_proof && (id_proof !== null))) {
      formData.append('id_proof', verificationDocs.id_proof);
    }

    await api.ACCOUNTS_URI().post('profile/updateCertificates', formData)
      .then((responseData) => {
        if (responseData.status === 200) {
          if ((responseData.data.success === true)) {
            props.fetchDoctorProfileDetails();
            setVerificationDocs({
              ...verificationDocs,
              certificateName: '',
              optional_certificate_names: [],
              optional_certificates: null
            });
            setSnackbarInfo({
              isSnackBarOpen: true,
              snackBarText: 'Document uploaded successfully',
              snackBarSeverity: 'success',
            });
          } else {
            setSnackbarInfo({
              isSnackBarOpen: true,
              snackBarText: 'Error while submitting the document',
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

  const downloadFile = (type) => {
    api.ACCOUNTS_URI().post('profile/downloadDocument', {
      document_type: type
    }, {
      responseType: 'blob',
    })
      .then((response) => {
        if (response.status == 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${type}.jpg`);
          document.body.appendChild(link);
          link.click();
        } else {
          setSnackbarInfo({
            isSnackBarOpen: true,
            snackBarText: "Some error occured",
            snackBarSeverity: 'error',
          });
        }
      }, (err) => {
        setSnackbarInfo({
          isSnackBarOpen: true,
          snackBarText: err.message,
          snackBarSeverity: 'error',
        });
      });
  };

  function isFileImage(file) {
    return file && file.type.split('/')[0] === 'image';
  }


  return (
    <>
      <Paper elevation={3}>
        <Card className={classes.cardSocmed} style={{ marginBottom: 20 }}>
          <CardContent>
            {isVerified ? (
              <Typography variant="inherit" color="inherit">
                Documents you have submitted are Verified.
              </Typography>
            ) : (
              <Typography variant="inherit" color="inherit">
                Documents you have submitted are under verification. We will notify
                you once status is changed.
              </Typography>
            )}
            <Grid
              container
              alignItems="center"
              justify="space-between"
              direction="row"
              spacing={2}
              style={{ marginTop: 10 }}
            >

              <Grid item md={9} sm={9} xs={9}>
                <Card>
                  <Grid container>
                    {
                      (documents_prefix_url
                        && (documents_prefix_url !== null)
                        && med_reg_certificate
                        && (med_reg_certificate !== null))
                        ? (
                          <Grid item md={4} sm={12} xs={12}>
                            <CardContent
                              image={documents_prefix_url + med_reg_certificate}
                              title="Medical Registration Certificate"
                              align="center"
                              className={classes.positionRelative}
                            >
                              {isVerified ? (<span className={classes.verifyBadge}>Verified</span>) : (<span className={classes.notVerifyBadge}>Not Verified</span>)}
                              {/* <img
                                src={documents_prefix_url + med_reg_certificate}
                                alt="Medical Registration Certificate"
                                style={{ marginBottom: 10, width: "1050px", height: "171px" }}
                              /> */}
                              <div className={classes.doc}>
                                <PictureAsPdf />
                                <Typography variant="inherit" align="center" color="inherit">
                                  Medical Registration Certificate
                                </Typography>
                                {/* <a target="_blank" href={`${documents_prefix_url}${med_reg_certificate}`}>jrehj</a> */}
                                <a href={documents_prefix_url + med_reg_certificate} target="_blank">
                                  Download
                                  <GetApp />
                                </a>
                              </div>
                            </CardContent>
                          </Grid>
                        )
                        : (
                          <Grid item md={4} sm={12} xs={12}>
                            <DropZoneWrapper>
                              <DropzoneArea
                                acceptedFiles={['image/*', 'application/pdf']}
                                onChange={(files) => handleInputChange(
                                  'med_reg_certificate',
                                  (files[0]) ? files[0] : null,
                                )
                                }
                                filesLimit={1}
                                Icon={Add}
                                dropzoneText="Medical Registration Certificate"
                              />
                            </DropZoneWrapper>
                          </Grid>
                        )}

                    {
                      (documents_prefix_url
                        && (documents_prefix_url !== null)
                        && super_speciality_proof
                        && (super_speciality_proof !== null))
                        ? (
                          <Grid item md={4} sm={12} xs={12}>
                            <CardContent
                              image={documents_prefix_url + super_speciality_proof}
                              title="Super Specialization"
                              align="center"
                              className={classes.positionRelative}
                            >
                              {isVerified ? (<span className={classes.verifyBadge}>Verified</span>) : (<span className={classes.notVerifyBadge}>Not Verified</span>)}
                              {/* <img
                                src={documents_prefix_url + super_speciality_proof}
                                alt=""
                                style={{ marginBottom: 10, width: "1050px", height: "171px" }}
                              /> */}
                              <div className={classes.doc}>
                                <Panorama />
                                <Typography variant="inherit" align="center" color="inherit">
                                  Super Speciality Proof
                                </Typography>
                                <a href={documents_prefix_url + super_speciality_proof} target="_blank">
                                  Download
                                  <GetApp />
                                </a>
                              </div>
                            </CardContent>
                          </Grid>
                        )
                        : (
                          <Grid item md={4}>
                            <DropZoneWrapper>
                              <DropzoneArea
                                acceptedFiles={['image/*', 'application/pdf']}
                                onChange={(files) => handleInputChange(
                                  'super_speciality_proof',
                                  (files[0]) ? files[0] : null,
                                )
                                }
                                filesLimit={1}
                                Icon={Add}
                                dropzoneText="Proof for super-specialization"
                              />
                            </DropZoneWrapper>
                          </Grid>
                        )}

                    {
                      (documents_prefix_url
                        && (documents_prefix_url !== null)
                        && id_proof
                        && (id_proof !== null))
                        ? (
                          <Grid item md={4} sm={12} xs={12}>
                            <CardContent
                              image={documents_prefix_url + id_proof}
                              title="Id Proof"
                              align="center"
                              className={classes.positionRelative}
                            >
                              {isVerified ? (<span className={classes.verifyBadge}>Verified</span>) : (<span className={classes.notVerifyBadge}>Not Verified</span>)}
                              {/* <img
                                src={documents_prefix_url + id_proof}
                                alt=""
                                style={{ marginBottom: 10, width: "1050px", height: "171px" }}
                              /> */}
                              <div className={classes.doc}>
                                <Panorama />
                                <Typography variant="inherit">
                                  Government issued photo id proof
                                </Typography>
                                <a href={documents_prefix_url + id_proof} target="_blank">
                                  Download
                                  <GetApp />
                                </a>
                              </div>
                            </CardContent>
                          </Grid>
                        )
                        : (
                          <Grid item md={4}>
                            <DropZoneWrapper>
                              <DropzoneArea
                                acceptedFiles={['image/*', 'application/pdf']}
                                onChange={(files) => handleInputChange(
                                  'id_proof',
                                  (files[0]) ? files[0] : null,
                                )
                                }
                                filesLimit={1}
                                Icon={Add}
                                dropzoneText="Govt Issued Photo Id"
                              />
                            </DropZoneWrapper>
                          </Grid>
                        )}
                    {
                      (documents_prefix_url
                        && (documents_prefix_url !== null)
                        && id_proof
                        && (id_proof !== null)) ? ('') : (
                        <Grid
                          item
                          md={12}
                          style={{
                            marginTop: 'auto', marginBottom: 4, textAlign: 'end', paddingLeft: 8, marginTop: 16, textAlign: 'center'
                          }}
                        >
                          <Button variant="contained" disabled={verificationDocs.med_reg_certificate == null && verificationDocs.super_speciality_proof == null && verificationDocs.id_proof == null} onClick={async () => await updateVerificationDocuments()}>Upload</Button>
                        </Grid>
                      )}
                  </Grid>
                </Card>

              </Grid>


              <Grid item md={3} sm={12} xs={12}>
                <Card>
                  <CardContent
                    image={imgApi[3]}
                    title="Other Certificate"
                    align="center"
                    style={{ paddingBottom: 12 }}
                  >
                    <DropZoneWrapper>
                      <DropzoneArea
                        files={verificationDocs.optional_certificates}
                        acceptedFiles={['image/*', 'application/pdf']}
                        onChange={(files) => handleInputChange(
                          'optional_certificates',
                          (files[0]) ? files[0] : null,
                        )
                        }
                        // onDelete={() => handleInputChange("certificateName", '')}
                        filesLimit={1}
                        Icon={Add}
                        dropzoneText="Other Certificates (optional)"
                      />
                    </DropZoneWrapper>
                    <Grid container justify="space-between" style={{ paddingLeft: '2.5%', paddingRight: '2.5%' }}>
                      <Grid item md={8}>
                        <TextField
                          required
                          id="confirm"
                          name="filename"
                          placeholder="File Name"
                          fullWidth
                          value={verificationDocs.certificateName}
                          autoComplete="name"
                          onChange={(e) => handleInputChange('certificateName', e.target.value)}
                          // onDelete={() => setVerificationDocs(...{ certificateName: '' })}
                          // onBlur={async () => (verificationDocs.certificateName.length > 0) && await updateDocuments()}
                          style={{ padding: '12px 0 0' }}
                        />
                      </Grid>
                      <Grid
                        item
                        md={4}
                        style={{
                          marginTop: 'auto', marginBottom: 4, textAlign: 'end', paddingLeft: 8
                        }}
                      >
                        <Button variant="contained" fullWidth disabled={verificationDocs.certificateName == ''} onClick={async () => (verificationDocs.certificateName.length > 0) && await updateDocuments()}>Upload</Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card className={classes.cardSocmed} style={{ marginBottom: 20 }}>
                  <Grid container>
                    <Grid item md={12} style={{padding: '8px 16px 0'}}><b>Optional Certificates</b></Grid>
                    {
                      (optional_certificates
                        && optional_certificates.length !== 0
                        && optional_certificates !== null) && (
                        <>
                          {optional_certificates.map((doc) => {
                            return (
                              <Grid item md={3} sm={12} xs={12} key={doc.id}>
                                <CardContent
                                  align="center"
                                  className={classes.positionRelative}
                                >
                                  <div className={classes.doc}>
                                    <Panorama />
                                    <Typography variant="inherit">
                                      {doc.display_name}
                                    </Typography>
                                    <a href={documents_prefix_url + doc.name} target="_blank">
                                      Download
                                      <GetApp />
                                    </a>
                                  </div>
                                </CardContent>
                              </Grid>
                            )
                          })}
                        </>
                      )
                    }
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" align="center" gutterBottom>
                  You can alternatively submit documents over Whatsapp on&nbsp;
                  <a href={masterData !== null ? `tel:+91-${masterData.phone}` : ''} style={{ textDecoration: 'none', color: '#ff2100' }}>
                    +91-
                    {masterData !== null ? masterData.phone : ''}
                  </a>
                  &nbsp;or Email at &nbsp;
                  <a href={masterData !== null ? `mailto:${masterData.email}` : ''} style={{ textDecoration: 'none', color: '#ff2100', textTransform: 'lowercase' }}>{masterData !== null ? masterData.email : ''}</a>
                </Typography>
                <div align="center" style={{ marginTop: 20 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: 10 }}
                    href={masterData !== null ? `mailto:${masterData.email}` : ''}
                  >
                    <MailOutlineOutlined style={{ marginRight: 10 }} />
                    Mail
                  </Button>
                  <Button variant="contained" style={{ backgroundColor: '#4caf50', color: '#fff' }}>
                    <PhoneAndroidOutlined style={{ marginRight: 10 }} />
                    WhatsApp
                  </Button>
                </div>
              </Grid>

            </Grid>
          </CardContent>
        </Card>
      </Paper>
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
Documents.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  doctorProfileDetails: state.get('profileReducer').doctorProfileDetails,
  imagesOrDocs: state.get('dashboardReducer').imagesOrDocs,
});

export default connect(mapStateToProps, { fetchDoctorProfileDetails })(withStyles(styles)(Documents));
