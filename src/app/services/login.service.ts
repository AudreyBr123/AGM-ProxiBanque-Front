import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  endpoint = 'http://localhost:8080/'
  constructor(private httpClient : HttpClient) {}
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  }
  
  /**
   * Envoie les données d'authentification
   * @param user - Les données de l'utilisateur (email, mot de passe)
   * @returns Un observable du résultat de l'authentification
   */
  postLogin(user: UserModel): Observable<{ role: string }> {
    return this.httpClient.post<{ role: string }>(this.endpoint + "login", JSON.stringify(user), this.httpOptions)
  }

}
