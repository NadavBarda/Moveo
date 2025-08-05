import { inject, Injectable, signal } from '@angular/core';
import { User } from '../models/user';
import { FirebaseService } from './firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteUser as firebaseDeleteUser } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firebaseService = inject(FirebaseService);


  async updateUser(updatedUser: Partial<User>): Promise<void> {
    const uid = this.firebaseService.auth.currentUser?.uid;
    if (!uid) return;

    const userDocRef = doc(this.firebaseService.db, 'users', uid);
    const { ...userData } = updatedUser;

    await updateDoc(userDocRef, userData);
  }

  async deleteUser(password: string) {
    const user = this.firebaseService.auth.currentUser;
    if (!user) return;
    await this.firebaseService.reAuthenticate(password);
    const userDocRef = doc(this.firebaseService.db, 'users', user.uid);
    try {
      await deleteDoc(userDocRef);
      await firebaseDeleteUser(user);
    } catch (err) {
      console.error('Failed to delete user:', err);
    }
  }

}
