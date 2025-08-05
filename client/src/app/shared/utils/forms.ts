import {
  FormBuilder,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { passwordValidator } from '../validators/passwordValidator';
import { User } from '../../models/user';
import { Address } from '../../models/address';
import {
  AddressFormGroup,
  EditForm,
  initAddressValue,
  LoginForm,
  RegisterForm,
} from '../../models/forms';
import { birthdayValidator } from '../validators/dateValidator';

export function createBaseForm(fb: NonNullableFormBuilder, user: User) {
  return fb.group<EditForm>({
    name: fb.control(user.name, Validators.required),
    birthDate: fb.control(user.birthDate, [birthdayValidator]),
    address: createAddressFormGroup(fb, user.address),
  });
}
export function getFormControl(name: string, form: FormGroup) {
  return form.get(name) as FormControl;
}

export function createLoginForm(fb: NonNullableFormBuilder) {
  return fb.group<LoginForm>({
    password: fb.control('', passwordValidator),
    email: fb.control('', [Validators.required, Validators.email]),
  });
}

export function createRegisterForm(fb: NonNullableFormBuilder) {
  return fb.group<RegisterForm>({
    name: fb.control('', Validators.required),
    birthDate: fb.control('', [birthdayValidator]),
    address: createAddressFormGroup(fb),
    password: fb.control('', passwordValidator),
    email: fb.control('', [Validators.required, Validators.email]),
  });
}

export function createAddressFormGroup(
  fb: NonNullableFormBuilder,
  address: Address = initAddressValue
): AddressFormGroup {
  return fb.group({
    country: fb.control(address.country, Validators.required),
    city: fb.control(address.city, Validators.required),
    street: fb.control(address.street, Validators.required),
    houseNumber: fb.control(address.houseNumber, [
      Validators.required,
      Validators.min(1),
    ]),
  }) as AddressFormGroup;
}
