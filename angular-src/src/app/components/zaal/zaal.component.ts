import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Zaal} from "../../models/zaal.model";

@Component({
  selector: 'app-zaal',
  templateUrl: './zaal.component.html',
  styleUrls:[ './zaal.component.css']
})

export class ZaalComponent {
  @Input() zaal: Zaal;

  constructor() {

  }

}
