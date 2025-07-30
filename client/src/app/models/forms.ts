import { FormControl, FormGroup } from "@angular/forms";
import { Address } from "./address";

export const initAddressValue: Address = {
  country: '',
  city: '',
  street: '',
  houseNumber: 1,
};

export type LoginForm = {
  password: FormControl<string | null>;
  email: FormControl<string | null>;
};

export type EditForm = {
  name: FormControl<string | null>;
  birthDate: FormControl<string | null>;
  address: AddressFormGroup;
};

export interface RegisterForm extends EditForm, LoginForm {
}

export type AddressFormGroup = FormGroup<{
  country: FormControl<string | null>;
  city: FormControl<string | null>;
  street: FormControl<string | null>;
  houseNumber: FormControl<number | null>;
}>;
