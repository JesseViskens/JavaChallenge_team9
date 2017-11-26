import {Component, OnInit, OnDestroy} from '@angular/core';
import {ZaalService} from "../../services/zaal.service";
import {ActivatedRoute,Router} from "@angular/router";
import {Zaal} from "../../models/zaal.model";
import {FormBuilder, FormGroup, FormArray, FormControl} from "@angular/forms";

@Component({
  selector: 'app-admin-deelzaalwijzigen',
  templateUrl: './admin-deelzaalwijzigen.component.html',
  styleUrls: ['./admin-deelzaalwijzigen.component.css']
})
export class AdminDeelzaalwijzigenComponent implements OnInit, OnDestroy {

  constructor(private zaalService:ZaalService, private route:ActivatedRoute, private router:Router, private formBuilder: FormBuilder) {}
  zaalId:string;
  zaal:Zaal;
  deelZaal: Zaal;
  deelZalen:Zaal[];
  zalen:Zaal[];
  nieuwDeelZalen:string[];
  private sub:any;
  myForm : FormGroup;

  async ngOnInit() {
    this.zaal = new Zaal();
    this.deelZalen = [];
    this.nieuwDeelZalen = [];

    this.myForm = this.formBuilder.group({
      zaalIds: this.formBuilder.array([])
    });

    this.sub = this.route.params.subscribe(params => {this.zaalId = params['id'];});
    this.zaal = await this.zaalService.getZaal(this.zaalId);

    if (this.zaal == null){
      console.log("De zaal is null");
    }

    this.zaalService.getZalen().then(zalen=>this.zalen = zalen).then(function () {
      this.zalen = this.zalen.sort((a, b) => {
        if (a.naam < b.naam) return -1;
        else if (a.naam > b.naam) return 1;
        else return 0;
      })
    }.bind(this));

    this.zaalService.getDeelZalen(this.zaal._id).then(deelzalen=>this.deelZalen = deelzalen).then(function () {
      this.deelZalen = this.deelZalen.sort((a, b) => {
        if (a.naam < b.naam) return -1;
        else if (a.naam > b.naam) return 1;
        else return 0;
      })
    }.bind(this));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async onDelete(id){
    if(confirm('Bent u zeker dat u alle deelzalen wilt verwijderen?')){
      if (id != this.zaal._id){
        this.zaal = await this.zaalService.getZaal(this.zaalId);
      }

      await this.zaalService.deleteDeelzalen(this.zaal);

      this.router.navigate(['/zaalWijzigen/' + this.zaal._id]);
    }
  }

  async onDeleteDeelZaal(deelZaalId){
    if(confirm('Bent u zeker dat u deze deelzaal wilt verwijderen?')){
      this.deelZaal = await this.zaalService.getZaal(deelZaalId);
      await this.deelZalen.splice(this.deelZalen.indexOf(this.deelZaal), 1);
      this.zaal.zalen = [];

      for (let nieuwZaal of this.deelZalen) {
        this.zaal.zalen.push(nieuwZaal._id);
      }

      await this.zaalService.deleteDeelzaal(this.zaal);

      this.router.navigate(['/adminDeelzalenWijzigen/', this.zaal._id]);
    }
  }

  // This function saves the chosen options in an array that can be accessed later on
  onChange(zaalId:string, isChecked: boolean) {
    const zaalFormArray = <FormArray>this.myForm.controls.zaalIds;

    if(isChecked) {
      zaalFormArray.push(new FormControl(zaalId));
    } else {
      let index = zaalFormArray.controls.findIndex(x => x.value == zaalId);
      zaalFormArray.removeAt(index);
    }
  }

  async onSubmit() {
    const zaalFormArray = <FormArray>this.myForm.controls.zaalIds;

    for (let checkedZaalId of zaalFormArray.value) {
      this.deelZaal = await this.zaalService.getZaal(checkedZaalId);

      await this.zaalService.updateDeelzalen(this.zaal, this.deelZaal);
    }

    this.router.navigate(['/zaalWijzigen/', this.zaal._id]);
  }
}
