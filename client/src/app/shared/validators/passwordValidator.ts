import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface ValidationPasswordError extends ValidationErrors {
  passwordPattern?: boolean;
  length?: boolean;
  required?: boolean;
}

export const passwordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationPasswordError | null => {
  const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)/;
  const input = control.value as string;
  
  if (!input) {
    return { required: true };
  } else if (input.length < 6) {
    return { length: true };
  } else if (!passwordPattern.test(input)) {
    return { passwordPattern: true };
  }
  return null;
};
