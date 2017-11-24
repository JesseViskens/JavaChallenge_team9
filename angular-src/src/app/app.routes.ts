import {Routes} from '@Angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ZalenComponent} from "./components/zaal/zalen.component";

import {ReservatieComponent} from "./components/reservatie/reservatie.component";
import {AdminZalenComponent} from "./components/admin-zalen/admin-zalen.component";

export const routes: Routes = [
  {path: "", component: ZalenComponent},
  {path: "login", component: LoginComponent},
  {path: "zalen", component: ZalenComponent},
  {path: "reservatie", component: ReservatieComponent},
  {path: "adminzalen", component: AdminZalenComponent}
];
