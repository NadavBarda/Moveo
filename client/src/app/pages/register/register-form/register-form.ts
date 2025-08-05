import { Component, inject, output, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  createRegisterForm,
  getFormControl,
} from '../../../shared/utils/forms';
import { AddressFormGroup } from '../../../models/forms';
import { RegisterInput } from '../../../models/auth-interface';
import { MatButtonModule } from '@angular/material/button';
import { InputField } from '../../../component/input-field/input-field';
import { REGISTER_VALIDATION_MESSAGES } from '../../../models/input.model';
import { PasswordField } from '../../../component/password-field/password-field';
import { AddressField } from '../../../component/address-field/address-field';

@Component({
  selector: 'app-register-form',
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    AddressField,
    InputField,
    PasswordField,
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  hide = signal(true);
  fb = inject(NonNullableFormBuilder);
  registerForm = createRegisterForm(this.fb);
  registerTrigger = output<RegisterInput>();
  readonly validator_map = REGISTER_VALIDATION_MESSAGES;

  get addressForm(): AddressFormGroup {
    return this.registerForm.get('address') as AddressFormGroup;
  }

  getControl = (name: string) => getFormControl(name, this.registerForm);

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.registerTrigger.emit(this.registerForm.value as RegisterInput);
  }
}
