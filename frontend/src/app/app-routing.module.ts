import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './components/home/lists/lists.component';
import { TodaysComponent } from './components/home/todays/todays.component';
import { ScheduledComponent } from './components/home/scheduled/scheduled.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { LoginGuard } from './Guards/login.guard';

const routes: Routes = [
  {path:'', component:ListsComponent, canActivate: [LoginGuard]},
  {path:'lists', redirectTo:'', pathMatch:'full', canActivate: [LoginGuard]},
  {path:'todays-tasks', component:TodaysComponent, canActivate: [LoginGuard]},
  {path:'scheduled-tasks', component:ScheduledComponent, canActivate: [LoginGuard]},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
