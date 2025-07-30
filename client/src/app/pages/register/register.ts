import { CommonModule } from '@angular/common';
import { Component, inject, NgModule, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { passwordValidator } from '../../shared/validators/passwordValidator';
import { AuthService } from '../../services/auth';
import { MatCard } from '@angular/material/card';

import { RegisterInput } from '../../models/auth-interface';
import { AddressField } from './address-field/address-field';

import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CancelAutoFill } from '../../component/cancel-auto-fill/cancel-auto-fill';
import { createRegisterForm } from '../../shared/utils/forms';
import { AddressFormGroup } from '../../models/forms';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    MatCard,
    MatDatepickerModule,
    AddressField,
    MatIconModule,
    CancelAutoFill,
    FormsModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  retypePassword = '';

  message = signal('');
  hide = signal(true);
  registerForm = createRegisterForm(this.fb);

  get addressForm(): AddressFormGroup {
    return this.registerForm.get('address') as AddressFormGroup;
  }

  async onSubmit() {
    if (this.registerForm.invalid) return;
    console.log(this.registerForm.value);
    try {
      await this.authService.register(this.registerForm.value as RegisterInput);
      this.router.navigate(['profile']);
    } catch (err) {
      this.message.set(err as string);
    }
  }
}
