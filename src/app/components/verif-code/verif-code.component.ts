import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verif-code',
  templateUrl: './verif-code.component.html',
  styleUrls: ['./verif-code.component.css']
})
export class VerifCodeComponent implements OnInit {

  codeRecu = false;

  constructor(private router: Router) { }

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
    this.codeRecu = true;
  }

  submitCode() {
    this.router.navigate(['/new-pass']);
  }

}
