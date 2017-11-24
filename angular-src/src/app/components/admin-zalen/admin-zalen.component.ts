import { Component, OnInit } from '@angular/core';
import {Zaal} from "../../models/zaal.model";

@Component({
  selector: 'app-admin-zalen',
  templateUrl: './admin-zalen.component.html',
  styleUrls: ['./admin-zalen.component.css']
})
export class AdminZalenComponent implements OnInit {
  zalen:Zaal[];

  constructor() { }

  ngOnInit() {
    this.zalen = [
      new Zaal(1, "CompUzaal 1", "CompUzaal 1 heeft 20 vaste computers en 5 laptops", 40, "img.png", "0900", "2100", 20),
      new Zaal(2, "DansZaal", "balletbar en spiegels", 40, "img.png", "0900", "2100", 20),
      new Zaal(3, "FeestZaal", "tafels en stoelen aanwezig", 40, "img.png", "0900", "2100", 20),
      new Zaal(4, "SuperZaal", "opdeelbaar in 3", 40, "img.png", "0900", "2100", 20)
    ];
  }
}
