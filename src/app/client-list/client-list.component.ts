import { Component, Inject, OnInit } from '@angular/core';
import { ClientModel } from '../models/client.model';
import { ClientService } from '../services/client.service';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css', '../../styles.css'],
})

export class ClientListComponent implements OnInit {
  clients: ClientModel[] = [];

  // Transmission du service dans le constructeur
  constructor(private service: ClientService, public dialog: MatDialog, private toastService: ToastService) {}

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
    // On va chercher le client grâce à l'id récupéré en URL et on le supprime
    this.service.deleteClientById(clientId).subscribe(() => {
      // NOTE est-ce que c'est la meilleure façon de rafraichir après avoir supprimé un client ?
      this.service.getClients().subscribe(clientsFromServer => this.clients = clientsFromServer);
    })

    this.addInfoToast();
  }

  openDialog(clientId: number) : void {
    this.dialog.open(ConfirmDeleteModal, {
      data: {
        clientId: clientId,
        handleDelete: (clientId: number) => this.handleClickOnDelete(clientId)
      },
    });
  }


  // Je définis ici les colonnes de ma liste, mais je donnerai le tableau à lister (clients) 
  // directement dans le HTML, après l'avoir récupéré depuis le server dans la méthode ngOnInit()
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'currentAccountNumber',
    'currentAccountBalance',
    'savingAccountNumber',
    'savingAccountBalance',
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

  addInfoToast(){
    this.toastService.success("Le client est supprimé")
  }
}

// FIN DU COMPOSANT client-list
// DEBUT des modales (confirmation de la suppression d'un client)

export interface DialogData {
  clientId: number;
  handleDelete: (clientId: number) => void;
}

@Component({
  selector: 'confirm-delete-modal',
  templateUrl: 'confirm-delete-modal.html',
  styleUrls: ['../../styles.css'],
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})

export class ConfirmDeleteModal {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(clientId: number): void {
    this.data.handleDelete(clientId);
    this.dialogRef.close();
  }
}