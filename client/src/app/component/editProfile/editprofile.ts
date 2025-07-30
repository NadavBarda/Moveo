import {
  Component,
  inject,
  input,
  effect,
  signal,
  OnInit,
  OnDestroy,
  Signal,
  output,
} from '@angular/core';
import { User } from '../../models/user';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { createBaseForm } from '../../shared/utils/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AddressField } from '../../pages/register/address-field/address-field';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user';
import { AddressFormGroup } from '../../models/forms';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

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
    MatProgressSpinnerModule
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

  get addressForm(): AddressFormGroup {
    return this.editForm.get('address') as AddressFormGroup;
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
