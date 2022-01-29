import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import VerifiedUser from '@material-ui/icons/VerifiedUser';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import Icon from '@material-ui/core/Icon';
// import Slide from '@material-ui/core/Slide';
import logo from 'enl-images/brand-logo.png';
import imgApi from 'enl-api/images/photos';

import { connect } from 'react-redux';
import Loading from 'enl-components/Loading';
import styles from './cardStyle-jss';
import AddClinic from './Dialogs/AddClinic';
import { fetchAllClinics } from '../../../redux/actions/profileActions';

const LocationOfPractice = (props) => {
  const { classes, clinicDetails, imagesOrDocs, isVerified } = props;

  const [clinicId, setClinicId] = React.useState(null);
  const [showAddOrEditClinic, setShowAddOrEditClinic] = React.useState(false);

  const renderClinicData = () => {

    if (clinicDetails.length > 0) {
      return clinicDetails.map((clinicData) => {
        let clinicAddressData = (clinicData.address && (clinicData.address !== null)) ? clinicData.address : '';

        if ((clinicData.pincode) && (clinicData.pincode !== null)) {
          clinicAddressData = `${clinicAddressData}, ${clinicData.pincode}`;
        }

        let clinicLogo = logo;

        if (
          (clinicData.logo !== undefined)
          && (clinicData.logo !== null)
          && (clinicData.logo.length > 0)
        ) {
          clinicLogo = imagesOrDocs.clinic_images_prefix_url + clinicData.logo;
        }

        let clinicCover = imgApi[1];

        if (
          (clinicData.photos_array[0] !== undefined)
          && (clinicData.photos_array[0] !== null)
          && (clinicData.photos_array.length > 0)
        ) {
          clinicCover = imagesOrDocs.clinic_images_prefix_url + clinicData.photos_array[0];
        }

        return (
          <Grid item md={4} sm={6} xs={12} key={`clinicData-${clinicData.id}`}>
            <Card className={classes.cardSocmed}>
              <CardMedia
                className={classes.mediaProfile}
                image={clinicCover}
                title="cover"
              />
              <CardContent className={classes.contentProfile}>
                <Avatar className={classes.avatarBig}>
                  <img src={clinicLogo} alt={logo} />
                </Avatar>
                <Typography
                  variant="h6"
                  className={classes.name}
                  gutterBottom
                >
                  {clinicData.name && clinicData.name}
                  {isVerified && (
                    <VerifiedUser className={classes.verified} />
                  )}
                </Typography>
                <Typography className={classes.subheading} gutterBottom>
                  {clinicAddressData}
                </Typography>
                <Typography variant="caption" component="p">
                  {clinicData.phones}
                </Typography>
                <Button
                  className={classes.clinicButton}
                  size="small"
                  variant="outlined"
                  color="secondary"
                  style={{ marginTop: 15 }}
                  onClick={() => handleAddEditButtonClick(clinicData.id)}
                >
                  <Icon>edit_location</Icon>
                  Edit Clinic
                </Button>
              </CardContent>
            </Card>
          </Grid>
        );
      })
    } else {
      return (
        <div className={classes.noDetails}>
          <ErrorOutline style={{ fontSize: 80 }} />
          <Typography>No Clinics Found</Typography>
        </div>
      )
    }
  }

  const handleAddEditButtonClick = (addEditClinicId) => {
    setClinicId(addEditClinicId)
    setShowAddOrEditClinic(true)
  }

  const closeAddEditModal = () => {
    setClinicId(null)
    setShowAddOrEditClinic(false)
  }

  if (
    (clinicDetails === null)
    || (imagesOrDocs === null)
  ) {
    fetchAllClinics()
    return <Loading />;
  }

  return (
    <Paper elevation={3}>
      <Card className={classes.cardSocmed}>
        <CardContent>
          <Grid
            container
            alignItems="flex-start"
            direction="row"
            spacing={2}
            className={classes.rootx}
          >
            <Grid item md={12} sm={12} xs={12} align="right">

              <Button
                className={classes.buttonProfile}
                size="small"
                variant="outlined"
                onClick={() => handleAddEditButtonClick(null)}
                style={{ margin: 0 }}
              >
                <Icon>add_location</Icon>
                Add Clinic
              </Button>
            </Grid>

            {renderClinicData()}

          </Grid>
        </CardContent>
      </Card>
      {
        (showAddOrEditClinic === true)
        && (
          <AddClinic
            clinicId={clinicId}
            closeAddEditModal={closeAddEditModal}
          />
        )
      }

    </Paper>
  )
}

LocationOfPractice.propTypes = {
  classes: PropTypes.object.isRequired,
  // cover: PropTypes.string.isRequired,
  // avatar: PropTypes.string.isRequired,
  isVerified: PropTypes.bool,
  clinicDetails: PropTypes.any,
};

LocationOfPractice.defaultProps = {
  isVerified: false,
};

const mapStateToProps = state => ({
  clinicDetails: state.get('profileReducer').clinicDetails,
  imagesOrDocs: state.get('dashboardReducer').imagesOrDocs,
});

export default connect(mapStateToProps, { fetchAllClinics })(withStyles(styles)(LocationOfPractice));
