import { Component } from '@angular/core';
import { ClientModel } from '../models/client.model';

@Component({
  selector: 'app-client-show',
  templateUrl: './client-show.component.html',
  styleUrl: './client-show.component.css'
})
export class ClientShowComponent {
  
  client: ClientModel
  
  constructor(){
    this.client = new ClientModel(
      1,
      "Audrey",
      "Boureau",
      "email",
    { street: '5 rue blabla',
      zipCode: "44000",
      city: 'Nantes',
    }, 
    "123"
  )
}
}
