import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@auth0/auth0-angular";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LandingComponent } from "./landing/landing.component";

const routes: Routes = [
  {
    path: "",
    component: LandingComponent,
    pathMatch: "full",
  },
  {
    path: "home",
    component: DashboardComponent,
    pathMatch: "full",
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
