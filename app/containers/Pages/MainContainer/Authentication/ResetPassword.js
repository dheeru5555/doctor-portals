import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { ResetForm } from 'enl-components';
import logo from 'enl-images/logo.svg';
import styles from './user-jss';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { connect } from "react-redux";
import { fetchMasterData } from '../../../../redux/actions/dashboardActions';

function ResetPassword(props) {
    const { classes, masterData } = props;
    const title = brand.name + ' - Reset Password';
    const description = brand.desc;
    const [valueForm, setValueForm] = useState(null);

    const submitForm = (values) => setValueForm(values);

    useEffect(() => {
        if(masterData == null) {
            props.fetchMasterData()
        }
    })

    useEffect(() => {
        if (valueForm) {
            window.location.href = '/app';
        }
    }, [valueForm]);

    return (
        <div className={classes.rootFull}>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
            </Helmet>
            <div className={classes.containerSide}>
                <Hidden smDown>
                    <div className={classes.opening}>
                        <div className={classes.openingWrap}>
                            <div className={classes.openingHead}>
                                <div className={classes.brand}>
                                    {/* <img src={logo} alt={brand.name} /> */}
                                    {brand.name}
                                </div>
                            </div>
                            <Typography variant="h3" component="h1" gutterBottom>
                                <FormattedMessage {...messages.welcomeTitle} />
                                &nbsp;
                                {brand.name}
                            </Typography>
                        </div>
                    </div>
                </Hidden>
                <div className={classes.sideFormWrap}>
                    <ResetForm onSubmit={(values) => submitForm(values)} masterData={masterData} />
                </div>
            </div>
        </div>
    );
}

ResetPassword.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    masterData: state.get('dashboardReducer').masterData,
});

export default connect(mapStateToProps, { fetchMasterData })(withStyles(styles)(ResetPassword));
