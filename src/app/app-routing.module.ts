import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SpaceJoyComponent } from './pages/space-joy/space-joy.component';
import { RegisterComponent } from './pages/register/register.component';
import { UserGuard } from './services/user.guard';
import { UserService } from './services/user.service';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { DashHomeAdminComponent } from './admin/home-admin/dash-home-admin/dash-home-admin.component';
import { PlayerComponent } from './admin/player/player.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'space-joy',
        canActivate: [UserGuard],
        component: SpaceJoyComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: HomeAdminComponent,
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
