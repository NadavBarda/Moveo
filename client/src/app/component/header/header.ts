import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { UserStore } from '../../store/user-store';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  router = inject(Router);
  userStore = inject(UserStore);
  authService = inject(AuthService);

  get currentRoute(): string {
    return this.router.url;
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['login']);
  }
}
