import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, pipe, throwError } from "rxjs";
import { SurgeryCase } from "./surgery-case";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class SurgeryCaseService {
  private apiServerUrl = environment.apiServerUrl;

  constructor(private http: HttpClient) { }

  public getSurgeryCases(): Observable<SurgeryCase[]> {
    return this.http.get<SurgeryCase[]>(`${this.apiServerUrl}/surgeryCases/all`);
  }

  public addSurgeryCase(surgeryCase: SurgeryCase): Observable<SurgeryCase> {
    return this.http.post<SurgeryCase>(`${this.apiServerUrl}/surgeryCases/add`, surgeryCase);
  }

  public updateSurgeryCase(surgeryCase: SurgeryCase): Observable<SurgeryCase> {
    return this.http.put<SurgeryCase>(`${this.apiServerUrl}/surgeryCases/update`, surgeryCase);
  }

  public deleteSurgeryCase(surgeryCaseId: String): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/surgeryCases/delete/${surgeryCaseId}`);
  }

  public addSurgeryCaseToSchedule(
    patient: string, procedure: string, startTime: string, endTime: string, surgeon: string, anesthesia: string,
    nurse: string, scrub: string, roomId: number 
  ) {
    const surgeryCase: SurgeryCase = {
      patient: patient,
      procedure: procedure,
      startTime: startTime,
      endTime: endTime,
      surgeon: surgeon,
      anesthesia: anesthesia,
      nurse: nurse,
      scrub: scrub,
      surgeryCaseId: this.makeRandomSurgeryCaseId(),
      roomId: roomId,
      surgeryCaseStatus: 'Patient not here yet',
    }
    return this.addSurgeryCase(surgeryCase).pipe(
          catchError(error => {
            console.error('Error adding surgery case:', error);
            return throwError(() => new Error('Failed to add surgery case.'));
          })
        );
  }

  private makeRandomSurgeryCaseId(): number {
    return Math.floor(Math.random() * 10000000);
  }

}