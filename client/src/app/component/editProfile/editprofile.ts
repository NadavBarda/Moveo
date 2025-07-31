import { Component, inject, signal, output } from '@angular/core';
import { User } from '../../models/user';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createBaseForm, getFormControl } from '../../shared/utils/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddressField } from '../../pages/register/address-field/address-field';
import { MatIconModule } from '@angular/material/icon';

import { UserService } from '../../services/user';
import { AddressFormGroup } from '../../models/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { InputField } from '../input-field/input-field';
import { EDIT_PROFILE_VALIDATION_MESSAGES } from '../../models/input.model';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCard,
    MatDatepickerModule,
    MatIconModule,
    FormsModule,
    AddressField,
    CommonModule,
    MatProgressSpinnerModule,
    InputField,
  ],
  templateUrl: './editprofile.html',
  styleUrl: './editprofile.css',
})
export class Editprofile {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  
  changesSaved = output();

  initValue = this.userService.loggedUser();
  editForm = createBaseForm(this.fb, this.initValue!);
  loading = signal(false);
  readonly validator_map = EDIT_PROFILE_VALIDATION_MESSAGES;

  get addressForm(): AddressFormGroup {
    return this.editForm.get('address') as AddressFormGroup;
  }
  getControl(name: string) {
    return getFormControl(name, this.editForm);
  }
  async saveChanges() {
    if (this.editForm.invalid) return;
    if (!this.initValue) return;

    const { name, address, birthDate } = this.editForm.value;

    this.loading.set(true);
    const updatedUser = { name, address, birthDate };

    try {
      await this.userService.updateUser(updatedUser as Partial<User>);
    } catch (err) {
      console.log(err);
    } finally {
      this.loading.set(false);
    }

    this.changesSaved.emit();
  }
}
