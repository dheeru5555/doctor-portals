import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import { RegisterForm } from 'enl-components';
import styles from 'enl-components/Forms/user-jss';
import brand from 'enl-api/dummy/brand';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Register(props) {
  const { classes } = props;
  const title = brand.name + ' - Register';
  const description = brand.desc;
  const [valueForm, setValueForm] = useState(null);

  const submitForm = (values) => setValueForm(values);

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
          <div className={classes.opening} style={{ width: '39%' }}>
            <div className={classes.openingWrap}>
              <div className={classes.openingHead}>
                <div className={classes.brand}>
                  {/* <img src={logo} alt={brand.name} /> */}
                  {brand.name}
                </div>
              </div>
              <Typography variant="h3" component="h1" className={classes.opening} gutterBottom>
                <FormattedMessage {...messages.greetingTitle} />
              </Typography>
              <Typography variant="h6" component="p" className={classes.subpening}>
                <FormattedMessage {...messages.greetingSubtitle} />
              </Typography>
            </div>
          </div>
        </Hidden>
        <div className={classes.sideFormWrap}>
          <RegisterForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
