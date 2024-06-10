import { Component } from '@angular/core';
import { ClientModel } from '../models/client.model';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { PersonInfos } from '../models/person-infos';
import { ClientService } from '../services/client.service';

import { ActivatedRoute, Router } from '@angular/router';
import { CurrentAccountModel } from '../models/current-account.model';
import { SavingAccountModel } from '../models/saving-account.model';
import { Location } from '@angular/common';
import { ToastService } from 'angular-toastify';

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
  styleUrls: ['./client-create.component.css', '../../styles.css'],
})
export class ClientCreateComponent {
  personInfos = new PersonInfos("", "", "", "", "", "", "");
  currentAccount = new CurrentAccountModel(null, 0.0, new Date());
  savingAccount = new SavingAccountModel(null, 0.0, new Date());
  client = new ClientModel(0, this.personInfos, null, null);
  id: number = 0;
  isAddMode: boolean = false;
  loading = false;
  submitted = false;
  hasError = false;
  steps: number = 0.01;

  registerForm = new FormGroup({
    firstNameFormControl: new FormControl('', [Validators.required]),
    lastNameFormControl: new FormControl('', [Validators.required]),
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    streetFormControl: new FormControl('', [Validators.required]),
    cityFormControl: new FormControl('', [Validators.required]),
    zipCodeFormControl: new FormControl('', [Validators.required, Validators.pattern("(^$|[0-9]{1,5})")]),
    phoneNumberFormControl: new FormControl('', [Validators.required, Validators.pattern("(^$|[0-9]{10})")]),
  });

  accounts = this._formBuilder.group({
    currentAccount: false,
    savingAccount: false,
    currentAccountFormControl: new FormControl(0, [Validators.required, Validators.min(0), this.validateNumField.bind(this)]),
    savingAccountFormControl: new FormControl(0, [Validators.required, Validators.min(0), this.validateNumField.bind(this)])
  });

  matcher = new MyErrorStateMatcher();

  constructor(private _formBuilder: FormBuilder, private service: ClientService, private route: ActivatedRoute, private router: Router, private location: Location, private toastService: ToastService) {}
  
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if(!this.isAddMode) {
      this.service.getClientById(this.id).subscribe({
        next: (DBclient) => {
          this.client = DBclient;
          this.personInfos = DBclient.personInfos;
          this.client.currentAccount = DBclient.currentAccount;
          this.client.savingAccount = DBclient.savingAccount;
        },
        error: error => {
          this.addErrorToast("Impossible de récupérer les informations du client");
          console.log(error);
          this.hasError = true;
        }
      }
        );
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

  validateNumField(control: AbstractControl): { [key: string]: any } | null {
    let rem = control.value && this.countDecimals(Number.parseFloat(control.value)) > 2;
   //If the remainder is not 0 then user has entered an invalid value
    return rem ? { invalidDecimals: true } : null;
  }

  countDecimals(value: number) {
    let text = value.toString()

    // verify if number 0.000005 is represented as "5e-6"
    if (text.indexOf('e-') > -1) {
      let [base, trail] = text.split('e-');
      let deg = parseInt(trail, 10);
      return deg;
    }

    // count decimals for number in representation like "0.123456"
    if (Math.floor(value) !== value) {
      return value.toString().split(".")[1].length || 0;
    }

    return 0;
  }

  resetClient() {
    this.personInfos = new PersonInfos("", "", "", "", "", "", "");
    this.currentAccount = new CurrentAccountModel(null, 0.0, new Date());
    this.savingAccount = new SavingAccountModel(null, 0.0, new Date());
    this.client = new ClientModel(0, this.personInfos, null, null);
  }

  private createClient() {
    if(this.accounts.value.currentAccount) {
      this.client.currentAccount = this.currentAccount;
    }
    
    if(this.accounts.value.savingAccount) {
      this.client.savingAccount = this.savingAccount;
    }

    this.service.postClient(this.client)
      .subscribe({
        next: () => {
          this.addInfoToast(`Le client ${this.client.personInfos?.firstName} ${this.client.personInfos?.lastName} à été crée avec succès`);
          this.router.navigate(['/client-list']);
        },
        error: error => {
          this.addErrorToast("Erreur lors de la création du client");
          this.loading = false;
          this.hasError = true;
        }
      })
  }

  private updateClient() {
    if(this.client.currentAccount === null) {
      if(this.accounts.value.currentAccount) {
        this.client.currentAccount = this.currentAccount;
      }
    }
    
    if(this.client.savingAccount === null) {
      if(this.accounts.value.savingAccount) {
        this.client.savingAccount = this.savingAccount;
      }
    }

    this.service.putClient(this.client.id, this.client)
      .subscribe({
        next: () => {
          this.addInfoToast(`Le client ${this.client.personInfos?.firstName} ${this.client.personInfos?.lastName} à été mis à jour avec succès`);
          this.router.navigate(['/client-list'])
        },
        error: error => {
          this.addErrorToast(`Erreur lors de la mise à jour du client ${this.client.personInfos?.firstName} ${this.client.personInfos?.lastName}`);
          this.loading = false;
          this.hasError = true;
        }
      })
  }

  goBack() {
    this.location.back();
  }

  addInfoToast(message: string){
    this.toastService.success(message);
  }

  addErrorToast(message: string) {
    this.toastService.error(message);
  }
}
