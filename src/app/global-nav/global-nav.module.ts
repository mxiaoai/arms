import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';

@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    HomeComponent, 
    NotfoundComponent],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NotfoundComponent
  ]
})
export class GlobalNavModule { }
