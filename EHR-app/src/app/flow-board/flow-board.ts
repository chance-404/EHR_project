import { Component, inject, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { SurgeryCase } from '../surgery case/surgery-case';
import { SurgeryCaseService } from '../surgery case/surgery-case.service';
import { AddCaseComponent } from '../modals/add-case-form';
import { TimeFormatPipe } from '../pipes/time-format.pipe';

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
    this.getSurgeryCases();
  }

  public getSurgeryCases(): void {
    this.surgeryCaseService.getSurgeryCases().subscribe({
      next: (response: SurgeryCase[]) => {
        console.log('Raw surgery cases:', response);
        this.surgeryCases = response;
        
        // Reset all room surgery cases
        this.room1.surgeryCase = [];
        this.room2.surgeryCase = [];
        this.room3.surgeryCase = [];
        this.room4.surgeryCase = [];
        this.room5.surgeryCase = [];
        this.room6.surgeryCase = [];

        // Distribute surgery cases to their respective rooms
        response.forEach(surgeryCase => {
          console.log('Processing case:', surgeryCase);
          console.log('Time values:', {
            startTime: surgeryCase.startTime,
            endTime: surgeryCase.endTime
          });
          const room = this.getRoomById(surgeryCase.roomId);
          if (room) {
            room.surgeryCase.push(surgeryCase);
          }
        });

        // Log the final state of rooms
        console.log('Room 1 cases:', this.room1.surgeryCase);
        console.log('Room 2 cases:', this.room2.surgeryCase);
        console.log('Room 3 cases:', this.room3.surgeryCase);
        console.log('Room 4 cases:', this.room4.surgeryCase);
        console.log('Room 5 cases:', this.room5.surgeryCase);
        console.log('Room 6 cases:', this.room6.surgeryCase);
      },
      error: (error) => {
        console.error('Error loading surgery cases:', error);
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
          this.getSurgeryCases();
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



