import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {Reservatie} from "../../models/reservatie.model";
import {Zaal} from "../../models/zaal.model";
import Gebruiker from "../../models/gebruiker.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ReservatieService} from "../../services/reservatie.service";
import {ZaalService} from "../../services/zaal.service";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reservatie',
  templateUrl: './reservatie.component.html',
  styleUrls:[ './reservatie.component.css']
})

export class ReservatieComponent implements OnInit {
  zalen: Zaal[];
  zaal: Zaal;
  gebruiker: Gebruiker;
  reservatie: Reservatie;

  constructor(private reservatieService: ReservatieService, private zaalService: ZaalService, private authService: AuthService, private router: Router) {
    this.reservatie = new Reservatie();
    this.reservatie.naam = "Reservatie 1";
  }

  ngOnInit() {
    //Gekozen zaal ophalen
    this.zaalService.getZaal("5a1986f0f2f49126307a5220").then(
      zaal=>this.reservatie.zaal = zaal
    );
    //Ingelogde gebruiker ophalen
    this.authService.getCurrentUser().then(
      gebruiker=>this.reservatie.gebruiker = gebruiker
    );
  }

  onSubmit() {
    this.reservatieService.reserveer(
      this.reservatie
    );
  }
}
