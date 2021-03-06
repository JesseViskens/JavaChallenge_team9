import {Zaal} from "./zaal.model";
import Gebruiker from "./gebruiker.model";
import autoBind from 'auto-bind';

export class Reservatie{
  _id:string;
  naam: string;
  public beginuur: Date;
  public einduur: Date;
  zaal: string[] = [];
  gebruiker: string;
  bevestigd: boolean;
  reden: string;

  constructor(data:any = {}) {
    this._id = data._id;
    this.naam = data.naam;
    this.beginuur = data.beginuur;
    this.einduur = data.einduur;
    this.zaal = data.zaal;
    if (this.zaal == null){
      this.zaal = [];
    }
    this.gebruiker = data.gebruiker;
    this.bevestigd = data.bevestigd;
    this.reden = data.reden;
    autoBind(this);
  }

}


