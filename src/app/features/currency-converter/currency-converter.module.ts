import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyConverterComponent } from './components/currency-converter/currency-converter.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CurrencyConverterComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: CurrencyConverterComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CurrencyConverterModule {}
