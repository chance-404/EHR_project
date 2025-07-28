import { Component, OnInit } from '@angular/core';
import { Patient } from '../patient/patient';
import { HttpErrorResponse } from '@angular/common/http';
import { PatientService } from '../patient/patient.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard implements OnInit {
  public patients!: Patient[];
  private allPatients!: Patient[];

  currentSort = {
    column: '' as keyof Patient,
    direction: 'asc' as 'asc' | 'desc'
  };

  constructor(private patientService: PatientService){}

  ngOnInit() {
    this.getPatients();  
  }

  public getPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (response: Patient[]) => {
        this.patients = response;
        this.allPatients = [...response]; // Keep a copy of all patients
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
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
    if (!key || key.trim() === '') {
      this.patients = [...this.allPatients];
      return;
    }

    const searchKey = key.toLowerCase().trim();
    this.patients = this.allPatients.filter(patient => 
      patient.lastName.toLowerCase().includes(searchKey) ||
      patient.firstName.toLowerCase().includes(searchKey) ||
      patient.middleName.toLowerCase().includes(searchKey) ||
      patient.mrn.toString().includes(searchKey) ||
      patient.dateOfBirth.toString().includes(searchKey)
    );
  }

}