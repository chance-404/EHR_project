import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.css'
})

export class Logout implements OnInit {

  authenticationService = inject(AuthenticationService);
  router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
