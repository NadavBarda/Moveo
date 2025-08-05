import { Component, input } from '@angular/core';
import { Address } from '../../../models/address';

@Component({
  selector: 'app-profile-address',
  imports: [],
  templateUrl: './profile-address.html',
  styleUrl: './profile-address.css',
})
export class ProfileAddress {
  address = input.required<Address>();
}
