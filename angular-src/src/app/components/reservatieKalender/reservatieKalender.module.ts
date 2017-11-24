import {DxSchedulerModule} from 'devextreme-angular';
import  {KalenderComponent } from './reservatieKalender.component'
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";



@NgModule({
  imports: [
    BrowserModule,
    DxSchedulerModule,
    RouterModule

  ],
  declarations: [KalenderComponent],
  bootstrap: []
})
export class KalenderModule {}
