import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Patient } from './patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiServerUrl = 'http://localhost:8080';


  constructor(private http: HttpClient) { }

  public getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiServerUrl}/patient/all`);
  }

  public addPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiServerUrl}/patient/add`, patient);
  }

  public updatePatient(patient: Patient): Observable<Patient> {
    return this.http.put<Patient>(`${this.apiServerUrl}/patient/update`, patient);
  }

  public deletePatient(patientMrn: String): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/patient/delete/${patientMrn}`);
  }

  public registerPatient(firstName: string, middleName: string, lastName: string, dateOfBirth: Date, sex: string) {
    const patient: Patient = {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      sex: sex,
      mrn: this.makeRandomMRN()
    };

    if (!firstName || !lastName || !dateOfBirth) {
      return throwError(() => new Error('Required fields missing'));
    }

    return this.addPatient(patient).pipe(
      catchError(error => {
        console.error('Error registering patient:', error);
        return throwError(() => new Error('Failed to register patient'));
      })
    );
  }

  private makeRandomMRN(): number {
    return Math.floor(Math.random() * 1000000);
  }



}