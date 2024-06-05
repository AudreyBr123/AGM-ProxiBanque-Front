import { Component, OnInit } from '@angular/core';
import { AccountModel } from '../models/account.model';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';
import { ClientModel } from '../models/client.model';
import { CurrentAccountModel } from '../models/current-account.model';
import { SavingAccountModel } from '../models/saving-account.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonInfos } from '../models/person-infos';
import { TransferService } from '../services/transfer.service';
import { TransferDtoRequest } from '../models/transfer-dto-request.model';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent implements OnInit {
  
  //tri à faire dans les variables
  clients: ClientModel[] = [];
  currentAccounts: CurrentAccountModel[] = [];
  savingAccounts: SavingAccountModel[] = [];
  debitAccounts: AccountModel[] = [];

  transferDtoRequest = new TransferDtoRequest("", "", 0,0,0);
  typeCreditAccount = "currentAccount";
  typeDebitAccount = "currentAccount";
  
  currentAccount = new CurrentAccountModel(null, 0.0, new Date());
  savingAccount = new SavingAccountModel(null, 0.0, new Date());
  personInfos = new PersonInfos("", "", "", "", "", "", "");
  debitClient= new ClientModel(0, this.personInfos, null, null);
  creditClient= new ClientModel(0, this.personInfos, null, null);
  selectedAccount = new AccountModel(null, 0.0, new Date());
  
  // Comptes trouvés, à utiliser pour renvoyer le compte retrouvé avec type de compte et id client
  debitCurrentAccount = new CurrentAccountModel(null, 0.0, new Date());
  debitSavingAccount = new SavingAccountModel(null, 0.0, new Date());
  creditCurrentAccount = new CurrentAccountModel(null, 0.0, new Date());
  creditSavingAccount = new SavingAccountModel(null, 0.0, new Date());
  
  
  form = new FormGroup({
    idClientDebitFormControl: new FormControl('', [Validators.required]),
    idClientCreditFormControl: new FormControl('', [Validators.required]),
    typeDebitAccountFormControl: new FormControl('', [Validators.required]),
    typeCreditAccountFormControl: new FormControl('', [Validators.required]),
    idDebitAccountFormControl: new FormControl('', [Validators.required]),
    idCreditAccountFormControl: new FormControl('', [Validators.required]),
    amountFormControl: new FormControl('', [Validators.required]),
  });
  
  constructor(private clientService: ClientService, private transferService: TransferService , private router: Router) {}
  
  // Initialisation : trouve les clients et les différent comptes
  ngOnInit(): void {
    this.clientService.getClients()
    .subscribe((clientsFromJsonServer) => {
      this.clients = clientsFromJsonServer
    })
    
    this.transferService.getCurrentAccounts()
    .subscribe((acc) => {
      this.currentAccounts = acc;
    })  
    
    this.transferService.getSavingAccounts()
    .subscribe((acc) => {
      this.savingAccounts = acc;
    }) 
  }  
  
  
  // Trouve les comptes du client choisi
  findClientAccounts(idClientDebit: number) {
    console.log("this is the idClientDebit " + this.debitClient.currentAccount);
    
    this.clientService.getClientById(idClientDebit)
    .subscribe((client) => {
      this.debitClient = client
      this.debitCurrentAccount =  this.debitClient.currentAccount!
      this.debitSavingAccount = this.debitClient.savingAccount!
      this.debitAccounts = [this.debitCurrentAccount, this.debitSavingAccount]
    })
    console.log("this is the debit accounts ids " + this.debitAccounts.at(1)?.id);
    
  }
  
  // Options du type de compte 
  accountTypes: String[] = [
    "Compte Courant",
    "Compte Epargne"
  ]
  
  // Associe le type de compte à sa version String JSON, et sélectionne le bon compte
  findAccount(accountType: String) {
    if (accountType == "Compte Courant"){
      this.typeDebitAccount= "currentAccount"
      this.selectedAccount = this.debitCurrentAccount  
    } else {
      this.typeDebitAccount= "savingAccount"
      this.selectedAccount = this.debitSavingAccount  
    }
    this.debitAccounts = [this.selectedAccount];
    console.log(this.debitAccounts);
  }
  
  onSubmit(value: any) {
    if (value.typeCreditAccountFormControl == "Compte Courant") {
      this.typeCreditAccount= "currentAccount"
    } else {
      this.typeCreditAccount= "savingAccount"
    }
    
    if (value.typeDebitAccountFormControl == "Compte Courant") {
      this.typeDebitAccount= "currentAccount"
    } else {
      this.typeDebitAccount= "savingAccount"
    }
    
    this.transferDtoRequest = {
      typeCreditAccount: this.typeCreditAccount, 
      typeDebitAccount: this.typeDebitAccount, 
      idCreditAccount: value.idCreditAccountFormControl,
      idDebitAccount: value.idDebitAccountFormControl,
      amount: value.amountFormControl
    }
    
    console.log("Sending to the back : " + this.transferDtoRequest.amount + this.transferDtoRequest.idDebitAccount);
    
    this.transferService.putTransfer(this.transferDtoRequest)
    .subscribe({
      next: () => {
        this.router.navigate(['/client-list'])
      },
      error: error => {
        console.log("Error during transfer");
      }
    })
  }
  
  
  // this.service.getClientById(this.id).subscribe((DBclient) => {
  //   this.client = DBclient;
  //   this.personInfos = DBclient.personInfos;
  //   this.client.currentAccount = DBclient.currentAccount;
  //   this.client.savingAccount = DBclient.savingAccount;
  // });
  
  
}
