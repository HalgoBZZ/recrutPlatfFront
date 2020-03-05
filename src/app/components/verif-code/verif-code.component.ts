import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/app/services/UtilisateurService';

@Component({
  selector: 'app-verif-code',
  templateUrl: './verif-code.component.html',
  styleUrls: ['./verif-code.component.css']
})
export class VerifCodeComponent implements OnInit {

  codeRecu = false;
  email;
  tryToSubmit = false;
  code;
  correctCode = true;


  constructor(private router: Router, private utilisateurService: UtilisateurService) { }

  ngOnInit() {
  }

  back() {
    if (this.codeRecu) {
      this.codeRecu = false;
    } else {
      this.router.navigate(['/login']);
    }
  }

  SendMail() {
    this.tryToSubmit = true;
    if (this.verifRequired(this.email) && this.verifEmailField(this.email)) {
    this.utilisateurService.sendMail(this.email).subscribe(result => {
      if (result) {
        this.codeRecu = true;
        this.tryToSubmit = false;
      }
    });
  }
  }

  submitCode() {
    this.tryToSubmit = true;
    this.utilisateurService.getCode().subscribe(res => {
      const codeObj: any = res;
      if (codeObj.response === this.code) {
        // this.router.navigate(['/new-pass']);
        this.utilisateurService.getByLogin(this.email).subscribe(result => {
        this.router.navigateByUrl('/new-pass', { state: result });
        });
      } else {
        this.correctCode = false;
      }
    });
  }

  verifEmailField(field) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(field).toLowerCase());
  }

  verifRequired(field) {
    if (field) {
      return true;
    }
    return false;
  }

}
