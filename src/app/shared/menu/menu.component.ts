import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'fs-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  isDropDownOpen=false;
  isDropDownOpen2=false;
  isDropDownOpen3=false;

  constructor(private readonly router: Router) {}

  logOut(){
    this.router.navigate(['/reviews']);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  toggleDropdown() {
    this.isDropDownOpen = !this.isDropDownOpen;
    this.isDropDownOpen2=false;
    this.isDropDownOpen3=false;

    if(this.isDropDownOpen)
    {
      setTimeout(() => {
        this.isDropDownOpen=false;
      },2050);
    }
  }

  toggleDropdown2() {
    this.isDropDownOpen2 = !this.isDropDownOpen2;
    this.isDropDownOpen=false;
    this.isDropDownOpen3=false;

    if(this.isDropDownOpen2)
    {
      setTimeout(() => {
        this.isDropDownOpen2=false;
      },2050);
    }
  }

  toggleDropdown3() {
    this.isDropDownOpen3 = !this.isDropDownOpen3;
    this.isDropDownOpen=false;
    this.isDropDownOpen2=false;

    if(this.isDropDownOpen3)
    {
      setTimeout(() => {
        this.isDropDownOpen3=false;
      },2050);
    }
  }

}
