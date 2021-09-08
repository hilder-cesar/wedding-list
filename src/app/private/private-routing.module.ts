import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Container
import { PrivateComponent } from './private.component';

const routes: Routes = [
  {
    path: '', component: PrivateComponent, children: [
      { path: 'produtos', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
      { path: 'convidados', loadChildren: () => import('./guests/guests.module').then(m => m.GuestsModule) },
      { path: '**', redirectTo: 'produtos', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
