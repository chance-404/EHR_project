import { Component, inject, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { SurgeryCase } from '../surgery case/surgery-case';
import { SurgeryCaseService } from '../surgery case/surgery-case.service';
import { AddCaseComponent } from '../modals/add-case-form';
import { TimeFormatPipe } from '../pipes/time-format.pipe';
import { SurgeryCaseComponent } from '../modals/case-form';
import { PatientService } from '../patient/patient.service';
import { forkJoin } from 'rxjs';


export interface Room {
  	id: number;
  	name: string;
  	surgeryCase: SurgeryCase[];
}

@Component({
  	selector: 'app-flow-board',
  	standalone: true,
  	imports: [Header, RouterModule, CommonModule, DialogModule, TimeFormatPipe],
  	templateUrl: './flow-board.html',
  	styleUrl: './flow-board.css'
})

export class FlowBoard implements OnInit {
  	private surgeryCaseService = inject(SurgeryCaseService);
  	private dialog = inject(Dialog);
  	private patientService = inject(PatientService);
  	public surgeryCases!: SurgeryCase[];

  	rooms: Room[] = [];

  	constructor() {
    	this.rooms = Array.from({ length:6 }, (_,i) => ({
      	id: i + 1,
      	name: `Room ${i + 1}`,
      	surgeryCase: []
    	}));
  	}

  	ngOnInit() {
    	this.loadFlowboardData();
  	}

	public loadFlowboardData(): void {
		// forkJoin ensures both requests finish before processing
		forkJoin({
			cases: this.surgeryCaseService.getSurgeryCases(),
			patients: this.patientService.getPatients()
		}).subscribe({
			next: ({ cases, patients }) => {
				const patientMap = new Map(patients.map(p => [String(p.mrn), p]));

				cases.forEach(surgeryCase => {
					if (surgeryCase.patient) {
						const mrnMatch = surgeryCase.patient.match(/\(([^)]+)\)/);
						const extractedMrn = mrnMatch ? mrnMatch[1] : surgeryCase.patient;
						surgeryCase.fullPatient = patientMap.get(String(extractedMrn));
					}
				});
				// sort and distribute cases to rooms
				cases.sort((a, b) => a.scheduledStartTime.localeCompare(b.scheduledStartTime));
				this.surgeryCases = cases;
				this.distributeCasesToRooms();
			},
			error: (err) => console.error('Error loading flowboard data:', err)
		});
	}



  private distributeCasesToRooms(): void { 
	  // clears cases in rooms
	  this.rooms.forEach(room => room.surgeryCase = []);
      // assigns cases to rooms
      this.surgeryCases.forEach(surgeryCase => {
		  if (surgeryCase.surgeryCaseStatus === 'Completed') {
			  return;
		  }
		  // Do not load 'Completed' cases
    	  const room = this.getRoomById(surgeryCase.roomId);
          if (room) {
        	  room.surgeryCase.push(surgeryCase);
          }
      });
  }    

  

  public openModal(roomId: number): void {
    console.log('Opening modal for room:', roomId);
    try {
      const dialogRef = this.dialog.open(AddCaseComponent, {
        data: {
          roomId: roomId,
          flowboard: this
        },
        width: '500px',
        height: '600px',
        minWidth: '300px',
        maxHeight: '80vh'
      });

      dialogRef.closed.subscribe(() => {
        console.log('Dialog closed successfully');
        // refresh surgery cases when modal closes
        this.loadFlowboardData();
      });
    } catch (error) {
      console.error('Error opening dialog:', error);
    }
  }

  public openSurgeryCaseModal(surgeryCase: any) {
    console.log('Opening modal for case:', surgeryCase.surgeryCaseId);
    try {
      const dialogRef = this.dialog.open(SurgeryCaseComponent, {
        data: {
          SurgeryCase: surgeryCase,
          flowboard: this
        },
        width: '500px',
        height: '600px',
        minWidth: '300px',
        maxHeight: '80vh'
      });

      dialogRef.closed.subscribe(() => {
        console.log('Dialog closed successfully');
        // refresh surgery cases when modal closes
        this.loadFlowboardData();
      });
    } catch (error) {
      console.error('Error opening dialog:', error);
    }
  }

  public getRoomById(id: number): Room | null {
    return this.rooms.find(room => room.id === id) || null;
    }

}



