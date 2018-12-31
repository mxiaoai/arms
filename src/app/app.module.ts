import { fakeBackendProvider } from './helper/fake-backend';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './user/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalNavModule } from './global-nav/global-nav.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
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
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
