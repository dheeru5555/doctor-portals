import React from 'react';
import PropTypes from 'prop-types';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Type from 'enl-styles/Typography.scss';
import CheckCircle from '@material-ui/icons/CheckCircle';
import FrontdeskRegisterForm from './Forms/FrontdeskRegisterForm';
import ManageFrontdesk from './Forms/ManageFrontdesk';
import { connect } from "react-redux";
import API from "../../../helpers/api";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import history from "../../../utils/history";
import { fetchAllReceptionists, fetchAllSearchReceptionists } from "../../../redux/actions/receptionistActions";

const styles = theme => ({
    root: {
        width: '100%',
        padding: theme.spacing(3)
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    secondaryWrap: {
        padding: `1px ${theme.spacing(2)}px`,
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        '& > $centerItem': {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        '& li': {
            marginBottom: 30
        },
        '& $chip': {
            top: 50,
            position: 'absolute',
            fontSize: 11,
            fontWeight: 400,
        }
    },
    storageInfo: {
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        '& li': {
            margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`
        }
    },
    progressCircle: {
        borderRadius: '50%',
        background: lighten(theme.palette.divider, 0.7)
    },
    divider: {
        margin: `${theme.spacing(3)}px 0`,
        display: 'block'
    },
    stepperBtn: {
        display: 'flex',
        marginTop: 20,
        justifyContent: 'center'
    },
    finishMessage: {
        textAlign: 'center',
        maxWidth: 600,
        margin: '0 auto',
        '& h4': {
            '& span': {
                textAlign: 'center',
                display: 'block',
                '& svg': {
                    color: theme.palette.secondary.main,
                    height: 'auto',
                    width: 148
                }
            }
        }
    },
    dCenter: {
        display: 'flex',
        justifyContent: 'center'
    }
});

function getSteps() {
    return ['Basic Details', 'Access Management'];
}


class NewRegisterForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            frontDeskDetails: {
                title: "",
                first_name: "",
                last_name: "",
                email: "",
                mobile: "",
                address: "",
                // flat_no: '',
                // street_name: '',
                city_id: "",
                state_id: "",
                pincode: "",
                gender: "",
                marital_status: "",
                clinic_id: "",
                dob: "",
                avatar: "",
            },
            errorMessage: {},
            avatar: "",
            activeStep: 0,
            altLabel: false,
            skipped: new Set(),
            isNewFrontdesk: true,
            cityList: null,
            frontDeskPermissions: [],
            snackBarInfo: {
                isSnackBarOpen: false,
                snackBarText: "",
                snackBarSeverity: "success",
            },
            receptionist_id: null,
        }
    }

    async componentDidMount() {
        const { location } = this.props;
        if (
            (location.state) &&
            (location.state.crId)
        ) {
            const api = new API();
            await api.ACCOUNTS_URI().get(`receptionists/detail/${location.state.crId}`)
                .then(async (receptionistDetailResp) => {
                    if (
                        (receptionistDetailResp.status === 200) &&
                        (receptionistDetailResp.data.success === true) &&
                        (Object.keys(receptionistDetailResp.data.receptionist).length > 0)
                    ) {
                        const frontDeskDetails = {
                            title: (
                                receptionistDetailResp.data.receptionist.receptionist &&
                                receptionistDetailResp.data.receptionist.receptionist.title !== null
                            ) ? receptionistDetailResp.data.receptionist.receptionist.title : "",
                            first_name: (
                                receptionistDetailResp.data.receptionist.receptionist &&
                                receptionistDetailResp.data.receptionist.receptionist.first_name !== null
                            ) ? receptionistDetailResp.data.receptionist.receptionist.first_name : "",
                            last_name: (
                                receptionistDetailResp.data.receptionist.receptionist &&
                                receptionistDetailResp.data.receptionist.receptionist.last_name !== null
                            ) ? receptionistDetailResp.data.receptionist.receptionist.last_name : "",
                            email: (
                                receptionistDetailResp.data.receptionist.receptionist &&
                                receptionistDetailResp.data.receptionist.receptionist.email !== null
                            ) ? receptionistDetailResp.data.receptionist.receptionist.email : "",
                            mobile: (
                                receptionistDetailResp.data.receptionist.receptionist &&
                                receptionistDetailResp.data.receptionist.receptionist.mobile !== null
                            ) ? receptionistDetailResp.data.receptionist.receptionist.mobile : "",
                            address: (
                                receptionistDetailResp.data.receptionist.receptionist &&
                                receptionistDetailResp.data.receptionist.receptionist.address !== null
                            ) ? receptionistDetailResp.data.receptionist.receptionist.address : "",
                            // flat_no: (
                            //     receptionistDetailResp.data.receptionist.receptionist &&
                            //     receptionistDetailResp.data.receptionist.receptionist.flat_no !== null
                            // ) ? receptionistDetailResp.data.receptionist.receptionist.flat_no : "",
                            // street_name: (
                            //     receptionistDetailResp.data.receptionist.receptionist &&
                            //     receptionistDetailResp.data.receptionist.receptionist.street_name !== null
                            // ) ? receptionistDetailResp.data.receptionist.receptionist.street_name : "",
                            city_id: (
                                receptionistDetailResp.data.receptionist.receptionist &&
                                receptionistDetailResp.data.receptionist.receptionist.city_id !== null
                            ) ? receptionistDetailResp.data.receptionist.receptionist.city_id : "",
                            state_id: (
                                receptionistDetailResp.data.receptionist.receptionist &&
                                receptionistDetailResp.data.receptionist.receptionist.state_id !== null
                            ) ? receptionistDetailResp.data.receptionist.receptionist.state_id : "",
                            pincode: (
                                receptionistDetailResp.data.receptionist.receptionist &&
                                receptionistDetailResp.data.receptionist.receptionist.pincode !== null
                            ) ? receptionistDetailResp.data.receptionist.receptionist.pincode : "",
                            gender: (
                                receptionistDetailResp.data.receptionist.receptionist &&
                                receptionistDetailResp.data.receptionist.receptionist.gender !== null
                            ) ? receptionistDetailResp.data.receptionist.receptionist.gender : "",
                            marital_status: (
                                receptionistDetailResp.data.receptionist.receptionist &&
                                receptionistDetailResp.data.receptionist.receptionist.marital_status !== null
                            ) ? receptionistDetailResp.data.receptionist.receptionist.marital_status : "",
                            clinic_id: (
                                receptionistDetailResp.data.receptionist &&
                                receptionistDetailResp.data.receptionist.clinic_id !== null
                            ) ? receptionistDetailResp.data.receptionist.clinic_id : "",
                            dob: (
                                receptionistDetailResp.data.receptionist.receptionist &&
                                receptionistDetailResp.data.receptionist.receptionist.dob !== null
                            ) ? receptionistDetailResp.data.receptionist.receptionist.dob : "",
                            avatar: (
                                receptionistDetailResp.data.receptionist.receptionist &&
                                receptionistDetailResp.data.receptionist.receptionist.avatar !== null
                            ) ? receptionistDetailResp.data.receptionist.receptionist.avatar : "",
                        }

                        this.setState({
                            frontDeskDetails,
                            avatar: frontDeskDetails.avatar,
                            receptionist_id: receptionistDetailResp.data.receptionist.receptionist_id,
                        });

                        await api.ACCOUNTS_URI().post("receptionists/access-details", {
                            clinic_id: frontDeskDetails.clinic_id,
                            receptionist_id: location.state.receptionistId,
                        })
                            .then((permissionResp) => {
                                if (
                                    (permissionResp.status === 200) &&
                                    (permissionResp.data.success === true) &&
                                    (Object.keys(permissionResp.data.access).length > 0)
                                ) {
                                    this.setState({
                                        frontDeskPermissions: permissionResp.data.access.access_array
                                    })
                                }
                            })
                            .catch((err) => {
                                console.log("err", err)
                            })
                    }
                })
                .catch((err) => {
                    console.log("err", err)
                });
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.frontDeskDetails.state_id !== this.state.frontDeskDetails.state_id) {
            await this.fetchCityList();
        }
    }

    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    fetchCityList = async () => {
        const { frontDeskDetails } = this.state;
        const api = new API();

        await api.MASTER_URI().get(`city/${frontDeskDetails.state_id}`)
            .then((cityResp) => {
                if (
                    (cityResp.status === 200) &&
                    (cityResp.data.success === true) &&
                    (cityResp.data.cities.length > 0)
                ) {
                    this.setState({ cityList: cityResp.data.cities })
                }
            })
            .catch((err) => {
                console.log("err", err);
            })
    }

    handleNext = () => {
        const { activeStep } = this.state;
        let { skipped } = this.state;
        if (this.isStepSkipped(activeStep)) {
            skipped = new Set(skipped.values());
            skipped.delete(activeStep);
        }
        if (activeStep === 0) {
            this.createNewfrontDeskReceptionist()
        } else {
            this.updateReceptionistPermissions()
                .then(() => {
                    history.push("/app/frontdesk");
                })
        }

    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleStepper = () => {
        this.setState({ isNewFrontdesk: false });
    }

    handleSkip = () => {
        const { activeStep, receptionist_id } = this.state;
        if (
            (activeStep === 0) &&
            (receptionist_id !== null)
        ) {
            this.setState({ activeStep: 1 });
        } else {
            history.push("/app/frontdesk");
        }
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    isStepOptional = step => (step === 1);

    isStepSkipped(step) {
        const { skipped } = this.state;
        return skipped.has(step);
    }

    handleInputChange = (inpnutKey, inputValue) => {
        const intermediateFrontDeskObj = { ...this.state.frontDeskDetails };
        intermediateFrontDeskObj[inpnutKey] = inputValue;
        this.setState({ frontDeskDetails: intermediateFrontDeskObj });
    }

    handlePermissionsCheckboxChange = (isChecked, permissionCode) => {
        let frontDeskPermissionInterm = [...this.state.frontDeskPermissions];

        if (isChecked === true) {
            if (!frontDeskPermissionInterm.includes(permissionCode)) {
                frontDeskPermissionInterm.push(permissionCode);
            }
        } else {
            if (frontDeskPermissionInterm.includes(permissionCode)) {
                const intermArr = [...frontDeskPermissionInterm];
                const eleIndex = intermArr.indexOf(permissionCode);
                if (eleIndex > -1) {
                    intermArr.splice(eleIndex, 1);
                }
                frontDeskPermissionInterm = intermArr;
            }
        }

        this.setState({ frontDeskPermissions: frontDeskPermissionInterm });
    }

    getStepContent = (step) => {
        const { masterData, imagesOrDocs } = this.props;
        const { cityList } = this.state;
        let imageUrl = this.state.avatar
        switch (step) {
            case 0:
                return (
                    <FrontdeskRegisterForm
                        frontDeskDetails={this.state.frontDeskDetails}
                        imageUrl={imageUrl}
                        masterData={masterData}
                        cityList={cityList}
                        handleInputChange={this.handleInputChange}
                        errorMessage={this.state.errorMessage}
                    />
                );
            case 1:
                return (
                    <ManageFrontdesk
                        handlePermissionsCheckboxChange={this.handlePermissionsCheckboxChange}
                        frontDeskPermissions={this.state.frontDeskPermissions}
                    />
                );
            default:
                return 'Unknown step';
        }
    }

    handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({
            snackBarInfo: {
                isSnackBarOpen: false,
                snackBarText: "",
                snackBarSeverity: "success",
            }
        })
    };

    createNewfrontDeskReceptionist = async () => {
        const api = new API();
        var dob = new Date(this.state.frontDeskDetails.dob)
        var year = dob.getFullYear();
        var month = dob.getMonth()+1;
        var date = dob.getDate();
        const formData = new FormData();

        formData.append("title", this.state.frontDeskDetails.title);
        formData.append("first_name", this.state.frontDeskDetails.first_name);
        formData.append("last_name", this.state.frontDeskDetails.last_name);
        formData.append("email", this.state.frontDeskDetails.email);
        formData.append("mobile", this.state.frontDeskDetails.mobile);
        formData.append("address", this.state.frontDeskDetails.address);
        // formData.append("flat_no", this.state.frontDeskDetails.flat_no);
        // formData.append("street_name", this.state.frontDeskDetails.street_name);
        formData.append("city_id", this.state.frontDeskDetails.city_id);
        formData.append("state_id", this.state.frontDeskDetails.state_id);
        formData.append("pincode", this.state.frontDeskDetails.pincode);
        formData.append("gender", this.state.frontDeskDetails.gender);
        formData.append("marital_status", this.state.frontDeskDetails.marital_status);
        formData.append("clinic_id", this.state.frontDeskDetails.clinic_id);
        formData.append("dob", `${year}-${month}-${date}`);
        formData.append("avatar", this.state.frontDeskDetails.avatar);

        let uri = "receptionists/add";

        const { location } = this.props;
        if (
            (location.state) &&
            (location.state.receptionistId) &&
            (location.state.crId)
        ) {
            uri = `receptionists/edit/${location.state.receptionistId}`;
            formData.append("cr_id", location.state.crId);
        }

        await api.ACCOUNTS_URI().post(uri, formData, {
            "Content-Type": "multipart/form-data"
        })
            .then(async (addReceptionistResp) => {
                if (
                    (addReceptionistResp.status === 200) &&
                    (addReceptionistResp.data.success === true)
                ) {
                    this.setState((prevState) => ({
                        snackBarInfo: {
                            isSnackBarOpen: true,
                            snackBarText: "Successfully added receptionist",
                            snackBarSeverity: "success",
                        },
                        receptionist_id: addReceptionistResp.data.receptionist_id,
                        activeStep: prevState.activeStep + 1,
                    }));
                    await this.props.fetchAllReceptionists();
                    await this.props.fetchAllSearchReceptionists();
                } else {
                    if (typeof addReceptionistResp.data.errorMessage === "string") {
                        this.setState({
                            snackBarInfo: {
                                isSnackBarOpen: true,
                                snackBarText: addReceptionistResp.data.errorMessage,
                                snackBarSeverity: "error",
                            }
                        })
                    } else {
                        this.setState({
                            errorMessage: addReceptionistResp.data.errorMessage
                        })
                        this.setState({
                            snackBarInfo: {
                                isSnackBarOpen: true,
                                snackBarText: "Could not add receptionist",
                                snackBarSeverity: "error",
                            }
                        })
                    }
                    return false;
                }
            })
            .catch((err) => {
                this.setState({
                    snackBarInfo: {
                        isSnackBarOpen: true,
                        snackBarText: "Internal Server Error",
                        snackBarSeverity: "error",
                    }
                })
            })
    }

    updateReceptionistPermissions = async () => {
        const api = new API();
        const { frontDeskPermissions, receptionist_id, frontDeskDetails } = this.state;
        let data = {
            clinic_id: frontDeskDetails.clinic_id,
            permissions: frontDeskPermissions,
            receptionist_id: this.state.receptionist_id
        }

        if (
            this.props.location &&
            this.props.location.state &&
            this.props.location.state.receptionistId
        ) {
            data.receptionist_id = this.props.location.state.receptionistId
        }

        await api.ACCOUNTS_URI().post("receptionists/update-access", data)
            .then((receptionistPermissions) => {
                if (
                    (receptionistPermissions.status === 200) &&
                    (receptionistPermissions.data.success === true)
                ) {
                    this.setState({
                        snackBarInfo: {
                            isSnackBarOpen: true,
                            snackBarText: "Successfully updated receptionist permissions",
                            snackBarSeverity: "success",
                        }
                    });
                } else {
                    if (typeof receptionistPermissions.data.errorMessage === "string") {
                        this.setState({
                            snackBarInfo: {
                                isSnackBarOpen: true,
                                snackBarText: receptionistPermissions.data.errorMessage,
                                snackBarSeverity: "error",
                            }
                        })
                    } else {
                        this.setState({
                            snackBarInfo: {
                                isSnackBarOpen: true,
                                snackBarText: "Could not update receptionist permissions",
                                snackBarSeverity: "error",
                            }
                        })
                    }
                }
            })
            .catch(() => {
                this.setState({
                    snackBarInfo: {
                        isSnackBarOpen: true,
                        snackBarText: "Internal Server Error",
                        snackBarSeverity: "error",
                    }
                })
            })
    }

    render() {
        const { classes, masterData, location } = this.props;
        const steps = getSteps();
        const { activeStep, altLabel, snackBarInfo, frontDeskDetails, receptionist_id } = this.state;
        // console.log("checkw", this.state.receptionist_id)
        // console.log("checkw", location.state.receptionistId)

        if (
            (masterData === null)
        ) {
            return null;
        } else {
            const disableNextButton = (
                (frontDeskDetails.first_name === "") ||
                (frontDeskDetails.last_name === "") ||
                (frontDeskDetails.mobile === "") ||
                (frontDeskDetails.address === "") ||
                // (frontDeskDetails.flat_no === "") ||
                // (frontDeskDetails.street_name === "") ||
                (frontDeskDetails.email === "") ||
                (frontDeskDetails.title === "") ||
                // (frontDeskDetails.avatar === "") ||
                (frontDeskDetails.city_id === "") ||
                (frontDeskDetails.state_id === "") ||
                (frontDeskDetails.gender === "") ||
                (frontDeskDetails.dob === "")
            ) ? true : false;
            return (
                <div className={classes.root}>
                    {activeStep === steps.length ? (
                        <div className={classes.finishMessage}>
                            <Typography variant="h4" gutterBottom>
                                <span>
                                    <CheckCircle />
                                </span>
                                Register Successfull.
                            </Typography>
                            <Typography variant="subtitle1">
                                Welcome to
                                &nbsp;
                                <strong>Online Aarogya</strong>
                                .&nbsp;
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>Name :</strong>
                                &nbsp; Mr. Abhishek
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>Email :</strong>
                                &nbsp; aarogya@patient.com
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>Mobile Number :</strong>
                                &nbsp; +91 9999999999
                            </Typography>
                            <Typography variant="subtitle1">
                                <strong>Address :</strong>
                                &nbsp; Address, Address, Address, Address
                            </Typography>
                            <Divider className={classes.divider} />
                            <Button onClick={this.handleReset} color="primary" variant="contained" className={classes.button}>
                                Create New Frontdesk
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Stepper activeStep={activeStep} alternativeLabel={altLabel}>
                                {steps.map((label, index) => {
                                    const props = {};
                                    const labelProps = {};
                                    if (this.isStepOptional(index)) {
                                        labelProps.optional = <Typography className={altLabel ? Type.textCenter : ''} variant="caption">Optional</Typography>;
                                    }
                                    if (this.isStepSkipped(index)) {
                                        props.completed = false;
                                    }
                                    return (
                                        <Step key={label} {...props}>
                                            <StepLabel {...labelProps}>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                            <div>
                                <div className={classes.instructions}>
                                    {this.getStepContent(activeStep)}
                                </div>
                                <div className={classes.dCenter}>
                                    {/* <Button
                                        disabled={activeStep === 0}
                                        onClick={this.handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button> */}
                                    {
                                        ((receptionist_id !== null) ||
                                            this.isStepOptional(activeStep))
                                        && (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleSkip}
                                                className={classes.button}
                                            >
                                                Skip
                                            </Button>
                                        )
                                    }
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleNext}
                                        className={classes.button}
                                        disabled={disableNextButton}
                                    >
                                        {activeStep === steps.length - 1 ? 'Submit' : 'Save & Continue'}
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
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
                </div>
            );
        }

    }
}

const mapStateToProps = state => {
    return {
        masterData: state.get("dashboardReducer").masterData,
        clinicDetails: state.get("profileReducer").clinicDetails,
        imagesOrDocs: state.get("dashboardReducer").imagesOrDocs,
    }
}

export default connect(mapStateToProps, { fetchAllReceptionists, fetchAllSearchReceptionists })(withStyles(styles)(NewRegisterForm));
