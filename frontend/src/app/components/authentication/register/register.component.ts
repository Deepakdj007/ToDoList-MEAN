import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/validator';
import { RegisterService } from 'src/app/services/register.service';
import { Subscribable, Subscription } from 'rxjs';
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

  constructor(private fb: FormBuilder, private registerService:RegisterService) {}

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

  onSubmit(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return
    }
    else{
      const {name, email, password} = this.registerForm.value;
      this.registerSubscription = this.registerService.createUser({name:name, email:email, password:password})
      .subscribe((res)=>{
        console.log(res)
      },
      (err)=>{
      console.log(err)
    }
      )

    }
  }

  ngOnDestroy(): void {
    this.registerSubscription.unsubscribe()
  }
}
