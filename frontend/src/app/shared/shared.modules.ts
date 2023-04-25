import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [MatButtonModule, MatIconModule,MatToolbarModule,MatMenuModule,ReactiveFormsModule],
  exports: [MatButtonModule, MatIconModule,MatToolbarModule,MatMenuModule,ReactiveFormsModule]
})
export class SharedModules { }
