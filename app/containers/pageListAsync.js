import Loadable from 'react-loadable';
import Loading from 'enl-components/Loading';

// export const DashboardPage = Loadable({
//   loader: () => import('./Pages/Dashboard'),
//   loading: Loading,
// });
// export const AnalyticDashboard = Loadable({
//   loader: () => import('./Pages/Dashboard/AnalyticDashboard'),
//   loading: Loading,
// });
// export const Appointments = Loadable({
//   loader: () => import('./Pages/Appointments/Appointments'),
//   loading: Loading,
// });
// export const Timeline = Loadable({
//   loader: () => import('./Pages/Timeline'),
//   loading: Loading,
// });
// export const NewAppointment = Loadable({
//   loader: () => import('./Pages/NewAppointment'),
//   loading: Loading,
// });
// export const NewPatient = Loadable({
//   loader: () => import('./Pages/NewAppointment/NewPatient'),
//   loading: Loading,
// });
// export const BookAppointment = Loadable({
//   loader: () => import('./Pages/NewAppointment/BookAppointment'),
//   loading: Loading,
// });
// export const PatientProfile = Loadable({
//   loader: () => import('./Pages/Appointments/PatientProfile'),
//   loading: Loading,
// });
// export const Consult = Loadable({
//   loader: () => import('./Pages/Consult/Consult'),
//   loading: Loading,
// });
// export const Complete = Loadable({
//   loader: () => import('./Pages/Consult/Completed'),
//   loading: Loading,
// });
// export const Frontdesk = Loadable({
//   loader: () => import('./Pages/Frontdesk'),
//   loading: Loading,
// });
// export const FrontdeskProfile = Loadable({
//   loader: () => import('./Pages/Frontdesk/Profile'),
//   loading: Loading,
// });
// export const NewFrontdesk = Loadable({
//   loader: () => import('./Pages/Frontdesk/NewFrontdesk'),
//   loading: Loading,
// });
// export const BIllingInvoice = Loadable({
//   loader: () => import('./Pages/BillingInvoice'),
//   loading: Loading,
// });
// export const LockScreen = Loadable({
//   loader: () => import('./Pages/Users/LockScreen'),
//   loading: Loading,
// });
// export const Calendar = Loadable({
//   loader: () => import('./Pages/Calendar'),
//   loading: Loading,
// });
// export const Chat = Loadable({
//   loader: () => import('./Pages/Support/chat'),
//   loading: Loading,
// });
// export const Support = Loadable({
//   loader: () => import('./Pages/Support'),
//   loading: Loading,
// });
// export const Table = Loadable({
//   loader: () => import('./Pages/Table/BasicTable'),
//   loading: Loading,
// });
// export const Form = Loadable({
//   loader: () => import('./Pages/Forms/ReduxForm'),
//   loading: Loading,
// });
// export const LoginFullstack = Loadable({
//   loader: () => import('./Pages/UsersFullstack/Login'),
//   loading: Loading,
// });
// export const RegisterFullstack = Loadable({
//   loader: () => import('./Pages/UsersFullstack/Register'),
//   loading: Loading,
// });
// export const ResetPasswordFullstack = Loadable({
//   loader: () => import('./Pages/UsersFullstack/ResetPassword'),
//   loading: Loading,
// });
// export const Login = Loadable({
//   loader: () => import('./Pages/Users/Login'),
//   loading: Loading,
// });
// export const Register = Loadable({
//   loader: () => import('./Pages/Users/Register'),
//   loading: Loading,
// });
// export const Otp = Loadable({
//   loader: () => import('./Pages/Users/Otp'),
//   loading: Loading,
// });
// export const RegisterProcess = Loadable({
//   loader: () => import('./Pages/Users/RegisterProcess'),
//   loading: Loading,
// });
// export const ResetPassword = Loadable({
//   loader: () => import('./Pages/Users/ResetPassword'),
//   loading: Loading,
// });
// export const ComingSoon = Loadable({
//   loader: () => import('./Pages/ComingSoon'),
//   loading: Loading,
// });
// export const BlankPage = Loadable({
//   loader: () => import('./Pages/BlankPage'),
//   loading: Loading,
// });
// export const NotFound = Loadable({
//   loader: () => import('./NotFound/NotFound'),
//   loading: Loading,
// });
// export const Error = Loadable({
//   loader: () => import('./Pages/Error'),
//   loading: Loading,
// });
// export const Maintenance = Loadable({
//   loader: () => import('./Pages/Maintenance'),
//   loading: Loading,
// });
// export const Parent = Loadable({
//   loader: () => import('./Parent'),
//   loading: Loading,
// });
// export const NotFoundDedicated = Loadable({
//   loader: () => import('./Pages/Standalone/NotFoundDedicated'),
//   loading: Loading,
// });
// export const Profile = Loadable({
//   loader: () => import('./Pages/UserProfile'),
//   loading: Loading,
// });
// export const Settings = Loadable({
//   loader: () => import('./Pages/Settings'),
//   loading: Loading,
// });



