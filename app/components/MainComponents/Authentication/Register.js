import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form/immutable';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import brand from 'enl-api/dummy/brand';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ArrowForward from '@material-ui/icons/ArrowForward';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import PhoneAndroidOutlined from '@material-ui/icons/PhoneAndroidOutlined';
import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { closeMsgAction } from 'enl-redux/actions/authActions';
import messages from './messages';
import styles from './user-jss';

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
    return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function RegisterForm(props) {
    const {
        classes,
        loading,
        handleRegisterFormInputChange,
        handleRegisterFormSubmit,
        registerFormValues,
        masterData
    } = props;

    return (
        <Paper className={classes.sideWrap} style={{ paddingLeft: 100, paddingRight: 100 }}>
            <Hidden mdUp>
                <div className={classes.headLogo}>
                    <div className={classes.brand}>
                        {brand.name}
                    </div>
                </div>
            </Hidden>
            <div className={classes.topBar}>
                <Typography variant="h4" className={classes.title}>
                    <FormattedMessage {...messages.register} />
                </Typography>
                <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/login">
                    <Icon className={classes.icon}>arrow_forward</Icon>
                    <FormattedMessage {...messages.toAccount} />
                </Button>
            </div>

            <section>
                <div>
                    <Grid container spacing={1}>
                        <Grid item sm={2}>
                            <FormControl fullWidth required>
                                <InputLabel>Title</InputLabel>
                                <Select
                                    name="initials"
                                    value={registerFormValues.title}
                                    onChange={(e) => handleRegisterFormInputChange("title", e.target.value)}
                                    disabled
                                >
                                    <MenuItem value="Dr">Dr</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item sm={5}>
                            <TextField
                                name="first_name"
                                label="First Name"
                                className={classes.field}
                                inputProps={{ maxLength: 20 }}
                                fullWidth
                                required
                                error={
                                    ((registerFormValues.errorMessages !== null) &&
                                        registerFormValues.errorMessages.first_name) ? true : false
                                }
                                helperText={(
                                    (registerFormValues.errorMessages !== null) &&
                                    registerFormValues.errorMessages.first_name) &&
                                    registerFormValues.errorMessages.first_name[0]
                                }
                                value={registerFormValues.first_name}
                                onChange={(e) => handleRegisterFormInputChange("first_name", e.target.value)}
                            />
                        </Grid>
                        <Grid item sm={5}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    name="last_name"
                                    label="Last name"
                                    inputProps={{ maxLength: 20 }}
                                    required
                                    error={
                                        ((registerFormValues.errorMessages !== null) &&
                                            registerFormValues.errorMessages.last_name) ? true : false
                                    }
                                    helperText={(
                                        (registerFormValues.errorMessages !== null) &&
                                        registerFormValues.errorMessages.last_name) &&
                                        registerFormValues.errorMessages.last_name[0]
                                    }
                                    className={classes.field}
                                    value={registerFormValues.last_name}
                                    onChange={(e) => handleRegisterFormInputChange("last_name", e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                    <FormControl className={classes.formControl}>
                        <TextField
                            name="email"
                            label="Email Address"
                            required
                            className={classes.field}
                            error={
                                ((registerFormValues.errorMessages !== null) &&
                                    registerFormValues.errorMessages.email) ? true : false
                            }
                            helperText={(
                                (registerFormValues.errorMessages !== null) &&
                                registerFormValues.errorMessages.email) &&
                                registerFormValues.errorMessages.email[0]
                            }
                            value={registerFormValues.email}
                            onChange={(e) => handleRegisterFormInputChange("email", e.target.value)}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            name="Mobile Number"
                            label="Mobile Number"
                            onKeyDown={(e) => e.key === '.' && e.preventDefault()}
                            type="number"
                            onInput={(e) => {
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10)
                            }}
                            error={
                                ((registerFormValues.errorMessages !== null) &&
                                    registerFormValues.errorMessages.mobile) ? true : false
                            }
                            helperText={(
                                (registerFormValues.errorMessages !== null) &&
                                registerFormValues.errorMessages.mobile) &&
                                registerFormValues.errorMessages.mobile[0]
                            }
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        +91
                                    </InputAdornment>
                                ),
                            }}
                            required
                            value={registerFormValues.mobile}
                            onChange={(e) => handleRegisterFormInputChange("mobile", e.target.value)}
                            className={classes.field}
                        />
                        <label className={classes.note} style={{ fontStyle: 'italic', fontSize: 11 }}>Note: We will send a Otp on this mobile for verification</label>
                    </FormControl>
                    <FormGroup row className={classes.terms}>
                        <label className={classes.mAuto}>By registering you Agree to our use <a target="_blank" href="/terms-and-conditions">terms and conditions</a> and <a target="_blank" href="/privacy-policy">privacy policy</a></label>
                    </FormGroup>
                </div>
                <div className={classes.btnArea}>
                    <Button
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        color="primary"
                        onClick={async () => await handleRegisterFormSubmit()}
                    >
                        Continue
                    </Button>
                </div>
            </section>
            <Toolbar style={{
                marginTop: '10',
                marginBottom: '10',
                width: '70%',
                bottom: 5,
                left: '15%',
                position: 'absolute',
                backgroundColor: '#f6f6f6'
            }}
            >
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} align="center">
                        <Typography variant="subtitle2" align="center" style={{ fontSize: '0.775rem' }}>
                            Why not speak or write to our team, we will be happy to assist
                        </Typography>
                    </Grid>
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
            </Toolbar>
        </Paper>
    );
}
RegisterForm.defaultProps = {
    messagesAuth: null
};

RegisterForm.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    messagesAuth: PropTypes.string,
    loading: PropTypes.bool,
    handleRegisterFormInputChange: PropTypes.func,
    handleRegisterFormSubmit: PropTypes.func,
    registerFormValues: PropTypes.exact({
        title: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        mobile: PropTypes.string,
        email: PropTypes.string,
        errorMessages: PropTypes.any,
    }),
};
export default withStyles(styles)(injectIntl(RegisterForm));
