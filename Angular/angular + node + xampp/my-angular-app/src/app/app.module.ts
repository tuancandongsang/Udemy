import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditComponent } from './edit/edit.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AddComponent } from './add/add.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { ListComponent } from './list/list.component';
import { InforComponent } from './infor/infor.component';

@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
    NotfoundComponent,
    AddComponent,
    LoginComponent,
    LayoutComponent,
    ListComponent,
    InforComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
