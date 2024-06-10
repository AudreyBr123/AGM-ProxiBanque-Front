import { Component, Inject, OnInit } from '@angular/core';
import { AccountModel } from '../models/account.model';
import { ClientService } from '../services/client.service';
import { Router } from '@angular/router';
import { ClientModel } from '../models/client.model';
import { CurrentAccountModel } from '../models/current-account.model';
import { SavingAccountModel } from '../models/saving-account.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonInfos } from '../models/person-infos';
import { TransferService } from '../services/transfer.service';
import { TransferDtoRequest } from '../models/transfer-dto-request.model';
import { Location } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css', '../../styles.css'],
})
export class TransferComponent implements OnInit {
  
  // Variables pour stocker les informations sur les clients
  clients: ClientModel[] = [];
  personInfos = new PersonInfos("", "", "", "", "", "", "");
  
  // Variables pour stocker les informations sur les comptes débiteurs
  debitClient= new ClientModel(0, this.personInfos, null, null);
  debitAccounts: AccountModel[] = [];
  typeDebitAccount = "";
  // Comptes trouvés, permet de renvoyer le compte trouvé avec l'id client et le compte selectionné
  debitCurrentAccount = new CurrentAccountModel(null, 0.0, new Date());
  debitSavingAccount = new SavingAccountModel(null, 0.0, new Date());
  selectedDebitAccount = new AccountModel(0, 0.0, new Date());
  
  // Variables pour stocker les informations sur les comptes créditeurs
  creditClient= new ClientModel(0, this.personInfos, null, null);
  creditAccounts: AccountModel[] = [];
  typeCreditAccount = "";
  selectedCreditAccount = new AccountModel(0, 0.0, new Date());
  creditCurrentAccount = new CurrentAccountModel(null, 0.0, new Date());
  creditSavingAccount = new SavingAccountModel(null, 0.0, new Date());

  resetAccount = new AccountModel(0, 0.0, new Date()); 
  
  // Variables pour stocker les informations à envoyer au back
  transferDtoRequest = new TransferDtoRequest("", "", 0,0,0); 
  
  // Variables pour le formulaire
  form: FormGroup;
  idClientDebitFormControl: FormControl; 
  idClientCreditFormControl: FormControl; 
  typeDebitAccountFormControl: FormControl;
  typeCreditAccountFormControl: FormControl;
  amountFormControl: FormControl;  
  
  // Options du type de compte 
  accountTypes: String[] = [
    "Compte Courant",
    "Compte Epargne"
  ]
  
  constructor(private clientService: ClientService, private transferService: TransferService , private router: Router, private location: Location,
    public dialog: MatDialog, formBuilder: FormBuilder, private toastService: ToastService) {

      // Le constructeur crée le formulaire et initialise les FormControls
      this.form = formBuilder.group({
        'idClientDebitFormControl': new FormControl('', [Validators.required]),
        'idClientCreditFormControl': new FormControl('', [Validators.required]),
        'typeDebitAccountFormControl': new FormControl('', [Validators.required]),
        'typeCreditAccountFormControl': new FormControl('', [Validators.required]),
        'amountFormControl': new FormControl('', [Validators.required, Validators.min(0)])
      });
      this.idClientDebitFormControl = this.form.controls['idClientDebitFormControl'] as FormControl;
      this.idClientCreditFormControl = this.form.controls['idClientCreditFormControl'] as FormControl;
      this.typeDebitAccountFormControl = this.form.controls['typeDebitAccountFormControl'] as FormControl;
      this.typeCreditAccountFormControl = this.form.controls['typeCreditAccountFormControl'] as FormControl;
      this.amountFormControl = this.form.controls['amountFormControl'] as FormControl;
    }
    
    // Initialisation : trouve les clients
    ngOnInit(): void {
      this.clientService.getClients()
      .subscribe((clientsFromJsonServer) => {
        this.clients = clientsFromJsonServer
      })
    }    
    
