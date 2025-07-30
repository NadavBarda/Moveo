import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { passwordValidator } from '../../shared/validators/passwordValidator';
import { AuthService } from '../../services/auth';
import { LoginInput } from '../../models/auth-interface';
import { Router, RouterLink } from '@angular/router';
import { CancelAutoFill } from '../../component/cancel-auto-fill/cancel-auto-fill';
import { createLoginForm } from '../../shared/utils/forms';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    CancelAutoFill,
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

  loginForm = createLoginForm(this.fb);

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
