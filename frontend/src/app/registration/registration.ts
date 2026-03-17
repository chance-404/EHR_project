import { Component, inject } from '@angular/core';
import { Header } from "../header/header";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PatientService } from '../patient/patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [Header, CommonModule, ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})

export class Registration {
  patientService = inject(PatientService);
  snackBar = inject(MatSnackBar);

  registerPatientForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s\-]+$/)]),
    middleName: new FormControl('', Validators.pattern(/^[a-zA-Z\s\-]+$/)),
    lastName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    dateOfBirth: new FormControl<Date | null>(null),
    sex: new FormControl(''),
    age: new FormControl('')
  });


  registerPatient() {
    const dateOfBirthValue = this.registerPatientForm.value.dateOfBirth;
    const dateOfBirth = dateOfBirthValue ? new Date(dateOfBirthValue) : new Date();
    const age = Number(this.registerPatientForm.value.age) || 0;
    


    if (this.registerPatientForm.invalid) {

      const hasPatternError = this.registerPatientForm.controls.firstName.hasError('pattern') ||
                              this.registerPatientForm.controls.middleName.hasError('pattern') ||
                              this.registerPatientForm.controls.lastName.hasError('pattern');

      const message = hasPatternError
        ? 'Names can only contain letters.'
        : 'Must enter first and last name at a minimum.';

      console.log('Form is invalid: ', message);
      return;
    }

    this.patientService.registerPatient(
      this.registerPatientForm.value.firstName ?? '',
      this.registerPatientForm.value.middleName ?? '',
      this.registerPatientForm.value.lastName ?? '',
      dateOfBirth,
      this.registerPatientForm.value.sex ?? '',
      age
    ).subscribe({
      
      next: (response) => {
        console.log('Patient registered successfully:', response);
        this.snackBar.open('Patient registered successfully.', 'Close', {
          duration: 5000,
          panelClass: ['success-snackbar']
        });
        this.registerPatientForm.reset();
      },
      error: (error) => {
        console.error('Error registering patient:', error);
        this.snackBar.open('Failed to register patient', 'Close', { 
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    })
  }
}
