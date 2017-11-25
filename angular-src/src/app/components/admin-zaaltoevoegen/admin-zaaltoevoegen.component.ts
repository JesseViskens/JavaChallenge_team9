import {Component, OnInit, ViewChild} from '@angular/core';
import {ZaalService} from "../../services/zaal.service";
import {Router} from "@angular/router";
import {Zaal} from "../../models/zaal.model";
import {FormGroup} from "@angular/forms";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-admin-zaaltoevoegen',
  templateUrl: './admin-zaaltoevoegen.component.html',
  styleUrls: ['./admin-zaaltoevoegen.component.css']
})
export class AdminZaaltoevoegenComponent implements OnInit {
  zalen: Zaal[];
  zaal: Zaal = new Zaal();

  constructor(private zaalService: ZaalService,private router: Router) { }

  ngOnInit() {
    this.zaalService.getZalen().then(zalen=>this.zalen = zalen);
  }

  onSubmit() {
    this.zaalService.createZaal(this.zaal);
    this.zaal = new Zaal();
  }
}
