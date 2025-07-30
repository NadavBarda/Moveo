import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { FirebaseService } from './firebase';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firebaseService = inject(FirebaseService);
  loggedUser = signal<User | null>(null);

  async logout() {
    this.loggedUser.set(null);
    await this.firebaseService.logout();
  }
}
