import { Component, inject } from '@angular/core';
import { Header } from "../header/header";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';


@Component({
  selector: 'app-landing',
  imports: [Header, ReactiveFormsModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {

  loginForm: FormGroup = new FormGroup({
    userId: new FormControl(''),
    password: new FormControl('')
  });


  doLogin() {

    let isAuthenticated: boolean = false;
    const formValue = this.loginForm.value;

    if (!formValue.userId || formValue.username.trim() === '' || 
      !formValue.password || formValue.password.trim() === '') {
      alert('Enter a user name and password');
      return;
      }
    
    if (formValue.userId === user.userId.getUserId() && formValue.password === 'admin') {
      isAuthenticated = true;
    }
  }


}