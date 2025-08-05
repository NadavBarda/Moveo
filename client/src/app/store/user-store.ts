import { inject } from '@angular/core';
import { User } from '../models/user';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { UserService } from '../services/user';
type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, userService = inject(UserService)) => ({
    async loginUser(user: User | null) {
      patchState(store, { user });
    },
    async updateUser(updatedUser: Partial<User>) {
      patchState(store, { loading: true });
      await userService.updateUser(updatedUser);

      patchState(store, (state) => ({
        user: { ...state.user!, ...updatedUser },
        loading: false,
        error: null,
      }));
    },
    async deleteUser(password: string) {
      patchState(store, { loading: true });
      await userService.deleteUser(password);
      patchState(store, { user: null, loading: false, error: null });
    },
    setLoading(loading: boolean) {
      patchState(store, { loading });
    },

    logout() {
      patchState(store, { user: null, loading: false, error: null });
    },
  }))
);
