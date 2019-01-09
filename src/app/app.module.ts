import { ErrorInterceptor } from './helper/error.interceptor';
import { FakeBackendInterceptor } from "./helper/fake-backend";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthService } from "./user/auth.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { GlobalNavModule } from "./global-nav/global-nav.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserModule } from "./user/user.module";
import { CookieService } from "ngx-cookie-service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GlobalNavModule,
    UserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthService,
    CookieService,

    // { provide: HTTP_INTERCEPTORS, useClass: CookieInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
    // { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
