import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SMS from './SMS';
import Email from './Email';
import AddBill from './AddBill';
import BankDetails from './BankDetails';
import MySubscriptions from './MySubscriptions';
import PrescriptionSettings from './PrescriptionSettings';
import Holidays from './Holidays';
import GSTSettings from './GSTSettings';
import API from "../../../helpers/api";
import { connect } from "react-redux";
import { fetchAllClinics, fetchDoctorProfileDetails } from "../../../redux/actions/profileActions";
import { fetchAllBillables } from "../../../redux/actions/settingsActions";
import Loading from 'enl-components/Loading';
import { fetchMasterData } from "../../../redux/actions/dashboardActions";

function TabContainer(props) {
    const { children } = props;
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
});

const localUserInfo = localStorage.getItem('userInfo')
const parsedUserInfo = JSON.parse(localUserInfo)

const isFrontdesk = parsedUserInfo ? parsedUserInfo.frontdesk : false;
let permissions = localStorage.getItem("selectedTag") !== '' && JSON.parse(localStorage.getItem("selectedTag"))


class SettingsComponent extends React.Component {
    api = new API();
    all = false;
    billing = false;
    my_subcriptions = false;
    holidays = false;
    sms = false;
    email = false;

    constructor(props) {
        super(props);

        this.state = {
            value: 0,
        };

    }

    getPermissions(permissions) {
        if (permissions.access_array.includes("billing")) {
            this.billing = true;
        }
        if (permissions.access_array.includes("my_subscription")) {
            console.log("kfdjgnk")
            this.my_subcriptions = true;
        }
        if (permissions.access_array.includes("holidays")) {
            this.holidays = true;
        }
        if (permissions.access_array.includes("sms")) {
            this.sms = true;
        }
        if (permissions.access_array.includes("email")) {
            this.email = true;
        }
    }

    async componentDidMount() {
        if (isFrontdesk) {
            this.getPermissions(permissions)
        }
        const { fetchAllBillables, allBillables, clinicDetails, masterData, fetchMasterData,
            fetchAllClinics, doctorProfileDetails, fetchDoctorProfileDetails } = this.props;

        if (this.props.tabVal !== undefined) {
            this.setState({ value: this.props.tabVal });
        }

        if ((clinicDetails === null) || (clinicDetails.length === 0)) {
            await fetchAllClinics();
        }

        if ((allBillables === null) || (allBillables.length === 0)) {
            await fetchAllBillables();
        }

        if (doctorProfileDetails === null) {
            await fetchDoctorProfileDetails();
        }

        if (masterData === null) {
            await fetchMasterData();
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes, clinicDetails, doctorProfileDetails, allBillables, masterData } = this.props;
        const { value } = this.state;

        if (
            (clinicDetails === null) ||
            (doctorProfileDetails === null) ||
            (allBillables === null) ||
            (masterData === null)
        ) {
            return <Loading />
        }

        return (
            <div className={classes.root}>
                {isFrontdesk ? (
                    <>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={value}
                                onChange={this.handleChange}
                                variant="scrollable"
                                scrollButtons="on"
                                indicatorColor="primary"
                                textColor="secondary"
                            >
                                {this.billing && (
                                    <Tab label="Billing" />
                                )}
                                {this.my_subcriptions && (
                                    <Tab label="My Subscriptions" />
                                )}
                                {this.holidays && (
                                    <Tab label="Holiday Settings" />
                                )}
                                {this.sms && (
                                    <Tab label="SMS Settings" />
                                )}
                                {this.email && (
                                    <Tab label="Email Settings" />
                                )}
                            </Tabs>
                        </AppBar>
                        {(value === 0 && this.billing) && <TabContainer><AddBill /></TabContainer>}
                        {((value === (this.billing ? 1 : 0)) && this.my_subcriptions) && <TabContainer><MySubscriptions /></TabContainer>}
                        {((value === (this.my_subcriptions ? (this.billing ? 2 : 1) : (this.billing ? 1 : 0))) && this.holidays) && <TabContainer><Holidays /></TabContainer>}
                        {((value === (this.holidays ? (this.my_subcriptions ? (this.billing ? 3 : 2) : 1) : (this.my_subcriptions ? (this.billing ? 2 : 1) : this.billing ? 1 : 0))) && this.sms) && <TabContainer><SMS /></TabContainer>}
                        {((value === (
                            this.sms ? (
                                this.holidays ? (
                                    this.my_subcriptions ? (
                                        this.billing ? 4 : 3
                                    ) : (
                                        this.billing ? 3 : 2
                                    )
                                ) : (
                                    this.my_subcriptions ? (
                                        this.billing ? 3 : 2
                                    ) : (
                                        this.billing ? 2 : 1
                                    )
                                )
                            ) : (
                                (this.holidays ? (
                                    this.my_subcriptions ? (
                                        this.billing ? 3 : 2
                                    ) : (
                                        this.billing ? 2 : 1
                                    )
                                ) : (
                                    this.my_subcriptions ? (
                                        this.billing ? 2 : 1
                                    ) : (
                                        this.billing ? 1 : 0
                                    )
                                ))
                            )
                        )) && this.email) && <TabContainer><Email /></TabContainer>}
                    </>
                ) : (
                    <>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={value}
                                onChange={this.handleChange}
                                variant="scrollable"
                                scrollButtons="on"
                                indicatorColor="primary"
                                textColor="secondary"
                            >
                                <Tab label="Billing" />
                                <Tab label="My Subscriptions" />
                                <Tab label="Prescriptions" />
                                {/* <Tab label="GST" /> */}
                                <Tab label="Holiday Settings" />
                                <Tab label="Bank Details" />
                                <Tab label="SMS Settings" />
                                <Tab label="Email Settings" />
                            </Tabs>
                        </AppBar>
                        {value === 0 && <TabContainer><AddBill /></TabContainer>}
                        {value === 1 && <TabContainer><MySubscriptions /></TabContainer>}
                        {value === 2 && <TabContainer><PrescriptionSettings /></TabContainer>}
                        {/* {value === 3 && <TabContainer><GSTSettings /></TabContainer>} */}
                        {value === 3 && <TabContainer><Holidays /></TabContainer>}
                        {value === 4 && <TabContainer><BankDetails /></TabContainer>}
                        {value === 5 && <TabContainer><SMS /></TabContainer>}
                        {value === 6 && <TabContainer><Email /></TabContainer>}
                    </>
                )}
            </div>
        );
    }
}

SettingsComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        allBillables: state.get("settingsReducer").allBillables,
        clinicDetails: state.get("profileReducer").clinicDetails,
        doctorProfileDetails: state.get("profileReducer").doctorProfileDetails,
        masterData: state.get("dashboardReducer").masterData,
    }
}

export default connect(mapStateToProps, { fetchAllBillables, fetchAllClinics, fetchMasterData, fetchDoctorProfileDetails })(withStyles(styles)(SettingsComponent));
