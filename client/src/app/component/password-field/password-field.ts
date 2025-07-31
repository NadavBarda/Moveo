import { Component, signal } from '@angular/core';

import { InputField } from '../input-field/input-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-password-field',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule
],
  templateUrl: './password-field.html',
  styleUrl: './password-field.css',
})
export class PasswordField extends InputField {
  hide = signal(true);
  toggleHide() {
    this.hide.update((h) => !h);
  }
}
