import { Component, computed, inject, signal } from '@angular/core';
import { UserService } from '../../services/user';
import { MatCard } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Editprofile } from '../../component/editProfile/editprofile';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialog } from '../../component/dialog/dialog';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [MatCard, MatProgressSpinnerModule, MatButtonModule, Editprofile],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  private router = inject(Router);
  private userService = inject(UserService);
  private dialog = inject(MatDialog);

  readonly inEditMode = signal(false);
  readonly isDeleting = signal(false);

  readonly user = this.userService.loggedUser;

  readonly loading = computed(() => !this.user() || this.isDeleting());

  setEdit() {
    this.inEditMode.update((val) => !val);
  }

  handleProfileUpdated() {
    this.setEdit();
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

  async openDeleteConfirm() {
    const dialogRef = this.dialog.open(DeleteConfirmDialog);
    const result = await firstValueFrom<string>(dialogRef.afterClosed());
    if (result) {
      this.handleDelete(result);
    }
  }
}
