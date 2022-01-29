import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import Delete from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { connect } from 'react-redux';
import MaterialDropZone from './DropZone/MaterialDropZone';
import MainPapperBlock from '../MainPapperBlock/MainPapperBlock';
import API from '../../../helpers/api';
import { fetchConsultationDetails } from '../../../redux/actions/appointmentAction';
import { fetchImageOrDocument } from '../../../redux/actions/dashboardActions';
import GetApp from '@material-ui/icons/GetApp';

class Attachments extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
      selectedFile: null,
      tooltipOpen: false,
      description: '',
      showPreviews: true,
      snackBarInfo: {
        isSnackBarOpen: false,
        snackBarText: '',
        snackBarSeverity: 'success',
      }
    };
  }

  handleTooltipClose = () => {
    this.setState({ tooltipOpen: false });
  };

  handleTooltipOpen = () => {
    this.setState({ tooltipOpen: true });
  };

  formatDate = (dateMilli) => {
    var d = (new Date(dateMilli) + '').split(' ');
    d[2] = d[2] + ',';

    return [d[0], d[1], d[2], d[3]].join(' ');
  }


  render() {
    if (this.props.imagesOrDocs == null) {
      this.props.fetchImageOrDocument()
    }
    const {
      files, tooltipOpen, description, snackBarInfo
    } = this.state;
    const attachments = this.props.consultationDetails.appointment_attachments;

    return (
      <>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} md={8}>
            <MainPapperBlock title="Attachments" desc="You have not uploaded any Doc(Max 300kb)">
              <Fragment>
                <div>
                  <Grid container spacing={4}>
                    <Grid item sm={8}>
                      <MaterialDropZone
                        files={files}
                        showPreviews={this.state.showPreviews}
                        acceptedFiles={['image/*', 'application/pdf']}
                        maxSize={5000000}
                        filesLimit={1}
                        fetchUploadedDoc={(selectedFile) => this.handleFileUpload(selectedFile)}
                        text="Upload File( PDF, JPEG, PNG )"
                      />
                    </Grid>
                    <Grid item sm={4}>
                      <label>Description</label>
                      <TextField
                        id="outlined-multiline-static"
                        placeholder="Describe about document here..."
                        multiline
                        rows="7"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={description}
                        onChange={(e) => this.setState({ description: e.target.value })}
                        style={{ marginTop: 3, marginBottom: 22 }}
                        inputProps={{ maxLength: 250 }}
                      />
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={async () => await this.addAttachments()}
                      >
                        Upload
                      </Button>
                    </Grid>
                  </Grid>

                </div>
              </Fragment>
              <Grid container spacing={1} style={{ borderBottom: '1px solid', padding: '10px 5px' }}>
                <Grid item sm={4}><b>File Name</b></Grid>
                <Grid item sm={2}><b>Uploaded by</b></Grid>
                <Grid item sm={2}><b>Description</b></Grid>
                <Grid item sm={3}><b>Date</b></Grid>
                <Grid item sm={1} />
              </Grid>
              {(attachments !== null) && (attachments.length > 0) && attachments.map((attachment, index) => (
                <Grid container spacing={1} style={{ padding: '10px 5px' }} key={index}>
                  <Grid
                    item
                    sm={4}
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      fontSize: 14
                    }}
                  >
                    <InsertDriveFile />
                    {' '}
                    <a href={`${this.props.imagesOrDocs.appointment_attachment_prefix_url}${attachment.name}`} target="_blank">{attachment.name}</a>
                  </Grid>
                  <Grid item sm={2}>{attachment.uploaded_by}</Grid>
                  <Grid item sm={2}>
                    <ClickAwayListener onClickAway={this.handleTooltipClose}>
                      <div>
                        <Tooltip
                          PopperProps={{
                            disablePortal: true,
                          }}
                          onClose={this.handleTooltipClose}
                          tooltipOpen={tooltipOpen}
                          // disableFocusListener
                          // disableHoverListener
                          // disableTouchListener
                          title={attachment.description}
                          placement="top"
                        >
                          <Button onClick={this.handleTooltipOpen} variant="contained" style={{ fontWeight: 500, textTransform: 'capitalize', color: 'blue' }}>Hover here</Button>
                        </Tooltip>
                      </div>
                    </ClickAwayListener>
                  </Grid>
                  <Grid item sm={2}>{this.formatDate(attachment.updated_at)}</Grid>
                  <Grid item sm={2} style={{ textAlign: 'right' }}>
                    {/* <Tooltip title="Download">
                      <Button variant="contained" style={{ marginRight: 4, minWidth: 10 }}>
                        <GetApp
                          style={{ cursor: 'pointer' }}
                        />
                      </Button>
                    </Tooltip> */}
                    <Tooltip title="Delete">
                      <Button variant="contained" style={{ minWidth: 10 }}>
                        <Delete
                          onClick={async () => await this.removeAttachment(attachment.id)}
                          color="primary"
                          style={{ cursor: 'pointer' }}
                        />
                      </Button>
                    </Tooltip>
                  </Grid>
                </Grid>
              ))
              }
            </MainPapperBlock>
          </Grid>
        </Grid>

        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={snackBarInfo.isSnackBarOpen}
          autoHideDuration={2000}
          onClose={this.handleSnackbarClose}
        >
          <MuiAlert
            severity={snackBarInfo.snackBarSeverity}
            onClose={this.handleSnackbarClose}
            elevation={6}
            variant="filled"
            {...this.props}
          >
            {snackBarInfo.snackBarText}
          </MuiAlert>
        </Snackbar>
      </>
    );
  }

  handleFileUpload = (uploadFiles) => {
    this.setState({ selectedFile: uploadFiles[0] });
  }

  addAttachments = async () => {
    const api = new API();
    const { selectedFile, description } = this.state;

    const formdata = new FormData();

    formdata.append('attachment', selectedFile);
    formdata.append('description', description);
    formdata.append('appointment_id', this.props.consultationDetails.id);

    await api.ACCOUNTS_URI().post('appointments/consultation/updateAttachments', formdata, {
      "Content-Type": "multipart/form-data"
    })
      .then((uploadDocResp) => {
        if (uploadDocResp.data.success) {
          this.setState({
            files: [],
            selectedFile: null,
            tooltipOpen: false,
            description: '',
            showPreviews: false,
            snackBarInfo: {
              isSnackBarOpen: true,
              snackBarText: 'Documents uploaded successfully',
              snackBarSeverity: 'success',
            }
          });

          this.props.fetchConsultationDetails(this.props.selectedQueueId);
        } else if (
          (uploadDocResp.data.errorMessage)
          && (uploadDocResp.data.errorMessage.attachment)
        ) {
          this.setState({
            snackBarInfo: {
              isSnackBarOpen: true,
              snackBarText: uploadDocResp.data.errorMessage.attachment,
              snackBarSeverity: 'error',
            }
          });
        } else {
          this.setState({
            snackBarInfo: {
              isSnackBarOpen: true,
              snackBarText: 'Could not upload the documents',
              snackBarSeverity: 'error',
            }
          });
        }
      })
      .catch(() => {
        this.setState({
          snackBarInfo: {
            isSnackBarOpen: true,
            snackBarText: 'Internal Server Error',
            snackBarSeverity: 'error',
          }
        });
      });
  }

  removeAttachment = async (selectedId) => {
    const api = new API();
    // const { selectedFile } = this.state;

    // const formdata = new FormData();
    const data = {
      attachment_id: selectedId,
      appointment_id: this.props.consultationDetails.id
    };

    // formdata.append('attachment', selectedFile);
    // formdata.append('appointment_id', this.props.consultationDetails.id);

    await api.ACCOUNTS_URI().post('appointments/consultation/removeAttachment', data)
      .then((deleteDocResp) => {
        if (deleteDocResp.data.success) {
          this.setState({
            snackBarInfo: {
              isSnackBarOpen: true,
              snackBarText: 'Documents deleted successfully',
              snackBarSeverity: 'success',
            }
          });
          this.props.fetchConsultationDetails(this.props.selectedQueueId);
        } else if (
          (deleteDocResp.data.errorMessage)
          && (deleteDocResp.data.errorMessage.attachment)
        ) {
          this.setState({
            snackBarInfo: {
              isSnackBarOpen: true,
              snackBarText: deleteDocResp.data.errorMessage.attachment,
              snackBarSeverity: 'error',
            }
          });
        } else {
          this.setState({
            snackBarInfo: {
              isSnackBarOpen: true,
              snackBarText: 'Could not delete the documents',
              snackBarSeverity: 'error',
            }
          });
        }
      })
      .catch(() => {
        this.setState({
          snackBarInfo: {
            isSnackBarOpen: true,
            snackBarText: 'Internal Server Error',
            snackBarSeverity: 'error',
          }
        });
      });
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      snackBarInfo: {
        isSnackBarOpen: false,
        snackBarText: '',
        snackBarSeverity: 'success',
      }
    });
  };
}

const mapStateToProps = state => ({
  consultationDetails: state.get('appointmentReducer').consultaitionDetails,
  imagesOrDocs: state.get('dashboardReducer').imagesOrDocs,
  selectedQueueId: state.get('appointmentReducer').selectedQueueId,
});

export default connect(mapStateToProps, { fetchConsultationDetails, fetchImageOrDocument })(Attachments);
