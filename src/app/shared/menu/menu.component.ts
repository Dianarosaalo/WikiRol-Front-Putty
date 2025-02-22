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
  isDropDownOpen4=false;
  isDropDownOpen5=false;
  isDropDownOpen6=false;
  isDropDownOpenSmall=false;
  isLogged=false;
  currentColor=localStorage.getItem('color') || 'light'

  ngOnInit(): void {
    if (localStorage.getItem('user'))
      this.isLogged=true;
  }

  constructor(private readonly router: Router) {}

  logOut(){
    this.router.navigate(['/reviews']);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLogged=false;
  }

  toggleDropdown() {
    this.isDropDownOpen = !this.isDropDownOpen;
    this.isDropDownOpen2=false;
    this.isDropDownOpen3=false;
    this.isDropDownOpen4=false;
    this.isDropDownOpen5=false;
    this.isDropDownOpen6=false;

    if(this.isDropDownOpen)
    {
      setTimeout(() => {
        this.isDropDownOpen=false;
      },7050);
    }
  }

  toggleDropdown2() {
    this.isDropDownOpen2 = !this.isDropDownOpen2;
    this.isDropDownOpen=false;
    this.isDropDownOpen3=false;
    this.isDropDownOpen4=false;
    this.isDropDownOpen5=false;
    this.isDropDownOpen6=false;

    if(this.isDropDownOpen2)
    {
      setTimeout(() => {
        this.isDropDownOpen2=false;
      },7050);
    }
  }

  toggleDropdown5() {
    this.isDropDownOpen5 = !this.isDropDownOpen2;
    this.isDropDownOpen=false;
    this.isDropDownOpen3=false;
    this.isDropDownOpen4=false;
    this.isDropDownOpen2=false;
    this.isDropDownOpen6=false;

    if(this.isDropDownOpen5)
    {
      this.isOpenA = false;
      this.isOpenB = false;

      setTimeout(() => {
        this.isDropDownOpen5=false;
      },100050);
    }
  }

  toggleDropdown6() {
    this.isDropDownOpen6 = !this.isDropDownOpen6;
    this.isDropDownOpen=false;
    this.isDropDownOpen3=false;
    this.isDropDownOpen4=false;
    this.isDropDownOpen2=false;
    this.isDropDownOpen5=false;

    if(this.isDropDownOpen6)
    {
      this.isOpenA = false;
      this.isOpenB = false;

      setTimeout(() => {
        this.isDropDownOpen6=false;
      },100050);
    }
  }

  toggleDropdown3() {
    this.isDropDownOpen3 = !this.isDropDownOpen3;
    this.isDropDownOpen=false;
    this.isDropDownOpen2=false;
    this.isDropDownOpen4=false;
    this.isDropDownOpen5=false;
    this.isDropDownOpen6=false;

    if(this.isDropDownOpen3)
    {
      setTimeout(() => {
        this.isDropDownOpen3=false;
      },7050);
    }
  }

  toggleDropdown4() {
    this.isDropDownOpen4 = !this.isDropDownOpen4;
    this.isDropDownOpen=false;
    this.isDropDownOpen2=false;
    this.isDropDownOpen3=false;
    this.isDropDownOpen5=false;
    this.isDropDownOpen6=false;

    if(this.isDropDownOpen4)
    {
      setTimeout(() => {
        this.isDropDownOpen4=false;
      },7050);
    }
  }

  toggleDropdownSmall() {
    this.isDropDownOpenSmall = !this.isDropDownOpenSmall;
    this.isDropDownOpen=false;
    this.isDropDownOpen2=false;
    this.isDropDownOpen3=false;
    this.isDropDownOpen5=false;
    this.isDropDownOpen4=false;
    this.isDropDownOpen6=false;

    if(this.isDropDownOpenSmall)
    {
      setTimeout(() => {
        this.isDropDownOpenSmall=false;
      },7050);
    }
  }


  isOpenA = false;
  isOpenB = false;

  toggleA() {
    this.isOpenA = !this.isOpenA;
    this.isOpenB = false;
  }

  toggleB() {
    this.isOpenB = !this.isOpenB;
    this.isOpenA = false;
  }

}
