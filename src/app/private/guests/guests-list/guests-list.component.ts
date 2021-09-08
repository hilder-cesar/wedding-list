import { Component, OnInit } from '@angular/core';
import { faEdit, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from 'rxjs/operators';
import { OnDestroyClass } from 'src/app/utils/classes/on-destroy.class';
import { AlertService } from 'src/app/utils/services/alert/alert.service';
import { GenericService } from 'src/app/utils/services/generic/generic.service';

@Component({
  selector: 'app-guests-list',
  templateUrl: './guests-list.component.html',
  styleUrls: ['./guests-list.component.scss']
})
export class GuestsListComponent extends OnDestroyClass implements OnInit {

  faTrash: IconDefinition = faTrash;
  faEdit: IconDefinition = faEdit;

  guestList: any[] = [];

  constructor (
    private gService: GenericService,
    private alert: AlertService
  ) { super(); }

  ngOnInit(): void {
    this.getGuestList();
  }

  getGuestList(): void {
    this.gService.get('guests')
      .pipe(takeUntil(this.onDestroy))
      .subscribe(
        (response: any) => {
          this.guestList = response.data;
          this.alert.closeAlert();
        },
        (error: any) => {
          this.alert.showAlertError(error.message);
        }
      );
  }

}
