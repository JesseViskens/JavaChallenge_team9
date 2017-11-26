import {DxSchedulerModule} from 'devextreme-angular';
import  {KalenderComponent } from './reservatieKalender.component';
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {reservatieKalenderService} from "../../services/reservatie-kalender.service";



@NgModule({
  imports: [
    BrowserModule,
    DxSchedulerModule,
    RouterModule

  ],
  declarations: [KalenderComponent],
  bootstrap: [],
  providers: [
    reservatieKalenderService
  ]
})
export class KalenderModule {}
