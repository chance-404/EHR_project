import { Component, inject } from '@angular/core';
import { Header } from "../header/header";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoginRequest, UserService } from '../user/user.service';


@Component({
  selector: 'app-login',
  imports: [Header, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private userService = inject(UserService);
  private router = inject(Router);

  errorMessage: string = '';
  isLoading: boolean = false;

  loginForm: FormGroup = new FormGroup({
    userId: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]) 
  });

  checkLogin() {
    // debugging info
    // console.log('Form valid:', this.loginForm.valid);
    // console.log('Form value:', this.loginForm.value);
    // console.log('Form errors:', this.loginForm.errors);
    // console.log('UserId control:', this.loginForm.get('userId'));
    // console.log('Password control:', this.loginForm.get('password'));

    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';

      const loginRequest: LoginRequest = {
        userId: this.loginForm.value.userId,
        password: this.loginForm.value.password
      };

      // debugging
      // console.log('Attempting login with:', loginRequest);

      this.userService.login(loginRequest).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.isLoading = false;

          this.router.navigate(['/dashboard']);
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          
          if (error.status === 401) {
            this.errorMessage = 'Invalid credentials. Please try again.';
          } else if (error.status === 404) {
            this.errorMessage = 'User ID invalid.';
          } else if (error.status === 500) {
            this.errorMessage = 'Server error. Please try again later.';
          } else {
            this.errorMessage = 'Login failed. Please try again.';
          }
          
          console.error('Login failed:', error);
        }
      });
    } else {
      this.errorMessage = 'Enter user ID and password.';
    }
  }


}
