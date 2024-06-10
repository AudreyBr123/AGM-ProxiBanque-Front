import { Component, OnInit } from '@angular/core';
import { AdvisorModel } from '../models/advisor.model';
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
handleClickOnShow(arg0: any) {
throw new Error('Method not implemented.');
}
  id = this.activatedRoute.snapshot.params['id'];
  clients : ClientModel[] = [];

  constructor(private service: AdvisorService, private activatedRoute: ActivatedRoute, private location: Location) {}

  displayedColumns: string[] = [
    'firstName',
    'lastName'
  ];

  ngOnInit(): void {
    this.service.getClientListByAdvisorId(this.id).subscribe((clients) => {
      this.clients = clients;      
    });
  }

  goBack() {
    this.location.back();
  }

}
