import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest, UserService } from '../user/user.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private userService = inject(UserService);

  constructor() { }

  authenticate(userId: string, password: string): Observable<boolean> {

    const loginRequest: LoginRequest = {
      userId: userId,
      password: password
    };

      return this.userService.login(loginRequest).pipe(
        map((response) => {
          console.log('Login successful:', response);
          sessionStorage.setItem('userId', response.userId);
          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          if (error.status === 401) {
            console.log('Invalid credentials');
          } else if (error.status === 404) {
            console.log('User ID invalid');
          } else if (error.status === 500) {
            console.log('Server error');
          } else {
            console.log('Login failed. Please try again.');
          }
          // "of()"" is an Angular operator (from RxJS library) that creates an observable that emits false and completes immediately.
          // Prevents an HTTP error from breaking the function
          return of(false);
        })
      );
  }
  

  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem('userId');
    return user !== null;
  }

  logout(): void {
    sessionStorage.removeItem('userId')
  }
}
