import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'fs-user-edit-page',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.css']
})
export class UserEditPageComponent {
  @ViewChild('nameModified') nameModified!: NgForm;
  @ViewChild('passwdModified') passwdModified!: NgForm;

  name = '';
  passwd = '';
  passwd2 = '';
  id = String(JSON.parse(localStorage.getItem("user")!))

  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) {

  }
modifyPassword() {
  this.userService.passwdEdit(this.passwd,this.id).subscribe(()=>{
    this.router.navigate(['users/me']);
  });
}
modifyName() {
  this.userService.nameEdit(this.name,this.id).subscribe(()=>{
    this.router.navigate(['users/me']);
  });
}

modifyAvatar() {
  this.userService.avatarEdit((document.getElementById("photo") as HTMLImageElement).src,this.id).subscribe(()=>{
    this.router.navigate(['users/me']);
  });
}

changeImage(fileInput: HTMLInputElement) {
  if (!fileInput.files || fileInput.files.length === 0) {
    return;
  }
  const reader: FileReader = new FileReader();
  reader.readAsDataURL(fileInput.files[0]);
  reader.addEventListener('loadend', () => {
    (document.getElementById('photo') as HTMLInputElement).src = reader.result as string;
  });

  }
}
