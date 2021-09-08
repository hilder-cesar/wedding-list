import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Container
import { GuestsComponent } from './guests.component';

// Components
import { GuestsDetailComponent } from './guests-detail/guests-detail.component';
import { GuestsListComponent } from './guests-list/guests-list.component';

const routes: Routes = [
  { path: '', component: GuestsComponent, children: [
    { path: 'lista', component: GuestsListComponent },
    { path: 'criar', component: GuestsDetailComponent },
    { path: 'detalhes/:id', component: GuestsDetailComponent },
    { path: '**', redirectTo: 'lista', pathMatch: 'full' }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestsRoutingModule { }
