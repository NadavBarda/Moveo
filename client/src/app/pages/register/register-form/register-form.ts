import { Component, inject, output, signal } from '@angular/core';
import { AddressField } from '../address-field/address-field';
import { MatInputModule } from '@angular/material/input';
import { CancelAutoFill } from '../../../component/cancel-auto-fill/cancel-auto-fill';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  createRegisterForm,
  getFormControl,
} from '../../../shared/utils/forms';
import { MatIconModule } from '@angular/material/icon';
import { AddressFormGroup } from '../../../models/forms';
import { RegisterInput } from '../../../models/auth-interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { InputField } from '../../../component/input-field/input-field';
import { REGISTER_VALIDATION_MESSAGES } from '../../../models/input.model';
import { PasswordField } from '../../../component/password-field/password-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-register-form',
  providers: [provideNativeDateAdapter()],
  imports: [
    AddressField,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CancelAutoFill,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
    InputField,
    PasswordField,
    MatDatepickerModule,
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class RegisterForm {
  hide = signal(true);
  fb = inject(FormBuilder);
  registerForm = createRegisterForm(this.fb);
  registerTrigger = output<RegisterInput>();
  readonly validator_map = REGISTER_VALIDATION_MESSAGES;

  get addressForm(): AddressFormGroup {
    return this.registerForm.get('address') as AddressFormGroup;
  }

  getControl(name: string) {
    return getFormControl(name, this.registerForm);
  }

  onSubmit() {
    console.log(this.registerForm.value.birthDate);
    if (this.registerForm.invalid) return;
    
    
    this.registerTrigger.emit(this.registerForm.value as RegisterInput);
  }
}
