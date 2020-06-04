import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatCompetenceService {

  private uri = 'http://localhost:8085/api/candidatCompetence/';
  headers = new HttpHeaders();

  constructor(private http: HttpClient) { }

  save(obj) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.post(this.uri + 'save', obj, options);
  }

  update(obj) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.put(this.uri + 'update', obj, options);
  }

  getById(id) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'get/' + id, options);
  }

  getAll() {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'get' , options);
  }

  getByCandidat(candidat) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'byCandidat/' + candidat , options);
  }

  getByCompetence(competence) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'byCompetence/' + competence , options);
  }

  getByCandidatAndCompetence(candidat, competence) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'byCandidatCompetence/' + candidat + '/' + competence , options);
  }

  delete(id) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.delete(this.uri + 'delete/' + id , options);
  }
}
