import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export const matStyle = {
  provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
  useValue: {
    appearance: 'outline',
    
  },
};
