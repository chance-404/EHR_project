import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from 'express';


@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  
  // private router = inject(Router)
 
  // public logout() {
  //   // Clear all stored session data
  //   localStorage.clear();
  //   sessionStorage.clear();
  //   this.router.navigate(['/login']);
  // }
  
}
