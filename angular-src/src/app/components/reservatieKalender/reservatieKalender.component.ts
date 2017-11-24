import {NgModule, Component, enableProdMode, Input} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {Priority, Resource, Appointment, Service} from './reservatieKalender.service';




if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  styleUrls: ['reservatieKalender.component.css'],
  selector: 'app-kalender',
  templateUrl: './reservatieKalender.component.html',
  providers: [Service]
})


export class KalenderComponent {

  @Input() appointmentsData: Appointment[];
  @Input() resourcesData: Resource[];
  @Input() prioritiesData: Priority[];

  currentDate: Date = new Date();

  constructor(service: Service) {
    this.appointmentsData = service.getAppointments();
    this.resourcesData = service.getResources();
    this.prioritiesData = service.getPriorities();
  }
}
