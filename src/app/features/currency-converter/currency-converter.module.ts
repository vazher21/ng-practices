import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CurrencyConverterComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [CurrencyConverterComponent],
})
export class CurrencyConverterModule {}
