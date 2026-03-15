import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginRequest, UserService } from '../user/user.service';
import { catchError, map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private userService = inject(UserService);
  // authentication service tries to call sessionStorage.getItem('userId') on start up,
  // crashes app, need this check before
  private platformId = inject(PLATFORM_ID);

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isUserLoggedIn());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() { }

  authenticate(userId: string, password: string): Observable<boolean> {

    const loginRequest: LoginRequest = {
      userId: userId,
      password: password
    };
      // sends login req to login() in user.service.ts, userId and JWT in response
      return this.userService.login(loginRequest).pipe(
        map((response) => {
          console.log('Login successful');
          if (isPlatformBrowser(this.platformId)) { // the platformId check, had to had this to get JWT to function

            // nothing secret stored locally
            sessionStorage.setItem('userId', response.userId);

			// need this?
			if (response.token) { sessionStorage.setItem('token', 	response.token); }
          }
          this.isAuthenticatedSubject.next(true);
          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          this.isAuthenticatedSubject.next(false);
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
          // prevents an HTTP error from breaking the function
          return of(false);
        })
      );
  }
  

  isUserLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) { // the platformId check, had to had this to get JWT to function
      const user = sessionStorage.getItem('userId');
      return user !== null;
    }
    return false; // On the server, the user is never logged in
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) { // the platformId check, had to had this to get JWT to function
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('token');
    }
    this.isAuthenticatedSubject.next(false);
  }

  handleUnauthorized(): void {
    console.warn('Invalid token detected.');
    this.logout();
  }

}
