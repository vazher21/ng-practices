import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../../../shared/models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  @Input() users: IUser[] = [];

  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Input() loggedInUserId!: number;

  hidePassword(pass: string): string {
    return pass.split('').reduce((a, b) => a + '*', '*');
  }
}
