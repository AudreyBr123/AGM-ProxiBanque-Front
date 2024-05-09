import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { ClientModel } from '../models/client.model';
import { ClientService } from '../services/client.service';
import {formatDate} from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-show',
  templateUrl: './client-show.component.html',
  styleUrl: './client-show.component.css',
})

export class ClientShowComponent implements OnInit {
  id = this.activatedRoute.snapshot.params['id'];
  client: ClientModel;

  constructor(@Inject(LOCALE_ID) private locale: string, private service: ClientService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.client = new ClientModel(
      1,
      'Audrey',
      'Boureau',
      'email',
      { street: '5 rue blabla', zipCode: '44000', city: 'Nantes' },
      '123',
      {id: 11, balance: 1000, creationDate: new Date(formatDate(Date.now(), 'short' , this.locale))},
      {id: 21, balance: 2000, creationDate: new Date(formatDate(Date.now(), 'short', this.locale))}
    )
  }

  ngOnInit(): void {
    // On va chercher le client grâce à l'id récupéré en URL
    this.service.getClientById(this.id).subscribe((clientFromJsonServer) => {
      this.client = clientFromJsonServer;
    });
  }
}
