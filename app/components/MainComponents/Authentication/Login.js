import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Paper from '@material-ui/core/Paper';
import PhoneAndroidOutlined from '@material-ui/icons/PhoneAndroidOutlined';
import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import brand from 'enl-api/dummy/brand';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import Toolbar from '@material-ui/core/Toolbar';
import messages from './messages';
import styles from './user-jss';

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) { // eslint-disable-line
    return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

function LoginForm(props) {
    const { classes, formValues, updateValueFormFields, handleFormSubmit, masterData } = props;
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = event => event.preventDefault();

    return (
        <Paper className={classes.sideWrap}>
            <Hidden mdUp>
                <div className={classes.headLogo}>
                    <div className={classes.brand}>
                        {brand.name}
                    </div>
                </div>
            </Hidden>
            <div className={classes.topBar}>
                <Typography variant="h4" className={classes.title}>
                    <FormattedMessage {...messages.login} />
                </Typography>
                <Button size="small" className={classes.buttonLink} component={LinkBtn} to="/register">
                    <ArrowForward className={classes.icon} />
                    <FormattedMessage {...messages.createNewAccount} />
                </Button>
            </div>
            <Grid container justify="center">
                <Grid item sm={10}>
                    <section className={classes.pageFormSideWrap}>
                        <div>
                            <TextField
                                id="standard-basic"
                                fullWidth
                                error={
                                    ((formValues.errorMessages !== null) &&
                                        formValues.errorMessages.userName) ? true : false
                                }
                                helperText={((formValues.errorMessages !== null) && formValues.errorMessages.userName) && formValues.errorMessages.userName[0]}
                                label="Email or Phone No"
                                value={formValues.userName}
                                onChange={(e) => updateValueFormFields("userName", e.target.value)}
                            />
                        </div>
                        <div>
                            <TextField
                                id="standard-basic"
                                fullWidth
                                error={
                                    ((formValues.errorMessages !== null) &&
                                        formValues.errorMessages.password) ? true : false
                                }
                                helperText={
                                    ((formValues.errorMessages !== null) && formValues.errorMessages.password)
                                    && formValues.errorMessages.password[0]
                                }
                                type={showPassword ? "text" : "password"}
                                label="Enter Password"
                                value={formValues.password}
                                onChange={(e) => updateValueFormFields("password", e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                        <div className={classes.optArea}>
                            <Button size="small" component={LinkBtn} to="/reset-password" className={classes.buttonLink}>
                                <FormattedMessage {...messages.loginForgotPassword} />
                            </Button>
                        </div>
                        <div className={classes.btnArea}>
                            <Button
                                variant="contained"
                                fullWidth
                                color="primary"
                                size="large"
                                onClick={async (e) => await handleFormSubmit(e)}
                            >
                                login
                            </Button>
                        </div>
                    </section>
                </Grid>
            </Grid>
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
                        <Typography variant="subtitle2" align="center">
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

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
    intl: intlShape,
    messagesAuth: PropTypes.string,
    loading: PropTypes.bool,
    closeMsg: PropTypes.func,
    formValues: PropTypes.shape({
        userName: PropTypes.string,
        password: PropTypes.string,
        rememberMe: PropTypes.boolean,
        errorMessages: PropTypes.any,
    }),
    updateValueFormFields: PropTypes.func,
    handleFormSubmit: PropTypes.func,
};

LoginForm.defaultProps = {
    messagesAuth: null,
    loading: false
};

export default withStyles(styles)(injectIntl(LoginForm));
