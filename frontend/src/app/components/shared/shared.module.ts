import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {SharedModules} from 'src/app/shared/shared.modules';

@NgModule({
  declarations: [
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    SharedModules
  ],
  exports:[
    ToolbarComponent
  ]
})
export class SharedModule { }
