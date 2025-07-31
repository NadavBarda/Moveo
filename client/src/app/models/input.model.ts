import { ValidationMessageMap } from './forms';

export const NAME_VALIDATION_MESSAGES: ValidationMessageMap = {
  required: 'Required Field',
};

export const EMAIL_VALIDATION_MESSAGES: ValidationMessageMap = {
  required: 'Required Field',
  email: 'Not valid Email',
};

export const PASSWORD_VALIDATION_MESSAGES: ValidationMessageMap = {
  required: 'Required Field',
  length: 'Password must be at least 6 characters long.',
  passwordPattern: 'Password must contain both letters and numbers.',
};

export const LOGIN_VALIDATION_MESSAGES: Record<string, ValidationMessageMap> = {
  email: EMAIL_VALIDATION_MESSAGES,
  password: PASSWORD_VALIDATION_MESSAGES,
};

export const REGISTER_VALIDATION_MESSAGES: Record<string, ValidationMessageMap> = {
  name: NAME_VALIDATION_MESSAGES,
  email: EMAIL_VALIDATION_MESSAGES,
  password: PASSWORD_VALIDATION_MESSAGES,
};
