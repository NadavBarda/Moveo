import { Component, inject, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { AuthService } from '../../services/auth';
import { LoginInput } from '../../models/auth-interface';
import { Router } from '@angular/router';
import { LoginHeader } from './login-header/login-header';
import { LoginForm } from './login-form/login-form';
import { LoginFooter } from './login-footer/login-footer';
import { UserStore } from '../../store/user-store';

@Component({
  selector: 'app-login',
  imports: [LoginHeader, LoginForm, MatCard, LoginFooter],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  authService = inject(AuthService);
  userStore = inject(UserStore);
  router = inject(Router);

  message = signal('');

  async onSubmit(loginInput: LoginInput) {
    this.userStore.setLoading(true);

    try {
      await this.authService.login(loginInput);
      this.router.navigate(['profile']);
    } catch (err) {
      this.message.set(err as string);
    } finally {
      this.userStore.setLoading(false);
    }
  }
}
