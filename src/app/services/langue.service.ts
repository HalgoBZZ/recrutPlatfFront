import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LangueService {
  private uri = 'http://localhost:8085/api/langue/';
  headers = new HttpHeaders();

  constructor(private http: HttpClient) { }


  getAll() {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'get/', options);
  }
  addLangue(langueToAdd) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.post(this.uri + '/save', langueToAdd, options);
  }
  updateLangue(langueToUpdate) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.put(this.uri + 'update/', langueToUpdate, options);
  }
  deletelangue(id) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.delete(this.uri + 'delete/' + id, options);
  }


}
