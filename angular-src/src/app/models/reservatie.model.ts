import {Zaal} from "./zaal.model";
import Gebruiker from "./gebruiker.model";
import autoBind from 'auto-bind';

export class Reservatie{
  id:string;
  naam: string;
  beginuur: Date;
  einduur: Date;
  zaal: Zaal;
  gebruiker: Gebruiker;
  bevestigd: boolean;
  reden: string;

  constructor(data:any = {}) {
    this.naam = data.naam;
    this.beginuur = data.beginuur;
    this.einduur = data.einduur;
    this.zaal = data.zaal;
    this.gebruiker = data.gebruiker;
    this.bevestigd = false;
    this.reden = data.reden;
    autoBind(this);
  }
}
