import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.css']
})
export class NewPassComponent implements OnInit {
  codeRecu = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  back() {
      this.router.navigate(['/verification']);
  }

  submitNewPass() {
    this.router.navigate(['/login']);
  }

}
