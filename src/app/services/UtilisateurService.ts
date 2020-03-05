import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private uri = 'http://localhost:8080/api/utilisateur/';
  headers = new HttpHeaders();

  constructor(private http: HttpClient) { }

  authentication(login, pwd) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'authentication/' + login + '/' + pwd, options);
  }

  getByLogin(login) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'findByLogin/' + login, options);
  }

  sendMail(login) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'sendMail/' + login, options);
  }

  getCode() {
    this.headers.append('Accept', 'text;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.get(this.uri + 'getcode', options);
  }

  updateUser(user) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    const options = { headers: this.headers };
    return this.http.put('http://localhost:8080/api/utilisateur/update', user, options);
  }
}
