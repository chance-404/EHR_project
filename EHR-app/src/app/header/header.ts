import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';


@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  
  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {}
  
}
