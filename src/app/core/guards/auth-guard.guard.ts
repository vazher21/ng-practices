import { CanMatchFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { map, tap } from 'rxjs';
import { AfterLoginRedirectService } from '../../shared/services/after-login-redirect.service';

export const canMatchFactory = (shouldBeLoggedIn: boolean) => {
  const authGuardGuard: CanMatchFn = (route, state) => {
    const afterLoginRedirectService = inject(AfterLoginRedirectService);
    const router = inject(Router);
    const isLoggedIn$ = inject(AuthService).isLoggedIn$;
    return isLoggedIn$.pipe(
      map((res) => (shouldBeLoggedIn ? res : !res)),
      tap((r) => {
        if (!r) {
          afterLoginRedirectService.url = route.path as string;
          router.navigateByUrl('auth');
        } else if (
          afterLoginRedirectService.url &&
          !route.path?.includes('auth')
        ) {
          router.navigateByUrl(afterLoginRedirectService.url);
          afterLoginRedirectService.url = '';
        }
      })
    );
  };
  return authGuardGuard;
};
