import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { InforComponent } from './infor/infor.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AddComponent } from './add/add.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'add',
        component: AddComponent,
      },
      {
        path: 'infor',
        component: InforComponent,
      },
      {
        path: 'edit/:id',
        component: EditComponent,
      },
    ],
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
