import {Component, OnInit, Input, OnDestroy, ViewChild} from '@angular/core';
import {Zaal} from "../../models/zaal.model";
import {ZaalService} from "../../services/zaal.service";
import {ActivatedRoute, Router} from "@angular/router";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-admin-zaalwijzigen',
  templateUrl: './admin-zaalwijzigen.component.html',
  styleUrls: ['./admin-zaalwijzigen.component.css']
})
export class AdminZaalwijzigenComponent implements OnInit, OnDestroy {

  constructor(private zaalService: ZaalService, private route: ActivatedRoute, private router:Router) { }
  zaalId: string;
  zaal: Zaal;
  deelzaal: Zaal;
  zalen: Zaal[];
  deelZalen: Zaal[] = [];
  private sub: any;
  @ViewChild('select') zalenElement;

  async ngOnInit() {
    this.zaal = new Zaal();

    this.sub = this.route.params.subscribe(params => {this.zaalId = params['id'];});
    this.zaal = await this.zaalService.getZaal(this.zaalId);

    if (this.zaal == null){
      console.log("De zaal is null");
    }

    this.zaalService.getZalen().then(zalen=>this.zalen = zalen);
    this.zaalService.getDeelZalen(this.zaal._id).then(deelzalen=>this.deelZalen = deelzalen);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async onSubmit() {
    /*for (var i = 0; i < this.zalenElement.nativeElement.length; i++) {
      if (this.zalenElement.nativeElement.options[i].selected){
        let deelZaalId = this.zalenElement.nativeElement.options[i].value;
        this.deelzaal = await this.zaalService.getZaal(deelZaalId);

        this.zaalService.updateDeelzalen(this.zaal, this.deelzaal);
      }
    }*/

    await this.zaalService.updateZaal(this.zaal);
    this.zaal = new Zaal();
    this.router.navigate(['/adminzalen']);
  }
}
