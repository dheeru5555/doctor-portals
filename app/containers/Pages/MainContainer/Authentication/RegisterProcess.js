import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { RegisterProcessForm } from 'enl-components';
import styles from './user-jss';
import Grid from '@material-ui/core/Grid';
import {connect} from 'react-redux';
import {fetchMasterData, fetchSuperSpecializations} from "../../../../redux/actions/dashboardActions";
import Loading from 'enl-components/Loading';

function RegisterProcess(props) {
    const { classes, masterData, superSpecialization, location  } = props;
    const title = brand.name + ' - Register Process';
    const description = brand.desc;

    let currentRegistrationStep = 0;

    if(location && location.state && location.state.currentStep) {
        currentRegistrationStep = location.state.currentStep;
    }

    useEffect(() => {
        if (masterData === null) {
            props.fetchMasterData();
            props.fetchSuperSpecializations();
        }

        if (superSpecialization === null) {
            props.fetchSuperSpecializations();
        }
    }, []);

    if ((masterData === null) || (superSpecialization === null)) {
        return <Loading />;
    }

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
                <Grid container justify="center">
                    <Grid item sm={12}>
                        <RegisterProcessForm
                            currentRegistrationStep = {currentRegistrationStep}
                            masterData={masterData}
                        />
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

RegisterProcess.propTypes = {
    classes: PropTypes.object.isRequired,
    superSpecialization: PropTypes.any,
    masterData: PropTypes.any,
};

const mapStateToProps = state => {
    return {
        masterData: state.get("dashboardReducer").masterData,
        superSpecialization: state.get("dashboardReducer").superSpecialization,
    }
}

export default connect(mapStateToProps, {fetchMasterData, fetchSuperSpecializations})(withStyles(styles)(RegisterProcess));
