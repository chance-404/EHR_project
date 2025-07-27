import { Component } from '@angular/core';
import { Header } from "../header/header";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-flow-board',
  imports: [Header, RouterModule],
  templateUrl: './flow-board.html',
  styleUrl: './flow-board.css'
})
export class FlowBoard {

}
