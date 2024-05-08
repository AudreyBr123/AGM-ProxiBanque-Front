import { Component } from '@angular/core';
import { ClientModel } from '../models/client.model';
import { AddressModel } from '../models/address.model';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.css'
})
export class ClientCreateComponent {
  addressModel = new AddressModel("", "", "");
  clientModel = new ClientModel(0, "", "", "", this.addressModel, "");

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  textFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  
  onSubmit() {
    console.log(this.clientModel);
  }

  newClient() {
    this.addressModel = new AddressModel("", "", "");
    this.clientModel = new ClientModel(0, "", "", "", this.addressModel, "");
  }
}
