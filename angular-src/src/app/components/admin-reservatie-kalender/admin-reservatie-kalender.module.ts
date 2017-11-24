import {DxSchedulerModule} from 'devextreme-angular';
import  {AdminKalenderComponent } from './admin-reservatie-kalender.component'
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";



@NgModule({
  imports: [
    BrowserModule,
    DxSchedulerModule,

  ],
  declarations: [AdminKalenderComponent],
  bootstrap: []
})
export class  AdminKalenderModule {}
