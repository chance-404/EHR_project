import { Component, inject, NgModule } from '@angular/core';
import { Header } from "../header/header";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { AddCaseComponent } from '../modals/add-case-form';

export interface Case {
  startTime: string;
  endTime: string;
  surgeon: string;
  circulator: string;
  scrub: string;
  patient: string;
}

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

export class FlowBoard {
  private dialog = inject(Dialog);
  protected openModal() {
    this.dialog.open(AddCaseComponent);
  }
  
  room1: Room;
  room2: Room;
  room3: Room;
  room4: Room;
  room5: Room;
  room6: Room;
  roomId: any;

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


