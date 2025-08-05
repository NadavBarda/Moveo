import { Component, computed, inject, signal } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { Editprofile } from './editProfile/editprofile';
import { ProfileAddress } from './profile-address/profile-address';
import { ProfileHeader } from './profile-header/profile-header';
import { UserStore } from '../../store/user-store';

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
  userStore = inject(UserStore);
  readonly user = this.userStore.user;

  readonly inEditMode = signal(false);
  readonly isDeleting = signal(false);

  setEdit() {
    this.inEditMode.update((val) => !val);
  }
  
  async handleDelete(password: string) {
    try {
      await this.userStore.deleteUser(password);
      this.router.navigate(['login']);
    } catch (e) {
      console.error('Delete failed:', e);
    } finally {
      this.userStore.setLoading(false);
    }
  }
}
