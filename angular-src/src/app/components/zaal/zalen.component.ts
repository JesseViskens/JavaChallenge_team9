import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Zaal} from "../../models/zaal.model";
import {Materiaal} from "../../models/materiaal.model";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-zalen',
  templateUrl: './zalen.component.html',
  styleUrls: ['./zaal.component.css']
})

export class ZalenComponent implements OnInit {
  zalen: Zaal[];
  materiaal: Materiaal[] = [
    new Materiaal(1, "spiegel", 7),
    new Materiaal(2, "Computer", 20),
    new Materiaal(3, "Laptop", 10),
    new Materiaal(4, "valmat", 5)
  ];

  constructor(/*private http: HttpClient*/) {
  }

  ngOnInit() {
    /*this.http.get('localhost:3000/zalen').subscribe(data=>{
     this.zalen = data['zalen'];
     })*/

    this.zalen = [
      new Zaal(1, "CompUterzaal 1", "beschrijvig", 40, "img.png", "0900", "2100", 20, this.materiaal),
      new Zaal(2, "DansZaal", "beschrijvig", 40, "img.png", "0900", "2100", 20, this.materiaal),
      new Zaal(3, "FeestZaal", "beschrijvig", 40, "img.png", "0900", "2100", 20, this.materiaal),
      new Zaal(4, "SuperZaal", "beschrijvig", 40, "img.png", "0900", "2100", 20, this.materiaal)
    ];
  }
}
