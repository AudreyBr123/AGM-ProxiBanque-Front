import { Component } from '@angular/core';
import { AccountModel } from '../models/account.model';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent {
  accounts: AccountModel[] = [
    {
      id: 1,
      balance: 500,
      creationDate: new Date(Date.now())
    },
    {
      id: 2,
      balance: 1000,
      creationDate: new Date(Date.now())
    },
    {
      id: 3,
      balance: 766300,
      creationDate: new Date(Date.now())
    }
  ]

  accountTypes: String[] = [
    "Compte Courant",
    "Compte Epargne"
  ]
}
