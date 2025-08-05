import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { MatCard } from '@angular/material/card';
import { RegisterInput } from '../../models/auth-interface';
import { RegisterHeader } from './register-header/register-header';
import { RegisterFooter } from './register-footer/register-footer';
import { RegisterForm } from './register-form/register-form';
import { UserStore } from '../../store/user-store';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-register',
  imports: [RegisterHeader, RegisterFooter, RegisterForm, MatCard, MatProgressSpinnerModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private authService = inject(AuthService);
  userStore = inject(UserStore);
  private router = inject(Router);
  message = signal('');

  async onSubmit(registerInput: RegisterInput) {
    try {
      await this.authService.register(registerInput);
      this.router.navigate(['profile']);
    } catch (err) {
      this.message.set(err as string);
    }
  }
}
