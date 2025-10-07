import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from './user';


export interface LoginRequest{
  userId: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  // Sends LoginRequest to @PostMapping("/login") in UserController.java, returns LoginResponse
  public login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiServerUrl}/users/login`, loginRequest)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Login error:', error);
          if (error.status === 401) {
            return throwError(() => new Error('Invalid credentials'));
          } 
          else if (error.status === 404) {
            return throwError(() => new Error('Server not available'));
          }
          return throwError(() => new Error('Unknown error occured'));
        })
      );
  }


  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/users/all`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/users/add`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/users/update`, user);
  }

  public deleteUser(userId: String): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/users/delete/${userId}`);
  }

  public addNewUser(firstName: string, lastName: string) {
    const User: User = {
      lastName: lastName,
      firstName: firstName,
      password: 'password', 
      userId: this.makeRandomUserId(),
    };

    if (!firstName || !lastName) {
      return throwError(() => new Error('First and last name required.'));
    }

    return this.addUser(User).pipe(
      catchError(error => {
        console.error('Error registering User:', error);
        return throwError(() => new Error('Failed to add User'));
      })
    );
  }


  // makes a random "3/4 ID", 3 letters + 4 numbers
  private makeRandomUserId(): string {
    let userId = '';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = Array.from({length: 3}, () => 
      letters.charAt(Math.floor(Math.random() * letters.length))).join('');
  
    const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
    userId = randomLetters + randomDigits;
    return userId;
  }

}