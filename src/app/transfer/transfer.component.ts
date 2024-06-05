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
  creditAccounts: AccountModel[] = [];


  transferDtoRequest = new TransferDtoRequest("", "", 0,0,0);
  typeCreditAccount = "";
  typeDebitAccount = "";
  
  currentAccount = new CurrentAccountModel(null, 0.0, new Date());
  savingAccount = new SavingAccountModel(null, 0.0, new Date());
  personInfos = new PersonInfos("", "", "", "", "", "", "");
  debitClient= new ClientModel(0, this.personInfos, null, null);
  creditClient= new ClientModel(0, this.personInfos, null, null);
  selectedDebitAccount = new AccountModel(null, 0.0, new Date());
  selectedCreditAccount = new AccountModel(null, 0.0, new Date());

  // Comptes trouvés, à utiliser pour renvoyer le compte retrouvé avec type de compte et id client
  debitCurrentAccount = new CurrentAccountModel(null, 0.0, new Date());
  debitSavingAccount = new SavingAccountModel(null, 0.0, new Date());
  creditCurrentAccount = new CurrentAccountModel(null, 0.0, new Date());
  creditSavingAccount = new SavingAccountModel(null, 0.0, new Date());
  
  
  form = new FormGroup({
    idClientDebitFormControl: new FormControl('', [Validators.required]),
    idClientCreditFormControl: new FormControl('', [Validators.required]),
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
  findClientAccountsDebit(idClientDebit: number) {
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

  findClientAccountsCredit(idClientDebit: number) {
    console.log("this is the idClientCredit " + this.creditClient.currentAccount);
    
    this.clientService.getClientById(idClientDebit)
    .subscribe((client) => {
      this.creditClient = client
      this.creditCurrentAccount =  this.creditClient.currentAccount!
      this.creditSavingAccount = this.creditClient.savingAccount!
      this.creditAccounts = [this.creditCurrentAccount, this.creditSavingAccount]
    })
    console.log("this is the credit accounts ids " + this.creditAccounts.at(1)?.id);
    
  }
  
  // Options du type de compte 
  accountTypes: String[] = [
    "Compte Courant",
    "Compte Epargne"
  ]
  
  // Associe le type de compte à sa version String JSON, et sélectionne le bon compte
  findAccountDebit(accountType: String) {
    console.log( "type : "+ accountType);

    if (accountType == "Compte Courant"){
      this.typeDebitAccount= "currentAccount"
      console.log("type debit account dans findAccountDebit" + this.typeDebitAccount.at(1) );
      this.selectedDebitAccount = this.debitCurrentAccount  

    } else {
      this.typeDebitAccount= "savingAccount"
      console.log("type debit account dans findAccountDebit" + this.typeDebitAccount)
      this.selectedDebitAccount = this.debitSavingAccount

    }
    this.debitAccounts = [this.selectedDebitAccount];
  }

    findAccountCredit(accountType: String) {
      console.log( "type : "+ accountType);

      if (accountType == "Compte Courant"){
        this.typeCreditAccount= "currentAccount";
        this.selectedCreditAccount = this.creditCurrentAccount; 
        console.log("type credit account dans findAccountCredit" + this.typeCreditAccount);
        
      } else {
        this.typeCreditAccount= "savingAccount";
        this.selectedCreditAccount = this.creditSavingAccount;
        console.log("type credit account dans findAccountCredit" + this.typeCreditAccount);
      }
      this.creditAccounts = [this.selectedCreditAccount];
    }
  
  onSubmit(value: any) {
  
    console.log("type credit account "+this.typeCreditAccount);
    console.log("type debit account "+this.typeDebitAccount);

    
    this.transferDtoRequest = {
      typeCreditAccount: this.typeCreditAccount, 
      typeDebitAccount: this.typeDebitAccount, 
      idCreditAccount: value.idCreditAccountFormControl,
      idDebitAccount: value.idDebitAccountFormControl,
      amount: value.amountFormControl
    }
    
    console.log("Sending to the back : " + this.transferDtoRequest.amount);
    
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
