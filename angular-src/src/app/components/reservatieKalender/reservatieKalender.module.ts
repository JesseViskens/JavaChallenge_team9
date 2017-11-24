import {DxSchedulerModule} from 'devextreme-angular';
import  {KalenderComponent } from './reservatieKalender.component'
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AppModule} from "../../../../../../../../../../app/app.module";
import {AppComponent} from "../../app.component";



@NgModule({
  imports: [
    BrowserModule,
    DxSchedulerModule,

  ],
  declarations: [KalenderComponent, AppComponent],
  bootstrap: []
})
export class KalenderModule {}
