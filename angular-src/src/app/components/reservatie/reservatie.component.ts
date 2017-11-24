import { Component, Input, Output, EventEmitter } from "@angular/core";
import {Reservatie} from "../../models/reservatie.model";
import {Zaal} from "../../models/zaal.model";
import {Materiaal} from "../../models/materiaal.model";

@Component({
    selector: 'app-reservatie',
    templateUrl: './reservatie.component.html',
    styleUrls:[ './reservatie.component.css']
})

export class ReservatieComponent{
  zaal: Zaal;
  materiaal: Materiaal[] = [
    new Materiaal(1, "spiegel", 7),
    new Materiaal(2, "Computer", 20),
    new Materiaal(3, "Laptop", 10),
    new Materiaal(4, "valmat", 5)
  ];

  constructor(){
    this.zaal =  new Zaal(1, "Computerzaal 1", "beschrijving", 40, "img.png", "0900", "2100", 20, this.materiaal);
  }
}
