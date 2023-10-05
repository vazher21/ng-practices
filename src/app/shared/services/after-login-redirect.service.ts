import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AfterLoginRedirectService {
  private _url = '';

  get url() {
    return this._url;
  }

  set url(val: string) {
    this._url = val;
  }
}
