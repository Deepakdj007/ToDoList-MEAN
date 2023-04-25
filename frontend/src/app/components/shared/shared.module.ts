import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {SharedModules} from 'src/app/shared/shared.modules';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    SnackBarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    SharedModules,
  ],
  exports:[
    ToolbarComponent,  
    SnackBarComponent
  ],
})
export class SharedModule { }
