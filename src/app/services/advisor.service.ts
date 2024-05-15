import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdvisorModel } from '../models/advisor.model';

@Injectable({
  providedIn: 'root'
})
export class AdvisorService {

  endpoint = 'http://localhost:8080/advisors'
  constructor(private httpClient : HttpClient) { }

  getClients() {
    return this.httpClient.get<AdvisorModel[]>(this.endpoint)
  }
}
