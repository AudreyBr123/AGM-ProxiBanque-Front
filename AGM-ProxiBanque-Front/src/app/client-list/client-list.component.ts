import { Component } from '@angular/core';
import { ClientModel } from '../models/client.model';

const CLIENT_DATA: ClientModel[] = [
  {
    id: 1,
    firstName: 'Audrey',
    lastName: 'Boureau',
    email: 'email',
    address: {
      street: '5 rue blabla',
      zipCode: "44000",
      city: 'Nantes',
    },
    phoneNumber: "123",
  },
  {
    id: 2,
    firstName: 'Audrey',
    lastName: 'Boureau',
    email: 'email',
    address: {
      street: '5 rue blabla',
      zipCode: "44000",
      city: 'Nantes',
    },
    phoneNumber: "123",
  },
  {
    id: 3,
    firstName: 'Audrey',
    lastName: 'Boureau',
    email: 'email',
    address: {
      street: '5 rue blabla',
      zipCode: "44000",
      city: 'Nantes',
    },
    phoneNumber: "123",
  },
];

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
})
export class ClientListComponent {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'address',
    'phoneNumber',
  ];
  dataSource = CLIENT_DATA;
}
