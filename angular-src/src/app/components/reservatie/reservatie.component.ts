import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {Reservatie} from "../../models/reservatie.model";
import {Zaal} from "../../models/zaal.model";
import Gebruiker from "../../models/gebruiker.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ReservatieService} from "../../services/reservatie.service";
import {ZaalService} from "../../services/zaal.service";
import {AuthService} from "../../services/auth.service";

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

  constructor(private reservatieService: ReservatieService, private zaalService: ZaalService, private authService: AuthService) {
    this.reservatie = new Reservatie();
    this.reservatie.naam = "Reservatie 1";
    /*this.reservatie.zaal = new Zaal({
      _id: 1,
      naam: "testzaal",
      beschrijving: "test",
      oppervlakte: 5,
      foto: "foto",
      aanvang: "aanvang",
      sluiting: "sluit",
      capaciteit: 200
    });
    this.reservatie.gebruiker = new Gebruiker({
      email: "robinvutrecht@gmail.com",
      voornaam: "Robin",
      achternaam: "van Utrecht",
      password: "test",
      adres: "Thomas More",
      woonplaats: "Geel"
    });
    this.reservatie.beginuur = new Date();
    this.reservatie.einduur = new Date();
    this.reservatie.reden = "Test";*/
  }

  ngOnInit() {
    this.zaalService.getZaal("5a1986f0f2f49126307a5220").then(
      zaal=>this.reservatie.zaal = zaal
    );
    this.authService.getUser("5a198d59694d77375031a179").then(
      gebruiker=>this.reservatie.gebruiker = gebruiker
    );
  }

  onSubmit() {
    this.reservatieService.reserveer(
      this.reservatie
    );
  }
}
