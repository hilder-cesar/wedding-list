import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { PublicRoutingModule } from './public-routing.module';

// Container
import { PublicComponent } from './public.component';

// Components
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../utils/modules/shared.module';


@NgModule({
  declarations: [
    PublicComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ]
})
export class PublicModule { }
