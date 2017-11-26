import {Routes} from '@Angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ZalenComponent} from "./components/zaal/zalen.component";
import {KalenderComponent} from "./components/reservatieKalender/reservatieKalender.component";

import {ReservatieComponent} from "./components/reservatie/reservatie.component";
import {AdminZalenComponent} from "./components/admin-zalen/admin-zalen.component";
import {AdminZaalwijzigenComponent} from "./components/admin-zaalwijzigen/admin-zaalwijzigen.component";
import {AdminReservatiesComponent} from "./components/admin-reservaties/admin-reservaties.component";
import {AdminKalenderComponent} from "./components/admin-reservatie-kalender/admin-reservatie-kalender.component";
import {AdminZaaltoevoegenComponent} from "./components/admin-zaaltoevoegen/admin-zaaltoevoegen.component";
import {AdminDeelzaalwijzigenComponent} from "./components/admin-deelzaalwijzigen/admin-deelzaalwijzigen.component";

export const routes: Routes = [
  {path: "", component: ZalenComponent},
  {path: "login", component: LoginComponent},
  {path: "reservatieKalender/:id", component: KalenderComponent},
  {path: "adminzalen", component: AdminZalenComponent},
  {path: "reservatie/:id", component: ReservatieComponent},
  {path: "adminreservatie/:id", component: AdminReservatiesComponent},
  {path: "adminzalen", component: AdminZalenComponent},
  {path: "zaalWijzigen/:id", component: AdminZaalwijzigenComponent},
  {path: "adminreservatieKalender/:id", component:AdminKalenderComponent},
  {path: "zaalToevoegen", component: AdminZaaltoevoegenComponent},
  {path: "adminDeelzalenWijzigen/:id", component: AdminDeelzaalwijzigenComponent}
];
