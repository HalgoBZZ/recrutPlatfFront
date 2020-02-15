import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/UtilisateurService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser;
  constructor(private router: Router,private utilisateurService :UtilisateurService) { }

  ngOnInit() {
    const login = localStorage.getItem('login');
    this.utilisateurService.getByLogin(login).subscribe(data => {
      console.log('data ==>',data)
      this.loggedUser = data;
    }, error => {
      this.router.navigate(['/login']);
    });
  }
}
