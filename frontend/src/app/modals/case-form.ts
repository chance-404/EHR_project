import { CommonModule, DatePipe } from "@angular/common";
import { Component, EventEmitter, inject, Inject, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { DIALOG_DATA, DialogModule, DialogRef } from "@angular/cdk/dialog";
import { SurgeryCaseService } from "../surgery case/surgery-case.service";
import { PatientService } from "../patient/patient.service";
import { SurgeryCase } from "../surgery case/surgery-case";

import { MatSnackBar } from "@angular/material/snack-bar";
import { UserService } from "../user/user.service";
import { map, Observable } from "rxjs";
import { User } from "../user/user";
import { TimeFormatPipe } from "../pipes/time-format.pipe";


@Component({
	selector: 'app-case',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, DialogModule, DatePipe, TimeFormatPipe],
	templateUrl: './case-form.html',
	styleUrl: './case-form.css'
})

export class SurgeryCaseComponent implements OnInit{
	surgeryCaseService = inject(SurgeryCaseService);
	patientService = inject(PatientService);
	userService = inject(UserService);
	snackBar = inject(MatSnackBar);

	public currentSurgeryCase: SurgeryCase;
	public currentRoomId: number;

	SurgeryCaseForm = new FormGroup({
		patient: new FormControl('', [Validators.required]),
		procedure: new FormControl('', [Validators.required]),
		startTime: new FormControl('', [Validators.required]),
		actualStartTime: new FormControl(''),
		endTime: new FormControl('', [Validators.required]),
		actualEndTime: new FormControl(''),
		surgeon: new FormControl('', [Validators.required]),
		anesthesia: new FormControl('', [Validators.required]),
		nurse: new FormControl(''),
		scrub: new FormControl(''),      
		selectedRoom: new FormControl(''),
		surgeryCaseStatus: new FormControl(''),
		notes: new FormControl('', [Validators.maxLength(500)])
  });

  surgeonUsers$: Observable<User[]>;
  anesthesiaUsers$: Observable<User[]>;
  nurseUsers$: Observable<User[]>;
  scrubUsers$: Observable<User[]>;

  constructor(
		@Inject(DIALOG_DATA) public data: { SurgeryCase: SurgeryCase, flowboard: any },
		private dialogRef: DialogRef<SurgeryCaseComponent>
  ) {
		this.currentSurgeryCase = data.SurgeryCase;
		this.currentRoomId = data.SurgeryCase.roomId;
		
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
  ngOnInit(): void {
		if (this.currentSurgeryCase) {
			this.SurgeryCaseForm.patchValue({
				patient: this.currentSurgeryCase.patient,
				procedure: this.currentSurgeryCase.procedure,
				startTime: this.currentSurgeryCase.scheduledStartTime,
				actualStartTime: this.currentSurgeryCase.actualStartTime,
				endTime: this.currentSurgeryCase.endTime,
				actualEndTime: this.currentSurgeryCase.actualEndTime,
				surgeon: this.currentSurgeryCase.surgeon,
				anesthesia: this.currentSurgeryCase.anesthesia,
				nurse: this.currentSurgeryCase.nurse,
				scrub: this.currentSurgeryCase.scrub,
				selectedRoom: 'room' + this.currentSurgeryCase.roomId.toString(), 
				surgeryCaseStatus: this.currentSurgeryCase.surgeryCaseStatus,
				notes: this.currentSurgeryCase.notes
			})
		}
  }

  updateSurgeryCase() {
		if (this.SurgeryCaseForm.valid && this.currentSurgeryCase.surgeryCaseId) {
      		const formValue = this.SurgeryCaseForm.value;
      		const selectedRoom = formValue.selectedRoom || ('room' + this.currentRoomId);
      		const newRoomId = parseInt(selectedRoom.replace('room', ''));

		const updatedSurgeryCase: SurgeryCase = {
			surgeryCaseId: this.currentSurgeryCase.surgeryCaseId,
			patient: formValue.patient!,
			procedure: formValue.procedure!,
			scheduledStartTime: formValue.startTime!,
			actualStartTime: formValue.actualStartTime! || '',
			endTime: formValue.endTime!,
			actualEndTime: formValue.actualEndTime! || '',
			surgeon: formValue.surgeon!,
			anesthesia: formValue.anesthesia!,
			nurse: formValue.nurse!,
			scrub: formValue.scrub!,
			roomId: newRoomId!,
			surgeryCaseStatus: formValue.surgeryCaseStatus!,
			notes: formValue.notes || '',
			dateOfCase: this.currentSurgeryCase.dateOfCase
		}

		this.surgeryCaseService.updateSurgeryCase(updatedSurgeryCase).subscribe({
			next: (response: any) => {
			console.log('Surgery case updated successfully:', response);
			this.dialogRef.close();
			this.snackBar.open('Case updated', 'Close', { 
				duration: 5000,
				panelClass: ['success-snackbar']
			});
			},
			error: (error: any) => {
			console.error('Error updating surgery case:', error);
			this.snackBar.open('Failed to update case', 'Close', { 
				duration: 5000,
				panelClass: ['error-snackbar']
			});
			}
		});
		} else {
		this.snackBar.open('Form is invalid. Please fill all required fields.', 'Close', { 
			duration: 5000,
			panelClass: ['error-snackbar']
		});
		}
  }

  deleteCase(SurgeryCase: SurgeryCase) {
		const caseIdString = SurgeryCase.surgeryCaseId?.toString();

		if (!caseIdString) {
			console.error('Cannot delete: SurgeryCase ID is missing or undefined.');
			this.snackBar.open('Cannot delete: Case ID is missing.', 'Close', { 
				duration: 5000,
				panelClass: ['error-snackbar']
		});
		return; // Stop execution if the ID is missing
		}

		this.surgeryCaseService.deleteSurgeryCase(caseIdString)
			.subscribe({
		next: (response: any) => {
			console.log('Surgery case deleted successfully:', response);
			this.dialogRef.close();
		},
		error: (error: any) => {
			console.error('Error deleting surgery case:', error);
			this.snackBar.open('Failed to delete case schedule', 'Close', { 
			duration: 5000,
			panelClass: ['error-snackbar']
			});
		}
		});
  }

  public closeModal() {
	  this.dialogRef.close();
  }

}