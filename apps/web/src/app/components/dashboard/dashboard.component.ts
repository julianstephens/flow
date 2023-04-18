import { ApiService } from "@/services";
import { OnboardingModalComponent } from "@/shared/components";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  loading = false;

  constructor(
    private authSVC: AuthService,
    private modalSVC: NgbModal,
    private apiSVC: ApiService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.authSVC.getIdTokenClaims().subscribe((claims) => {
      this.apiSVC.users
        .getByEmail(claims?.email ?? "")
        .catch(() => this.openModal());
      this.loading = false;
    });
  }

  openModal() {
    this.modalSVC.open(OnboardingModalComponent, {
      fullscreen: true,
      scrollable: true,
      backdrop: "static",
      keyboard: false,
    });
  }

  logout(): void {
    this.authSVC.logout();
  }
}
