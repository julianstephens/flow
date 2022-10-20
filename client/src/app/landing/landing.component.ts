import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent {
  constructor(private authSVC: AuthService, private router: Router) {}

  redirectLogin(): void {
    this.authSVC.loginWithRedirect();
    this.router.navigateByUrl("/home");
  }
}
