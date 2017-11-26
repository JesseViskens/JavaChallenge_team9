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
    //get "zalen" and sort alphabetical
    this.zaalService.getZalen().then(zalen=>this.zalen = zalen).then(function () {
      this.zalen = this.zalen.sort((a, b) => {
        if (a.naam < b.naam) return -1;
        else if (a.naam > b.naam) return 1;
        else return 0;
      })
    }.bind(this));

  }
}
