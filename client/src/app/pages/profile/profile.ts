import { Component, computed, inject } from '@angular/core';
import { UserService } from '../../services/user';
import { MatCard } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [MatCard, MatProgressSpinnerModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  readonly userService = inject(UserService);
  router = inject(Router);

  readonly user = this.userService.loggedUser;
  loading = computed(() => !this.user());

  async handleLogout() {
    await this.userService.logout();
    this.router.navigate(['login']);
  }
}
