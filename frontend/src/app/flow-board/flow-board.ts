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
    	this.surgeryCaseService.getSurgeryCases().subscribe(cases => {
      	this.patientService.getPatients().subscribe(patients => {
        	// map to lookup patients by MRN
        	const patientMap = new Map(patients.map(p => [p.mrn, p]));
        	// link each case to the full patient object
        	cases.forEach(surgeryCase => {
          		if (surgeryCase.patient) {
            		surgeryCase.fullPatient = patientMap.get(surgeryCase.patient);
          		}
        	});

        // sort cases by start time
        cases.sort((a, b) => a.startTime.localeCompare(b.startTime));
        this.surgeryCases = cases;
        this.distributeCasesToRooms();
      });
    });
  }

  private distributeCasesToRooms(): void { 
	// clears cases in rooms
	this.rooms.forEach(room => room.surgeryCase = []);
    // assigns cases to rooms
    this.surgeryCases.forEach(surgeryCase => {
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



