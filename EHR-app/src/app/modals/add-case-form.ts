import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Inject, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SurgeryCase } from "../surgery case/surgery-case";
import { DIALOG_DATA, DialogModule, DialogRef } from "@angular/cdk/dialog";
import { SurgeryCaseService } from "../surgery case/surgery-case.service";
import { PatientService } from "../patient/patient.service";
import { Patient } from "../patient/patient";
import { HttpErrorResponse } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { map, Observable } from "rxjs";
import { User } from "../user/user";
import { UserService } from "../user/user.service";

@Component({
  selector: 'app-add-case',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule],
  templateUrl: './add-case-form.html',
  styleUrl: './add-case-form.css'
})

export class AddCaseComponent {
  surgeryCaseService = inject(SurgeryCaseService);
  patientService = inject(PatientService);
  userService = inject(UserService);
  snackBar = inject(MatSnackBar);

  public patients!: Patient[];
  public filteredPatients: Patient[] = [];
  public searchTerm: string = '';
  public showDropdown = false;

  addCaseForm = new FormGroup({
    patient: new FormControl('', [Validators.required]),
    procedure: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    surgeon: new FormControl('', [Validators.required]),
    anesthesia: new FormControl('', [Validators.required]),
    nurse: new FormControl(''),
    scrub: new FormControl('')      
  });

  surgeonUsers$: Observable<User[]>;
  anesthesiaUsers$: Observable<User[]>;
  nurseUsers$: Observable<User[]>;
  scrubUsers$: Observable<User[]>;

  constructor(
    @Inject(DIALOG_DATA) public data: { roomId: number, surgeryCase: SurgeryCase, flowboard: any },
    private dialogRef: DialogRef<AddCaseComponent>
  ) {
    
    const allUsers$ = this.userService.getUsers();

    this.surgeonUsers$ = allUsers$.pipe(
      map(users => users.filter(user => user.userRole === 'surgeon'))
    );

    this.anesthesiaUsers$ = allUsers$.pipe(
      map(users => users.filter(user => user.userRole === 'anesthesia'))
    );
    
    this.nurseUsers$ = allUsers$.pipe(
      map(users => users.filter(user => user.userRole === 'nurse'))
    );
    
    this.scrubUsers$ = allUsers$.pipe(
      map(users => users.filter(user => user.userRole === 'scrub'))
    );
  }

  

  addCase(roomId: number) {

    if (!this.addCaseForm.value.patient || !this.addCaseForm.value.procedure || !this.addCaseForm.value.startTime || 
        !this.addCaseForm.value.endTime || !this.addCaseForm.value.surgeon || !this.addCaseForm.value.anesthesia) {
      console.error('Required fields are missing');
      return;
    }
    
    const startTime = this.addCaseForm.value.startTime;
    const endTime = this.addCaseForm.value.endTime;

    // adds the case
    this.surgeryCaseService.addSurgeryCaseToSchedule(
      this.addCaseForm.value.patient,
      this.addCaseForm.value.procedure,
      startTime,
      endTime,
      this.addCaseForm.value.surgeon,
      this.addCaseForm.value.anesthesia,
      this.addCaseForm.value.nurse ?? '',
      this.addCaseForm.value.scrub ?? '',
      this.data.roomId
    ).subscribe({
      next: (response: any) => {
        console.log('Surgery case added successfully:', response);
        this.dialogRef.close();
      },
      error: (error: any) => {
        console.error('Error adding surgery case:', error);
        this.snackBar.open('Failed to add case schedule', 'Close', { 
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }


  public closeModal() {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.getPatients();  
  }

  public getPatients(): void {
    this.patientService.getPatients().subscribe({
      next: (response: Patient[]) => {
        this.patients = response;
      },
      error: (error: HttpErrorResponse) => {
        this.snackBar.open(`Error fetching patients: ${error.message}`, 'Close', { duration: 5000 });
      }
    });
  }

  public searchPatients(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.showDropdown = true;
    
    if (!searchTerm) {
      this.filteredPatients = [];
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    this.filteredPatients = this.patients.filter(patient => 
      patient.lastName.toLowerCase().includes(searchTermLower) ||
      patient.mrn.toString().includes(searchTermLower)
    ).slice(0, 10); // Limits to 10 results
  }

  public selectPatient(patient: Patient): void {
    this.addCaseForm.patchValue({
      patient: `${patient.lastName}, ${patient.firstName} (${patient.mrn})`
    });
    this.showDropdown = false;
  }

}