import { Component, OnInit } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import FlowSDK from "@sdk/index";
import { EnvProvider } from "@services/index";
import { OnboardingModalComponent } from "@shared/components/index";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  private api: FlowSDK;

  loading = false;

  constructor(
    private authSVC: AuthService,
    private modalSVC: NgbModal,
    private envSVC: EnvProvider,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.authSVC.getIdTokenClaims().subscribe((claims) => {
      this.api = new FlowSDK({
        baseUrl: this.envSVC.require("apiUri") as string,
        accessToken: claims?.__raw ?? "",
      });
      this.api.users.getByEmail(claims?.email ?? "").catch(() => this.openModal());
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
