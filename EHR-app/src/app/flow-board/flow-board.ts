import { Component } from '@angular/core';
import { Header } from "../header/header";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Case {
  startTime: string;
  length: string;
  people: string;
}

interface Room {
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
      id: 1,
      name: 'Room 1',
      case:[]
    };
    this.room3 = {
      id: 1,
      name: 'Room 1',
      case:[]
    };
    this.room4 = {
      id: 1,
      name: 'Room 1',
      case:[]
    };
    this.room5 = {
      id: 1,
      name: 'Room 1',
      case:[]
    };
    this.room6 = {
      id: 1,
      name: 'Room 1',
      case:[]
    };
  }

  addCase(roomId: number) {
    const startTime = prompt("Enter start time (e.g., 09:00):");
    if (!startTime) return;

    const length = prompt("Enter est. length (e.g., 1h or 30m):");
    if (!length) return;

    const people = prompt("Enter people (comma separated):");
    if (!people) return;

   
      this.roomId.case.push (
      startTime,
      length,
      people
      );
  }
}


