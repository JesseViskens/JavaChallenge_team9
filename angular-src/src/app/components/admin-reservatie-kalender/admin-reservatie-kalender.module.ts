import {DxSchedulerModule} from 'devextreme-angular';
import  {AdminReservatieKalenderComponent } from './admin-reservatie-kalender.component'
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {AdminReservatieKalenderService} from "../../services/admin-reservatie-kalender.service";
import {RouterModule} from "@angular/router";



@NgModule({
  imports: [
    BrowserModule,
    DxSchedulerModule,
    RouterModule

  ],
  declarations: [AdminReservatieKalenderComponent],
  bootstrap: [],
  providers:[AdminReservatieKalenderService
    ]
})
export class  AdminReservatieKalenderModule {}
