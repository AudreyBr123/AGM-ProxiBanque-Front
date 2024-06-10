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
  constructor(private httpClient : HttpClient) {} 
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  }

  /**
   * Récupère une liste de clients
   * @returns Un observable de la liste des clients
   */
  getClients() {
    return this.httpClient.get<ClientModel[]>(this.endpoint)
  }
  
  /**
   * Récupère un client via son identifiant
   * @param {number} clientId - l'id du client
   * @returns Un obesrvable du client correspondant ou une erreur
   */
  getClientById(clientId: number) {
    return this.httpClient.get<ClientModel>(this.endpoint + "/" + clientId)
    .pipe(
      catchError(this.handleError)
    )
  }
  
  /**
   * Créer un nouveau client
   * @param {ClientModel} client - Les données du client
   * @returns Un obesrvable du client correspondant ou une erreur
   */
  postClient(client: ClientModel) {
    return this.httpClient.post<ClientModel>(this.endpoint, JSON.stringify(client), this.httpOptions)
  }

  /**
   * Supprime un client
   * @param {number} clientId - l'id du client à supprimer
   * @returns Un observable de la response
   */
  deleteClientById(clientId: number): Observable<void> {
    return this.httpClient.delete<void>(this.endpoint + "/" + clientId)
  }

  /**
   * Met à jour un client
   * @param {number} clientId - l'id du client à mettre à jour
   * @param {ClientModel} client - les données mise à jour du client
   * @returns - Un observable du client mis à jour
   */
  putClient(clientId: number, client:ClientModel) {
    return this.httpClient.put<ClientModel>(this.endpoint + "/" + clientId, JSON.stringify(client), this.httpOptions)  
  }

  /**
   * Gère les erreurs de l'API
   * Cette méthode peut retourner une valeur qui est récupérée par le composant, selon la valeur de retour on utilise "navigate" pour forcer la navigation
   * @param error - Une erreur concernant l'interaction avec l'API
   * @returns Les informations sur l'erreur
   */
  handleError(error:any) {
    let errorMessage = '';

     if (error.error instanceof ErrorEvent) {
        errorMessage = error.message;
    } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
}

}
