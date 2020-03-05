import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/UtilisateurService';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(private router: Router, private utilisateurService: UtilisateurService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  connexion() {
    this.router.navigate(['/principal']);
  }


  authentication() {
    this.spinner.show();
    this.utilisateurService.getByLogin(this.login).subscribe(data => {
      this.connectedUser = data;
      if (this.connectedUser && this.connectedUser.password === this.pwd) {
        this.router.navigate(['/principal']);
        localStorage.setItem('connected', 'connected');
        localStorage.setItem('login', this.login);
        this.spinner.hide();
      } else {
        this.connectionError = true;
        this.spinner.hide();
      }
    }, error => {
      this.connectionError = true;
      this.spinner.hide();
    });
  }
}
