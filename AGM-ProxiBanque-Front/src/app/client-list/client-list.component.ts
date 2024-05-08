import { Component } from '@angular/core';
import { ClientModel } from '../models/client.model';

const CLIENT_DATA: ClientModel[] = [
  {
    id: 1,
    firstName: 'Audrey',
    lastName: 'Boureau',
    email: 'email',
    address: {
      street: 'rue blabla',
      streetNumber: 5,
      zipCode: 44000,
      city: 'Nantes',
    },
    phoneNumber: 123,
    currentAccount: {accountNumber: 11, balance: 1000, creationDate: Date.now()},
    savingAccount: {accountNumber: 21, balance: 2000, creationDate: Date.now()},
  },
  {
    id: 2,
    firstName: 'Gwendal',
    lastName: 'Breton',
    email: 'email',
    address: {
      street: 'rue blabla',
      streetNumber: 5,
      zipCode: 44000,
      city: 'Nantes',
    },
    phoneNumber: 123,
    currentAccount: {accountNumber: 12, balance: 500, creationDate: Date.now()},
    savingAccount: {accountNumber: 22, balance: 2500, creationDate: Date.now()},
  },
  {
    id: 3,
    firstName: 'Marine',
    lastName: 'Spaak',
    email: 'email',
    address: {
      street: 'rue blabla',
      streetNumber: 5,
      zipCode: 44000,
      city: 'Nantes',
    },
    phoneNumber: 123,
    currentAccount: {accountNumber: 13, balance: 3, creationDate: Date.now()},
    savingAccount: {accountNumber: 23, balance: 1200, creationDate: Date.now()},
  },
];

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
})

export class ClientListComponent {
  handleClickOnShow(clientId: number) {
    console.log("Vous voulez voir la fiche du client : ", clientId)
  }

  handleClickOnEdit(clientId: number) {
    console.log("Vous voulez éditer le client : ", clientId)
  }

  handleClickOnTransfer(clientId: number) {
    console.log("Vous voulez accéder aux virements du client : ", clientId)
  }

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'currentAccountNumber',
    'currentAccountBalance',
    'savingAccountNumber',
    'savingAccountBalance',
    'buttonShow',
    'buttonEdit',
    'buttonTransfer'
  ];
  dataSource = CLIENT_DATA;
}
