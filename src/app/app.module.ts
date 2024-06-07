import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ClientListComponent } from './client-list/client-list.component';
import { AdvisorListComponent } from './advisor-list/advisor-list.component';
import { ClientShowComponent } from './client-show/client-show.component';
import { ClientCreateComponent } from './client-create/client-create.component';
import { ClientEditComponent } from './client-edit/client-edit.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { TransferComponent } from './transfer/transfer.component';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule,} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { statusReducer } from './store/status.reducer';
import { AdvisorClientListComponent } from './advisor-client-list/advisor-client-list.component';
import { AngularToastifyModule, ToastService } from 'angular-toastify';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ClientListComponent,
    AdvisorListComponent,
    ClientShowComponent,
    ClientCreateComponent,
    ClientEditComponent,
    TransferComponent,
    AdvisorClientListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatFormField,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    HttpClientModule,
    AngularToastifyModule,
    StoreModule.forRoot({
      status:  statusReducer
    })
    ],
  providers: [
    provideAnimationsAsync(),
    [ToastService]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
