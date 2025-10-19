import { Component, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Patient } from '../patient/patient';
import { PatientService } from '../patient/patient.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-info',
  standalone: true,
  imports: [Header, CommonModule],
  templateUrl: './patient-info.html',
  styleUrl: './patient-info.css'
})
export class PatientInfo implements OnInit {
  patientMrn!: number;
  patient?: Patient;

  // dummy allergies and meds
  allergies: string[] = ['Penicillin', 'Latex'];
  medications: string[] = ['Lisinopril 10mg QD', 'Metformin 500mg BID', 'Aspirin 81mg QD'];
  history = [
    { label: 'Diabetes Mellitus type2', dateOfDx: '12/05/2019'},
    { label: 'Hypertension', dateOfDx: '05/12/2015'},
    { label: 'Atrial Fribrillation', dateOfDx: '06/15/2020'},
  ];
  // dummy vitals
  vitals = [
    { label: 'Temp', value: '37.0°C' },
    { label: 'HR', value: '95 bpm' },
    { label: 'BP', value: '135/85 mmHg' },
    { label: 'RR', value: '16 rpm' },
    { label: 'SpO2', value: '98%' }
  ];

  // dummy labs
  // Dummy Lab Data: Complete Blood Count (CBC)
  cbc = [
    // --- White Blood Cell Series ---
    { label: 'WBC', value: '12.5', units: 'x10^9/L', reference: '4.5-11.0', abnormal: true }, // High (Infection)
    { label: 'Neutrophils', value: '70', units: '%', reference: '40-60', abnormal: true }, // High
    { label: 'Lymphocytes', value: '23', units: '%', reference: '20-40', abnormal: false },
    { label: 'Monocytes', value: '5', units: '%', reference: '2-8', abnormal: false },
    { label: 'Eosinophils', value: '1', units: '%', reference: '1-4', abnormal: false },
    { label: 'Basophils', value: '1', units: '%', reference: '0.5-1', abnormal: false },

    // --- Red Blood Cell Series ---
    { label: 'RBC', value: '4.8', units: 'x10^12/L', reference: '4.2-6.1', abnormal: false },
    { label: 'Hgb', value: '14.0', units: 'g/dL', reference: '12.1-17.2', abnormal: false },
    { label: 'Hct', value: '42.0', units: '%', reference: '36-55', abnormal: false },
    { label: 'MCV', value: '78', units: 'fL', reference: '80-100', abnormal: true }, // Low (Microcytic)
    { label: 'MCH', value: '28.5', units: 'pg', reference: '27-34', abnormal: false },
    { label: 'MCHC', value: '33.8', units: 'g/dL', reference: '32-36', abnormal: false },
    { label: 'RDW', value: '13.5', units: '%', reference: '11.5-15.0', abnormal: false },

    // --- Platelets ---
    { label: 'Plt', value: '250', units: 'x10^9/L', reference: '150-450', abnormal: false }
  ];

  // Dummy Lab Data: Comprehensive Metabolic Panel (CMP)
  cmp = [
    // --- Electrolytes & Glucose ---
    { label: 'Glucose', value: '115', units: 'mg/dL', reference: '70-100', abnormal: true }, // High
    { label: 'Ca', value: '9.2', units: 'mg/dL', reference: '8.5-10.2', abnormal: false },
    { label: 'Na', value: '138', units: 'mEq/L', reference: '135-145', abnormal: false },
    { label: 'K', value: '3.1', units: 'mEq/L', reference: '3.5-5.2', abnormal: true }, // Low (Hypokalemia)
    { label: 'Cl', value: '101', units: 'mEq/L', reference: '96-106', abnormal: false },
    { label: 'HCO3', value: '25', units: 'mEq/L', reference: '22-29', abnormal: false },

    // --- Kidney Function ---
    { label: 'BUN', value: '28', units: 'mg/dL', reference: '6-20', abnormal: true }, // High
    { label: 'Creat', value: '1.4', units: 'mg/dL', reference: '0.6-1.3', abnormal: true }, // High
    
    // --- Protein/Albumin ---
    { label: 'Total Protein', value: '7.1', units: 'g/dL', reference: '6.0-8.3', abnormal: false },
    { label: 'Albumin', value: '4.2', units: 'g/dL', reference: '3.4-5.4', abnormal: false },

    // --- Liver Function Tests (LFTs) ---
    { label: 'Tbili', value: '0.5', units: 'mg/dL', reference: '0.1-1.2', abnormal: false },
    { label: 'ALP', value: '85', units: 'U/L', reference: '20-130', abnormal: false },
    { label: 'ALT', value: '45', units: 'U/L', reference: '4-36', abnormal: true }, // High
    { label: 'AST', value: '30', units: 'U/L', reference: '8-33', abnormal: false }
  ];
  
  imagingResults: string[] = ['03/17/2025 - CXR: No acute cardiopulmonary process.', '03/17/2025 - Abdominal CT: Stable diverticulosis.'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const mrnParam = params.get('mrn');
        if (mrnParam === null) {
          console.error('No MRN provided in URL');
          this.router.navigate(['/dashboard']);
          return;
        }
        this.patientMrn = +mrnParam;
        if (isNaN(this.patientMrn)) {
          console.error('Invalid MRN format');
          this.router.navigate(['/dashboard']);
          return;
        }

        this.loadPatient(this.patientMrn);

      },
      error: (error) => {
        console.error('Error getting patient MRN:', error);
        this.router.navigate(['/dashboard']);
      }
    });
  }

  private loadPatient(mrn: number): void {
    this.patientService.getPatientByMrn(mrn).subscribe({
      next: (patient: Patient | undefined) => {
        this.patient = patient;
      },
      error: (error: any) => {
        console.error('Error loading patient:', error);
        this.router.navigate(['/dashboard']);
      } 
    });
  }

}
