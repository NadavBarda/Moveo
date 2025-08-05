import { Component, inject, output } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddressField } from '../../../component/address-field/address-field';
import { InputField } from '../../../component/input-field/input-field';
import { UserStore } from '../../../store/user-store';
import { createBaseForm, getFormControl } from '../../../shared/utils/forms';
import { EDIT_PROFILE_VALIDATION_MESSAGES } from '../../../models/input.model';
import { AddressFormGroup } from '../../../models/forms';
import { User } from '../../../models/user';

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
  private fb = inject(NonNullableFormBuilder);
  userStore = inject(UserStore);
  changesSaved = output();
  editForm = createBaseForm(this.fb, this.userStore.user()!);
  validator_map = EDIT_PROFILE_VALIDATION_MESSAGES;

  get addressForm(): AddressFormGroup {
    return this.editForm.get('address') as AddressFormGroup;
  }

  getControl = (name: string) => getFormControl(name, this.editForm);

  async saveChanges() {
    if (this.editForm.invalid) return;

    await this.userStore.updateUser(this.editForm.value as Partial<User>);
    this.changesSaved.emit();
  }
}
