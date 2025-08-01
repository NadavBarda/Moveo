import { Component, computed, inject, signal } from '@angular/core';
import { UserService } from '../../services/user';
import { MatCard } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Editprofile } from '../../component/editProfile/editprofile';
import { ProfileAddress } from './profile-address/profile-address';
import { ProfileHeader } from './profile-header/profile-header';

@Component({
  selector: 'app-profile',
  imports: [
    MatCard,
    MatProgressSpinnerModule,
    ProfileAddress,
    Editprofile,
    ProfileHeader,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private router = inject(Router);
  private userService = inject(UserService);

  readonly inEditMode = signal(false);
  readonly isDeleting = signal(false);

  readonly user = this.userService.loggedUser;

  readonly loading = computed(() => !this.user() || this.isDeleting());

  setEdit() {
    this.inEditMode.update((val) => !val);
  }

  async handleDelete(password: string) {
    this.isDeleting.set(true);

    try {
      await this.userService.deleteUser(password);
      this.router.navigate(['login']);
    } catch (e) {
      console.error('Delete failed:', e);
    } finally {
      this.isDeleting.set(false);
    }
  }
}
