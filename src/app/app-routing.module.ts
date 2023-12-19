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
import { CoursesComponent } from './pages/courses/courses.component';
import { CoursesAdminComponent } from './admin/courses-admin/courses-admin.component';
import { AddCourseComponent } from './admin/courses-admin/add-course/add-course.component';
import { HeaderUploadFilesComponent } from './admin/upload-files/header-upload-files/header-upload-files.component';
import { EditCourseComponent } from './admin/courses-admin/edit-course/edit-course.component';
import { KitAdminComponent } from './admin/kit-admin/kit-admin.component';
import { AddKitComponent } from './admin/kit-admin/add-kit/add-kit.component';
import { EditKitComponent } from './admin/kit-admin/edit-kit/edit-kit.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { UsersComponent } from './admin/users/users.component';
import { EditUserComponent } from './admin/users/edit-user/edit-user.component';

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
      {
        path: 'my-profile',
        canActivate: [UserGuard],
        component: MyProfileComponent,
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
        path: 'users',
        children: [
          {
            path: '',
            component: UsersComponent,
          },
          {
            path: 'edit-user/:id',
            component: EditUserComponent,
          },
        ],
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
        component: HeaderUploadFilesComponent,
      },
      {
        path: 'courses',
        children: [
          {
            path: '',
            component: CoursesAdminComponent,
          },
          {
            path: 'add-course',
            component: AddCourseComponent,
          },
          {
            path: 'edit-course/:id',
            component: EditCourseComponent,
          },
        ],
      },
      {
        path: 'kit',
        children: [
          {
            path: '',
            component: KitAdminComponent,
          },
          {
            path: 'add-kit',
            component: AddKitComponent,
          },
          {
            path: 'edit-kit/:id',
            component: EditKitComponent,
          },
        ],
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
