import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'enl-api/dummy/brand';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { AppointmentsComponent } from 'enl-components';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Loading from 'enl-components/Loading';
import { fetchBookedAppointments, fetchNewMedicineOptions } from '../../../../redux/actions/appointmentAction';
import { fetchMasterData } from '../../../../redux/actions/dashboardActions';
import history from '../../../../utils/history';

const AppointmentWrapper = styled('div')`
  background: #fff;
`;

const styles = ({
  root: {
    flexGrow: 1,
    padding: 10,
    borderRadius: 10,
    '& header': {
      background: 'none'
    }
  }
});

class Appointments extends React.Component {

  async componentDidMount() {
    if (this.props.bookedAppointments === null || this.props.newMedicineOptions === null || this.props.masterData === null) {
      await this.props.fetchBookedAppointments();
      await this.props.fetchNewMedicineOptions();
      await this.props.fetchMasterData();
    }
  }

  render() {
    const title = brand.name + ' Appointments';
    const description = brand.desc;
    const { classes, bookedAppointments, newMedicineOptions } = this.props;
    if(
      bookedAppointments !== null &&
      bookedAppointments.success === false &&
      bookedAppointments.errorMessage &&
      !bookedAppointments.errorMessage.isSubscribed
    ) {
      history.push("/subscriptions")
    }
    if (bookedAppointments === null) {
      return <Loading />;
    }

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
        <AppointmentWrapper className={classes.root}>
          <AppointmentsComponent tabVal={(this.props.location.state !== null && this.props.location.state !== undefined) ? this.props.location.state.tabVal : 0} />
        </AppointmentWrapper>
      </div>
    );
  }
}

Appointments.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  bookedAppointments: state.get('appointmentReducer').bookedAppointments,
  newMedicineOptions: state.get('appointmentReducer').newMedicineOptions,
  masterData: state.get('dashboardReducer').masterData,
});

export default connect(mapStateToProps, { fetchBookedAppointments, fetchNewMedicineOptions, fetchMasterData })(withStyles(styles)(injectIntl(Appointments)));
