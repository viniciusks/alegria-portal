import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// PrimeNG
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';

// Components
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
import { DashHomeAdminComponent } from './admin/home-admin/dash-home-admin/dash-home-admin.component';
import { PlayerComponent } from './admin/player/player.component';
import { AddPlayerComponent } from './admin/player/add-player/add-player.component';
import { EditPlayerComponent } from './admin/player/edit-player/edit-player.component';
import { AdminGuard } from './services/guards/admin.guard';
import { MchGeralComponent } from './admin/upload-files-pages/mch-geral/mch-geral.component';
import { InitialComponent } from './pages/home/initial/initial.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SpaceJoyComponent,
    RegisterComponent,
    HomeAdminComponent,
    DashHomeAdminComponent,
    PlayerComponent,
    AddPlayerComponent,
    EditPlayerComponent,
    MchGeralComponent,
    InitialComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MenuModule,
    MessagesModule,
    ConfirmDialogModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
  ],
  providers: [AdminGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
