import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  connected = false;

  constructor(private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('connected') && localStorage.getItem('login')) {
      this.connected = true;
    } else {
      this.connected = false;
      this.router.navigate(['/login']);
    }
  }

}
