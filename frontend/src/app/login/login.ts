import { Component, inject, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../authentication/authentication.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [Header, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  private router = inject(Router);
  private authenticationService = inject(AuthenticationService);
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    userId: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]) 
  });

  invalidLogin: boolean = false;
  errorMessage: string = '';

  constructor() {}
  
  ngOnInit() {}
  
  checkLogin() {
    // check if form is filled out
    if (this.loginForm.valid) {
      this.isLoading = true;
      const userId = this.loginForm.value.userId;
      const password = this.loginForm.value.password;
      // call authenticate() function in authentication.service.ts, route to patient list if userID and password valid
      this.authenticationService.authenticate(userId, password).subscribe({
        next: (success) => {
          this.isLoading = false;
          if (success) {
            this.router.navigate(['/flow-board']);
            this.invalidLogin = false;
          } else {
            this.invalidLogin = true;
            this.errorMessage = 'Invalid credentials';
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.invalidLogin = true;
          this.errorMessage = "Login failed";
          console.log(error);
        }
      });
    } else {
      this.errorMessage = 'Enter user ID and password';
      this.invalidLogin = true;
    }
  }        
}
