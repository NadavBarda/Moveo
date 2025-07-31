import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { createLoginForm, getFormControl } from '../../../shared/utils/forms';
import { LoginInput } from '../../../models/auth-interface';
import { MatButtonModule } from '@angular/material/button';
import { InputField } from '../../../component/input-field/input-field';
import { LOGIN_VALIDATION_MESSAGES } from '../../../models/input.model';
import { PasswordField } from '../../../component/password-field/password-field';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, MatButtonModule, InputField, PasswordField],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {
  fb = inject(FormBuilder);
  loginForm = createLoginForm(this.fb);
  loginTrigger = output<LoginInput>();
  loading = input<boolean>();

  readonly validatorMap = LOGIN_VALIDATION_MESSAGES;

  async onSubmit() {
    if (this.loginForm.invalid) return;

    const email = this.loginForm.value.email ?? '';
    const password = this.loginForm.value.password ?? '';

    this.loginTrigger.emit({ email, password });
  }

  getControl(name: string) {
    return getFormControl(name, this.loginForm);
  }
}
