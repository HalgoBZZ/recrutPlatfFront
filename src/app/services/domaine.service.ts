import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DomaineService {

  private uri = 'http://localhost:8080/api/domaine/';
  headers = new HttpHeaders();

  constructor(private http: HttpClient) { }
  getAll() {
      this.headers.append('Accept', 'application/json;charset=UTF-8');
      const options = { headers: this.headers };
      return this.http.get(this.uri + 'get/', options);     
   }
}
