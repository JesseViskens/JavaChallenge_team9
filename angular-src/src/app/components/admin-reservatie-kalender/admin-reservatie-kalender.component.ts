import {NgModule, Component, enableProdMode, Input, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {Priority, Resource, Appointment, Service} from './admin-reservatie-kalender.service';




if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({

  selector: 'app-kalender',
  templateUrl: './admin-reservatie-kalender.component.html',
  providers: [Service]
})


export class AdminKalenderComponent{

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
