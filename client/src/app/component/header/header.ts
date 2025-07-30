import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  router = inject(Router);
  userService = inject(UserService);
  user = this.userService.loggedUser;

  async logout() {
    await this.userService.logout();
    this.router.navigate(['login']);
  }
}
