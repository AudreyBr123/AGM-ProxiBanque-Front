import { Component, OnInit } from '@angular/core';
import { ClientModel } from '../models/client.model';
import { ClientService } from '../services/client.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-show',
  templateUrl: './client-show.component.html',
  styleUrl: './client-show.component.css',
})
export class ClientShowComponent implements OnInit {
  id = this.activatedRoute.snapshot.params['id'];
  client: ClientModel;

  constructor(private service: ClientService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.client = new ClientModel(
      1,
      'Audrey',
      'Boureau',
      'email',
      { street: '5 rue blabla', zipCode: '44000', city: 'Nantes' },
      '123'
    );
  }

  ngOnInit(): void {
    // On va chercher le client grâce à l'id récupéré en URL
    this.service.getClientById(this.id).subscribe((clientFromJsonServer) => {
      this.client = clientFromJsonServer;
    });
  }
}
