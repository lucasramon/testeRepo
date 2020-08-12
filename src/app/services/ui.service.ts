import { Injectable } from '@angular/core';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class UiService {

  private toasterService: ToasterService;

  constructor(toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  showSucess(title, content?) {
    this.toasterService.pop('success',
      title, (content === undefined) ? 'Operation succeeded!' : content);
  }

  showError(title, content?) {
    this.toasterService.pop('error',
      title, (content === undefined) ? 'Operation not succeeded!' : content);
  }

  showError500() {
    this.toasterService.pop('error', 'Something is going on :/ Try again or contact the system administrator.');
  }

  showInfo(title, content?) {
    this.toasterService.pop('info',
      title, (content === undefined) ? '' : content);
  }
}