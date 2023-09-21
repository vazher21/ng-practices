import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersModule } from './users/users.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsersModule, // in order to use `UsersComponent` inside app component html, we need to import UsersModule.
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
