import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientModel } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient : HttpClient) {} //Attention à l'ajouter aussi dans app.modules.ts

  getClients() {
    return this.httpClient.get<ClientModel[]>('http://localhost:3000/clients')
  }

  getClientById(clientId: number) {
    return this.httpClient.get<ClientModel>('http://localhost:3000/clients/' + clientId)
  }

  // EXEMPLE BASIQUE pour méthode postClient avec uniquement un attribut "firstName"
  // A reprendre et compléter pour l'adapter au formulaire
  
  // postClient(firstName: string) {
  //   return this.httpClient.post<ClientModel>('http://localhost:3000/clients', { firstName: firstName })
  //   .subscribe(data => {
  //      firstName = data.firstName }
  //   )
  // }
}
