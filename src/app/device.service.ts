import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(private platform: Platform) { }

  public isMobile(): boolean {
    if (
      this.platform.is('desktop') ||
      this.platform.is('electron')
    ) {
      return false;
    }
    return true;
  }
}
