import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {Reservatie} from "../../models/reservatie.model";
import {Zaal} from "../../models/zaal.model";
import Gebruiker from "../../models/gebruiker.model";
import {FormControl, FormGroup} from "@angular/forms";
import {ReservatieService} from "../../services/reservatie.service";

@Component({
  selector: 'app-reservatie',
  templateUrl: './reservatie.component.html',
  styleUrls:[ './reservatie.component.css']
})

export class ReservatieComponent implements OnInit {
  zaal: Zaal;
  gebruiker: Gebruiker;
  myForm: FormGroup;

  constructor(private reservatieService: ReservatieService) {
    //this.zaal = new Zaal(1, "Computerzaal 1", "beschrijving", 40, "img.png", "0900", "2100", 20);
    this.gebruiker = new Gebruiker({
      email: "robinvutrecht@gmail.com",
      voornaam: "Robin",
      achternaam: "van Utrecht",
      password: "test",
      adres: "Thomas More",
      woonplaats: "Geel"
    });

  }

  ngOnInit() {
    this.myForm = new FormGroup({
      reden: new FormControl(null)
    })
  }

  onSubmit() {
    this.reservatieService.reserveer(
      this.myForm.value.beginuur,
      this.myForm.value.einduur,
      this.zaal,
      this.gebruiker,
      this.myForm.value.reden
    );
    this.myForm.reset();
  }
}
