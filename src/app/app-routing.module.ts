import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SpaceJoyComponent } from './pages/space-joy/space-joy.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserGuard } from './services/guards/user.guard';
import { UserService } from './services/user.service';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { DashHomeAdminComponent } from './admin/home-admin/dash-home-admin/dash-home-admin.component';
import { PlayerComponent } from './admin/player/player.component';
import { AddPlayerComponent } from './admin/player/add-player/add-player.component';
import { EditPlayerComponent } from './admin/player/edit-player/edit-player.component';
import { AdminGuard } from './services/guards/admin.guard';
import { InitialComponent } from './pages/home/initial/initial.component';
import { UploadFilesComponent } from './admin/upload-files/upload-files.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CoursesAdminComponent } from './admin/courses-admin/courses-admin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: InitialComponent,
      },
      {
        path: 'space-joy',
        canActivate: [UserGuard],
        component: SpaceJoyComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: HomeAdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: DashHomeAdminComponent,
      },
      {
        path: 'player',
        children: [
          {
            path: '',
            component: PlayerComponent,
          },
          {
            path: 'add-player',
            component: AddPlayerComponent,
          },
          {
            path: 'edit-player/:id',
            component: EditPlayerComponent,
          },
        ],
      },
      {
        path: 'upload-files',
        component: UploadFilesComponent,
      },
      {
        path: 'courses',
        component: CoursesAdminComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [UserGuard, UserService],
})
export class AppRoutingModule {}
