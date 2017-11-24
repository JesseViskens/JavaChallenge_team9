import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Zaal} from "../../models/zaal.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-zalen',
  templateUrl: './zalen.component.html',
  styleUrls: ['./zaal.component.css']
})

export class ZalenComponent implements OnInit {
  zalen: Zaal[];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.zalen = [
      new Zaal(1, "CompUzaal 1", "CompUzaal 1 heeft 20 vaste computers en 5 laptops", 40, "http://via.placeholder.com/350x150", "0900", "2100", 20),
      new Zaal(2, "DansZaal", "balletbar en spiegels", 40, "http://via.placeholder.com/350x150", "0900", "2100", 20),
      new Zaal(3, "FeestZaal", "tafels en stoelen aanwezig", 40, "http://via.placeholder.com/350x150", "0900", "2100", 20),
      new Zaal(4, "SuperZaal", "opdeelbaar in 3", 40, "http://via.placeholder.com/350x150.png", "0900", "2100", 20)
    ];
  }
}
