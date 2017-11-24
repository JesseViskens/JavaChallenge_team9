import { Component, Input, Output, EventEmitter } from "@angular/core";
import {Reservatie} from "../../models/reservatie.model";
import {Zaal} from "../../models/zaal.model";

@Component({
    selector: 'app-reservatie',
    templateUrl: './reservatie.component.html',
    styleUrls:[ './reservatie.component.css']
})

export class ReservatieComponent{
  zaal: Zaal;

  constructor(){
    this.zaal =  new Zaal(1, "Computerzaal 1", "beschrijving", 40, "img.png", "0900", "2100", 20);
  }
}
