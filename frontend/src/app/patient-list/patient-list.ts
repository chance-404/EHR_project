import { Component, inject, OnInit } from '@angular/core';
import { Patient } from '../patient/patient';
import { HttpErrorResponse } from '@angular/common/http';
import { PatientService } from '../patient/patient.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';


@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css'
})

export class PatientList implements OnInit {

  constructor(private patientService: PatientService, 
              public authenticationService: AuthenticationService) {}

  public patients!: Patient[];
  private allPatients!: Patient[];
  private router = inject(Router);

  currentSort = {
    column: '' as keyof Patient,
    direction: 'asc' as 'asc' | 'desc'
  };

  ngOnInit() {
    this.getPatients();  
  }

  public getPatients(): void {
    this.patientService.getPatientListForDashboard().subscribe({
      next: (response: Patient[]) => {
        this.patients = response;
        this.allPatients = [...response]; // Keep a copy of all patients
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  public patientRowClick(patient: Patient, event?: Event): void {
    console.log('Patient:', patient);
    console.log('MRN:', patient.mrn);
    console.log('Router instance:', this.router);
    
    try {
      this.router.navigate(['/patient-info', patient.mrn]).then(
        (success) => console.log('Navigation success:', success),
        (error) => console.error('Navigation error:', error)
      );
    } catch (error) {
      console.error('Exception during navigation:', error);
    }
  }

  public sortBy(column: keyof Patient, type: 'string' | 'number'): void {
    // Toggle direction if clicking same column
    if (this.currentSort.column === column) {
      this.currentSort.direction = this.currentSort.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.currentSort.column = column;
      this.currentSort.direction = 'asc';
    }

    const direction = this.currentSort.direction;

    this.patients.sort((a: Patient, b: Patient) => {
      const aValue = a[column];
      const bValue = b[column];
      
      if (type === 'number') {
        return direction === 'asc' 
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }
      
      return direction === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }

  public searchPatients(key: string): void {
    if (!key || key.trim() === '') { // Keeps all pts in list if seach box is empty
      this.patients = [...this.allPatients];
      return;
    }

	if (key.length < 3) {
		this.patients = [...this.allPatients];
		return;
	}

    const searchKey = key.toLowerCase().trim();
    this.patients = this.allPatients.filter(patient => 
      patient.lastName.toLowerCase().startsWith(searchKey) ||
      patient.firstName.toLowerCase().startsWith(searchKey) ||
      patient.mrn?.startsWith(searchKey) ||
      patient.dateOfBirth.toString().includes(searchKey)
    );
  }


}