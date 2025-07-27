import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Patient } from '../patient/patient';


@Component({
  selector: 'app-header',
  imports: [FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

}
