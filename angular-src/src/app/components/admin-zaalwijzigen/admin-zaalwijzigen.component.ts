import {Component, OnInit, Input} from '@angular/core';
import {Zaal} from "../../models/zaal.model";
import {ZaalService} from "../../services/zaal.service";

@Component({
  selector: 'app-admin-zaalwijzigen',
  templateUrl: './admin-zaalwijzigen.component.html',
  styleUrls: ['./admin-zaalwijzigen.component.css']
})
export class AdminZaalwijzigenComponent implements OnInit {

  constructor(private zaalService: ZaalService) { }
  //@Input zaalId: string;
  zaal: Zaal;

  ngOnInit() {
    //this.zaalService.getZaal(zaalId).then(zaal=>this.zaal = zaal);
  }

}
