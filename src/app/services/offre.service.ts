import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OffreService {



  private uri = 'http://localhost:8080/api/offre/';
  headers = new HttpHeaders();
  constructor(private http: HttpClient) { }

  getAll() {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'get/', options);
  }
  postuler(id: string, login: string) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    let formData = new FormData();
    formData.append('login', login);
    formData.append('id', id);
    return this.http.post(this.uri + 'postuler/', formData, options);
  }
  getMyOffres(id) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'getMyOffres/' + id, options);
  }
  getCandidatByOffreId(id) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'getCandidatures/' + id, options);
  }

  saveOffre(offre) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.post(this.uri + 'save', offre, options);
  }
}
