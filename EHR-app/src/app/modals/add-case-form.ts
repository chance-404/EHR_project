import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Case } from '../flow-board'

@Component({
  selector: 'app-addCase',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-case-form.html',
  styleUrl: './add-case-form.css'
})
export class AddCaseComponent {
  addCaseForm = new FormGroup({
    mrn: new FormControl('', [Validators.required]),
    startTime: new FormControl('', [Validators.required]),
    endTime: new FormControl('', [Validators.required]),
    surgeon: new FormControl('', [Validators.required]),
    circulator: new FormControl(''),
    scrub: new FormControl('')      
  });

  addCase(roomId: number) {
    const formValue = this.addCaseForm.value;

    const newCase: Case = {
      startTime: formValue.startTime,
      endTime: formValue.endTime,
      surgeon: formValue.surgeon,
      circulator: formValue.circulator,
      scrub: formValue.scrub,
      patient: formValue.mrn
    };

    // adds the case
    const room = this.getRoomById(roomId);
    if (room) {
      room.case.push(newCase);
    }
  }
}