// A

export const Dashboard1 = Loadable({
  loader: () => import('./Pages/MainContainer/Dashboard'),
  loading: Loading,
});

export const Appointments = Loadable({
  loader: () => import('./Pages/MainContainer/Appointments'),
  loading: Loading,
});

export const PatientProfile = Loadable({
  loader: () => import('./Pages/MainContainer/PatientProfile'),
  loading: Loading,
});

export const Consult = Loadable({
  loader: () => import('./Pages/MainContainer/Consult'),
  loading: Loading,
});

export const Complete = Loadable({
  loader: () => import('./Pages/MainContainer/Consult/Completed'),
  loading: Loading,
});

export const NewAppointment = Loadable({
  loader: () => import('./Pages/MainContainer/NewAppointment'),
  loading: Loading,
});

export const NewPatient = Loadable({
  loader: () => import('./Pages/MainContainer/NewAppointment/NewPatient'),
  loading: Loading,
});

export const BookAppointment = Loadable({
  loader: () => import('./Pages/MainContainer/NewAppointment/BookAppointment'),
  loading: Loading,
});

export const Frontdesk = Loadable({
  loader: () => import('./Pages/MainContainer/Frontdesk'),
  loading: Loading,
});

export const NewFrontdesk = Loadable({
  loader: () => import('./Pages/MainContainer/Frontdesk/NewFrontdesk'),
  loading: Loading,
});

export const FrontdeskProfile = Loadable({
  loader: () => import('./Pages/MainContainer/Frontdesk/Profile'),
  loading: Loading,
});

export const Calendar = Loadable({
  loader: () => import('./Pages/MainContainer/Calendar'),
  loading: Loading,
});

export const Bills = Loadable({
  loader: () => import('./Pages/MainContainer/Bills'),
  loading: Loading,
});

export const Settings = Loadable({
  loader: () => import('./Pages/MainContainer/Settings'),
  loading: Loading,
});

export const Support = Loadable({
  loader: () => import('./Pages/MainContainer/Support'),
  loading: Loading,
});

export const Chat = Loadable({
  loader: () => import('./Pages/MainContainer/Support/chat'),
  loading: Loading,
});

export const Profile = Loadable({
  loader: () => import('./Pages/MainContainer/UserProfile'),
  loading: Loading,
});

export const Login = Loadable({
  loader: () => import('./Pages/MainContainer/Authentication/Login'),
  loading: Loading,
});

export const Register = Loadable({
  loader: () => import('./Pages/MainContainer/Authentication/Register'),
  loading: Loading,
});

export const Otp = Loadable({
  loader: () => import('./Pages/MainContainer/Authentication/Otp'),
  loading: Loading,
});

export const RegisterProcess = Loadable({
  loader: () => import('./Pages/MainContainer/Authentication/RegisterProcess'),
  loading: Loading,
});

export const ResetPassword = Loadable({
  loader: () => import('./Pages/MainContainer/Authentication/ResetPassword'),
  loading: Loading,
});

export const NotFound = Loadable({
  loader: () => import('./Pages/MainContainer/NotFound'),
  loading: Loading,
});

export const LockScreen = Loadable({
  loader: () => import('./Pages/MainContainer/LockScreen'),
  loading: Loading,
});

export const TermsAndConditions = Loadable({
  loader: () => import('./Pages/MainContainer/TermsAndConditions'),
  loading: Loading,
});

export const PrivacyPolicy = Loadable({
  loader: () => import('./Pages/MainContainer/PrivacyPolicy'),
  loading: Loading,
});

export const Call = Loadable({
  loader: () => import('./Pages/MainContainer/Consult/Call'),
  loading: Loading,
});

export const Subscriptions = Loadable({
  loader: () => import('./Pages/MainContainer/Subscriptions'),
  loading: Loading,
});