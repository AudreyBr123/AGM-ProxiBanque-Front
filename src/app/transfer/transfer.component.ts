import { Component, Inject, OnInit } from '@angular/core';
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
import { Location } from '@angular/common';
import { ConfirmDeleteModal } from '../client-list/client-list.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent implements OnInit {
  
  clients: ClientModel[] = [];
  personInfos = new PersonInfos("", "", "", "", "", "", "");
  
  debitClient= new ClientModel(0, this.personInfos, null, null);
  debitAccounts: AccountModel[] = [];
  typeDebitAccount = "";
  // Comptes trouvés, utilisé pour renvoyer le compte trouvé avec l'id client et le compte selectionné
  debitCurrentAccount = new CurrentAccountModel(null, 0.0, new Date());
  debitSavingAccount = new SavingAccountModel(null, 0.0, new Date());
  selectedDebitAccount = new AccountModel(0, 0.0, new Date());
  
  
  creditClient= new ClientModel(0, this.personInfos, null, null);
  creditAccounts: AccountModel[] = [];
  typeCreditAccount = "";
  selectedCreditAccount = new AccountModel(0, 0.0, new Date());
  creditCurrentAccount = new CurrentAccountModel(null, 0.0, new Date());
  creditSavingAccount = new SavingAccountModel(null, 0.0, new Date());
  
  transferDtoRequest = new TransferDtoRequest("", "", 0,0,0);
  
  
  form = new FormGroup({
    idClientDebitFormControl: new FormControl('', [Validators.required]),
    idClientCreditFormControl: new FormControl('', [Validators.required]),
    typeDebitAccountFormControl: new FormControl('', [Validators.required]),
    typeCreditAccountFormControl: new FormControl('', [Validators.required]),
    amountFormControl: new FormControl('', [Validators.required]),
  });
  
  constructor(private clientService: ClientService, private transferService: TransferService , private router: Router, private location: Location, public dialog: MatDialog) {}
  
  // Initialisation : trouve les clients et les différent comptes
  ngOnInit(): void {
    this.clientService.getClients()
    .subscribe((clientsFromJsonServer) => {
      this.clients = clientsFromJsonServer
    })
  }  
  
  
  // Trouve les comptes du client choisi
  findClientAccountsDebit(idClientDebit: number) {    


    this.clientService.getClientById(idClientDebit)
    .subscribe((client) => {
      this.debitClient = client
      this.debitCurrentAccount =  this.debitClient.currentAccount!
      this.debitSavingAccount = this.debitClient.savingAccount!
      // Utilisé pour afficher les comptes dans le HTML
      this.debitAccounts = [this.debitCurrentAccount, this.debitSavingAccount]
    })    
  }
  
  findClientAccountsCredit(idClientDebit: number) {  
    this.clientService.getClientById(idClientDebit)
    .subscribe((client) => {
      this.creditClient = client
      this.creditCurrentAccount =  this.creditClient.currentAccount!
      this.creditSavingAccount = this.creditClient.savingAccount!
      // Utilisé pour afficher les comptes dans le HTML
      this.creditAccounts = [this.creditCurrentAccount, this.creditSavingAccount]
    })   
  }
  
  // Options du type de compte 
  accountTypes: String[] = [
    "Compte Courant",
    "Compte Epargne"
  ]
  
  // Associe le type de compte à sa version String JSON, et sélectionne le bon compte
  findAccountDebit(accountType: String, source : string) {
    console.log( "type : "+ accountType);
   console.log("evenement : " + source );
    
    if (accountType == "Compte Courant"){
      this.typeDebitAccount= "currentAccount"
      console.log("type debit account dans findAccountDebit " + this.typeDebitAccount);
      this.selectedDebitAccount = this.debitCurrentAccount  
      
    } else {
      this.typeDebitAccount= "savingAccount"
      console.log("type debit account dans findAccountDebit " + this.typeDebitAccount)
      this.selectedDebitAccount = this.debitSavingAccount
      
    }
    this.debitAccounts = [this.selectedDebitAccount];
  }
  
  findAccountCredit(accountType: String) {
    console.log( "type : "+ accountType);
    
    if (accountType == "Compte Courant"){
      this.typeCreditAccount= "currentAccount";
      this.selectedCreditAccount = this.creditCurrentAccount; 
      console.log("type credit account dans findAccountCredit " + this.typeCreditAccount);
      
    } else {
      this.typeCreditAccount= "savingAccount";
      this.selectedCreditAccount = this.creditSavingAccount;
      console.log("type credit account dans findAccountCredit " + this.typeCreditAccount);
    }
    this.creditAccounts = [this.selectedCreditAccount];
  }
  
  openDialog(value: any) : void { 
    console.log("montant : " + value.amountFormControl);
    console.log("idDebitAccount : " + this.selectedDebitAccount.id);
    console.log("idCreditAccount : " + this.selectedCreditAccount.id);
    
    this.dialog.open(ConfirmTransferModal, {      
      data: {
        // typeCreditAccount: this.typeCreditAccount, 
        // typeDebitAccount: this.typeDebitAccount, 
        idCreditAccount: this.selectedCreditAccount.id,
        idDebitAccount: this.selectedDebitAccount.id,
        amount: value.amountFormControl,
        handleSubmit: (value: any) => this.onSubmit(value)
      },
    });
  }
  
  onSubmit(value: any) {
    this.transferDtoRequest = {
      typeCreditAccount: this.typeCreditAccount, 
      typeDebitAccount: this.typeDebitAccount, 
      idCreditAccount: this.selectedCreditAccount.id,
      idDebitAccount: this.selectedDebitAccount.id,
      amount: value.amount
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
  
  goBack() {
    this.location.back();
  }
  
}


// FIN DU COMPOSANT client-list
// DEBUT des modales (confirmation de la du virement)

export interface DialogData {
  typeCreditAccount: string, 
  typeDebitAccount: string, 
  idCreditAccount: number | null,
  idDebitAccount: number | null,
  amount: number
  handleSubmit: (value: any) => void
}

@Component({
  selector: 'confirm-transfer-modal',
  templateUrl: 'confirm-transfer-modal.html',
  styleUrls: ['../../styles.css'],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})

export class ConfirmTransferModal {
  
  constructor(
    public dialogRef: MatDialogRef<ConfirmTransferModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onConfirmClick(value: any): void {
    this.data.handleSubmit(value);
    this.dialogRef.close();
  }
}