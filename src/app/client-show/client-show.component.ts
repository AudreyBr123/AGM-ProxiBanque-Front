import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { ClientModel } from '../models/client.model';
import { ClientService } from '../services/client.service';
import {Location, formatDate} from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { PersonInfos } from '../models/person-infos';

@Component({
  selector: 'app-client-show',
  templateUrl: './client-show.component.html',
  styleUrls: ['./client-show.component.css', '../../styles.css'],
})

export class ClientShowComponent implements OnInit {
  id = this.activatedRoute.snapshot.params['id'];
  client: ClientModel;
  
  constructor(@Inject(LOCALE_ID) private locale: string, private service: ClientService, private activatedRoute: ActivatedRoute, private router: Router, private location: Location) {
    this.client = new ClientModel(
      0,
      new PersonInfos('Prénom', 'Nom', 'Email', '0101010101', 'rue', '11000', 'Ville'),
      { id: 0, balance: 10000, creationDate: new Date(formatDate(Date.now(), 'short' , this.locale))},
      { id: 0, balance: 10000, creationDate: new Date(formatDate(Date.now(), 'short', this.locale))}
    )
  }
  
  ngOnInit(): void {
    // On va chercher le client grâce à l'id récupéré en URL
    this.service.getClientById(this.id).subscribe((clientFromDB) => {
      console.log("Passe par client-show-component - getclientbyid");
      this.client = clientFromDB;
    });
  }
  
  goBack() {
    this.location.back();
  }
}
