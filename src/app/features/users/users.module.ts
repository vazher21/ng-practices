import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UsersComponent, UsersListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: UsersComponent }]),
  ],
  exports: [UsersComponent], // exporting only parent ( wrapper ) component. ( App module will only be able to use UsersComponent )
})
export class UsersModule {}
