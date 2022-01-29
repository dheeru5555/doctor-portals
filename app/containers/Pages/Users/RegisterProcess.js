import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { RegisterProcessForm } from 'enl-components';
import styles from 'enl-components/Forms/user-jss';
import Grid from '@material-ui/core/Grid';

function RegisterProcess(props) {
  const { classes } = props;
  const title = brand.name + ' - Register Process';
  const description = brand.desc;
  const [valueForm] = useState(null);
  // const docSrc = 'containers/UiElements/demos/Steppers/';

  // const submitForm = (values) => setValueForm(values);

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
        {/* <Hidden smDown>
          <div className={classes.opening}>
            <div className={classes.openingWrap}>
              <div className={classes.openingHead}>
                <NavLink to="/" className={classes.brand}>
                  <img src={logo} alt={brand.name} />
                  {brand.name}
                </NavLink>
              </div>
              <Typography variant="h3" component="h1" gutterBottom>
                <FormattedMessage {...messages.welcomeTitle} />
                &nbsp;
                {brand.name}
              </Typography>
              <Typography variant="h6" component="p" className={classes.subpening}>
                <FormattedMessage {...messages.welcomeSubtitle} />
              </Typography>
            </div>
          </div>
        </Hidden>
        <div className={classes.sideFormWrap}>
          <RegisterProcessForm />
          <SourceReader componentName="RegisterProcessForm.js" />
        </div> */}

        <Grid container justify="center">
          <Grid item sm={12}>
            <RegisterProcessForm />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

RegisterProcess.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RegisterProcess);
