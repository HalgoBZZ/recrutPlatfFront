import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  connectedUser: any = {};

  constructor(private utilisateurService: UtilisateurService) { }

  ngOnInit() {
    this.getConnectedUser();
  }

  getConnectedUser() {
    this.utilisateurService.getByLogin(localStorage.getItem('login')).subscribe(data => {
      this.connectedUser = data;
    }, error => {
      console.log('error nav component while get connected user');
    });
  }

}
