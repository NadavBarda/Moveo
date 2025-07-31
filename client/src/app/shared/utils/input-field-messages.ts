import { FormControl, ValidationErrors } from '@angular/forms';
import { ValidationMessageMap } from '../../models/forms';

export const inputFieldMessges = (
  control: FormControl,
  validationMessages: ValidationMessageMap
) => {
    
  if (!control.errors || !control.touched) return [];

  const errors: ValidationErrors = control.errors!;
  const msgs: string[] = [];

  for (const key in validationMessages) {
    if (errors[key]) {
      msgs.push(validationMessages[key]);
    }
  }
  return msgs;
};
