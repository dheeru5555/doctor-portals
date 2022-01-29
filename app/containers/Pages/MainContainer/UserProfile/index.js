import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import avatarApi from 'enl-api/images/avatars';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import Person from '@material-ui/icons/Person';
import LocationOn from '@material-ui/icons/LocationOn';
import AddToQueue from '@material-ui/icons/AddToQueue';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { connect } from 'react-redux';
import {
    Cover,
    AboutDoctor,
    LocationOfPractice,
    Schedule
} from 'enl-components';
import DoctorDetails from './DoctorDetails';

const styles = (theme) => ({
    profileTab: {
        marginTop: -72,
        [theme.breakpoints.down('sm')]: {
            marginTop: -48,
        },
        borderRadius: `0 0 ${theme.rounded.medium} ${theme.rounded.medium}`,
        background: fade(theme.palette.background.paper, 0.8),
        position: 'relative'
    },
    notSelected: {
        background: '#fff',
        padding: 40,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },
    bold: {
        fontWeight: 700
    }
})

function TabContainer(props) {
    const { children } = props;
    return (
        <div style={{ paddingTop: 8 * 3 }}>
            {children}
        </div>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function UserProfile(props) {
    const { classes } = props;
    const title = brand.name + ' - Profile';
    const description = brand.desc;
    const [value, setValue] = useState(0);
    const localUserInfo = localStorage.getItem('userInfo')
    const parsedUserInfo = JSON.parse(localUserInfo)

    const isFrontdesk = parsedUserInfo ? parsedUserInfo.frontdesk : false;

    const handleChange = (event, val) => {
        setValue(val);
    };

    return (
        <div>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
            </Helmet>
            <Cover />
            {isFrontdesk ? (
                <>
                    <AppBar position="static" className={classes.profileTab}>
                        <Hidden smDown>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="fullWidth"
                                textColor="primary"
                                centered
                                style={{ border: 1 }}
                            >
                                <Tab icon={<Person />} label="My Details" />
                                <Tab icon={<Person />} label="Doctor Details" />
                            </Tabs>
                        </Hidden>
                    </AppBar>
                    {value === 0 && <TabContainer><AboutDoctor /></TabContainer>}
                    {
                        (localStorage.getItem('cr_id') !== '' &&
                            localStorage.getItem('cr_id') !== null &&
                            localStorage.getItem('cr_id') !== undefined) ? (
                            <>
                                {value === 1 && <DoctorDetails />}
                            </>
                        ) : (
                            <>
                                {value === 1 && (
                                    <TabContainer>
                                        <div className={classes.notSelected}>
                                            <img src="https://media.istockphoto.com/vectors/doctor-icon-vector-illustration-medical-doctor-vector-illustration-vector-id1223735381?k=20&m=1223735381&s=170667a&w=0&h=isPjVOHLkHJCX0mu3Kit4S12EkQuo6gs9Yshik_TfHk=" width={100} />
                                            <Typography className={classes.bold} color="primary">Please Select any Doctor to view Details</Typography>
                                        </div>
                                    </TabContainer>)}
                            </>
                        )
                    }
                </>
            ) : (
                <>
                    <AppBar position="static" className={classes.profileTab}>
                        <Hidden smDown>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="fullWidth"
                                textColor="primary"
                                centered
                                style={{ border: 1 }}
                            >
                                <Tab icon={<Person />} label="Basic Details & Documents" />
                                <Tab icon={<LocationOn />} label="Location of Practice" />
                                <Tab icon={<AddToQueue />} label="Schedule" />
                            </Tabs>
                        </Hidden>
                    </AppBar>
                    {value === 0 && <TabContainer><AboutDoctor /></TabContainer>}
                    {value === 1 && <TabContainer><LocationOfPractice /></TabContainer>}
                    {value === 2 && <TabContainer><Schedule /></TabContainer>}
                </>
            )}
        </div>
    );
}

UserProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    masterData: state.get("dashboardReducer").masterData,
    doctorProfileDetails: state.get('profileReducer').doctorProfileDetails,
    imagesOrDocs: state.get('dashboardReducer').imagesOrDocs,
});

export default connect(mapStateToProps, {})(withStyles(styles)(UserProfile));
