import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { GuestsRoutingModule } from './guests-routing.module';
import { SharedModule } from 'src/app/utils/modules/shared.module';

// Container
import { GuestsComponent } from './guests.component';

// Components
import { GuestsListComponent } from './guests-list/guests-list.component';
import { GuestsDetailComponent } from './guests-detail/guests-detail.component';


@NgModule({
  declarations: [
    GuestsComponent,
    GuestsListComponent,
    GuestsDetailComponent
  ],
  imports: [
    CommonModule,
    GuestsRoutingModule,
    SharedModule
  ]
})
export class GuestsModule { }
