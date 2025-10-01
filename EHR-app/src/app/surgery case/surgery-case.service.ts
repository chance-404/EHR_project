import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SurgeryCase } from "./surgery-case";

@Injectable({
  providedIn: 'root'
})
export class SurgeryCaseService {
  private apiServerUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getSurgeryCases(): Observable<SurgeryCase[]> {
    return this.http.get<SurgeryCase[]>(`${this.apiServerUrl}/surgeryCases/all`);
  }

  public addSurgeryCase(surgeryCase: SurgeryCase): Observable<SurgeryCase> {
    return this.http.post<SurgeryCase>(`${this.apiServerUrl}/surgeryCases/add`, surgeryCase);
  }

  private makeRandomSurgeryCaseId(): number {
    return Math.floor(Math.random() * 10000000);
  }

  public updateSurgeryCase(surgeryCase: SurgeryCase): Observable<SurgeryCase> {
    return this.http.put<SurgeryCase>(`${this.apiServerUrl}/surgeryCases/update`, surgeryCase);
  }

  public deleteSurgeryCase(surgeryCaseId: String): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/surgeryCases/delete/${surgeryCaseId}`);
  }

}