import {Routes} from '@Angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ZalenComponent} from "./components/zaal/zalen.component";

export const routes: Routes = [
  {path: "", component: ZalenComponent},
  {path: "login", component: LoginComponent},
  {path: "zalen", component: ZalenComponent}
];
