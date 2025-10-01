import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { DIALOG_DATA } from "@angular/cdk/dialog";
import { DialogRef } from '@angular/cdk/dialog';
import { SurgeryCase } from "../surgery case/surgery-case";

@Component({
  selector: 'app-addCase',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-case-form.html',
  styleUrl: './add-case-form.css'
})

export class AddCaseComponent {
  addCaseForm = new FormGroup({
    mrn: new FormControl('', [Validators.required]),
    procedure: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    surgeon: new FormControl('', [Validators.required]),
    circulator: new FormControl(''),
    scrub: new FormControl('')      
  });

  constructor(
    @Inject(DIALOG_DATA) public data: { roomId: number, flowboard: any },
    private dialogRef: DialogRef
  ) {}

  addCase(roomId: number) {
    const formValue = this.addCaseForm.value;

    const newCase: Case = {
      procedure: formValue.procedure || '',
      startTime: formValue.startTime || '',
      endTime: formValue.endTime || '',
      surgeon: formValue.surgeon || '',
      circulator: formValue.circulator || '',
      scrub: formValue.scrub || '',
      patient: formValue.mrn || ''
    };

    // adds the case
    this.data.flowboard.addCaseToRoom(this.data.roomId, newCase);
    // close modal when complete
    this.dialogRef.close()
  }
}