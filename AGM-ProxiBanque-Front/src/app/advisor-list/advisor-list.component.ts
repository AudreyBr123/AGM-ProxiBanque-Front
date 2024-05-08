import { Component } from '@angular/core';
import { AdvisorModel } from '../models/advisor.model';

const ADVISOR_DATA: AdvisorModel[] = [
  {
    id: 1,
    firstName: 'Yann',
    lastName: 'Creach',
    email: 'email',
    address: {
      street: 'rue blabla',
      streetNumber: 5,
      zipCode: 44000,
      city: 'Nantes',
    },
    phoneNumber: 123,
  },
  {
    id: 2,
    firstName: 'Alain',
    lastName: 'Flageollet',
    email: 'email',
    address: {
      street: 'rue blabla',
      streetNumber: 5,
      zipCode: 44000,
      city: 'Nantes',
    },
    phoneNumber: 123,
  }
];

@Component({
  selector: 'app-advisor-list',
  templateUrl: './advisor-list.component.html',
  styleUrl: './advisor-list.component.css'
})
export class AdvisorListComponent {
  
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'numberOfClients'
  ];
  dataSource = ADVISOR_DATA;
}
