import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HttpResponse, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    CreateComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      { path:'dashboard',component: DashboardComponent, pathMatch: 'full'},
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'login', component: LoginComponent, pathMatch: 'full'},
      { path: 'create', component: CreateComponent, pathMatch: 'full'},
      { path: 'edit/:faqId', component: EditComponent, pathMatch:'full'}
    ])
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
