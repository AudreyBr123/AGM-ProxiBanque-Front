import { Component } from '@angular/core';
import { ClientModel } from '../models/client.model';
import { AddressModel } from '../models/address.model';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
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
  isAddMode: boolean = true;
  submitted = false;

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

  accounts = this._formBuilder.group({
    currentAccount: false,
    savingAccount: false
  });

  constructor(private _formBuilder: FormBuilder) {
  }
  
  onSubmit() {
    this.submitted = false;

    if(this.registerForm.invalid) {
      return;
    }

    if(this.isAddMode) {
      this.createClient();
    }
    else {
      this.updateClient();
    }
  }

  resetClient() {
    this.addressModel = new AddressModel("", "", "");
    this.clientModel = new ClientModel(0, "", "", "", this.addressModel, "");
  }

  private createClient() {
    console.log(this.clientModel);
    console.log(`current account : ${this.accounts.value.currentAccount}`);
    console.log(`saving account : ${this.accounts.value.savingAccount}`);
  }

  private updateClient() {
    console.log(this.clientModel);
  }
}
