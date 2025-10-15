import { Component, inject, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../authentication/authentication.service';


@Component({
  selector: 'app-login',
  imports: [Header, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  private router = inject(Router);
  private authenticationService = inject(AuthenticationService);

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
      const userId = this.loginForm.value.userId;
      const password = this.loginForm.value.password;
      // call authenticate() function in authentication.service.ts, route to dashboard if userID and password valid
      this.authenticationService.authenticate(userId, password).subscribe({
        next: (success) => {
          if (success) {
            this.router.navigate(['/dashboard']);
            this.invalidLogin = false;
          } else {
            this.invalidLogin = true;
            this.errorMessage = 'Invalid credentials';
          }
        },
        error: (error) => {
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
