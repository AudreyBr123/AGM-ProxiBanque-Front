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

  constructor(private service: ClientService, public dialog: MatDialog, private toastService: ToastService) {}
  
  /**
   * Méthode appelée en étape 1, ce handler ouvre la modale de confirmation pour supprimer un client
   * @param clientId ID du client à supprimer
   */
  openDialog(clientId: number) : void {
    this.dialog.open(ConfirmDeleteModal, {
      data: {
        clientId: clientId,
        handleDelete: (clientId: number) => this.handleClickOnDelete(clientId)
      },
    });
  }

  /**
   * Méthode appelée en étape 2, lorsque l'utlisateur a confirmé qu'il voulait bien supprimer le client
   * @param clientId ID du client à supprimer
   */
  handleClickOnDelete(clientId: number) {
    // On va chercher le client grâce à l'id récupéré en URL et on le supprime
    this.service.deleteClientById(clientId).subscribe(() => {
      // Actualisation de la liste des clients
      this.service.getClients().subscribe(clientsFromServer => this.clients = clientsFromServer);
    })
    this.addInfoToast();
  }

  // Je définis ici les colonnes de ma liste, mais je donnerai le tableau à lister (clients) 
  // directement dans le HTML, après l'avoir récupéré depuis le server dans la méthode ngOnInit()
  displayedColumns: string[] = [
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

  /**
   * Au chargement du composant, récupération de la liste des clients côté back-end
   */
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