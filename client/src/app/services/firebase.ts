import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { RegisterInput } from '../models/auth-interface';
import { User } from '../models/user';

//meed to replace
const firebaseConfig = {
  apiKey: 'AIzaSyA6edXsvYBb3S0ScURfZ6a5XQC4SSqJb4E',
  authDomain: 'myserver-4b4ec.firebaseapp.com',
  databaseURL:
    'https://myserver-4b4ec-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'myserver-4b4ec',
  storageBucket: 'myserver-4b4ec.firebasestorage.app',
  messagingSenderId: '635092735471',
  appId: '1:635092735471:web:3b914c3d1d37f90cb6921a',
  measurementId: 'G-JPZ42BXHBT',
};

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private _app = initializeApp(firebaseConfig);
  private _auth = getAuth(this._app);
  private _db = getFirestore(this._app);

  get app() {
    return this._app;
  }

  public get auth() {
    return this._auth;
  }
  public get db() {
    return this._db;
  }

  async getUserData(id: string) {
    const ref = doc(this._db, 'users', id);
    const res = await getDoc(ref);
    return res.exists() ? (res.data() as User) : null;
  }

  async login(email: string, password: string) {
    const res = await signInWithEmailAndPassword(this._auth, email, password);
    return await this.getUserData(res.user.uid);
  }

  async logout() {
    await signOut(this._auth);
  }

  async reAuthenticate(password: string) {
    const user = this._auth.currentUser;
    if (!user || !user.email) throw new Error('No authenticated user');
    const credential = EmailAuthProvider.credential(user.email, password);
    return await reauthenticateWithCredential(user, credential);
  }

  async createUser(registerInput: RegisterInput) {
    const { email, password, ...rest } = registerInput;

    const res = await createUserWithEmailAndPassword(
      this._auth,
      email,
      password
    );

    const newUser: User = {
      email,
      ...rest,
    };

    const ref = doc(this._db, 'users', res.user.uid);
    await setDoc(ref, newUser);

    return newUser;
  }

 
}
