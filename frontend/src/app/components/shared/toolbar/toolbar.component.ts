import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(
    private userService:UserService,
    private router:Router
    ){}

  getUser(){
    if(!(this.userService.getUser()=== null)){
      return {...this.userService.getUser(), loggedin:true};
    }
    else{
      return {name:"Name", email:"email@email.com", loggedin:false};
    }
  }

  logOut(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
