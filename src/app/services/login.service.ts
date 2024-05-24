import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';

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
  
  postLogin(user: UserModel) {
    return this.httpClient.post<UserModel>(this.endpoint + "login", JSON.stringify(user), this.httpOptions)
  }

}
