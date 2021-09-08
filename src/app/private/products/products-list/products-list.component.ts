import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from 'rxjs/operators';

// Classes
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';

// Services
import { AlertService } from 'src/app/utils/services/alert/alert.service';
import { GenericService } from 'src/app/utils/services/generic/generic.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent extends OnDestroyClass implements OnInit {

  // Icons
  faEdit = faEdit;
  faTrash = faTrash;

  // List
  productList: any[] = [];

  constructor (
    private gService: GenericService,
    private alert: AlertService
  ) { super(); }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList(): void {
    this.gService.get('products')
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          this.productList = response.data;
          this.alert.closeAlert();
        },
        (error: any) => {
          this.alert.showAlertError(error.message);
        }
      );
  }

}
