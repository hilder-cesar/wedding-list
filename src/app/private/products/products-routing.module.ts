import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Container
import { ProductsComponent } from './products.component';

// Components
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = [
  { path: '', component: ProductsComponent, children: [
    { path: 'lista', component: ProductsListComponent },
    { path: 'criar', component: ProductsDetailComponent },
    { path: 'detalhes/:id', component: ProductsDetailComponent },
    { path: '**', redirectTo: 'lista', pathMatch: 'full' }
  ]} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
