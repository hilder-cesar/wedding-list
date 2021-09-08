import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  initRequest(message = 'Aguarde...'): void {
    Swal.fire({
      text: message,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  }

  showAlertError(message?: string): void {
    Swal.fire({
      title: 'Aviso',
      text: message ? message : 'Ocorreu um erro, verifique e tente novamente',
      icon: 'error',
      confirmButtonColor: '#fcb813',
      showCloseButton: false,
      showConfirmButton: true,
      timer: 2000,
    });
  }

  showAlertSuccess(message?: string): void {
    Swal.fire({
      title: 'Sucesso',
      text: message ? message : 'Sucesso',
      icon: 'success',
      confirmButtonColor: '#fcb813',
      showCloseButton: false,
      showConfirmButton: true,
      timer: 2000
    });
  }

  customMessage(title?: string, message?: string, type?: SweetAlertIcon, showCancelButton = true): Promise<any> {
    return Swal.fire({
      title,
      text: message,
      icon: type,
      showCancelButton: showCancelButton,
      confirmButtonColor: '#fcb813',
    });
  }

  confirmMessage(title?: string, message?: string, confirmButtonText?: string): Promise<any> {
    return Swal.fire({
      title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText
    });
  }

  closeAlert(): any {
    Swal.close();
  }

}
