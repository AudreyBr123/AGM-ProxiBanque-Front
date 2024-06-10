import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdvisorModel } from '../models/advisor.model';
import { catchError, throwError } from 'rxjs';
import { ClientModel } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class AdvisorService {
  endpoint = 'http://localhost:8080/advisors';
  constructor(private httpClient: HttpClient) {}

  /**
   * Récupère une liste des conseillers
   * @returns Un observable de la liste des conseillers
   */
  getAdvisors() {
    return this.httpClient.get<AdvisorModel[]>(this.endpoint);
  }

  /**
   * Récupère un conseiller par son id
   * @param {number} advisorId - l'id du conseiller
   * @returns Un oservable du conseiller
   */
  getAdvisorById(advisorId: number) {
    return this.httpClient
      .get<AdvisorModel>(this.endpoint + '/' + advisorId)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Récupère la liste des clients via l'id du conseiller
   * @param {numnber} advisorId - l'id du conseiller
   * @returns Un observable de la liste des clients du conseiller
   */
  getClientListByAdvisorId(advisorId: number) {
    return this.httpClient
      .get<ClientModel[]>(this.endpoint + '/' + advisorId + '/clients')
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Gère les erreurs de l'API
   * Cette méthode peut retourner une valeur qui est récupérée par le composant, selon la valeur de retour on utilise "navigate" pour forcer la navigation
   * @param error - Une erreur concernant l'interaction avec l'API
   * @returns Les informations sur l'erreur
   */
  handleError(error: any) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
