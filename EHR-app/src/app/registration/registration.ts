import { Component, inject } from '@angular/core';
import { Header } from "../header/header";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PatientService } from '../patient/patient.service';

@Component({
  selector: 'app-registration',
  imports: [Header, CommonModule, ReactiveFormsModule],
  templateUrl: './registration.html',
  styleUrl: './registration.css'
})
export class Registration {
  patientService = inject(PatientService);

  registerPatientForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    middleName: new FormControl(''),
    lastName: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl<Date | null>(null),
    sex: new FormControl('')
  });

  registerPatient() {
    const dateOfBirthValue = this.registerPatientForm.value.dateOfBirth;
    const dateOfBirth = dateOfBirthValue ? new Date(dateOfBirthValue) : new Date();

    if (this.registerPatientForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.patientService.registerPatient(
      this.registerPatientForm.value.firstName ?? '',
      this.registerPatientForm.value.middleName ?? '',
      this.registerPatientForm.value.lastName ?? '',
      dateOfBirth,
      this.registerPatientForm.value.sex ?? ''
    ).subscribe({
      // Need to add user feedback messages / error handling
      next: (response) => {
        console.log('Patient registered successfully:', response);
        this.registerPatientForm.reset();
      },
      error: (error) => {
        console.error('Error registering patient:', error);
      }
    });



  }



}
