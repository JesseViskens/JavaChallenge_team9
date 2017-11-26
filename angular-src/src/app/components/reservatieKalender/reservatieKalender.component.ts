import {NgModule, Component, enableProdMode, Input, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {Priority, Resource, Appointment, Service} from '../../services/reservatieKalender.service';
import {ActivatedRoute, Router} from "@angular/router";
import {reservatieKalenderService} from "../../services/reservatie-kalender.service";
import {Reservatie} from "../../models/reservatie.model";


if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({

  selector: 'app-kalender',
  templateUrl: './reservatieKalender.component.html',
  providers: [Service]
})


export class KalenderComponent implements OnInit{
  id: string;
  reservaties: Reservatie[];
  appointmentsData: Appointment[];
  currentDate: Date = new Date();

  constructor(private service: reservatieKalenderService, private router: Router,
              private route: ActivatedRoute,) {

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

  }
  ngOnInit() {
    this.service.getReservaties().then(
      reservaties => {
        this.reservaties = reservaties;
        console.log(this.reservaties);
        const appointments: Appointment[] = [];
        for (const item of this.reservaties) {
          let newAppointment = new Appointment();
          newAppointment.endDate = item.einduur;
          newAppointment.startDate = item.beginuur;
          newAppointment.ownerId = [parseInt(item.gebruikerId)];
          newAppointment.text = item.reden;
          appointments.push(newAppointment);
          console.log(newAppointment);
        }
        return appointments;
      }

    );
    console.log(this.reservaties);
  }
}
