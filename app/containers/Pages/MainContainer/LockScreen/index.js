import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { LockForm } from 'enl-components';
import styles from '../Authentication/user-jss';

function LockScreen(props) {
  const { classes } = props;
  const title = brand.name + ' - Lock Screen';
  const description = brand.desc;
  const [valueForm, setValueForm] = useState(null);

  const submitForm = (values) => setValueForm(values);

  useEffect(() => {
    if (valueForm) {
      window.location.href = '/app/dashboard';
    }
  }, [valueForm]);

  return (
    <div className={classes.root} style={{ background: '#ff2100', height: '100%' }}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <div className={classes.container}>
        <div className={classes.userFormWrap}>
          <LockForm onSubmit={(values) => submitForm(values)} />
        </div>
      </div>
    </div>
  );
}

LockScreen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LockScreen);
