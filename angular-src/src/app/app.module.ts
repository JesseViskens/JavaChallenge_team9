import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import {ZaalComponent} from "./components/zaal/zaal.component";
import {ZalenComponent} from "./components/zaal/zalen.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ZaalComponent,
    ZalenComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [ AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
