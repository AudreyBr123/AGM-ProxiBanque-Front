import { Component, Inject, LOCALE_ID } from '@angular/core';
import { ClientModel } from '../models/client.model';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-client-show',
  templateUrl: './client-show.component.html',
  styleUrl: './client-show.component.css'
})

export class ClientShowComponent {
   client: ClientModel
  
  constructor(@Inject(LOCALE_ID) private locale: string){
    this.client = new ClientModel(    
      1,
      "Audrey",
      "Boureau",
      "email",
    { street: '5 rue blabla',
      zipCode: "44000",
      city: 'Nantes',
    }, 
    "123",
    {id: 11, balance: 1000, creationDate: new Date(formatDate(Date.now(), 'short' , this.locale))},
    {id: 21, balance: 2000, creationDate: new Date(formatDate(Date.now(), 'short', this.locale))}
  ) 
}
}

