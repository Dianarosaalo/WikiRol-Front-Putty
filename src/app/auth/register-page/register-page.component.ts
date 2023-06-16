import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'fs-register-page',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{

  newRegister=this.resetRegister();
  saved = false;
  @ViewChild('registerForm') registerForm!: NgForm;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canDeactivate() {
    return (
      this.saved ||
      this.registerForm.pristine ||
      confirm('Do you really want to leave?. Changes will be lost')
    );
  }

  resetRegister() {
    return {
      name: '',
      password: '',
      avatar:'',
      key:'',
    };
  }

  ngOnInit(): void {
    console.log("");
  }

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid,
    };
  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) {
      return;
    }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.newRegister.avatar = reader.result as string;
    });
  }

  registerUser(){
    this.saved = true;
    this.authService.register(this.newRegister).subscribe({
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      next: () => {},
      error: (error) => console.error("error:" + error),
    })
    this.router.navigate(['/auth/login']);
  }
}
