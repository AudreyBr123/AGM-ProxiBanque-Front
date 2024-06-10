import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientModel } from '../models/client.model';
import { Observable } from 'rxjs';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  
  endpoint = 'http://localhost:8080/clients'
  constructor(private httpClient : HttpClient) {} //Attention à l'ajouter aussi dans app.modules.ts
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  }

  getClients() {
    return this.httpClient.get<ClientModel[]>(this.endpoint)
  }
  
  getClientById(clientId: number) {
    return this.httpClient.get<ClientModel>(this.endpoint + "/" + clientId)
    .pipe(
      // TODO : gérer la redirection vers la liste de clients en cas d'erreur
      catchError(this.handleError)
    )
  }
  
  postClient(client: ClientModel) {
    return this.httpClient.post<ClientModel>(this.endpoint, JSON.stringify(client), this.httpOptions)
  }

  deleteClientById(clientId: number): Observable<void> {
    return this.httpClient.delete<void>(this.endpoint + "/" + clientId)
  }

  putClient(clientId: number, client:ClientModel) {
    return this.httpClient.put<ClientModel>(this.endpoint + "/" + clientId, JSON.stringify(client), this.httpOptions)  
  }
  
  // Cette méthode peut retourner une valeur qui est récupérée par le composant, selon la valeur de retour on utilise "navigate" pour forcer la navigation
  handleError(error:any) {
    console.log("Passe par handleError dans le service");

    let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
        errorMessage = error.message;
    } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    window.alert(errorMessage);
    return throwError(() => new Error(errorMessage));
}

}
