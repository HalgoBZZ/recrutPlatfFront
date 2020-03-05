import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from 'src/app/services/UtilisateurService';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedUser: any = {};
  constructor(private router: Router, private utilisateurService: UtilisateurService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.getConnectedUser();
  }
  transform(base64Image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }

  getConnectedUser() {
    const login = localStorage.getItem('login');
    this.utilisateurService.getByLogin(login).subscribe(data => {
      this.loggedUser = data;
      console.log('connected user:', this.loggedUser);
    }, error => {
      this.router.navigate(['/login']);
    });
  }
}
