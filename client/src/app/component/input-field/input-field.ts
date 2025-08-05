import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ValidationMessageMap } from '../../models/forms';
import { inputFieldMessges } from '../../shared/utils/input-field-messages';

@Component({
  selector: 'app-input-field',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './input-field.html',
  styleUrl: './input-field.css',
})
export class InputField {
  control = input.required<FormControl>();
  validationMessages = input.required<ValidationMessageMap>();
  label = input.required<string>();
  inputType = input.required<string>();

  get messages(): string[] {
    return inputFieldMessges(this.control(), this.validationMessages());
  }
}
