import { HttpClientModule } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login/login.component";
import { fakeBackendProvider } from "../helper/fake-backend";
import { RouterModule } from "@angular/router";
import { ForgetPwdComponent } from "./forget-pwd/forget-pwd.component";
import { ResetPwdComponent } from "./reset-pwd/reset-pwd.component";
import { RegisterComponent } from "./register/register.component";

@NgModule({
  declarations: [
    LoginComponent,
    ForgetPwdComponent,
    ResetPwdComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [AuthService, fakeBackendProvider],
  exports: [LoginComponent]
})
export class UserModule {}
