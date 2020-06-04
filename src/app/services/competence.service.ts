import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompetenceService {

  private uri = 'http://localhost:8085/api/competence/';
  headers = new HttpHeaders();

  constructor(private http: HttpClient) { }
  getAll() {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'get/', options);
  }

  addCompetence(competenceToAdd) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.post(this.uri + 'save', competenceToAdd, options);
  }
  updateCompetence(competenceToUpdate) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.put(this.uri + 'update', competenceToUpdate, options);
  }
  deleteCompetencee(id) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.delete(this.uri + 'delete/' + id, options);
  }

  getByDomaine(id) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'getByDomaine/' + id, options);
  }
}
