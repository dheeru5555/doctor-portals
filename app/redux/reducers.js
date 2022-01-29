/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { reducer as form } from 'redux-form/immutable';
import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import history from 'utils/history';

// Global Reducers
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import authReducer from './modules/authReducer';
import supportReducer from './modules/supportReducer';
import calenderReducer from './modules/calenderReducer';
import frontDeskReducer from './modules/FrontDeskReducer';
import newAppointmentReducer from './modules/newAppointmentReducer';
import BillingReducer from './modules/BillingReducer';

import uiReducer from './modules/uiReducer';
import initval from './modules/initFormReducer';
import profileReducer from './modules/profileReducer';
import settingsReducer from './modules/settingsReducer';
import dashboardReducer from './modules/dashboardReducer';
import receptionistReducer from './modules/receptionistReducer';
import appointmentReducer from './modules/appointmentReducer';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    form,
    ui: uiReducer,
    initval,
    authReducer,
    frontDeskReducer,
    calenderReducer,
    newAppointmentReducer,
    supportReducer,
    BillingReducer,
    profileReducer,
    dashboardReducer,
    settingsReducer,
    receptionistReducer,
    appointmentReducer,
    language: languageProviderReducer,
    router: connectRouter(history),
    ...injectedReducers,
  });

  // Wrap the root reducer and return a new root reducer with router state
  const mergeWithRouterState = connectRouter(history);
  return mergeWithRouterState(rootReducer);
}