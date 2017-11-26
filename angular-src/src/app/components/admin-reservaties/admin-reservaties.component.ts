import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {Reservatie} from "../../models/reservatie.model";
import {Zaal} from "../../models/zaal.model";
import Gebruiker from "../../models/gebruiker.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ReservatieService} from "../../services/reservatie.service";
import {ZaalService} from "../../services/zaal.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {reservatieKalenderService} from "../../services/reservatie-kalender.service";

@Component({
  selector: 'app-adminreservatie',
  templateUrl: './admin-reservaties.component.html',
  styleUrls: ['./admin-reservaties.component.css']
})

export class AdminReservatiesComponent implements OnInit {
  zaal: Zaal;
  gebruiker: Gebruiker;
  myForm: FormGroup;
  ngForm: FormGroup;
  reservatie: Reservatie;
  id: string;


  constructor(private reservatieService: ReservatieService, private zaalService: ZaalService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.reservatie = new Reservatie();
    //get if from url
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
//get right data from api and initialize forms
  ngOnInit() {
    this.gegevensOphalen();

    this.ngForm = new FormGroup({
      beginuur: new FormControl(null),
      einduur: new FormControl(null),
      reden: new FormControl(null)
    })
    this.myForm = new FormGroup({
      reden: new FormControl(null)
    })
  }

  //update "reservatie" with data from "ngForm" and send patch to api
  //redirect to '/adminreservatieKalender'
  async onSubmit() {
    this.reservatie.bevestigd = true;
    this.reservatie.beginuur = this.ngForm.value.beginuur;
    this.reservatie.einduur = this.ngForm.value.einduur;
    this.reservatie.reden = this.ngForm.value.reden;
    await this.reservatieService.acceptReservatie(this.reservatie);
    this.router.navigate(['/adminreservatieKalender']);
  }

  //get reservation from url's ID
  //get "zaal" from the reservation
  //get user from reservation
  async gegevensOphalen() {
    await this.reservatieService.getReservatie(this.id).then(
      reservatie => {
        this.reservatie = new Reservatie(reservatie);
      }
    );
    //Gereserveerde zaal ophalen
    await this.zaalService.getZaal(this.reservatie.zaal[0]).then(
      zaal => {
        this.zaal = new Zaal(zaal);
      }
    );
    //Gebruiker ophalen die de reservatie maakte
    await this.authService.getUser(this.reservatie.gebruiker).then(
      gebruiker => {
        this.gebruiker = new Gebruiker(gebruiker);
      }
    );


  }

  //delete reservation, with reason for deletion from "myForm", reset froms and go to index
  async onWeiger() {
    await this.reservatieService.weigerReservatie(this.id, this.myForm.value.reden);
    this.myForm.reset();
    this.ngForm.reset();
    this.router.navigate(['/']);
  }
}
