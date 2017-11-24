import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Zaal} from "../../models/zaal.model";
import {HttpClient} from "@angular/common/http";
import {ZaalService} from "../../services/zaal.service";

@Component({
  selector: 'app-zalen',
  templateUrl: './zalen.component.html',
  styleUrls: ['./zaal.component.css']
})

export class ZalenComponent implements OnInit {
  zalen: Zaal[];

  constructor(private http: HttpClient, private zaalService: ZaalService) {
  }

  ngOnInit() {
    this.zaalService.getZalen().then(zalen=>this.zalen = zalen);
    console.log(this.zalen);

  }
}
