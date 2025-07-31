import { inject } from "@angular/core";
import { AuthService } from "../services/auth";

export const authProvider = async () => {
  const authService = inject(AuthService);
  await authService.reloadUserData();
  const spinner = document.getElementById('loader-container');
  if (spinner) spinner.remove();
};
