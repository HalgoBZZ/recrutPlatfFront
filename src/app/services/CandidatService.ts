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
        console.log('candidat',candidat)
        this.headers.append('Accept', 'application/json;charset=UTF-8');
        const options = { headers: this.headers };
        return this.http.post(this.uri + 'save/', candidat, options);
    }
    
    uploadFile(file,mail,id,type) {
        this.headers.append('Accept', 'application/json;charset=UTF-8');
        this.headers.append( "Content-Type","multipart/form-data" );
        const options = { headers: this.headers };
        let formData = new FormData();
        formData.append('file', file);
        formData.append('id', id);
        formData.append('mail', mail);
        formData.append('type', type);
        return this.http.post(this.uri + 'uploadfile/', formData, options);
    }
    getAll() {
        this.headers.append('Accept', 'application/json;charset=UTF-8');
        const options = { headers: this.headers };
        return this.http.get(this.uri + 'get/', options);     
     }
    
     deleteCandidat(id) {
        this.headers.append('Accept', 'application/json;charset=UTF-8');
        const options = { headers: this.headers };
        return this.http.delete(this.uri + 'delete/'+id, options); 
      }
    
}
