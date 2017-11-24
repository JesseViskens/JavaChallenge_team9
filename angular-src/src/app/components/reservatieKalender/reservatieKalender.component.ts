import {NgModule, Component, enableProdMode, Input, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {Priority, Resource, Appointment, Service} from '../../services/reservatieKalender.service';
import {ActivatedRoute, Router} from "@angular/router";


if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({

  selector: 'app-kalender',
  templateUrl: './reservatieKalender.component.html',
  providers: [Service]
})


export class KalenderComponent {

  @Input() appointmentsData: Appointment[];
  @Input() resourcesData: Resource[];
  @Input() prioritiesData: Priority[];
  id: number;

  currentDate: Date = new Date();

  constructor(service: Service, private router: Router,
              private route: ActivatedRoute,) {
    this.appointmentsData = service.getAppointments();
    this.resourcesData = service.getResources();
    this.prioritiesData = service.getPriorities();
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

  }
}
