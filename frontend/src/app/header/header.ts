import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  constructor() {}

  router = inject(Router);
  authenticationService = inject(AuthenticationService);
  snackBar = inject(MatSnackBar);

  ngOnInit() {}

  unauthorizedClick(event: Event): void {
    if (!this.authenticationService.isUserLoggedIn()) {
      event.preventDefault();
      this.snackBar.open('You have to log in first', 'Close', {
        duration: 10000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }
  }
  
}
