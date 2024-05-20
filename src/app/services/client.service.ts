import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientModel } from '../models/client.model';
import { catchError, throwError } from 'rxjs';

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
    console.log("Passe par getClientById dans le service");
    return this.httpClient.get<ClientModel>(this.endpoint + "/" + clientId)
    .pipe(
      // TO DO : gérer la redirection vers la liste de clients en cas d'erreur
      catchError(this.handleError)
    )
  }
  
  handleError(error:any) {
    console.log("Passe par handleError dans le service");
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
    } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => new Error(errorMessage));
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
