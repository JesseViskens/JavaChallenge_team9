import { Component, OnInit } from '@angular/core';
import {ZaalService} from "../../services/zaal.service";
import {Router} from "@angular/router";
import {Zaal} from "../../models/zaal.model";
import {FormGroup} from "@angular/forms";

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
    /*this.zaal.naam = this.myForm.value.inputNaam;
    this.zaal.beschrijving = this.myForm.value.inputBeschrijving;
    this.zaal.oppervlakte = this.myForm.value.inputOppervlakte;
    this.zaal.capaciteit = this.myForm.value.inputCapaciteit;
    this.zaal.foto = this.myForm.value.inputFoto;
    this.zaal.aanvang = this.myForm.value.inputAanvang;
    this.zaal.sluiting = this.myForm.value.inputSluiting;*/

    this.zaalService.createZaal(this.zaal);
    this.zaal = new Zaal();
  }

}
