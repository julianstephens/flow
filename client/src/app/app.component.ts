import { Component, OnInit } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { ApiService } from "./services/api.service";

interface ITestResult {
  data: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "client";

  test = "";

  constructor(public authSVC: AuthService, private apiSVC: ApiService) {}

  ngOnInit() {
    this.apiSVC.get<ITestResult>("/ping").subscribe((res) => {
      this.test = res.body?.data || "";
    });
  }
}
