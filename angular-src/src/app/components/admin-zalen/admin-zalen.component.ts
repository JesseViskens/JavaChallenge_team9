import { Component, OnInit } from '@angular/core';
import {Zaal} from "../../models/zaal.model";
import {ZaalService} from "../../services/zaal.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-admin-zalen',
  templateUrl: './admin-zalen.component.html',
  styleUrls: ['./admin-zalen.component.css']
})
export class AdminZalenComponent implements OnInit {
  zalen: Zaal[];

  constructor(private http: HttpClient, private zaalService: ZaalService) {
  }

  ngOnInit() {
    this.zaalService.getZalen().then(zalen=>this.zalen = zalen);
    console.log(this.zalen);

  }

  onDelete(id){
    this.zaalService.deleteZaal(id);
  }
}
