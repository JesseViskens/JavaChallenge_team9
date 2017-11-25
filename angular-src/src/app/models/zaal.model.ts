import autoBind from 'auto-bind';

export class Zaal {
  _id: string;
  naam: string;
  beschrijving: string;
  oppervlakte: number;
  foto: string;
  aanvang: string;
  sluiting: string;
  capaciteit: number;

  constructor(data:any ={}) {
    this._id = data._id;
    this.naam = data.naam;
    this.beschrijving = data.beschrijving;
    this.oppervlakte = data.oppervlakte;
    this.foto = data.foto;
    this.aanvang = data.aanvang;
    this.sluiting = data.sluiting;
    this.capaciteit = data.capaciteit;
  autoBind(this);}
}
