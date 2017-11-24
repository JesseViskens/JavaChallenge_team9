import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './app.routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';
import { TestService } from "./services/test.service";
import {ZaalComponent} from "./components/zaal/zaal.component";
import {ZalenComponent} from "./components/zaal/zalen.component";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    TestComponent,
    ZaalComponent,
    ZalenComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
