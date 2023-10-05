import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          { redirectTo: 'login', path: '', pathMatch: 'full' },
          {
            path: 'login',
            component: LoginComponent,
          },
          {
            path: 'register',
            component: RegisterComponent,
          },
        ],
      },
    ]),
    SharedModule,
  ],
})
export class AuthModule {}
