import { Component, inject, signal, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddressField } from '../../pages/register/address-field/address-field';
import { InputField } from '../input-field/input-field';
import { UserService } from '../../services/user';
import { createBaseForm, getFormControl } from '../../shared/utils/forms';
import { EDIT_PROFILE_VALIDATION_MESSAGES } from '../../models/input.model';
import { AddressFormGroup } from '../../models/forms';
import { User } from '../../models/user';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCard,
    MatProgressSpinnerModule,
    AddressField,
    InputField,
  ],
  templateUrl: './editprofile.html',
  styleUrl: './editprofile.css',
})
export class Editprofile {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  readonly changesSaved = output();
  readonly editForm = createBaseForm(this.fb, this.userService.loggedUser()!);
  readonly loading = signal(false);
  readonly validator_map = EDIT_PROFILE_VALIDATION_MESSAGES;

  get addressForm(): AddressFormGroup {
    return this.editForm.get('address') as AddressFormGroup;
  }
  
  getControl = (name: string) => getFormControl(name, this.editForm);

  async saveChanges() {
    if (this.editForm.invalid) return;
    this.loading.set(true);
    try {
      await this.userService.updateUser(this.editForm.value as Partial<User>);
      this.changesSaved.emit();
    } finally {
      this.loading.set(false);
    }
  }
}
