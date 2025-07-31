import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user';


export const authGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  const user = userService.loggedUser;
  if (user()) {
    return true;
  }
  router.navigate(['login']);
  return false;
};
