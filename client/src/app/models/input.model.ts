import { ValidationMessageMap } from './forms';

export const NAME_VALIDATION_MESSAGES: ValidationMessageMap = {
  required: 'Required Field',
};

export const EMAIL_VALIDATION_MESSAGES: ValidationMessageMap = {
  required: 'Required Field',
  email: 'Not valid Email',
};


export const DATE_VALIDATION_MESSAGES: ValidationMessageMap = {
  required: 'Required field',
  datePattern: 'Date must be in MM/DD/YYYY format and be a valid date',
  minAge: 'You must be at least 18 years old',
  maxAge: 'Age cannot be more than 120 years',
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
  birthDate:DATE_VALIDATION_MESSAGES,

};


export const EDIT_PROFILE_VALIDATION_MESSAGES: Record<string, ValidationMessageMap> = {
  name: NAME_VALIDATION_MESSAGES,
  birthDate:DATE_VALIDATION_MESSAGES,
};

