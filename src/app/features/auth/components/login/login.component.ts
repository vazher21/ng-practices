import { Component, inject, Injector } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../../shared/models/user.model';
import { Router } from '@angular/router';
import { Subject, timer } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  invalidLogin$ = new Subject();

  onLogin() {
    const foundUser = this.authService.login(
      this.email.value,
      this.password.value
    );
    if (foundUser) {
      this.router.navigateByUrl('users');
      return;
    }
    this.invalidLogin$.next(true);
    this.form.reset();
    this.email.markAsTouched();
    this.password.markAsTouched();
    timer(2000).subscribe(() => this.invalidLogin$.next(false));
  }
  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }
}
