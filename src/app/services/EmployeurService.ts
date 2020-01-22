import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EmployeurService {
    private uri = 'http://localhost:8080/api/employeur/';
    headers = new HttpHeaders();

    constructor(private http: HttpClient) { }

    inscription(employeur) {
        console.log('*** // ***', employeur )

        this.headers.append('Accept', 'application/json;charset=UTF-8');
        const options = { headers: this.headers };
        return this.http.post('http://localhost:8080/api/employeur/save' , employeur, options);
    }

}