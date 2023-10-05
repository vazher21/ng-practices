import { Component, inject } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { shareReplay } from 'rxjs';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isLoggedIn$ = this.authService.isLoggedIn$.pipe(shareReplay(1));

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
