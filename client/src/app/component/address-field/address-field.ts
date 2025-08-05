import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddressFormGroup } from '../../models/forms';


@Component({
  selector: 'app-address-field',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './address-field.html',
  styleUrl: './address-field.css',
})
export class AddressField {
  addressForm = input.required<AddressFormGroup>();
}
