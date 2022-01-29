/*
 * User Form Messages
 *
 * This contains all the text for the Form components.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Forms';

export default defineMessages({
  createNewAccount: {
    id: `${scope}.Login.create`,
    defaultMessage: 'Create new account',
  },
  login: {
    id: `${scope}.Login.signin`,
    defaultMessage: 'Sign in',
  },
  loginOr: {
    id: `${scope}.Login.or`,
    defaultMessage: 'Or sign in with',
  },
  registerOr: {
    id: `${scope}.Register.or`,
    defaultMessage: 'Or register with',
  },
  loginFieldName: {
    id: `${scope}.Register.field.name`,
    defaultMessage: 'Username',
  },
  loginFieldOtp: {
    id: `${scope}.Register.field.otp`,
    defaultMessage: 'Enter OTP',
  },
  loginFieldEmail: {
    id: `${scope}.Login.field.email`,
    defaultMessage: 'Your Email',
  },
  loginFieldPassword: {
    id: `${scope}.Login.field.password`,
    defaultMessage: 'Your Password',
  },
  loginFieldRetypePassword: {
    id: `${scope}.Register.field.retypePassword`,
    defaultMessage: 'Re-type Password',
  },
  loginForgotPassword: {
    id: `${scope}.Login.field.forgot`,
    defaultMessage: 'Forgot Password?',
  },
  loginRemember: {
    id: `${scope}.Login.field.remember`,
    defaultMessage: 'Remember me',
  },
  loginButtonContinue: {
    id: `${scope}.Login.button.continue`,
    defaultMessage: 'Login',
  },
  registerButtonContinue: {
    id: `${scope}.Register.button.continue`,
    defaultMessage: 'Register',
  },
  toAccount: {
    id: `${scope}.Register.create`,
    defaultMessage: 'Already have account ?',
  },
  register: {
    id: `${scope}.Register.signup`,
    defaultMessage: 'Register',
  },
  tabEmail: {
    id: `${scope}.Register.tab.email`,
    defaultMessage: 'With Email',
  },
  tabSocial: {
    id: `${scope}.Register.tab.social`,
    defaultMessage: 'With Social Media',
  },
  aggree: {
    id: `${scope}.Register.agree`,
    defaultMessage: 'Agree with',
  },
  terms: {
    id: `${scope}.Register.terms`,
    defaultMessage: 'Terms & Condition',
  },
  resetTitle: {
    id: `${scope}.Reset.title`,
    defaultMessage: 'Reset Password',
  },
  resetSubtitle: {
    id: `${scope}.Reset.subtitle`,
    defaultMessage: 'Enter the email id and we will send the password on your mail.',
  },
  resetButton: {
    id: `${scope}.Reset.button`,
    defaultMessage: 'Send Password',
  },
  lockHint: {
    id: `${scope}.Lock.hint`,
    defaultMessage: 'Hint: Type anything to unlock!',
  },
  requiredForm: {
    id: `${scope}.Required.text`,
    defaultMessage: 'Required',
  },
});
