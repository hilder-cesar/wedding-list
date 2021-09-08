import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { AlertService } from 'src/app/utils/services/alert/alert.service';
import { GenericService } from 'src/app/utils/services/generic/generic.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent extends OnDestroyClass implements OnInit {

  productForm: FormGroup;

  constructor (
    protected formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private gService: GenericService,
    private alert: AlertService,
    private router: Router
  ) {

    super();

    this.productForm = formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      price: [null, Validators.required],
      image: [null, Validators.required]
    });

  }

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.params.id;
    if (productId) { this.getProductDetail(productId); }
  }

  getProductDetail(productId: any): void {
    this.gService.get(`products/${productId}`)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          this.productForm.patchValue(response.data);
          this.alert.closeAlert();
        },
        (error: any) => {
          this.alert.showAlertError(error.message);
        }
      );
  }

  handleSubmit(): void {
    const productModel = cloneDeep(this.productForm.value);
    productModel.id ? this.handleUpdate(productModel) : this.handleCreate(productModel);
  }

  handleCreate(productModel: any): void {
    this.gService.post('products', productModel)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          this.alert.showAlertSuccess(response.message);
          this.router.navigate(['app/produtos']);
        },
        (error: any) => {
          this.alert.showAlertError(error.message);
        }
      );
  }

  handleUpdate(productModel: any): void {
    this.gService.post('products/update', productModel)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          this.alert.showAlertSuccess(response.message);
          this.router.navigate(['app/produtos']);
        },
        (error: any) => {
          this.alert.showAlertError(error.message);
        }
      );
  }

}
