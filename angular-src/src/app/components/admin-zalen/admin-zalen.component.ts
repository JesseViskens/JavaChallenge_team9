import { Component, OnInit } from '@angular/core';
import {Zaal} from "../../models/zaal.model";
import {ZaalService} from "../../services/zaal.service";

@Component({
  selector: 'app-admin-zalen',
  templateUrl: './admin-zalen.component.html',
  styleUrls: ['./admin-zalen.component.css']
})
export class AdminZalenComponent implements OnInit {
  zalen:Zaal[];

  constructor(private zaalService:ZaalService) { }

  ngOnInit() {
    this.zalen = [
      new Zaal(1, "CompUzaal 1", "CompUzaal 1 heeft 20 vaste computers en 5 laptops", 40, "http://via.placeholder.com/350x150", "0900", "2100", 20),
      new Zaal(2, "DansZaal", "balletbar en spiegels", 40, "http://via.placeholder.com/350x150", "0900", "2100", 20),
      new Zaal(3, "FeestZaal", "tafels en stoelen aanwezig", 40, "http://via.placeholder.com/350x150", "0900", "2100", 20),
      new Zaal(4, "SuperZaal", "opdeelbaar in 3", 40, "http://via.placeholder.com/350x150.png", "0900", "2100", 20)
    ];
  }

  onDelete(id){
    this.zaalService.deleteZaal(id);
  }
}
