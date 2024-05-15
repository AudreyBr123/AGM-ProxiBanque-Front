import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdvisorModel } from '../models/advisor.model';

@Injectable({
  providedIn: 'root'
})
export class AdvisorService {

  constructor(private httpClient : HttpClient) { }

  getClients() {
    return this.httpClient.get<AdvisorModel[]>('http://localhost:3000/advisors')
  }
}
