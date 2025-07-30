import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const userService = inject(UserService);
  const router = inject(Router);
  const user = userService.loggedUser;
  await authService.reloadUserData();


  if (user()) {
    return true;
  }
  router.navigate(['login']);
  return false;
};