    // Trouve les comptes du client choisi
    findClientAccounts(idClient: number, source: string) { 
      // Si la méthode est lancée pour le compte débiteur, on actualise les variables liées au compte débiteur
      if(source == "debit"){             
        this.clientService.getClientById(idClient)
        .subscribe((client) => {          
          this.debitClient = client
          this.debitCurrentAccount =  this.debitClient.currentAccount!
          this.debitSavingAccount = this.debitClient.savingAccount!
          // Utilisé pour afficher les comptes dans le HTML
          this.debitAccounts = [this.debitCurrentAccount, this.debitSavingAccount]

          // Réinitialise les comptes pour enlever les valeurs précédentes en cas de changement de client
          this.selectedDebitAccount = this.resetAccount 
          this.form.get('typeDebitAccountFormControl')?.reset()
        })  

       // Sinon, la méthode est lancée pour le compte créditeur donc on actualise les variables liées au compte créditeur
      } else {
        this.clientService.getClientById(idClient)
        .subscribe((client) => {
          this.creditClient = client
          this.creditCurrentAccount =  this.creditClient.currentAccount!
          this.creditSavingAccount = this.creditClient.savingAccount!
          this.creditAccounts = [this.creditCurrentAccount, this.creditSavingAccount]
          this.selectedCreditAccount = this.resetAccount
          this.form.get('typeCreditAccountFormControl')?.reset()
        }) 
      }      
    }   
    
    
    // Associe le type de compte à sa version String JSON, et sélectionne le bon compte
    findAccount(accountType: String, source : string) {
      // Si la méthode est déclenchée pour le compte débiteur, on actualise les variables liées au débit
      if(source == "debit"){      
        if (accountType == "Compte Courant"){
          this.typeDebitAccount= "currentAccount"
          this.selectedDebitAccount = this.debitCurrentAccount          
        } else {
          this.typeDebitAccount= "savingAccount"
          this.selectedDebitAccount = this.debitSavingAccount        
        }
        this.debitAccounts = [this.selectedDebitAccount];
      }
      // Sinon, la méthode est déclenchée pour le compte créditeur : on actualise les variables liées au crédit
      else{
        if (accountType == "Compte Courant"){
          this.typeCreditAccount= "currentAccount";
          this.selectedCreditAccount = this.creditCurrentAccount; 
        } else {
          this.typeCreditAccount= "savingAccount";
          this.selectedCreditAccount = this.creditSavingAccount;
        }
        this.creditAccounts = [this.selectedCreditAccount];
      }
    }
    
    /**
     * Ouvre une modale pour valider le virement
     * @param value 
     */
    openDialog(value: any) : void { 
       this.dialog.open(ConfirmTransferModal, {      
        data: {
          typeCreditAccount: this.typeCreditAccount, 
          typeDebitAccount: this.typeDebitAccount, 
          idCreditAccount: this.selectedCreditAccount.id,
          idDebitAccount: this.selectedDebitAccount.id,
          amount: value.amountFormControl,
          handleSubmit: (value: any) => this.onSubmit(value)
        },
      });
    }
    
    /**
     * Transmission du virement au back-end
     * @param value 
     */
    onSubmit(value: any) {
      this.transferDtoRequest = {
        typeCreditAccount: this.typeCreditAccount, 
        typeDebitAccount: this.typeDebitAccount, 
        idCreditAccount: this.selectedCreditAccount.id,
        idDebitAccount: this.selectedDebitAccount.id,
        amount: value.amount
      }
            
      this.transferService.putTransfer(this.transferDtoRequest)
      .subscribe({
        next: () => {
          this.addInfoToast()
          this.router.navigate(['/client-list'])
        }
      })
      
    }
    
    addInfoToast(){
      this.toastService.success("Le virement a bien été effectué")
    }
    
    goBack() {
      this.location.back();
    }
    
  }
  
  
  // FIN DU COMPOSANT
  // DEBUT des modales (confirmation du virement)
  
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