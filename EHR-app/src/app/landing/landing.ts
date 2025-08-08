import { Component, inject } from '@angular/core';
import { Header } from "../header/header";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-landing',
  imports: [Header, ReactiveFormsModule, CommonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {

  private http = inject(HttpClient);
  private router = inject(Router);

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]) 
  });

  isLoading = false;
  errorMessage = '';

  doLogin() {

    const formValue = this.loginForm.value;

    this.isLoading = true;
    this.errorMessage = '';  
    
  

      
  }


}
