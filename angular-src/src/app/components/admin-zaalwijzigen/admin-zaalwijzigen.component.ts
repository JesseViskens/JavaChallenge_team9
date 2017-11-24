import {Component, OnInit, Input} from '@angular/core';
import {Zaal} from "../../models/zaal.model";

@Component({
  selector: 'app-admin-zaalwijzigen',
  templateUrl: './admin-zaalwijzigen.component.html',
  styleUrls: ['./admin-zaalwijzigen.component.css']
})
export class AdminZaalwijzigenComponent implements OnInit {

  constructor() { }
  @Input() zaal: Zaal;

  ngOnInit() {
  }

}
