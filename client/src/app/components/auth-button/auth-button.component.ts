import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  template: ` <button (click)="auth.loginWithRedirect()">Login</button> `,
  styleUrls: ['./auth-button.component.scss'],
})
export class AuthButtonComponent {
  constructor(public auth: AuthService) {}
}
