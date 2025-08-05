import { inject, Injectable } from '@angular/core';
import { FirebaseService } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { LoginInput, RegisterInput } from '../models/auth-interface';
import { UserStore } from '../store/user-store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userStore = inject(UserStore);
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

            this.userStore.loginUser(user);
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
      this.userStore.loginUser(user);
    } catch (err) {
      throw err;
    }
  }

  async register(registerInput: RegisterInput): Promise<void> {
    try {
      this.userStore.setLoading(true);
      const newUser = await this.firebaseService.createUser(registerInput);
      this.userStore.loginUser(newUser);
    } catch (err) {
      console.error('Register():', err);
      throw err;
    } finally {
      this.userStore.setLoading(false);
    }
  }

  async logout(): Promise<void> {
    await this.firebaseService.logout();
    this.userStore.logout();
  }
}
