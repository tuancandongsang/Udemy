import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotfoundComponentComponent } from './notfound-component/notfound-component.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { SelectroomchatComponent } from './selectroomchat/selectroomchat.component';

// selectroomchat
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'selectroomchat/:username',
    component: SelectroomchatComponent,
  },
  {
    path: ':username/room',
    component: LayoutComponent,
    children: [
      {
        path: ':room_name',
        component: HomeComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotfoundComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
