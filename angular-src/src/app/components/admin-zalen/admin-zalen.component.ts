import { Component, OnInit } from '@angular/core';
import {Zaal} from "../../models/zaal.model";
import {ZaalService} from "../../services/zaal.service";
import { Router} from "@angular/router";

@Component({
  selector: 'app-admin-zalen',
  templateUrl: './admin-zalen.component.html',
  styleUrls: ['./admin-zalen.component.css']
})
export class AdminZalenComponent implements OnInit {
  zalen: Zaal[];

  constructor( private zaalService: ZaalService,private router: Router) {
  }

  ngOnInit() {
    this.zaalService.getZalen().then(zalen=>this.zalen = zalen);
  }

  async onDelete(id){
    if(confirm('Bent u zeker dat u deze zaal wil verwijderen?')){
      await this.zaalService.deleteZaal(id);
      this.router.navigateByUrl('/').then(()=>{
        this.router.navigateByUrl('/adminzalen');
      });
    }
  }
}
