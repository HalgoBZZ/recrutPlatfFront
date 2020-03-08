import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeurService {

  private uri = 'http://localhost:8080/api/employeur/';
  headers = new HttpHeaders();

  constructor(private http: HttpClient) { }

  inscription(employeur) {
    console.log('*** // ***', employeur)

    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.post('http://localhost:8080/api/employeur/save', employeur, options);
  }

  uploadFile(file, mail, id) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    this.headers.append('Content-Type', 'multipart/form-data');
    const options = { headers: this.headers };
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', id);
    formData.append('mail', mail);

    return this.http.post(this.uri + 'uploadfile/', formData, options);
  }

  updateEmployeur(employeur) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.put(this.uri + 'update', employeur, options);
  }

  getById(id) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'get/' + id, options);
  }

  deleteEmployeur(id) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.delete(this.uri + 'delete/' + id, options);
  }

  getAll() {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'get/', options);
  }
}
