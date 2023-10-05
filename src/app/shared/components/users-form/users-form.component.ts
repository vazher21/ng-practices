import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../models/user.model';
import { passwordCompareValidator } from '../../../features/users/validatons/confirm-password';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss'],
})
export class UsersFormComponent {
  // Setter input ( alternative to ngOnChanges hook )
  @Input() set userToEdit(user: IUser | null) {
    this._user = user;
    if (user) {
      this.fillForm(user);
      return;
    }
    this.form.reset();
  }
  _user: IUser | null = null;

  @Input() hideResetButton = false;

  @Output() onSubmit = new EventEmitter<IUser>();
  @Output() cancel = new EventEmitter<void>();

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    nickname: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9\-]+$/),
    ]),
    password: new FormGroup(
      {
        pass1: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9]*$/),
          Validators.minLength(7),
        ]),
        pass2: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[A-Za-z0-9]*$/),
          Validators.minLength(7),
        ]),
      },
      passwordCompareValidator()
    ),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(\+995)[0-9]{9}$/),
    ]),
    website: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(https?:\/\/)?([A-Za-z0-9-]+\.)*[A-Za-z0-9-]+\.[A-Za-z]{2,}(\/.*)?$/
      ),
    ]),
    terms: new FormControl('', Validators.requiredTrue),
  });
  // formControl references
  email = this.form.get('email') as FormControl;
  nickname = this.form.get('nickname') as FormControl;
  passwordGroup = this.form.get('password') as FormGroup;
  pass1 = this.passwordGroup.get('pass1') as FormControl;
  pass2 = this.passwordGroup.get('pass2') as FormControl;
  phoneNumber = this.form.get('phoneNumber') as FormControl;
  website = this.form.get('website') as FormControl;
  terms = this.form.get('terms') as FormControl;

  public submit() {
    const formData = this.form.getRawValue();
    const user: IUser = {
      email: formData.email!,
      nickname: formData.nickname!,
      website: formData.website!,
      phoneNumber: formData.phoneNumber!,
      password: formData.password.pass1!,
      ...(this._user && { id: this._user!.id }),
    };
    this.onSubmit.emit(user);
  }

  public fillForm(user: IUser): void {
    this.email.setValue(user.email);
    this.nickname.setValue(user.nickname);
    this.pass1.setValue(user.password);
    this.pass2.setValue(user.password);
    this.phoneNumber.setValue(user.phoneNumber);
    this.website.setValue(user.website);
    this.terms.setValue(true);
    this.terms.disable();
  }
}
