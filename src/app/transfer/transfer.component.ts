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
  
  
  clients: ClientModel[] = [];
  currentAccounts: CurrentAccountModel[] = [];
  savingAccounts: SavingAccountModel[] = [];
  
  transferDtoRequest = new TransferDtoRequest("", "", 0,0,0);
  typeCreditAccount = "currentAccount";
  typeDebitAccount = "currentAccount";


  currentAccount = new CurrentAccountModel(null, 0.0, new Date());
  savingAccount = new SavingAccountModel(null, 0.0, new Date());
  personInfos = new PersonInfos("", "", "", "", "", "", "");
  debitClient= new ClientModel(0, this.personInfos, null, null);
  creditClient= new ClientModel(0, this.personInfos, null, null);
  
  
  form = new FormGroup({
    idClientDebitFormControl: new FormControl('', [Validators.required]),
    idClientCreditFormControl: new FormControl('', [Validators.required]),
    typeDebitAccountFormControl: new FormControl('', [Validators.required]),
    typeCreditAccountFormControl: new FormControl('', [Validators.required]),
    idDebitAccountFormControl: new FormControl('', [Validators.required]),
    amountFormControl: new FormControl('', [Validators.required]),
  });
  
  constructor(private clientService: ClientService, private transferService: TransferService , private router: Router) {}
  
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
  
  accountTypes: String[] = [
    "Compte Courant",
    "Compte Epargne"
  ]
  
  findAccount(idClientDebit: number) {
    this.clientService.getClientById(idClientDebit)
    .subscribe((client) => {
      this.debitClient = client
    })
    // return this.debitClient.currentAccount;
  }
  
  
  // this.form.value.idDebitAccountFormControl = this.debitClient.currentAccount?.id;
  
  onSubmit() {
    this.transferDtoRequest = {
      typeCreditAccount: this.typeCreditAccount, 
      typeDebitAccount: this.typeDebitAccount, 
      idCreditAccount: 1,
      idDebitAccount: 2,
      amount: -1000.0
    }

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
