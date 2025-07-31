import { Component, Output, EventEmitter, inject } from '@angular/core';
import { Header } from "../header/header";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { User } from '../user/user';


@Component({
  selector: 'app-landing',
  imports: [Header, ReactiveFormsModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css'
})
export class Landing {

  private router = inject(Router);
  private userService = inject(UserService);

  loginForm: FormGroup = new FormGroup({
    userId: new FormControl(''),
    password: new FormControl('')
  });


  doLogin() {

    const formValue = this.loginForm.value;

    // Makes sure input isn't blank
    if (!formValue.userId || formValue.userId.trim() === '' || 
      !formValue.password || formValue.password.trim() === '') {
      alert('Enter a user name and password');
      return;
      }
    
    // Calls backend
    this.authenticateUser(formValue.userId, formValue.password);
  }

  private authenticateUser(userId: string, password: string) {

    let isAuthenticated: boolean = false;

    this.userService.getUsers().subscribe({ 
      next: (users: User[]) => {
        const user = users.find(u => u.userId === userId);

        if (user && user.password === password) {
          console.log('Login successful');
          isAuthenticated = true;
          this.router.navigate(['/dashboard']);
        } else {
          alert('Invalid user ID or password');
        }
      }
    })
  }


}