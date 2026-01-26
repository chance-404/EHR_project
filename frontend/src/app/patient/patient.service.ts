import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Patient } from './patient';
import { environment } from '../../environments/environment';

@Injectable({
  	providedIn: 'root'
})
export class PatientService {
	private apiServerUrl = environment.apiServerUrl;


  	constructor(private http: HttpClient) { }

  	public getPatients(): Observable<Patient[]> {
    	return this.http.get<Patient[]>(`${this.apiServerUrl}/patients/all`);
  	}

	public getPatientListForDashboard(): Observable<Patient[]> {
		return this.http.get<Patient[]>(`${this.apiServerUrl}/patients/all-dashboard`)
	}

  	public getPatientByMrn(mrn: number): Observable<Patient> {
    	return this.http.get<Patient>(`${this.apiServerUrl}/patients/find/${mrn}`);
  	}

  	public addPatient(patient: Patient): Observable<Patient> {
    	return this.http.post<Patient>(`${this.apiServerUrl}/patients/add`, patient);
  	}

  	public updatePatient(patient: Patient): Observable<Patient> {
    	return this.http.put<Patient>(`${this.apiServerUrl}/patients/update`, patient);
  	}

  	public deletePatient(patientMrn: String): Observable<void> {
    	return this.http.delete<void>(`${this.apiServerUrl}/patients/delete/${patientMrn}`);
  	}

  	public registerPatient(firstName: string, middleName: string, lastName: string, dateOfBirth: Date, sex: string, age: number) {
    const patient: Patient = {
      	firstName: firstName,
      	middleName: middleName,
    	lastName: lastName,
      	dateOfBirth: dateOfBirth,
      	sex: sex,
      	age: age,
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


}