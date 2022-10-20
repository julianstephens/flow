import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  constructor(private authSVC: AuthService, private router: Router) {}

  ngOnInit(): void {}

  redirectLogin() {
    this.authSVC.loginWithRedirect();
    this.router.navigateByUrl("/home");
  }
}
