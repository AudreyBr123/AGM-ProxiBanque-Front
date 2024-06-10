import { Component, OnInit } from '@angular/core';
import { AdvisorService } from '../services/advisor.service';
import { ClientModel } from '../models/client.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-advisor-client-list',
  templateUrl: './advisor-client-list.component.html',
  styleUrls: ['./advisor-client-list.component.css', '../../styles.css'],
})

export class AdvisorClientListComponent implements OnInit {

  // Ceci permet de récupérer l'ID de l'advisor dans l'URL
  id = this.activatedRoute.snapshot.params['id'];

  clients : ClientModel[] = [];
  hasError = false;

  constructor(private service: AdvisorService, private activatedRoute: ActivatedRoute, private location: Location) {}

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'currentAccountNumber',
    'currentAccountBalance',
    'savingAccountNumber',
    'savingAccountBalance',
  ];

  ngOnInit(): void {
    // Au chargement du composant, on récupère la liste des clients suivis par ce conseiller
    this.service.getClientListByAdvisorId(this.id).subscribe({
      next: (clients) => {
        this.clients = clients;      
      },
      error: error => {
        console.log(error);
        this.hasError = true;
      }
    });
  }

  goBack() {
    this.location.back();
  }

}
