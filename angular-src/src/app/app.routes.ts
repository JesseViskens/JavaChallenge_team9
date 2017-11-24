import {Routes} from '@Angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ZalenComponent} from "./components/zaal/zalen.component";
import {KalenderComponent} from "./components/reservatieKalender/reservatieKalender.component";

import {ReservatieComponent} from "./components/reservatie/reservatie.component";
import {AdminZalenComponent} from "./components/admin-zalen/admin-zalen.component";
import {AdminZaalwijzigenComponent} from "./components/admin-zaalwijzigen/admin-zaalwijzigen.component";
import {AdminReservatiesComponent} from "./components/admin-reservaties/admin-reservaties.component";

export const routes: Routes = [
  {path: "", component: ZalenComponent},
  {path: "login", component: LoginComponent},
  {path: "reservatieKalender/:id", component: KalenderComponent},
  {path: "reservatie", component: ReservatieComponent},
  {path: "adminzalen", component: AdminZalenComponent},
  {path: "zaalWijzigen/:id", component: AdminZaalwijzigenComponent}
];
