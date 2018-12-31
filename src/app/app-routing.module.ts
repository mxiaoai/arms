import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './global-nav/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './global-nav/notfound/notfound.component';
import { ForgetPwdComponent } from './user/forget-pwd/forget-pwd.component';
import { ResetPwdComponent } from './user/reset-pwd/reset-pwd.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "forgetpwd", component: ForgetPwdComponent },
  { path: "resetpwd", component: ResetPwdComponent },
  { path: "**", component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
