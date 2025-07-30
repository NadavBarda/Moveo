import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { FirebaseService } from './firebase';
import { doc, updateDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firebaseService = inject(FirebaseService);
  loggedUser = signal<User | null>(null);

  async updateUser(updatedUser: Partial<User>): Promise<void> {
    const uid = this.firebaseService.auth.currentUser?.uid;
    if (!uid) return;

    const userDocRef = doc(this.firebaseService.db, 'users', uid);
    const { ...userData } = updatedUser;

    await updateDoc(userDocRef, userData);
    this.loggedUser.update((oldUser) => ({ ...oldUser!, ...updatedUser }));
  }

  async logout() {
    this.loggedUser.set(null);
    await this.firebaseService.logout();
  }
}
