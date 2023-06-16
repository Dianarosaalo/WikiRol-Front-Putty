import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserLogin } from '../interfaces/login';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'fs-login-page',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit{
  newLogin = this.resetUserLogin();
  saved=false;
  @ViewChild('loginForm') loginForm!: NgForm;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

   canDeactivate() {
    return this.saved || this.loginForm.pristine || confirm("Do you really want to leave?. Changes will be lost");
  }

  resetUserLogin():UserLogin {
    return {
      name: '',
      password: '',
      avatar:''
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

  loginUser() {
    this.authService.login(this.newLogin).subscribe({
      next: (res) => {
        this.saved = true;
        localStorage.setItem("token",res.token);
        localStorage.setItem("user",JSON.stringify(res.user));
        this.router.navigate(['/campaigns']);
      },
      error: (error) => console.error("error:" + error, this.newLogin),
    })
  }
}
