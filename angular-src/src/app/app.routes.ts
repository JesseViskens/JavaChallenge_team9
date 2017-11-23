import {Routes} from '@Angular/router';
import {LoginComponent} from "./components/login/login.component";
import {TestComponent} from "./components/test/test.component";

export const routes:Routes = [
      {path: "login", component: LoginComponent},
      {path:"", redirectTo: "login", pathMatch:"full"},
      {path:"test", component: TestComponent}
  ];
