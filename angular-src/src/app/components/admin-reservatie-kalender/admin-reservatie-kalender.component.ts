import {NgModule, Component, enableProdMode, Input, OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {
  Priority,
  Resource,
  Appointment,
  AdminReservatieKalenderService
} from '../../services/admin-reservatie-kalender.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Reservatie} from "../../models/reservatie.model";


if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-kalender-admin',
  templateUrl: './admin-reservatie-kalender.component.html',
  providers: [AdminReservatieKalenderService],
  styleUrls: ['./admin-reservatie-calender.component.css']
})


export class AdminReservatieKalenderComponent implements OnInit {

  id: string;
  reservaties: Reservatie[];
  appointmentsData: Appointment[];
  currentDate: Date = new Date();

  constructor(private service: AdminReservatieKalenderService, private router: Router,
              private route: ActivatedRoute) {

    this.route.params.subscribe(params => {
      this.id = params['id'];

    });

  }

  ngOnInit() {


    this.service.getReservaties().then(
      reservaties => {
        this.reservaties = reservaties;
        /*create a new appointment*/
        const appointments: Appointment[] = [];
        let tempRes: Reservatie[] = [];
        /*look for every appointment*/
        for (const item of this.reservaties) {
          /*if the id of the reservation equals the id of the room, we add the reservation to the calendar*/
          if (item.zaal.indexOf(this.id) != -1) {

            let newAppointment = new Appointment({});
            newAppointment.endDate = item.einduur;
            newAppointment.startDate = item.beginuur;
            newAppointment.ownerId = item.gebruiker + "";
            newAppointment.text = item.naam;
            newAppointment.reden = item.reden;
            newAppointment.confirmed = item.bevestigd;
            newAppointment.priority = 2;
            appointments.push(newAppointment);
            tempRes.push(item);

          }
          this.reservaties = tempRes;
          this.appointmentsData = appointments;

        }
        /*send the appointment to the calendar*/
      }
    );


  }
}

