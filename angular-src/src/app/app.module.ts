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
import {ReservatieComponent} from "./components/reservatie/reservatie.component";
import { AdminZalenComponent } from './components/admin-zalen/admin-zalen.component';
import {KalenderModule} from "./components/reservatieKalender/reservatieKalender.module";
import {ZaalService} from "./services/zaal.service";
import {ReservatieService} from "./services/reservatie.service";
import { AdminZaalwijzigenComponent } from './components/admin-zaalwijzigen/admin-zaalwijzigen.component';
import {AdminReservatiesComponent} from "./components/admin-reservaties/admin-reservaties.component";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ZaalComponent,
    ZalenComponent,
    ReservatieComponent,
    AdminZalenComponent,
    AdminZaalwijzigenComponent
  ],
  imports: [
    BrowserModule,
    KalenderModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    ZaalService,
    ReservatieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
