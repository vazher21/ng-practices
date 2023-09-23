import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, shareReplay, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrencyConverterHttpService {
  constructor(private http: HttpClient) {}
  private cachedCurrencies = new Map<string, number>();

  public getRate(currency1: string, currency2: string): Observable<number> {
    const fromCache = this.cachedCurrencies.get(currency1 + currency2);
    return fromCache
      ? of(fromCache)
      : this.http
          .get<{ conversion_rate: number }>(
            `${environment.currencyApi}pair/${currency1}/${currency2}`
          )
          .pipe(
            map((data) => data.conversion_rate),
            tap((rate) =>
              this.cachedCurrencies.set(currency1 + currency2, rate)
            )
          );
  }

  public getCodes(): Observable<string[]> {
    return this.http
      .get<{ supported_codes: [string, string] }>(
        `${environment.currencyApi}codes`
      )
      .pipe(
        map((data) => data.supported_codes),
        map((data) => data.map(([short, long]) => short)),
        shareReplay(1)
      );
  }
}
