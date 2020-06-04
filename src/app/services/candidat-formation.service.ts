import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatFormationService {

  private uri = 'http://localhost:8085/api/candidatFormation/';
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

  getByFormation(formation) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'byFormation/' + formation , options);
  }

  getByCandidatAndFormation(candidat, formation) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'byCandidatFormation/' + candidat + '/' + formation , options);
  }

  delete(id) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.delete(this.uri + 'delete/' + id , options);
  }
}
