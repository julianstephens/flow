import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ApiService } from "@app/services/api.service";
import { AuthService } from "@auth0/auth0-angular";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserCreateRequest } from "@shared/interfaces";
import moment from "moment";

class OnboardingForm {
  fname: string;

  lname: string;

  prefName: string;

  dob: string;

  email: string;

  street: string;

  street2: string;

  city: string;

  country: string;

  postal: string;
}

@Component({
  selector: "app-onboarding-modal",
  templateUrl: "./onboarding-modal.component.html",
  styleUrls: ["./onboarding-modal.component.scss"],
})
export class OnboardingModalComponent implements OnInit {
  @ViewChild("userForm", { read: NgForm }) userForm: any;

  disableNext = true;

  maxDOB: string;

  req: OnboardingForm = new OnboardingForm();

  loading = false;

  constructor(
    public activeModal: NgbActiveModal,
    private authSVC: AuthService,
    private apiSVC: ApiService,
  ) {
    this.authSVC.getIdTokenClaims().subscribe((claims) => {
      this.req.email = claims?.email ?? "";
    });
  }

  ngOnInit() {
    this.maxDOB = moment().subtract(16, "y").format("YYYY-MM-DD");
    if (!this.req.email) {
      this.authSVC.loginWithRedirect();
    }
  }

  onSubmit() {
    this.loading = true;

    const userReq: UserCreateRequest = {
      fullName: `${this.req.lname}, ${this.req.fname}`,
      shortName: this.req.prefName ?? this.req.fname,
      email: this.req.email,
      dob: moment(this.req.dob).unix(),
      address: {
        street: this.req.street,
        street2: this.req.street2,
        city: this.req.city,
        postal: this.req.postal,
        country: this.req.country,
      },
    };

    this.apiSVC.users.create(userReq).then(() => {
      this.activeModal.close();
    });
    // .catch(() => this.toastSVC.showError("Oops something went wrong! Please try again."));
  }
}
