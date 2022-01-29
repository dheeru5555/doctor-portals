module.exports = [
  {
    key: 'Appointments',
    permissionKey: ['view_appointments'],
    name: 'appointments',
    module_name: 'appointments',
    icon: 'business_center',
    linkParent: '/app/appointments'
  },
  {
    key: 'New Appointment',
    permissionKey: ['new_appointment'],
    name: 'New Appointment',
    module_name: 'new_appointment',
    icon: 'person_add',
    linkParent: '/app/new-appointment'
  },
  {
    key: 'Calendar',
    permissionKey: ['calendar'],
    name: 'Calendar',
    module_name: 'calendar',
    icon: 'event_available',
    linkParent: '/app/calendar'
  },
  {
    key: 'Billing / Invoice',
    permissionKey: ['bill_invoice'],
    name: 'Bill / Invoice',
    module_name: 'bill_invoice',
    icon: 'monetization_on',
    linkParent: '/app/billing-invoice'
  },
  {
    key: 'Settings',
    permissionKey: ['billing', 'my_subscription', 'holidays', 'sms', 'email'],
    name: 'Settings',
    module_name: 'settings',
    icon: 'settings',
    linkParent: '/app/settings'
  },
  {
    key: 'Log Complaint',
    permissionKey: ['log_complaint'],
    name: 'Log Complaint',
    module_name: 'log_complaint',
    icon: 'help',
    linkParent: '/app/support'
  },
];