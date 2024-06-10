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

/** Définit quand le (mauvais) remplissage du formulaire doit générer une erreur */
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
  // Données du client
  personInfos = new PersonInfos("", "", "", "", "", "", "");
  currentAccount = new CurrentAccountModel(null, 0.0, new Date());
  savingAccount = new SavingAccountModel(null, 0.0, new Date());
  client = new ClientModel(0, this.personInfos, null, null);

  // id du client
  id: number = 0;
  // ajout/modification client
  isAddMode: boolean = false;

  loading = false;
  submitted = false;
  hasError = false;

  // nombre de décimales des comptes
  steps: number = 0.01;

  // Formulaire contenant les informations du client
  registerForm = new FormGroup({
    firstNameFormControl: new FormControl('', [Validators.required]),
    lastNameFormControl: new FormControl('', [Validators.required]),
    emailFormControl: new FormControl('', [Validators.required, Validators.email]),
    streetFormControl: new FormControl('', [Validators.required]),
    cityFormControl: new FormControl('', [Validators.required]),
    zipCodeFormControl: new FormControl('', [Validators.required, Validators.pattern("(^$|[0-9]{1,5})")]),
    phoneNumberFormControl: new FormControl('', [Validators.required, Validators.pattern("(^$|[0-9]{10})")]),
  });

  // Formulaire des comptes
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

    // Récupère les données du client
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


  /**
   * Validateur custom pour vérifier qu'un nombre a 2 décimales
   * @param control - le champ sur lequel appliqué le validateur
   * @returns - null ou une erreur de la forme { nomErreur: true }
   */
  validateNumField(control: AbstractControl): { [key: string]: any } | null {
    let rem = control.value && this.countDecimals(Number.parseFloat(control.value)) > 2;
    return rem ? { invalidDecimals: true } : null;
  }

  /**
   * Compte le nombre de décimales de la variable value
   * @param {number} value - le nombre dont on veut compter les décimales
   * @returns - le nombre de décimales
   */
  countDecimals(value: number) {
    let text = value.toString()

    // vérifie sie le nombre 0.000005 est représenté comme "5e-6"
    if (text.indexOf('e-') > -1) {
      let [base, trail] = text.split('e-');
      let deg = parseInt(trail, 10);
      return deg;
    }

    // compte les décimales pour le nombre formaté comme "0.123456"
    if (Math.floor(value) !== value) {
      return value.toString().split(".")[1].length || 0;
    }

    return 0;
  }

  /**
   * Reset les inputs du client
   */
  resetClient() {
    this.personInfos = new PersonInfos("", "", "", "", "", "", "");
    this.currentAccount = new CurrentAccountModel(null, 0.0, new Date());
    this.savingAccount = new SavingAccountModel(null, 0.0, new Date());
    this.client = new ClientModel(0, this.personInfos, null, null);
  }

  /**
   * Créer un nouveau client, puis redirige vers la liste des clients
   */
  private createClient() {
    // Assigne les infos du compte courant au client
    if(this.accounts.value.currentAccount) {
      this.client.currentAccount = this.currentAccount;
    }
    
    // Assigne les infos du compte épargne au client
    if(this.accounts.value.savingAccount) {
      this.client.savingAccount = this.savingAccount;
    }

    // crée le client
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

  /**
   * Met à jour le client, puis redirige vers la liste des clients
   */
  private updateClient() {
    // Si le compte n'existait pas et qu'on à décider de le créer, assigne les infos du compte courant au client
    if(this.client.currentAccount === null) {
      if(this.accounts.value.currentAccount) {
        this.client.currentAccount = this.currentAccount;
      }
    }
    
    // Si le compte n'existait pas et qu'on à décider de le créer, assigne les infos du compte épargne au client
    if(this.client.savingAccount === null) {
      if(this.accounts.value.savingAccount) {
        this.client.savingAccount = this.savingAccount;
      }
    }

    // met a jour le client
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

  /**
   * Retour arrière
   */
  goBack() {
    this.location.back();
  }

  /**
   * raccourci pour créer un toast de succès
   * @param message - message du toast
   */
  addInfoToast(message: string){
    this.toastService.success(message);
  }

  /**
   * raccourci pour créer un toast d'échec
   * @param message - message du toast
   */
  addErrorToast(message: string) {
    this.toastService.error(message);
  }
}
