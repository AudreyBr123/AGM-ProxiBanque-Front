import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientShowComponent } from './client-show/client-show.component';
import { AdvisorListComponent } from './advisor-list/advisor-list.component';
import { TransferComponent } from './transfer/transfer.component';
import { AdvisorClientListComponent } from './advisor-client-list/advisor-client-list.component';
import { ChartComponent } from './chart/chart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'client-create', component: ClientCreateComponent },
  { path: 'client-list', component: ClientListComponent },
  { path: 'client-show/:id', component: ClientShowComponent },
  { path: 'client-edit/:id', component: ClientCreateComponent },
  { path: 'advisor-list', component: AdvisorListComponent },
  { path: 'advisor-client-list/:id', component: AdvisorClientListComponent},
  { path: 'transfer', component: TransferComponent },
  { path: 'chart', component:ChartComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

// ====================================================
// V2 : base pour une future implémentation des guards
// ====================================================

// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path: 'client-create', component: ClientCreateComponent, canActivate: [AuthGuard] },
//   { path: 'client-list', component: ClientListComponent, canActivate: [AuthGuard] },
//   { path: 'client-show/:id', component: ClientShowComponent, canActivate: [AuthGuard] },
//   { path: 'client-edit', component: ClientEditComponent, canActivate: [AuthGuard] },
//   { path: 'advisor-list', component: AdvisorListComponent, canActivate: [AuthGuard] },
//   { path: 'transfer', component: TransferComponent, canActivate: [AuthGuard] },
//   { path: '**', component: LoginComponent }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
