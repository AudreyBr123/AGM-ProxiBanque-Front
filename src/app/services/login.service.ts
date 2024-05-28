import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  endpoint = 'http://localhost:8080/'
  constructor(private httpClient : HttpClient) {} //Attention à l'ajouter aussi dans app.modules.ts
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin' : '*'
    })
  }
  
  postLogin(user: UserModel): Observable<{ role: string }> {
    return this.httpClient.post<{ role: string }>(this.endpoint + "login", JSON.stringify(user), this.httpOptions)
  }

}
