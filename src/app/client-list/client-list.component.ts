import { Component, OnInit } from '@angular/core';
import { ClientModel } from '../models/client.model';
import { ClientService } from '../services/client.service';

// On pourra désormais supprimer cela quand ce sera OK pour Audrey
// const CLIENT_DATA: ClientModel[] = [
//   {
//     id: 1,
//     firstName: 'Audrey',
//     lastName: 'Boureau',
//     email: 'email',
//     address: {
//       street: 'rue blabla',
//       zipCode: '44000',
//       city: 'Nantes',
//     },
//     phoneNumber: '123',
//     currentAccount: {id: 11, balance: 1000, creationDate: new Date (Date.now())},
//     savingAccount: {id: 21, balance: 2000, creationDate: new Date (Date.now())},
//   },
//   {
//     id: 2,
//     firstName: 'Gwendal',
//     lastName: 'Breton',
//     email: 'email',
//     address: {
//       street: 'rue blabla',
//       zipCode: '44000',
//       city: 'Nantes',
//     },
//     phoneNumber: '123',
//     currentAccount: {id: 12, balance: 500, creationDate: new Date (Date.now())},
//     savingAccount: {id: 22, balance: 2500, creationDate: new Date (Date.now())},
//   },
//   {
//     id: 3,
//     firstName: 'Marine',
//     lastName: 'Spaak',
//     email: 'email',
//     address: {
//       street: 'rue blabla',
//       zipCode: '44000',
//       city: 'Nantes',
//     },
//     phoneNumber: '123',
//     currentAccount: {id: 13, balance: 3, creationDate: new Date (Date.now())},
//     savingAccount: {id: 23, balance: 1200, creationDate: new Date (Date.now())},
//   },
// ];

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
})

export class ClientListComponent implements OnInit {
  clients: ClientModel[] = [];

  // Transmission du service dans le constructeur
  constructor(private service: ClientService) {}

  handleClickOnShow(clientId: number) {
    console.log("Vous voulez voir la fiche du client : ", clientId)
  }

  handleClickOnEdit(clientId: number) {
    console.log("Vous voulez éditer le client : ", clientId)
  }

  handleClickOnTransfer(clientId: number) {
    console.log("Vous voulez accéder aux virements du client : ", clientId)
  }

  // Je définis ici les colonnes de ma liste, mais je donnerai le tableau à lister (clients) 
  // directement dans le HTML, après l'avoir récupéré depuis le server dans la méthode ngOnInit()
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'accountNumber',
    'accountBalance',
    'buttonShow',
    'buttonEdit',
    'buttonTransfer'
  ];

  //Récupération des clients depuis json-server (dans un premier temps, avant la mise en place du back-end)
  ngOnInit(): void {
    this.service.getClients()
    .subscribe((clientsFromJsonServer) => {
      this.clients = clientsFromJsonServer
    })
  }
}