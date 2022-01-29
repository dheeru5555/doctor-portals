import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Type from 'enl-styles/Typography.scss';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import ItemTable from './ItemTable';
import { connect } from 'react-redux';
import API from "../../../helpers/api";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { fetchDoctorProfileDetails } from "../../../redux/actions/profileActions";

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightMedium,
        padding: 10
    },
    border: {
        border: '1px solid #dedede',
        padding: '15px 0px',
        background: '#f5f5f5',
        borderRadius: 5
    },
    textField: {
        marginTop: 5,
    },
    title: {
        padding: '0 15px',
        fontWeight: 700
    },
    column: {
        display: 'flex',
        flexDirection: 'column'
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    flexEnd: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    spaceBetween: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },
    button: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        background: '#fff'
    },
    customButton: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    typography: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2)
    },
    p3: {
        padding: theme.spacing(3)
    },
    bold: {
        fontWeight: 700
    },
    rightPanel: {
        padding: '15px 20px',
    },
    subtitle: {
        fontSize: 11,
        color: 'gray',
        margin: 0,
        padding: '0 15px'
    }
});

function BankDetails(props) {
    const title = brand.name + ' - Settings';
    const description = brand.desc;
    const { classes, doctorProfileDetails, fetchDoctorProfileDetails } = props;

    const defaultState = {
        bank_account_name: (doctorProfileDetails.bank_account_name !== null) ? doctorProfileDetails.bank_account_name : "",
        bank_name: (doctorProfileDetails.bank_name !== null) ? doctorProfileDetails.bank_name : "",
        bank_ifsc_code: (doctorProfileDetails.bank_ifsc_code !== null) ? doctorProfileDetails.bank_ifsc_code : "",
        bank_account_no: (doctorProfileDetails.bank_account_no !== null) ? doctorProfileDetails.bank_account_no : "",
        bank_account_no_confirmation: "",
    }

    const [bankDetails, setBankDetails] = React.useState(defaultState);

    const [snackBarInfo, setSnackbarInfo] = React.useState({
        isSnackBarOpen: false,
        snackBarText: "",
        snackBarSeverity: "success",
    });

    const [bankErrors, setBankErrors] = React.useState(null);
    const [isEdit, setIsEdit] = React.useState(
        doctorProfileDetails.bank_account_name !== null ? true : false
    );

    const handleInputChange = (inputKey, inputVal) => {
        const intermediateBankObj = { ...bankDetails };

        if (bankErrors !== null) {
            const intermediateBankError = { ...bankErrors };

            if (
                (intermediateBankError[inputKey]) &&
                (intermediateBankError[inputKey] !== null)
            ) {
                delete intermediateBankError[inputKey];
            }

            setBankErrors(intermediateBankError);
        }

        intermediateBankObj[inputKey] = inputVal;

        setBankDetails(intermediateBankObj);
    }

    const Alert = (props) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const addBankAccount = async () => {
        const api = new API();
        await api.ACCOUNTS_URI().put("settings/update-bank-details", {
            ...bankDetails
        })
            .then(async (addBankResp) => {
                if (addBankResp.status === 200) {
                    if (
                        (addBankResp.data.success === true)
                    ) {
                        await fetchDoctorProfileDetails()
                        setIsEdit(true)
                        setSnackbarInfo({
                            isSnackBarOpen: true,
                            snackBarText: (
                                (doctorProfileDetails.bank_account_no !== null) &&
                                (doctorProfileDetails.bank_account_no.length > 0)
                            ) ? "Successfully Updated bank details" : "Successfully added bank details",
                            snackBarSeverity: "success",
                        })
                    } else {

                        if (
                            (addBankResp.data.errorMessage) &&
                            (typeof addBankResp.data.errorMessage === "array")
                        ) {
                            setBankErrors(addBankResp.data.errorMessage)
                        } else {
                            setSnackbarInfo({
                                isSnackBarOpen: true,
                                snackBarText: addBankResp.data.errorMessage,
                                snackBarSeverity: "error",
                            });
                        }
                    }
                } else {
                    setSnackbarInfo({
                        isSnackBarOpen: true,
                        snackBarText: "Error while adding bank details",
                        snackBarSeverity: "error",
                    })
                }
            })
            .catch(() => {
                setSnackbarInfo({
                    isSnackBarOpen: true,
                    snackBarText: "Internal server error",
                    snackBarSeverity: "error",
                });
            });
    }

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarInfo({
            isSnackBarOpen: false,
            snackBarText: "",
            snackBarSeverity: "success",
        })
    };

    const disableAddBankButton = (
        (bankDetails.bank_account_no === "") ||
        (bankDetails.bank_account_no_confirmation === "") ||
        (bankDetails.bank_account_no !== bankDetails.bank_account_no_confirmation)
    ) ? true : false;

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
            <Grid container spacing={2} justify="center">
                <Grid item md={7}>
                    <div className={classes.border}>
                        <div className={classes.spaceBetween}>
                            <div>
                                <Typography className={classes.title}>
                                    Manage Your Bank Details
                                </Typography>
                                <p className={classes.subtitle}>Add / Update Your Bank Details for Settlements</p>
                            </div>
                        </div>
                        <Divider style={{ margin: '15px 0 0' }} />
                        <Grid container className={classes.p3} spacing={3} justify="center">
                            <Grid item sm={6}>
                                <Typography>Bank Name<span style={{ color: 'red' }}>*</span></Typography>
                                {isEdit ? (
                                    <Typography variant="h6">{bankDetails.bank_name !== null && bankDetails.bank_name}</Typography>
                                ) : (
                                    <Input
                                        fullWidth
                                        placeholder="Enter Bank Name"
                                        className={classes.input}
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                        error={
                                            ((bankErrors !== null) &&
                                                (bankErrors.bank_name)) ? true : false
                                        }
                                        value={bankDetails.bank_name}
                                        onChange={(e) => handleInputChange("bank_name", e.target.value)}
                                    />
                                )}
                            </Grid>
                            <Grid item sm={6}>
                                <Typography>Name<span style={{ color: 'red' }}>*</span></Typography>
                                {isEdit ? (
                                    <Typography variant="h6">{bankDetails.bank_account_name !== null && bankDetails.bank_account_name}</Typography>
                                ) : (
                                    <Input
                                        fullWidth
                                        placeholder="as per your Bank Account"
                                        className={classes.input}
                                        inputProps={{
                                            'aria-label': 'Description',
                                        }}
                                        error={
                                            ((bankErrors !== null) &&
                                                (bankErrors.bank_account_name)) ? true : false
                                        }
                                        value={bankDetails.bank_account_name}
                                        onChange={(e) => handleInputChange("bank_account_name", e.target.value)}
                                    />
                                )}
                            </Grid>
                            <Grid item sm={4}>
                                <Typography>
                                    IFSC Code<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                {isEdit ? (
                                    <Typography variant="h6">{bankDetails.bank_ifsc_code !== null && bankDetails.bank_ifsc_code}</Typography>
                                ) : (
                                    <Input
                                        fullWidth
                                        placeholder="e.g. SBIN000000"
                                        className={classes.input}
                                        error={
                                            ((bankErrors !== null) &&
                                                (bankErrors.bank_ifsc_code)) ? true : false
                                        }
                                        value={bankDetails.bank_ifsc_code}
                                        onChange={(e) => handleInputChange("bank_ifsc_code", e.target.value)}
                                    />
                                )}
                            </Grid>
                            {/* <Grid item sm={4}></Grid> */}
                            <Grid item sm={4}>
                                <Typography>
                                    Account Number<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                {isEdit ? (
                                    <Typography variant="h6">{bankDetails.bank_account_no !== null && bankDetails.bank_account_no}</Typography>
                                ) : (
                                    <Input
                                        fullWidth
                                        className={classes.input}
                                        type={"number"}
                                        error={
                                            ((bankErrors !== null) &&
                                                (bankErrors.bank_account_no)) ? true : false
                                        }
                                        value={bankDetails.bank_account_no}
                                        onChange={(e) => handleInputChange("bank_account_no", e.target.value)}
                                    />
                                )}
                            </Grid>
                            <Grid item sm={4}>
                                <Typography>
                                    Confirm Account Number<span style={{ color: 'red' }}>*</span>
                                </Typography>
                                {isEdit ? (
                                    <Typography variant="h6">{bankDetails.bank_account_no !== null && bankDetails.bank_account_no}</Typography>
                                ) : (
                                    <Input
                                        fullWidth
                                        type={"number"}
                                        className={classes.input}
                                        value={bankDetails.bank_account_no_confirmation}
                                        onChange={(e) => handleInputChange("bank_account_no_confirmation", e.target.value)}
                                    />
                                )}
                            </Grid>
                            <Grid item sm={12} style={{display: 'flex', justifyContent: 'end'}}>
                                {isEdit ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ float: 'right' }}
                                        onClick={() => setIsEdit(false)}
                                    >
                                        Edit
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ float: 'right' }}
                                            onClick={() => {
                                                setIsEdit(true)
                                                setBankDetails(defaultState)
                                            }}
                                            style={{marginRight: 8}}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            // color="primary"
                                            disabled={disableAddBankButton}
                                            style={{ float: 'right' }}
                                            onClick={() => addBankAccount()}
                                        >
                                            {
                                                (
                                                    (doctorProfileDetails.bank_account_no !== null) &&
                                                    (doctorProfileDetails.bank_account_no.length > 0)
                                                ) ? "Update" : "Add"
                                            }
                                        </Button>
                                    </>
                                )}
                            </Grid>

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
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

BankDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        doctorProfileDetails: state.get("profileReducer").doctorProfileDetails,
    }
}

export default connect(mapStateToProps, { fetchDoctorProfileDetails })(withStyles(styles)(BankDetails));
