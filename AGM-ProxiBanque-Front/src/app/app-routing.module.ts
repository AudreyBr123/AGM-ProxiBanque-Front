import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientShowComponent } from './client-show/client-show.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { AdvisorListComponent } from './advisor-list/advisor-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'client-create', component: ClientCreateComponent },
  { path: 'client-list', component: ClientListComponent },
  { path: 'client-show', component: ClientShowComponent },
  { path: 'client-edit', component: ClientEditComponent },
  { path: 'advisor-list', component: AdvisorListComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
