import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/UtilisateurService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login;
  pwd;
  connectionError = false;
  connectedUser;

  constructor(private router: Router,private utilisateurService :UtilisateurService) { }

  ngOnInit() {
  }

  connexion() {
    this.router.navigate(['/principal']);
  }

  
  authentication() {
    console.log('this.login,',this.login);
    console.log('this.pwd,',this.pwd);

    this.utilisateurService.authentication(this.login, this.pwd).subscribe(data => {
      this.connectedUser = data;
      if (data !== null) {
        console.log('data',data[0]);
      this.router.navigate(['/principal']);
      localStorage.setItem('connected', 'connected');
      localStorage.setItem('login', this.login);

      } else {
        this.connectionError = true;
      }
    }, error => {
      this.connectionError = true;
    });
  }
}
