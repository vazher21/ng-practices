export interface IUser {
  id?: number; // only for already registered users.
  email: string;
  password: string;
  nickname: string;
  phoneNumber: string;
  website: string;
}
