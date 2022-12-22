import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AuthHttpInterceptor, AuthModule } from "@auth0/auth0-angular";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { DashboardComponent, LandingComponent } from "@components/index";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { IconButtonComponent, OnboardingModalComponent } from "@shared/components/index";
import { environment as env } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent, LandingComponent, IconButtonComponent, DashboardComponent],
  imports: [
    BrowserModule,
    OnboardingModalComponent,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: env.auth.domain || "",
      clientId: env.auth.clientId || "",
      audience: env.auth.audience,
      httpInterceptor: {
        allowedList: ["/api", "/api/*"],
      },
    }),
    NgbModule,
    NgSelectModule,
    FormsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
