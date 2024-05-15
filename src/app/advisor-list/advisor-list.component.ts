import { Component, OnInit } from '@angular/core';
import { AdvisorModel } from '../models/advisor.model';
import { AdvisorService } from '../services/advisor.service';

@Component({
  selector: 'app-advisor-list',
  templateUrl: './advisor-list.component.html',
  styleUrl: './advisor-list.component.css',
})
export class AdvisorListComponent implements OnInit {
  advisors: AdvisorModel[] = [];

  constructor(private service: AdvisorService) {}

  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'numberOfClients',
  ];

  ngOnInit(): void {
    this.service.getClients().subscribe((advisorsFromJsonServer) => {
      this.advisors = advisorsFromJsonServer;
    });
  }
}
