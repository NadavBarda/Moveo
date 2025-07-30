import { Component, inject, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { AuthService } from '../../services/auth';
import { LoginInput } from '../../models/auth-interface';
import { Router } from '@angular/router';
import { CancelAutoFill } from '../../component/cancel-auto-fill/cancel-auto-fill';
import { LoginHeader } from './login-header/login-header';
import { LoginForm } from './login-form/login-form';
import { LoginFooter } from "./login-footer/login-footer";

@Component({
  selector: 'app-login',
  imports: [CancelAutoFill, LoginHeader, LoginForm, MatCard, LoginFooter],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authService = inject(AuthService);
  router = inject(Router);
  loading = signal(false);
  message = signal('');

  async onSubmit(loginInput: LoginInput) {
    this.loading.set(true);

    try {
      await this.authService.login(loginInput);
      this.router.navigate(['profile']);
    } catch (err) {
      this.message.set(err as string);
    } finally {
      this.loading.set(false);
    }
  }
}
