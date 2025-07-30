import { Component, computed, effect, inject, signal } from '@angular/core';
import { UserService } from '../../services/user';
import { MatCard } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Editprofile } from '../../component/editProfile/editprofile';

@Component({
  selector: 'app-profile',
  imports: [MatCard, MatProgressSpinnerModule, MatButtonModule, Editprofile],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  router = inject(Router);
  userService = inject(UserService);
  inEditMode = signal(false);

  user = this.userService.loggedUser;
  loading = signal(true);

  constructor() {
    effect(() => this.loading.set(this.user() === null));
  }

  setEdit() {
    this.inEditMode.update((val) => !val);
  }
  handleProfileUpdated() {
    this.setEdit();
  }

  async handleLogout() {
    await this.userService.logout();
    this.router.navigate(['login']);
  }
}
