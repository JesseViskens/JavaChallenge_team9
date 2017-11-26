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
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

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

  async onSubmit() {
    this.reservatie.bevestigd = true;
    this.reservatie.beginuur = this.ngForm.value.beginuur;
    this.reservatie.einduur = this.ngForm.value.einduur;
    this.reservatie.reden = this.ngForm.value.reden;
    await this.reservatieService.acceptReservatie(this.reservatie);
    this.router.navigate(['/adminreservatieKalender']);
  }

  async gegevensOphalen() {
    await this.reservatieService.getReservatie(this.id).then(
      reservatie => {
        this.reservatie = new Reservatie(reservatie);
        console.log(this.reservatie);
      }
    );
    //Gereserveerde zaal ophalen
    await this.zaalService.getZaal(this.reservatie.zaalId).then(
      zaal => this.zaal = new Zaal(zaal)
    );
    //Gebruiker ophalen die de reservatie maakte
    await this.authService.getUser(this.reservatie.gebruikerId).then(
      gebruiker => this.gebruiker = new Gebruiker(gebruiker)
    );
  }

  async onWeiger() {
    await this.reservatieService.weigerReservatie(this.id, this.myForm.value.reden);
    this.myForm.reset();
    this.ngForm.reset();
    this.router.navigate(['/']);
  }
}
