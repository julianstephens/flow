import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AuthHttpInterceptor, AuthModule } from "@auth0/auth0-angular";

import { DashboardComponent, LandingComponent } from "@/components";
import {
    IconButtonComponent,
    LoaderComponent,
    OnboardingModalComponent
} from "@/shared/components";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { environment as env } from "env/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    IconButtonComponent,
    DashboardComponent,
    OnboardingModalComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: env.auth.domain || "",
      clientId: env.auth.clientId || "",
      authorizationParams: { redirect_uri: window.location.origin },
      httpInterceptor: {
        allowedList: ["/api", "/api/*"],
      },
    }),
    NgbModule,
    NgSelectModule,
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
