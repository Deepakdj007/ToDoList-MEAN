import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../shared/snack-bar/snack-bar.component';
import { Subscription } from 'rxjs';
import { LoginResponse } from 'src/app/models/LoginResponse';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showPassword = false;
  showConfirmPassword = false;
  loginForm!: FormGroup;
  submitted: boolean = false;
  registerSubscription!:Subscription;
  durationInSeconds: number = 2;
  loginResponse!:LoginResponse;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService:UserService,
    private router:Router
    ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  openSnackBar(registerMessage:string, registrationStatus:string, src:string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: "center",
      verticalPosition: "top",
      data: { message: registerMessage, status:registrationStatus, src:src}
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    else{
      const {email, password} = this.loginForm.value;
      this.registerSubscription = this.userService.loginUser({email:email, password:password})
      .subscribe((res:any)=>{
        this.openSnackBar(`Welcome ${res.user.name}`,"success", '../../../../assets/success.png');
        this.loginResponse = res;
        console.log(res)
        this.userService.setUser(res.user);
        this.router.navigate(['/todays-tasks']);
      },
      (err)=>{
      this.openSnackBar(err.error.msg,"failed",'../../../../assets/failed.png')
      console.log(err)
    }
      )

    }
  }
}
