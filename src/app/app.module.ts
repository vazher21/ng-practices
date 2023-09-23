import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UsersModule } from './features/users/users.module';
import { CurrencyConverterModule } from './features/currency-converter/currency-converter.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    UsersModule, // in order to use `UsersComponent` inside app component html, we need to import UsersModule.
    CurrencyConverterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
