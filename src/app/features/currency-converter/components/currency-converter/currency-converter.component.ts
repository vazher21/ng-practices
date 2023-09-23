import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrencyConverterHttpService } from '../../services/currency-converter-http.service';
import { FormControl, FormGroup } from '@angular/forms';
import {
  catchError,
  debounceTime,
  filter,
  Observable,
  of,
  Subject,
  Subscription,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  public form = new FormGroup({
    left: new FormGroup({
      currency: new FormControl(''),
      amount: new FormControl(0),
    }),
    right: new FormGroup({
      currency: new FormControl(''),
      amount: new FormControl(0),
    }),
  });
  public codes$ = this.currencyConverterHttp.getCodes();
  public showError$ = new Subject<boolean>();
  private onDestroy$ = new Subject<void>();

  constructor(private currencyConverterHttp: CurrencyConverterHttpService) {}

  ngOnInit() {
    this.valueChanges();
  }

  valueChanges() {
    this.leftGroup.valueChanges
      .pipe(
        filter(() => this.isFormValid()),
        debounceTime(300),
        switchMap(() =>
          this.getRate(this.currencyLeft.value, this.currencyRight.value)
        ),
        tap((rate) =>
          this.amountRight.setValue((rate * this.amountLeft.value).toFixed(4), {
            emitEvent: false,
          })
        ),
        takeUntil(this.onDestroy$)
      )
      .subscribe();

    this.rightGroup.valueChanges
      .pipe(
        filter(() => this.isFormValid()),
        debounceTime(300),
        switchMap(() =>
          this.getRate(this.currencyRight.value, this.currencyLeft.value)
        ),
        tap((rate) =>
          this.amountLeft.setValue((rate * this.amountRight.value).toFixed(4), {
            emitEvent: false,
          })
        ),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  private isFormValid() {
    return (
      this.currencyLeft.value &&
      this.currencyRight.value &&
      (this.amountLeft.value || this.amountRight.value)
    );
  }

  private getRate(curr1: string, curr2: string): Observable<number> {
    return this.currencyConverterHttp.getRate(curr1, curr2).pipe(
      catchError(() => {
        this.showError$.next(true);
        timer(3000).subscribe(() => this.showError$.next(false));
        return of(0);
      })
    );
  }
  get leftGroup(): FormGroup {
    return this.form.get('left') as FormGroup;
  }
  get rightGroup(): FormGroup {
    return this.form.get('right') as FormGroup;
  }

  get currencyLeft(): FormControl {
    return this.leftGroup.get('currency') as FormControl;
  }
  get amountLeft(): FormControl {
    return this.leftGroup.get('amount') as FormControl;
  }
  get currencyRight(): FormControl {
    return this.rightGroup.get('currency') as FormControl;
  }
  get amountRight(): FormControl {
    return this.rightGroup.get('amount') as FormControl;
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
