import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Inject, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SurgeryCase } from "../surgery case/surgery-case";
import { DIALOG_DATA, DialogModule, DialogRef } from "@angular/cdk/dialog";

@Component({
  selector: 'app-add-case',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule],
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
    private dialogRef: DialogRef<AddCaseComponent>
  ) {}

  addCase(roomId: number) {
    const formValue = this.addCaseForm.value;

    const newSurgeryCase: SurgeryCase = {
      procedure: formValue.procedure || '',
      startTime: formValue.startTime || '',
      endTime: formValue.endTime || '',
      surgeon: formValue.surgeon || '',
      circulator: formValue.circulator || '',
      scrub: formValue.scrub || '',
      patient: formValue.mrn || '',
      surgeryCaseId: 0,
      roomId: 0
    };
    // adds the case
    this.data.flowboard.addCaseToRoom(this.data.roomId, newSurgeryCase);
    // close modal when complete
    this.dialogRef.close()
  }

  @Output() close = new EventEmitter<void>();
  closeModal() {
    this.close.emit();
  }
}