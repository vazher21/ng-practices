import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { canMatchFactory } from './core/guards/auth-guard.guard';
import { HttpClientModule } from '@angular/common/http';
import { TopbarComponent } from './core/components/topbar/topbar.component';

@NgModule({
  declarations: [AppComponent, TopbarComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users',
      },
      {
        path: 'auth',
        canMatch: [canMatchFactory(false)],
        loadChildren: () =>
          import('./features/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'users',
        canMatch: [canMatchFactory(true)],
        loadChildren: () =>
          import('./features/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'currency',
        canMatch: [canMatchFactory(true)],
        loadChildren: () =>
          import(
            './features/currency-converter/currency-converter.module'
          ).then((m) => m.CurrencyConverterModule),
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
