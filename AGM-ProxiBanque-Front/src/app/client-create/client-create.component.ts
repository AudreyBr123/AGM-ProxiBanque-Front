import { Component } from '@angular/core';
import { ClientModel } from '../models/client.model';
import { AddressModel } from '../models/address.model';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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

  registerForm = new FormGroup({
    firstNameFormControl: new FormControl('', [Validators.required]),
    lastNameFormControl: new FormControl('', [Validators.required]),
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    streetFormControl: new FormControl('', [Validators.required]),
    cityFormControl: new FormControl('', [Validators.required]),
    zipCodeFormControl: new FormControl('', [Validators.required]),
    phoneNumberFormControl: new FormControl('', [Validators.required]),
  });


  matcher = new MyErrorStateMatcher();
  
  onSubmit() {
    console.log(this.clientModel);
  }

  resetClient() {
    this.addressModel = new AddressModel("", "", "");
    this.clientModel = new ClientModel(0, "", "", "", this.addressModel, "");
  }
}
