import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { ClientModel } from '../models/client.model';
import { ClientService } from '../services/client.service';
import {formatDate} from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { PersonInfos } from '../models/person-infos';

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
      new PersonInfos('Audrey', 'Boureau', 'email', '123', '5 rue blabla', '44000', 'Nantes'),
      {id: 11, balance: 1000, creationDate: new Date(formatDate(Date.now(), 'short' , this.locale))},
    )
  }

  ngOnInit(): void {
    // On va chercher le client grâce à l'id récupéré en URL
    this.service.getClientById(this.id).subscribe((clientFromDB) => {
      if (clientFromDB === null){
        this.router.navigate(['/client-list'])
        throw new ErrorEvent('Ce client n\'existe pas, veuillez en choisir un nouveau')
      }
      this.client = clientFromDB;
    });
  }
}
