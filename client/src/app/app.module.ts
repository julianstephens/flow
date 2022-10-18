import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AuthHttpInterceptor, AuthModule } from "@auth0/auth0-angular";
import { environment as env } from "src/environments/environment";

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AuthButtonComponent } from "./components/auth-button/auth-button.component";
import { LandingComponent } from "./components/landing/landing.component";

@NgModule({
  declarations: [AppComponent, AuthButtonComponent, LandingComponent],
  imports: [
    BrowserModule,
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
