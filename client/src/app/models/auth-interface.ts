import { Address } from './address';

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  name: string;
  address: Address;
  birthDate: string;
}
