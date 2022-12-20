import { Component, OnInit } from "@angular/core";
import { AuthService, User } from "@auth0/auth0-angular";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(private authSVC: AuthService) {}

  user: User | undefined;

  ngOnInit(): void {
    // this.authSVC.getUser().subscribe((user) => {
    //   this.user = user;

    //   if (!this.user) {
    //     this.logout();
    //   }
    // });
  }

  logout(): void {
    this.authSVC.logout();
  }
}
