import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpaceJoyComponent } from './pages/space-joy/space-joy.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, LoginComponent, SpaceJoyComponent, RegisterComponent, HomeAdminComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
