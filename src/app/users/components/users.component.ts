import { Component } from '@angular/core';
import { IUser } from '../models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  private id = 1;
  public users: IUser[] = [];
  public currentUserToEdit: IUser | null = null; // if not null, currently editing someone.
  public showForm = false; // will be true if editing user or adding new user.

  // Action handling
  public onAddNewUser(): void {
    this.currentUserToEdit = null;
    this.showForm = true;
  }

  public onEdit(id: number): void {
    this.currentUserToEdit = this.users.find((u) => u.id === id)!;
    this.showForm = true;
  }

  public onCancel(): void {
    this.currentUserToEdit = null;
    this.showForm = false;
  }
  public onSubmit(user: IUser) {
    user.id ? this.updateUser(user) : this.createUser(user);
  }

  public onDelete(id: number) {
    const nickname = this.users.find((u) => u.id === id)!.nickname;
    const agreed = window.confirm(
      `are you sure you want to delete ${nickname}?`
    );
    if (agreed) {
      this.removeUser(id);
    }
  }

  // Data manipulation
  private createUser(user: IUser) {
    this.users.push({ ...user, id: this.id++ });
    this.showForm = false;
  }
  private updateUser(user: IUser) {
    const index = this.users.findIndex((u) => u.id == user.id);
    this.users[index] = user;
    this.currentUserToEdit = null;
    this.showForm = false;
  }

  private removeUser(id: number) {
    this.users = this.users.filter((u) => u.id !== id);
  }
}
