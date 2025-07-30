export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  name: string;
  age: number;
}

export interface User {
  email: string;
  name: string;
  age: number;
}
