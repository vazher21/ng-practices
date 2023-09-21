import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  @Input() users: IUser[] = [];

  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  hidePassword(pass: string): string {
    return pass.split('').reduce((a, b) => a + '*', '*');
  }
}
