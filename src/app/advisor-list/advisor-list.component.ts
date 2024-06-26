import { Component, OnInit } from '@angular/core';
import { AdvisorModel } from '../models/advisor.model';
import { AdvisorService } from '../services/advisor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advisor-list',
  templateUrl: './advisor-list.component.html',
  styleUrls: ['./advisor-list.component.css', '../../styles.css'],
})

export class AdvisorListComponent implements OnInit {

  advisors: AdvisorModel[] = [];
  constructor(private service: AdvisorService, private router: Router) {}

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'numberOfClients',
    'buttonShow'
  ];

  /**
   *   Au chargement du composant, on récupère la liste des conseillers depuis le back-end
   */
  ngOnInit(): void {
    this.service.getAdvisors().subscribe((advisorsFromBack) => {
      this.advisors = advisorsFromBack;
      console.log(advisorsFromBack.at(1));
    });
  }
}
