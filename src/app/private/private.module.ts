import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { PrivateRoutingModule } from './private-routing.module';
import { SharedModule } from '../utils/modules/shared.module';

// Containers
import { PrivateComponent } from './private.component';


@NgModule({
  declarations: [
    PrivateComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedModule
  ]
})
export class PrivateModule { }
