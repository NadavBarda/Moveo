import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-footer',
  imports: [RouterLink],
  templateUrl: './register-footer.html',
  styleUrl: './register-footer.css',
})
export class RegisterFooter {
  message = input<string>();
}
