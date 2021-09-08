import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from 'src/app/utils/modules/shared.module';

// Container
import { ProductsComponent } from './products.component';

// Components
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    ProductsDetailComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
