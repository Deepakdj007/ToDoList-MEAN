import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../shared/snack-bar/snack-bar.component';
import { RegisterService } from 'src/app/services/register.service';
import { Subscription } from 'rxjs';

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
  durationInSeconds: number = 5;

  constructor(private fb: FormBuilder,private _snackBar: MatSnackBar,private registerService:RegisterService) {}

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
    this._snackBar.openFromComponent(SnackBarComponent, {
      // duration: this.durationInSeconds * 1000,
      duration: 50000 * 1000,
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
      this.registerSubscription = this.registerService.loginUser({email:email, password:password})
      .subscribe((res:any)=>{
        this.openSnackBar(`welcome ${res.user.name}`,"success", '../../../../assets/success.png');
        console.log(res)
      },
      (err)=>{
      this.openSnackBar(err.error.msg,"failed",'../../../../assets/failed.png')
      console.log(err)
    }
      )

    }
  }
}
