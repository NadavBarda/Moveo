import { inject, Injectable } from '@angular/core';
import { LoginInput, RegisterInput, User } from '../models/user';
import { UserService } from './user';
import { FirebaseService } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userService = inject(UserService);
  private firebaseService = inject(FirebaseService);

  constructor() {
    this.reloadUserData();
  }

  public reloadUserData() {
    onAuthStateChanged(this.firebaseService.auth, async (firebaseUser) => {
      if (!firebaseUser) return;
      try {
        const user = await this.firebaseService.getUserData(firebaseUser.uid);
        this.userService.loggedUser.set(user);
      } catch (err) {
        console.error('constructor():', err);
      }
    });
  }

  async login({ email, password }: LoginInput): Promise<void> {
    try {
      const user = await this.firebaseService.login(email, password);
      this.userService.loggedUser.set(user);
    } catch (err) {
      throw err;
    }
  }

  async register(registerInput: RegisterInput): Promise<void> {
    try {
      const newUser = await this.firebaseService.createUser(registerInput);
      this.userService.loggedUser.set(newUser);
    } catch (err) {
      console.error('Register():', err);
      throw err;
    }
  }

  async logout(): Promise<void> {
    await this.firebaseService.logout();
    this.userService.loggedUser.set(null);
  }
}
