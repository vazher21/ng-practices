import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [UsersComponent, UsersFormComponent, UsersListComponent],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
  exports: [UsersComponent], // exporting only parent ( wrapper ) component. ( App module will only be able to use UsersComponent )
})
export class UsersModule {}
