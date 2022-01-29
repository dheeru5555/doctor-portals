import React from 'react';
import {
  Grid,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import Type from 'enl-styles/Typography.scss';
import { connect } from 'react-redux';
import Loading from 'enl-components/Loading';
import { fetchMasterData } from '../../../redux/actions/dashboardActions';
import { fetchDoctorProfileDetails } from '../../../redux/actions/profileActions';
import { fade } from '@material-ui/core/styles/colorManipulator';
import UpdateBasic from './Dialogs/UpdateBasic';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    textAlign: 'center'
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  top: {
    color: '#ff2100',
    position: 'absolute',
    left: 0
  },
  circle: {
    strokeLinecap: 'round',
  },
  cover: {
    boxShadow: '0px 1px 8px 0px rgb(80 80 80 / 20%), 0px 3px 4px 0px rgb(80 80 80 / 14%), 0px 3px 3px -2px rgb(80 80 80 / 12%)',
    borderRadius: 12
  },
  content: {
    borderRadius: '12px 12px 0 0'
  },
  profilePicContainer: {
    position: 'relative',
    width: 'fit-content'
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: '-10%',
    background: '#ff2100',
    color: '#fff',
    "&:hover": {
      background: '#ff2100'
    }
  }
}));

function Cover(props) {
  const { doctorProfileDetails, masterData } = props;
  const classes = useStyles();

  const localUserInfo = localStorage.getItem('userInfo')
  const parsedUserInfo = JSON.parse(localUserInfo)

  const isVerified = parsedUserInfo ? parsedUserInfo.verified : false;
  
  if (
    (doctorProfileDetails == null)
    || (masterData == null)
  ) {
    return <Loading />;
  } else {
    const avatarUrl = doctorProfileDetails.avatar_url;

    return (
      <div
        className={classes.cover}
        style={{ backgroundColor: '#ffffff', height: 250 }}
      >
        <div className={classes.content} style={{ backgroundColor: '#ffffff', padding: 30 }}>
          <Grid container className={classes.colList}>
            <Grid item md={2} xs={12} align="center">
              <div className={classes.profilePicContainer}>
                <img src={doctorProfileDetails.avatar_url} alt="" height="130" width="130" style={{ borderRadius: 20 }} />
              </div>
            </Grid>
            <Grid item md={7} xs={12} align="left" style={{ marginTop: 30 }}>
              <Typography variant="h5" className={Type.textGreyDark}>
                {
                  ((doctorProfileDetails !== null)
                    ? `${doctorProfileDetails.title} ${doctorProfileDetails.first_name} ${doctorProfileDetails.last_name}` : 'Not Specified')
                }
              </Typography>
              <Typography className={Type.textGreyDark}>
                {((doctorProfileDetails !== null) && (doctorProfileDetails.gender))
                  ? `${doctorProfileDetails.gender === 'm' ? 'Male' : 'Female'}` : 'Not Specified'}
              </Typography>
              <UpdateBasic profileDetails={doctorProfileDetails} masterData={masterData} />
            </Grid>
            <Grid item md={3} xs={12}>
              { !isVerified && <img width={170} style={{float: 'right'}} src={'https://media.istockphoto.com/vectors/pending-red-grunge-round-vintage-rubber-stamp-vector-id957832522?b=1&k=20&m=957832522&s=170667a&w=0&h=3ZXlxOKO4s4C0qKrqCDfCZHc1cgj_RtGvWEN7Xom9P8='} /> }
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  masterData: state.get("dashboardReducer").masterData,
  doctorProfileDetails: state.get('profileReducer').doctorProfileDetails,
});

export default connect(mapStateToProps, { fetchMasterData, fetchDoctorProfileDetails })(injectIntl(Cover));
