import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { passwordValidator } from '../../shared/validators/passwordValidator';
import { AuthService } from '../../services/auth';
import { RegisterInput } from '../../models/user';
import { MatCard } from '@angular/material/card';

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
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  message = signal('');

  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', passwordValidator],
    name: ['', Validators.required],
    age: [0, [Validators.min(18), Validators.max(120)]],
  });

  async onSubmit() {
    if (this.registerForm.invalid) return;
    try {
      this.authService.register(this.registerForm.value as RegisterInput);
      this.router.navigate(['profile']);
    } catch (err) {
      this.message.set(err as string);
    }
  }
}
