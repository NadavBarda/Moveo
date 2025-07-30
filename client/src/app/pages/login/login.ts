import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { passwordValidator } from '../../shared/validators/passwordValidator';
import { AuthService } from '../../services/auth';
import { LoginInput } from '../../models/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  loading = signal(false);
  message = signal('');

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', passwordValidator],
  });

  async onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading.set(true);

    try {
      await this.authService.login(this.loginForm.value as LoginInput);
      this.router.navigate(['profile']);
    } catch (err) {
      this.message.set(err as string);
    } finally {
      this.loading.set(false);
    }
  }
}
