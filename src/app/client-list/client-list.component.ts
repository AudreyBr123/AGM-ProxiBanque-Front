import { Component, OnInit } from '@angular/core';
import { ClientModel } from '../models/client.model';
import { ClientService } from '../services/client.service';

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

  handleClickOnDelete(clientId: number) {
    console.log("Vous voulez supprimer le client : ", clientId)
        
    // On va chercher le client grâce à l'id récupéré en URL et on le supprime
    this.service.deleteClientById(clientId).subscribe(() => {
      alert('Le client ' + clientId + ' a bien été supprimé.');

      // NOTE est-ce que c'est la meilleure façon de rafraichir après avoir supprimé un client ?
      this.service.getClients().subscribe(clientsFromServer => this.clients = clientsFromServer);
    })
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
    'buttonDelete',
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