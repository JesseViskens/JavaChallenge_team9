import autoBind from 'auto-bind';

export default class Gebruiker{
  id:string;
  email:string;
  voornaam:string;
  achternaam:string;
  isAdmin: boolean = false;
  password:string;
  adres:string;
  woonplaats:string;

  constructor(data:any = {}){
    this.id = data._id;
    this.email = data.email;

    this.voornaam = data.voornaam;
    this.achternaam = data.achternaam;
    this.isAdmin = data.isAdmin;
    this.password = data.password;
    this.adres = data.adres;
    this.woonplaats = data.woonplaats;
    autoBind(this);
  }

  getEmail():string{
    if(this.email == null || this.email == ""){
      return this.voornaam + " " + this.achternaam;
    }
    return this.email;
  }

  getId():string{
    return this.id;
  }

  getAdres():string{
    let adres = this.adres;
    let woonplaats = this.woonplaats;

    if (adres == null || adres == ""){
      if (woonplaats == null || woonplaats == ""){
        return "Geen adres bekend";
      } else {
        return woonplaats;
      }
    }

    if (woonplaats == null || woonplaats == ""){
      return adres;
    }

    return adres + ", " + woonplaats;
  }
}
