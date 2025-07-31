import { inject, Injectable } from '@angular/core';
import { UserService } from './user';
import { FirebaseService } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { LoginInput, RegisterInput } from '../models/auth-interface';
import { convertDate } from '../shared/utils/date';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userService = inject(UserService);
  private firebaseService = inject(FirebaseService);

  constructor() {
    this.reloadUserData();
  }

  public reloadUserData(): Promise<void> {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        this.firebaseService.auth,
        async (firebaseUser) => {
          unsubscribe();
          if (!firebaseUser) {
            resolve();
            return;
          }

          try {
            const user = await this.firebaseService.getUserData(
              firebaseUser.uid
            );
            this.userService.loggedUser.set(user);
            resolve();
          } catch (err) {
            console.error('reloadUserData():', err);
            reject(err);
          }
        },
        (error) => {
          console.error('onAuthStateChanged error:', error);
          reject(error);
        }
      );
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
      registerInput.birthDate = convertDate(registerInput.birthDate);
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
