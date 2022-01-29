import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from 'containers/Pages/Standalone/NotFoundDedicated';
import Outer from '../Templates/Outer';
import {
  Login, Register, Otp,
  ResetPassword,
  ComingSoon, Maintenance, Consult, RegisterProcess, Complete, LockScreen,
  TermsAndConditions, PrivacyPolicy, Call, Subscriptions
} from '../pageListAsync';

function Auth() {
  const localUserInfo = localStorage.getItem('userInfo')
  const parsedUserInfo = JSON.parse(localUserInfo)

  const isFrontdesk = parsedUserInfo ? parsedUserInfo.frontdesk : false;

  if (isFrontdesk) {
    return (
      <Outer>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/otp" component={Otp} />
          <Route path="/register-process" component={RegisterProcess} />
          <Route path="/reset-password" component={ResetPassword} />
          {/* <Route path="/maintenance" component={Maintenance} /> */}
          <Route path="/lock-screen" component={LockScreen} />
          {/* <Route path="/call" component={Call} /> */}
          <Route path="/terms-and-conditions" component={TermsAndConditions} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          {/* <Route path="/coming-soon" component={ComingSoon} /> */}
          <Route component={NotFound} />
        </Switch>
      </Outer>
    )
  }
  return (
    <Outer>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/otp" component={Otp} />
        <Route path="/register-process" component={RegisterProcess} />
        <Route path="/reset-password" component={ResetPassword} />
        {/* <Route path="/maintenance" component={Maintenance} /> */}
        <Route path="/lock-screen" component={LockScreen} />
        <Route path="/consult" component={Consult} />
        <Route path="/subscriptions" component={Subscriptions} />
        {/* <Route path="/call" component={Call} /> */}
        <Route path="/completed" component={Complete} />
        <Route path="/terms-and-conditions" component={TermsAndConditions} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        {/* <Route path="/coming-soon" component={ComingSoon} /> */}
        <Route component={NotFound} />
      </Switch>
    </Outer>
  );
}

export default Auth;
