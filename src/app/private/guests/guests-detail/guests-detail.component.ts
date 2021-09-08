import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { cloneDeep } from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { AlertService } from 'src/app/utils/services/alert/alert.service';
import { GenericService } from 'src/app/utils/services/generic/generic.service';

@Component({
  selector: 'app-guests-detail',
  templateUrl: './guests-detail.component.html',
  styleUrls: ['./guests-detail.component.scss']
})
export class GuestsDetailComponent extends OnDestroyClass implements OnInit {

  guestForm: FormGroup;

  constructor (
    protected formBuilder: FormBuilder,
    private gService: GenericService,
    private alert: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

    super();

    this.guestForm = formBuilder.group({
      id: [null],
      name: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      phone: [null, Validators.required]
    });

  }

  ngOnInit(): void {
    const guestId = this.activatedRoute.snapshot.params.id;
    if (guestId) { this.getGuestDetail(guestId); }
  }

  getGuestDetail(guestId: any): void {
    this.gService.get(`guests/${guestId}`)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          this.guestForm.patchValue(response);
          this.alert.closeAlert();
        },
        (error: any) => {
          this.alert.showAlertError(error.message);
        }
      );
  }

  handleSubmit(): void {
    const guestModel = cloneDeep(this.guestForm.value);
    guestModel.id ? this.handleUpdate(guestModel) : this.handleCreate(guestModel);
  }

  handleUpdate(guestModel: any): void {
    this.gService.post('guests/update', guestModel)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          this.alert.showAlertSuccess(response.message);
          this.router.navigate(['/app/convidados']);
        },
        (error: any) => {
          this.alert.showAlertError(error.message);
        }
      );
  }

  handleCreate(guestModel: any): void {
    this.gService.post('guests', guestModel)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          this.alert.showAlertSuccess(response.message);
          this.router.navigate(['/app/convidados']);
        },
        (error: any) => {
          this.alert.showAlertError(error.message);
        }
      );
  }

}
