import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import imgApi from 'enl-api/images/photos';
import Button from '@material-ui/core/Button';
import PermIdentityOutlined from '@material-ui/icons/PermIdentityOutlined';
import PhoneAndroidOutlined from '@material-ui/icons/PhoneAndroidOutlined';
import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';
import WcOutlined from '@material-ui/icons/WcOutlined';
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined';
import LocalHospitalOutlined from '@material-ui/icons/LocalHospitalOutlined';
import AssignmentIndOutlined from '@material-ui/icons/AssignmentIndOutlined';
import CalendarTodayOutlined from '@material-ui/icons/CalendarTodayOutlined';
import AddLocationOutlined from '@material-ui/icons/AddLocationOutlined';
import LanguageOutlined from '@material-ui/icons/LanguageOutlined';
import MoneyOutlined from '@material-ui/icons/MoneyOutlined';
import Link from '@material-ui/core/Link';
import { connect } from "react-redux";
import history from "../../../utils/history";

const useStyles = makeStyles((theme) => ({
  box: {
    padding: theme.spacing(3),
  },
  title: {
    marginTop: 30,
  },
  ListItemRoot: {
    whiteSpace: 'unset',
    wordBreak: 'break-all'
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  status: {
    textAlign: 'center',
    padding: '5px 10px',
    background: '#ff000069',
    color: 'white',
    fontWeight: 600,
    width: 140,
    margin: 'auto',
    borderRadius: 10,
    fontSize: 'small',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotate(-45deg)'
  },
  positionRelative: {
    position: 'relative'
  },
  avatar: {
    width: 102,
    borderRadius: 10
  }
}));

const Success = (props) => {

  const { basicDoctorInfo, doctorRegInfo,
    masterData, superSpecializationStoreList } = props;

  const classes = useStyles();

  const handleProfileClick = () => {
    history.push("/login");
  }

  let avatar = imgApi[7];

  if (basicDoctorInfo && basicDoctorInfo.avatar) {
    avatar = basicDoctorInfo.avatar;
  }

  let name = "";

  if (doctorRegInfo && doctorRegInfo.title && doctorRegInfo.first_name && doctorRegInfo.last_name) {
    name = `${doctorRegInfo.title} ${doctorRegInfo.first_name} ${doctorRegInfo.last_name} !`
  }

  let doctorSpeciality = masterData.specializations[0].name;

  let doctorSuperSpeciality = superSpecializationStoreList.super_specializations[0].name;

  if (basicDoctorInfo && basicDoctorInfo.speciality_id) {
    const filteredDoctorSpecialityInfo = masterData.specializations.find((skill) => skill.id === basicDoctorInfo.speciality_id);
    if (filteredDoctorSpecialityInfo) {
      doctorSpeciality = filteredDoctorSpecialityInfo.name;
    }
  }

  if (basicDoctorInfo && basicDoctorInfo.super_speciality_id) {
    const filteredDoctorSuperInfo = superSpecializationStoreList.super_specializations.find((skill) => skill.id === basicDoctorInfo.super_speciality_id);
    if (filteredDoctorSuperInfo) {
      doctorSuperSpeciality = filteredDoctorSuperInfo.name;
    }
  }

  const generMap = {
    "m": "Male",
    "f": "Female",
    "o": "Others",
  }

  let gender = "Male";

  if (basicDoctorInfo && basicDoctorInfo.gender) {
    gender = generMap[basicDoctorInfo.gender];
  }

  return (
    <Box className={classes.box}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <div align="center" className={classes.positionRelative}>
            <img src={avatar} className={classes.avatar}></img>
            <p className={classes.status}>Under Verification</p>
          </div>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h6">
            Hi, {name}
          </Typography>
          <Typography
            component="p"
            className={classes.title}
            style={{ marginTop: 5 }}
          >
            Your details have been submitted successfully!
          </Typography>
          <Typography
            component="p"
            className={classes.title}
            style={{ marginTop: 5 }}
          >
            The account will get activated after verification.
          </Typography>
          <Typography
            component="p"
            className={classes.title}
            style={{ marginTop: 5 }}
            color="primary"
          >
            Cross check below details.
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1} justify="center">
        <Grid item sm={10}>
          <Box
            style={{
              backgroundColor: '#23aaeb0f',
              padding: 30,
              marginTop: 30,
              marginBottom: 30,
              wordWrap: 'break-word',
            }}
          >
            <Grid container spacing={2} justify="center">
              <Grid item xs={10} sm={6}>
                <List dense className={classes.profileList}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <PermIdentityOutlined />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Name"
                      secondary={name}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <MailOutlineOutlined />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Email"
                      style={{textTransform: 'lowercase'}}
                      secondary={(doctorRegInfo && doctorRegInfo.email) ? doctorRegInfo.email : ""}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <WcOutlined />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Gender"
                      secondary={gender}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <VerifiedUserOutlined />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Status" secondary="Under Verification" />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={12} sm={6}>
                <List dense className={classes.profileList}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <LocalHospitalOutlined />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Specialization"
                      secondary={doctorSpeciality}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <LocalHospitalOutlined />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Super Specialization"
                      secondary={doctorSuperSpeciality}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <AssignmentIndOutlined />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Registration Number"
                      secondary={(basicDoctorInfo && basicDoctorInfo.med_reg_no) ? basicDoctorInfo.med_reg_no : ""}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <CalendarTodayOutlined />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Registration Year"
                      secondary={(basicDoctorInfo && basicDoctorInfo.med_reg_year) ? basicDoctorInfo.med_reg_year : ""}
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={12} align="center" style={{ marginBottom: 15 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleProfileClick}
          >
            Login Now
          </Button>
        </Grid>
      </Grid>
      <Typography variant="subtitle2" align="center">
        Why not speak or write to our team, we will be happy to assist
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={6} align="right" style={{ paddingRight: 35 }}>
          <PhoneAndroidOutlined fontSize="small" style={{ marginRight: 5 }} />
          <Link tel="+91-9087654321" component="button" variant="body2">
            <a href={masterData !== null ? `tel:+91-${masterData.phone}` : ""} style={{ textDecoration: 'none', color: '#ff2100' }}>+91-{masterData !== null ? masterData.phone : ""}</a>
          </Link>
        </Grid>
        <Grid item xs={12} sm={6} align="left">
          <MailOutlineOutlined fontSize="small" style={{ marginRight: 5 }} />
          <Link component="button" variant="body2">
            <a href={masterData !== null ? `mailto:${masterData.email}` : ""} style={{ textDecoration: 'none', color: '#ff2100', textTransform: 'lowercase' }}>{masterData !== null ? masterData.email : ""}</a>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

const mapStateToProps = state => {
  return {
    basicDoctorInfo: state.get("authReducer").basicDoctorInfo,
    doctorRegInfo: state.get("authReducer").doctorRegInfo,
    masterData: state.get("dashboardReducer").masterData,
    superSpecializationStoreList: state.get("dashboardReducer").superSpecialization,
  }
}

export default connect(mapStateToProps, {})(Success);
