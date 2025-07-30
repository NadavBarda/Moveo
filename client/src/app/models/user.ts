import { RegisterInput } from './auth-interface';

export interface User extends Omit<RegisterInput, 'password'> {}
