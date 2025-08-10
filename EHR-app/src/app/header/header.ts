import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  
  constructor(public authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit() {}

  unauthorizedClick(event: Event): void {
    if (!this.authenticationService.isUserLoggedIn()) {
      alert('Must login first');
      return;
    }
  }
  
}
