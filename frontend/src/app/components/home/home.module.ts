import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ListsComponent } from './lists/lists.component';
import { ScheduledComponent } from './scheduled/scheduled.component';
import { TodaysComponent } from './todays/todays.component';


@NgModule({
  declarations: [
    ListsComponent,
    ScheduledComponent,
    TodaysComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  exports:[
    ListsComponent,
    ScheduledComponent,
    TodaysComponent
  ]
})
export class HomeModule { }
