import {Routes} from '@Angular/router';
import {LoginComponent} from "./components/login/login.component";
import {TestComponent} from "./components/test/test.component";
import {ZalenComponent} from "./components/zaal/zalen.component";

export const routes: Routes = [
  {path: "", component: ZalenComponent},
  {path: "login", component: LoginComponent},
  {path: "zaal", component: TestComponent}
];
