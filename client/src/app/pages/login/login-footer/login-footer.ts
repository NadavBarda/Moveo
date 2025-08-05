import { Component,  input } from '@angular/core';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-footer',
  imports: [RouterLink],
  templateUrl: './login-footer.html',
  styleUrl: './login-footer.css'
})
export class LoginFooter {

  message = input.required<string>();
  
}
