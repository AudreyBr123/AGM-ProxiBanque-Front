import { Component } from '@angular/core';
import { ClientModel } from '../models/client.model';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { PersonInfos } from '../models/person-infos';
import { AccountModel } from '../models/account.model';
import { ClientService } from '../services/client.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  personInfos = new PersonInfos("", "", "", "", "", "", "");
  account = new AccountModel(null, 500.0, new Date());
  client = new ClientModel(0, this.personInfos, this.account);
  id: number = 0;
  isAddMode: boolean = false;
  loading = false;
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

  constructor(private _formBuilder: FormBuilder, private service: ClientService, private route: ActivatedRoute, private router: Router) {}
  
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if(!this.isAddMode) {
      this.service.getClientById(this.id).subscribe((DBclient) => {
        this.client = DBclient;
        this.personInfos = DBclient.personInfos;
      });
    }
  }

  onSubmit() {
    this.submitted = true;

    if(this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    if(this.isAddMode) {
      this.createClient();
    }
    else {
      this.updateClient();
    }
  }

  resetClient() {
    this.personInfos = new PersonInfos("", "", "", "", "", "", "");
    this.account = new AccountModel(0, 0.0, new Date());
    this.client = new ClientModel(0, this.personInfos, this.account);
  }

  private createClient() {
    console.log(this.client);
    console.log(`current account : ${this.accounts.value.currentAccount}`);

    this.service.postClient(this.client)
      .subscribe({
        next: () => {
          this.router.navigate(['/client-list']);
        },
        error: error => {
          console.log("Error creating client");
          this.loading = false;
        }
      })
  }

  private updateClient() {
    console.log(this.client);

    this.service.putClient(this.client.id, this.client)
      .subscribe({
        next: () => {
          this.router.navigate(['/client-list'])
        },
        error: error => {
          console.log("Error updating client");
          this.loading = false;
        }
      })
  }
}
