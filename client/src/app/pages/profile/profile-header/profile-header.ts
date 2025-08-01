import { Component, inject, input, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmDialog } from '../../../component/dialog/dialog';
import { firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile-header',
  imports: [MatButtonModule],
  templateUrl: './profile-header.html',
  styleUrl: './profile-header.css',
})
export class ProfileHeader {
  inEditMode = input();
  editTrigger = output();
  deleteTrigger = output<string>();
  private dialog = inject(MatDialog);

  setEdit() {
    this.editTrigger.emit();
  }

  async openDeleteConfirm() {
    const dialogRef = this.dialog.open(DeleteConfirmDialog);
    const result = await firstValueFrom<string>(dialogRef.afterClosed());
    if (result) {
      this.deleteTrigger.emit(result);
    }
  }
}
