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
import {AdminKalenderModule} from "./components/admin-reservatie-kalender/admin-reservatie-kalender.module";
import {AdminRegistratieKalenderService} from "./services/admin-reservatie-kalender.service";
import { AdminZaaltoevoegenComponent } from './components/admin-zaaltoevoegen/admin-zaaltoevoegen.component';
import { AdminDeelzaalwijzigenComponent } from './components/admin-deelzaalwijzigen/admin-deelzaalwijzigen.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ZaalComponent,
    ZalenComponent,
    ReservatieComponent,
    AdminZalenComponent,
    AdminZaalwijzigenComponent,
    AdminReservatiesComponent,
    AdminZaaltoevoegenComponent,
    AdminDeelzaalwijzigenComponent
  ],
  imports: [
    BrowserModule,
    KalenderModule,
    AdminKalenderModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    ZaalService,
    ReservatieService,
    AdminRegistratieKalenderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
