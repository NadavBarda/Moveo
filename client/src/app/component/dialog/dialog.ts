import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-dialog',
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatInputModule,

],
  templateUrl: './dialog.html',
  styleUrl: './dialog.css',
})
export class DeleteConfirmDialog {
  readonly dialogRef = inject(MatDialogRef<DeleteConfirmDialog>);
  password = '';

  onNo() {
    this.dialogRef.close('');
  }
  onYes() {
    this.dialogRef.close(this.password);
  }
}
