import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { map, tap } from 'rxjs';

export const canMatchFactory = (shouldBeLoggedIn: boolean) => {
  const authGuardGuard: CanMatchFn = (route, state) => {
    const router = inject(Router);
    const isLoggedIn$ = inject(AuthService).isLoggedIn$;
    return isLoggedIn$.pipe(
      map((res) => (shouldBeLoggedIn ? res : !res)),
      tap((r) => {
        if (!r) {
          router.navigateByUrl('auth');
        }
      })
    );
  };
  return authGuardGuard;
};
