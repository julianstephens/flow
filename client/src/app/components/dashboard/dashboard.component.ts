import { Component, OnInit } from "@angular/core";
import { AuthService, User } from "@auth0/auth0-angular";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "@services/index";
import { OnboardingModalComponent } from "@shared/components/index";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(
    private authSVC: AuthService,
    private userSVC: UserService,
    private modalSVC: NgbModal,
  ) {}

  user: User | undefined;

  isOnboarding = true;

  ngOnInit(): void {
    this.openModal();
    // this.authSVC.getUser().subscribe((user) => {
    //   debugger;
    //   if (user) {
    //     const email = user.email;
    //     if (email) {
    //       try {
    //         console.log(this.userSVC.getUserByEmail(email));
    //       } catch (err) {
    //         this.isOnboarding = true;
    //         this.openModal();
    //       }
    //     }
    //   }
    // });
  }

  openModal() {
    this.modalSVC.open(OnboardingModalComponent, { fullscreen: true, scrollable: true });
  }

  logout(): void {
    this.authSVC.logout();
  }
}
