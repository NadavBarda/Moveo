import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface ValidationDateError extends ValidationErrors {
  datePattern?: boolean; // invalid date format or value
  required?: boolean;
  minAge?: boolean; // too young
  maxAge?: boolean; // too old
}

export const birthdayValidator: ValidatorFn = (
  control: AbstractControl
): ValidationDateError | null => {
  const value = control.value;

  if (!value) {
    return { required: true };
  }

  const date = new Date(value);
  if (isNaN(date.getTime())) {
    return { datePattern: true };
  }

  const today = new Date();
  let age = today.getFullYear() - date.getFullYear();
  const m = today.getMonth() - date.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
    age--;
  }

  if (age < 18) {
    return { minAge: true };
  }
  if (age > 120) {
    return { maxAge: true };
  }

  return null;
};
