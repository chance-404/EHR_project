import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl = 'http://localhost:8080';


  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/User/all`);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiServerUrl}/User/add`, user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiServerUrl}/User/update`, user);
  }

  public deleteUser(userId: String): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/User/delete/${userId}`);
  }

  public addNewUser(firstName: string, lastName: string) {
    const User: User = {
      lastName: lastName,
      firstName: firstName,
      password: 'defaultPassword', // Default password, can be changed later
      userId: this.makeRandomUserId(),
    };

    if (!firstName || !lastName) {
      return throwError(() => new Error('Required fields missing'));
    }

    return this.addUser(User).pipe(
      catchError(error => {
        console.error('Error registering User:', error);
        return throwError(() => new Error('Failed to add User'));
      })
    );
  }

  private makeRandomUserId(): String {
    return String(Math.floor(Math.random() * 1000000));
  }



}