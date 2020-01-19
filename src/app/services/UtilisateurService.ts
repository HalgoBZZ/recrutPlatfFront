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
    return this.http.get(this.uri + 'findByLogin/' + login , options);
  }
}