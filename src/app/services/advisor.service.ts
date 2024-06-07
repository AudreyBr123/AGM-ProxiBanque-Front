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

  getAdvisors() {
    return this.httpClient.get<AdvisorModel[]>(this.endpoint);
  }

  getAdvisorById(advisorId: number) {
    return this.httpClient
      .get<AdvisorModel>(this.endpoint + '/' + advisorId)
      .pipe(
        // TO DO : gérer la redirection vers la liste de clients en cas d'erreur
        catchError(this.handleError)
      );
  }

  getClientListByAdvisorId(advisorId: number) {
    return this.httpClient
      .get<ClientModel[]>(this.endpoint + '/' + advisorId + '/clients')
      .pipe(
        // TO DO : gérer la redirection vers la liste de clients en cas d'erreur
        catchError(this.handleError)
      );
  }

  // Cette méthode peut retourner une valeur qui est récupérée par le composant, selon la valeur de retour on utilise "navigate" pour forcer la navigation
  handleError(error: any) {
    // console.log('Passe par handleError dans le service');
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
