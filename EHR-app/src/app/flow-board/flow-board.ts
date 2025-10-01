import { Component, inject, OnInit } from '@angular/core';
import { Header } from "../header/header";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { AddCaseComponent } from '../modals/add-case-form';
import { HttpErrorResponse } from '@angular/common/http';
import { SurgeryCaseService } from '../surgery case/surgery-case.service';
import { SurgeryCase } from '../surgery case/surgery-case';

export interface Room {
  id: number;
  name: string;
  case: Case[];
}

@Component({
  selector: 'app-flow-board',
  imports: [Header, RouterModule, CommonModule],
  templateUrl: './flow-board.html',
  styleUrl: './flow-board.css'
})

export class FlowBoard implements OnInit{
  
  private surgeryCaseService = inject(SurgeryCaseService);
  private dialog = inject(Dialog);

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
      case:[]
    };
    this.room2 = {
      id: 2,
      name: 'Room 2',
      case:[]
    };
    this.room3 = {
      id: 3,
      name: 'Room 3',
      case:[]
    };
    this.room4 = {
      id: 4,
      name: 'Room 4',
      case:[]
    };
    this.room5 = {
      id: 5,
      name: 'Room 5',
      case:[]
    };
    this.room6 = {
      id: 6,
      name: 'Room 6',
      case:[]
    };
  }

  ngOnInit() {
    this.getSurgeryCases();
  }

  public getSurgeryCases(): void {
      this.surgeryCaseService.getSurgeryCases().subscribe({
        next: (response: SurgeryCase[]) => {
          const room = this.getRoomById(this.surgeryCaseService.roomId)
        }
      });
    }

  protected openModal(roomId: number) {
    this.dialog.open(AddCaseComponent);
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


