import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { BehaviorSubject, filter, map, take, tap } from 'rxjs';
import { IUser } from '../../../shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  router = inject(Router);
  authService = inject(AuthService);
  public users$ = this.authService.registeredUsers$;
  public loggedInUserId$ = this.authService.loggedInUser$.pipe(
    filter((u) => !!u),
    map((u) => u!.id)
  );
  public showForm$ = new BehaviorSubject<IUser | null>(null);

  // Action handling

  public onEdit(id: number): void {
    this.authService.loggedInUser$
      .pipe(
        take(1),
        tap((data) => this.showForm$.next(data))
      )
      .subscribe();
  }

  public onCancel(): void {
    this.showForm$.next(null);
  }
  public onSubmit(user: IUser) {
    this.updateUser(user);
  }

  public onDelete(id: number) {
    const agreed = window.confirm(
      `are you sure you want to delete your account?`
    );
    if (agreed) {
      this.removeUser(id);
    }
  }

  // Data manipulation

  private updateUser(user: IUser) {
    this.authService.update(user);
    this.showForm$.next(null);
  }

  private removeUser(id: number) {
    this.authService.deleteUser();
    this.router.navigateByUrl('');
  }
}
