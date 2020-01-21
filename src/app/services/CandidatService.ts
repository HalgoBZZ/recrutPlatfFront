import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class CandidatService {
    private uri = 'http://localhost:8080/api/candidat/';
    headers = new HttpHeaders();
    constructor(private http: HttpClient) { }
    inscription(candidat) {
        this.headers.append('Accept', 'application/json;charset=UTF-8');
        const options = { headers: this.headers };
        return this.http.post(this.uri + 'save/', candidat, options);
    }
}
