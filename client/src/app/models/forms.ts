import { FormControl, FormGroup } from '@angular/forms';
import { Address } from './address';

export type ValidationMessageMap = Record<string, string>;

export const initAddressValue: Address = {
  country: '',
  city: '',
  street: '',
  houseNumber: 1,
};

export type LoginForm = {
  password: FormControl<string>;
  email: FormControl<string>;
};

export type EditForm = {
  name: FormControl<string>;
  birthDate: FormControl<string>;
  address: AddressFormGroup;
};

export interface RegisterForm extends EditForm, LoginForm {}

export type AddressFormGroup = FormGroup<{
  country: FormControl<string>;
  city: FormControl<string>;
  street: FormControl<string>;
  houseNumber: FormControl<number>;
}>;
