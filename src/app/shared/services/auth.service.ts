import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { IUser } from '../models/user.model';

class Db {
  private id = 3;
  private _registeredUsers$ = new BehaviorSubject<IUser[]>([
    {
      password: 'aa',
      email: 'a1@gmail.com',
      id: 1,
      phoneNumber: '+995599502169',
      nickname: 'vazha',
      website: 'www.facebook.com',
    },
    {
      password: 'aa',
      email: 'a2@gmail.com',
      id: 2,
      phoneNumber: '+995599502169',
      nickname: 'vazha',
      website: 'www.facebook.com',
    },
  ]);
  public registeredUsers$ = this._registeredUsers$.asObservable();

  register(user: IUser) {
    this._registeredUsers$.next([
      ...this._registeredUsers$.value,
      { ...user, id: this.id++ },
    ]);
    return { ...user, id: this.id };
  }

  login(email: string, password: string): IUser | null {
    return (
      this._registeredUsers$.value.find(
        (u) => u.email === email && u.password === password
      ) || null
    );
  }

  updateUser(user: IUser) {
    const currArr = [...this._registeredUsers$.value];
    const index = currArr.findIndex((u) => u.id === user.id);
    currArr[index] = { ...user };
    this._registeredUsers$.next(currArr);
  }

  deleteUser(id: number) {
    const currArr = [...this._registeredUsers$.value].filter(
      (u) => u.id !== id
    );
    this._registeredUsers$.next(currArr);
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private db = new Db();

  private _loggedInUser$ = new BehaviorSubject<IUser | null>(null);

  public loggedInUser$ = this._loggedInUser$.pipe(
    tap((user) => {
      !user
        ? localStorage.removeItem('user')
        : localStorage.setItem('user', JSON.stringify(user));
    })
  );
  public isLoggedIn$ = this.loggedInUser$.pipe(map((user) => !!user));
  public registeredUsers$ = this.db.registeredUsers$;

  constructor() {
    const localStorageUser = localStorage.getItem('user');
    if (!localStorageUser) {
      return;
    }
    const user = JSON.parse(localStorage.getItem('user')!);
    this.login(user.email, user.password);
  }

  public register(user: IUser): IUser {
    return this.db.register(user);
  }

  public update(user: IUser) {
    this.db.updateUser(user);
    this._loggedInUser$.next(user);
  }
  public login(email: string, password: string): IUser | null {
    const foundUser = this.db.login(email, password);
    this._loggedInUser$.next(foundUser);
    return this.db.login(email, password);
  }

  public logout() {
    this._loggedInUser$.next(null);
    return true;
  }

  public deleteUser() {
    this.db.deleteUser(this._loggedInUser$.value!.id!);
    this._loggedInUser$.next(null);
  }
}
