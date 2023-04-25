import { Component, OnDestroy, OnInit ,Renderer2} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/validator';
import { RegisterService } from 'src/app/services/register.service';
import { Subscribable, Subscription } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  showPassword = false;
  showConfirmPassword = false;
  registerForm!: FormGroup;
  submitted: boolean = false;
  registerSubscription!:Subscription;
  durationInSeconds = 5;


  constructor(private _snackBar: MatSnackBar, private fb: FormBuilder, private registerService:RegisterService,private renderer: Renderer2) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
      confirmPassword: ['', Validators.required],
    },{
      validator:CustomValidators.MustMatch('password','confirmPassword')
    });
  }

  togglePasswordVisibility(password:string) {
    if(password === 'password'){
      this.showPassword = !this.showPassword;
    }
    else{
      this.showConfirmPassword =!this.showConfirmPassword;
    }
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

  onSubmit(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return
    }
    else{
      const {name, email, password} = this.registerForm.value;
      this.registerSubscription = this.registerService.createUser({name:name, email:email, password:password})
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

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }
}
