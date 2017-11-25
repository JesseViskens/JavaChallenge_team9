import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Zaal} from "../../models/zaal.model";
import {ZaalService} from "../../services/zaal.service";
import {ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-admin-zaalwijzigen',
  templateUrl: './admin-zaalwijzigen.component.html',
  styleUrls: ['./admin-zaalwijzigen.component.css']
})
export class AdminZaalwijzigenComponent implements OnInit, OnDestroy {

  constructor(private zaalService: ZaalService, private route: ActivatedRoute) { }
  zaalId: string;
  zaal: Zaal;
  private sub: any;

  async ngOnInit() {
    this.sub = this.route.params.subscribe(params => {this.zaalId = params['id'];});
    this.zaal = await this.zaalService.getZaal(this.zaalId);

    if (this.zaal == null){
      console.log("De zaal is null");
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
