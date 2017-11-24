import {DxSchedulerModule} from 'devextreme-angular';
import  {KalenderComponent } from './reservatieKalender.component'
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";



@NgModule({
  imports: [
    BrowserModule,
    DxSchedulerModule,

  ],
  declarations: [KalenderComponent],
  bootstrap: []
})
export class KalenderModule {}
