import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { SettingsComponent } from 'enl-components';

const styles = ({
    root: {
        flexGrow: 1,
        padding: 10,
        borderRadius: 10,
        background: '#fff'
    }
});

class Settings extends React.Component {
    render() {
        const title = brand.name + ' - Settings';
        const description = brand.desc;
        const { classes } = this.props;
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
                <div className={classes.root}>
                    <SettingsComponent tabVal={(this.props.location.state !== null && this.props.location.state !== undefined) ? this.props.location.state.tabVal : 0} />
                </div>
            </div>
        );
    }
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(injectIntl(Settings));
