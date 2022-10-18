import { Component, Input } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: "app-auth-button",
  template: ` <button (click)="auth.loginWithRedirect()">{{ buttonText }}</button> `,
  styleUrls: ["./auth-button.component.scss"],
})
export class AuthButtonComponent {
  @Input() buttonText: string = "Login";
  constructor(public auth: AuthService) {}
}
