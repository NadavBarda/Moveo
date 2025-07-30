import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface ValidationPasswordError extends ValidationErrors {
  passwordPattern?: boolean;
  length?: boolean;
  required?: boolean;
}

export const passwordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationPasswordError | null => {
  const input = control.value as string;
  const errors: ValidationPasswordError = {};

  if (!input) {
    errors.required = true;
    return errors;
  }

  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)/;

  if (!passwordPattern.test(input)) {
    errors.passwordPattern = true;
  }

  if (input.length < 6) {
    errors.length = true;
  }

  return Object.keys(errors).length > 0 ? errors : null;
};
