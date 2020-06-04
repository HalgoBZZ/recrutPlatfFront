import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {

  private uri = 'http://localhost:8085/api/candidature/';
  headers = new HttpHeaders();

  constructor(private http: HttpClient) { }

  getAll() {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'get/', options);
  }

  getById(id) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'get/' + id, options);
  }

  save(candidature) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.post(this.uri + 'save/', candidature, options);
  }

  update(candidature) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.post(this.uri + 'update/', candidature, options);
  }

  getByOffre(id) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'getByOffre/' + id, options);
  }

  getByCandidat(id) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'getByCandidat/' + id, options);
  }
  deleteByCandidatAndOffre(offre, candidat) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.delete(this.uri + 'deleteByRelations/' + offre + '/' + candidat, options);
  }

  accept(candidature) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.put(this.uri + 'accept/', candidature, options);
  }

  refuse(candidature) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.put(this.uri + 'refuse/', candidature, options);
  }
}
