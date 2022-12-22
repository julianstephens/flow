import { Component } from "@angular/core";
import { NgbActiveModal, NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-onboarding-modal",
  standalone: true,
  imports: [NgbDatepickerModule],
  templateUrl: "./onboarding-modal.component.html",
  styleUrls: ["./onboarding-modal.component.scss"],
})
export class OnboardingModalComponent {
  disableNext = true;

  constructor(public activeModal: NgbActiveModal) {}
}
