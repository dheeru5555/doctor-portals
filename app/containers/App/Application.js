import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../Templates/Dashboard';
import { AppContext } from './ThemeWrapper';
import {
  Appointments,
  NotFound,
  Profile,
  Settings,
  NewAppointment,
  Frontdesk,
  FrontdeskProfile,
  Bills,
  Calendar,
  NewFrontdesk,
  PatientProfile,
  NewPatient,
  BookAppointment,
  Chat,
  Support,
  Dashboard1,
  Call
} from '../pageListAsync';

function Application(props) {
  const { history } = props;
  const changeMode = useContext(AppContext);
  const localUserInfo = localStorage.getItem('userInfo')
  const parsedUserInfo = JSON.parse(localUserInfo)

  const isFrontdesk = parsedUserInfo ? parsedUserInfo.frontdesk : false;

  if (isFrontdesk) {
    return (
      <Dashboard history={history} changeMode={changeMode}>
        <Switch>
          <Route exact path="/app/appointments" component={Appointments} />
          <Route path="/app/appointments/patient-profile" component={PatientProfile} />
          <Route path="/app/new-appointment" component={NewAppointment} />
          <Route path="/app/new-patient" component={NewPatient} />
          <Route path="/app/book-appointment/:pasentId" component={BookAppointment} />
          <Route path="/app/calendar" component={Calendar} />
          <Route path="/app/billing-invoice" component={Bills} />
          <Route path="/app/profile" component={Profile} />
          <Route path="/app/support" component={Support} />
          <Route path="/app/calendar" component={Calendar} />
          <Route path="/app/settings" component={Settings} />

          <Route component={NotFound} />
        </Switch>
      </Dashboard>
    )
  }

  return (
    <Dashboard history={history} changeMode={changeMode}>
      <Switch>
        {/* A */}
        <Route exact path="/app/dashboard" component={Dashboard1} />
        <Route exact path="/app/appointments" component={Appointments} />
        <Route path="/app/appointments/patient-profile" component={PatientProfile} />
        <Route path="/app/new-appointment" component={NewAppointment} />
        <Route path="/app/new-patient" component={NewPatient} />
        <Route path="/app/book-appointment/:pasentId" component={BookAppointment} />
        <Route path="/app/frontdesk" component={Frontdesk} />
        <Route path="/app/new-frontdesk" component={NewFrontdesk} />
        <Route path="/app/frontdesk-profile" component={FrontdeskProfile} />
        <Route path="/app/calendar" component={Calendar} />
        <Route path="/app/billing-invoice" component={Bills} />
        <Route path="/app/settings" component={Settings} />
        <Route path="/app/support/chat/:ticketId" component={Chat} />
        <Route path="/app/support" component={Support} />
        <Route path="/app/profile" component={Profile} />
        <Route path="/app/call" component={Call} />

        <Route component={NotFound} />
      </Switch>
    </Dashboard>
  );
}

Application.propTypes = {
  history: PropTypes.object.isRequired
};

export default Application;
