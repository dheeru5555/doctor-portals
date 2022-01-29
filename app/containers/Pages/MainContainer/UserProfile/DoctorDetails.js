import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import LocationOn from '@material-ui/icons/LocationOn';
import AddToQueue from '@material-ui/icons/AddToQueue';
import { fade } from '@material-ui/core/styles/colorManipulator';
import {
    LocationOfPractice,
    Schedule
} from 'enl-components';
import { connect } from 'react-redux';
import { fetchAllClinics } from '../../../../redux/actions/profileActions';

const styles = (theme) => ({
    profileTab: {
        marginTop: 0,
        [theme.breakpoints.down('sm')]: {
            marginTop: -48,
        },
        // borderRadius: `0 0 ${theme.rounded.medium} ${theme.rounded.medium}`,
        background: fade(theme.palette.background.paper, 0.8),
        position: 'relative'
    },
    subTab: {
        position: 'relative',
        marginTop: 12,
        borderRadius: 8,
        '& header': {
            background: '#fff',
            borderRadius: `${theme.rounded.medium}`,
        }
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
    const [value, setValue] = useState(0);
    let permissions = JSON.parse(localStorage.getItem("selectedTag"))

    const handleChange = (event, val) => {
        setValue(val);
    };

    if (props.clinicDetails == null) {
        props.fetchAllClinics()
    }

    return (
        <div className={classes.subTab}>
            {(permissions.access_array.includes("location_of_practice") && permissions.access_array.includes("schedule")) ? (
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
                                <Tab icon={<LocationOn />} label="Location of Practice" />
                                <Tab icon={<AddToQueue />} label="Schedule" />
                            </Tabs>
                        </Hidden>
                    </AppBar>
                    {value === 0 && <TabContainer><LocationOfPractice clinicDetails={props.clinicDetails} /></TabContainer>}
                    {value === 1 && <TabContainer><Schedule /></TabContainer>}

                </>
            ) : (
                <>
                    {(permissions.access_array.includes("location_of_practice") && !permissions.access_array.includes("schedule")) ? (
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
                                        <Tab icon={<LocationOn />} label="Location of Practice" />
                                    </Tabs>
                                </Hidden>
                            </AppBar>
                            {value === 0 && <TabContainer><LocationOfPractice clinicDetails={props.clinicDetails} /></TabContainer>}
                        </>
                    ) : (
                        <>
                            {(!permissions.access_array.includes("location_of_practice") && permissions.access_array.includes("schedule")) ? (
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
                                                <Tab icon={<AddToQueue />} label="Schedule" />
                                            </Tabs>
                                        </Hidden>
                                    </AppBar>
                                    {value === 0 && <TabContainer><Schedule /></TabContainer>}
                                </>
                            ) : (
                                <>
                                    <div className={classes.notSelected}>
                                        <img src="https://media.istockphoto.com/vectors/doctor-icon-vector-illustration-medical-doctor-vector-illustration-vector-id1223735381?k=20&m=1223735381&s=170667a&w=0&h=isPjVOHLkHJCX0mu3Kit4S12EkQuo6gs9Yshik_TfHk=" width={100} />
                                        <Typography className={classes.bold} color="primary">Permission Denied</Typography>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
}

UserProfile.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    clinicDetails: state.get('profileReducer').clinicDetails,
    imagesOrDocs: state.get('dashboardReducer').imagesOrDocs,
});

export default connect(mapStateToProps, { fetchAllClinics })(withStyles(styles)(UserProfile));
