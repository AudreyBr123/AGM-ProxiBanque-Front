import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientModel } from '../models/client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  endpoint = 'http://localhost:8080/clients'
  constructor(private httpClient : HttpClient) {} //Attention à l'ajouter aussi dans app.modules.ts

  getClients() {
    return this.httpClient.get<ClientModel[]>(this.endpoint)
  }

  getClientById(clientId: number) {
    return this.httpClient.get<ClientModel>(this.endpoint + "/" + clientId)
  }

  deleteClientById(clientId: number): Observable<void> {
    console.log("entrée dans deleteClientById dans client.service.ts")
    return this.httpClient.delete<void>(this.endpoint + "/" + clientId)
  }

  // EXEMPLE BASIQUE pour méthode postClient avec uniquement un attribut "firstName"
  // A reprendre et compléter pour l'adapter au formulaire
  
  // postClient(firstName: string) {
  //   return this.httpClient.post<ClientModel>(this.endpoint, { firstName: firstName })
  //   .subscribe(data => {
  //      firstName = data.firstName }
  //   )
  // }
}
