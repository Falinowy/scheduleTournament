import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector, private zone: NgZone) {}

  handleError(error: any): void {
    console.error('GlobalErrorHandler caught an error:', error);
    
    // Use injector to avoid cyclic dependencies
    const toastService = this.injector.get(ToastService);
    
    const message = error?.message ? error.message : error?.toString() || 'An unexpected error occurred.';
    
    // Execute in zone so UI updates properly
    this.zone.run(() => {
      void toastService.showError(message);
    });
  }
}
