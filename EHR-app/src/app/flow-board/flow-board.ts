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
  

  room1: Room;
  room2: Room;
  room3: Room;
  room4: Room;
  room5: Room;
  room6: Room;

  constructor() {
    this.room1 = {
      id: 1,
      name: 'Room 1',
      surgeryCase: []
    };
    this.room2 = {
      id: 2,
      name: 'Room 2',
      surgeryCase: []
    };
    this.room3 = {
      id: 3,
      name: 'Room 3',
      surgeryCase: []
    };
    this.room4 = {
      id: 4,
      name: 'Room 4',
      surgeryCase: []
    };
    this.room5 = {
      id: 5,
      name: 'Room 5',
      surgeryCase: []
    };
    this.room6 = {
      id: 6,
      name: 'Room 6',
      surgeryCase: []
    };
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
          const mrn = this.extractMrnFromString(surgeryCase.patient);
          if (mrn) {
            surgeryCase.fullPatient = patientMap.get(mrn);
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
    this.room1.surgeryCase = [];
    this.room2.surgeryCase = [];
    this.room3.surgeryCase = [];
    this.room4.surgeryCase = [];
    this.room5.surgeryCase = [];
    this.room6.surgeryCase = [];

    this.surgeryCases.forEach(surgeryCase => {
      const room = this.getRoomById(surgeryCase.roomId);
      if (room) {
        room.surgeryCase.push(surgeryCase);
      }
    });
  }    

  private extractMrnFromString(patientString: string): number | undefined {
    const match = patientString.match(/\((\d+)\)/);
    return match ? parseInt(match[1], 10) : undefined;
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
    switch(id) {
      case 1: return this.room1;
      case 2: return this.room2;
      case 3: return this.room3;
      case 4: return this.room4;
      case 5: return this.room5;
      case 6: return this.room6;
      default: return null;
    }
  }

}



