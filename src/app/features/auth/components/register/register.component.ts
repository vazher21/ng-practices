import { Component, Inject, inject, Injector } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { IUser } from '../../../../shared/models/user.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  constructor() {}
  onRegister(user: IUser) {
    this.authService.register(user);
    this.router.navigate(['../login'], { relativeTo: this.activatedRoute });
  }
}
