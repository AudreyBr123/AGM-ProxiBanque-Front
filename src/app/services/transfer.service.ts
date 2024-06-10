import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { TransferDtoRequest } from '../models/transfer-dto-request.model';
import { CurrentAccountModel } from '../models/current-account.model';
import { SavingAccountModel } from '../models/saving-account.model';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  
  endpoint = 'http://localhost:8080/transfer'
  endpointClient = 'http://localhost:8080/clients'
  endpointSavingAccounts = 'http://localhost:8080/savingAccounts'
  endpointCurrentAccounts = 'http://localhost:8080/currentAccounts'
  
  constructor(private httpClient : HttpClient) {} 
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  }
  
  /**
   * Effectue un virement entre 2 comptes
   * @param transferDtoRequest - Les données du transfert
   * @returns Un observable avec le résultat du transfert
   */
  putTransfer(transferDtoRequest: TransferDtoRequest) {
    // console.log("Sending request to debit account number " + transferDtoRequest.idDebitAccount + " ("+transferDtoRequest.typeDebitAccount+")" 
    // + " and credit account number " + transferDtoRequest.idCreditAccount + " ("+transferDtoRequest.typeCreditAccount + ")."+
    // " Amount : " + transferDtoRequest.amount);
    return this.httpClient.put(this.endpoint, JSON.stringify(transferDtoRequest), this.httpOptions) 
    .pipe(
      catchError(this.handleError)
    )  
  }
  
  /**
   * Récupère la liste des comptes épargnes
   * @returns Un observable des comptes épargne 
   */
  getSavingAccounts(){
    return this.httpClient.get<SavingAccountModel[]>(this.endpointSavingAccounts);
  }
  
  /**
   * Récupère la liste des comptes courants
   * @returns Un observable des comptes courants
   */
  getCurrentAccounts(){
    return this.httpClient.get<CurrentAccountModel[]>(this.endpointCurrentAccounts);
  }
  
  /**
   * Gère les erreurs de l'API
   * Cette méthode peut retourner une valeur qui est récupérée par le composant, selon la valeur de retour on utilise "navigate" pour forcer la navigation
   * @param error - Une erreur concernant l'interaction avec l'API
   * @returns Les informations sur l'erreur
   */
  handleError(error:any) {
    let errorMessage = '';
    for (const [key, value] of Object.entries(error.error)) {
      errorMessage = `${value}`
    }

    window.alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
