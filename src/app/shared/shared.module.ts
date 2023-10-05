import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormErrorMsgComponent } from './components/form-error-msg/form-error-msg.component';
import { UsersFormComponent } from './components/users-form/users-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FormErrorMsgComponent, UsersFormComponent],
  exports: [FormErrorMsgComponent, UsersFormComponent, ReactiveFormsModule],
  imports: [CommonModule, ReactiveFormsModule],
})
export class SharedModule {}
