import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/shared/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    ) {}

    openSnackBar(registerMessage:string, registrationStatus:string, src:string) {
      this.snackBar.openFromComponent(SnackBarComponent, {
        duration: 50000 * 1000,
        horizontalPosition: "center",
        verticalPosition: "top",
        data: { message: registerMessage, status:registrationStatus, src:src}
      });
    }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    const user = this.userService.getUser();



    if (user) {
      // User is authenticated, allow access
      return true;
    } else {
      // User is not authenticated, redirect to login page
      this.router.navigate(['/login']);
      this.openSnackBar("Unauthorized Access, Please log in","accesDenied",'../../../../assets/failed.png')
      return false;
    }
  }

}
