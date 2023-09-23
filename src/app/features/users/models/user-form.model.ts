import { FormControl } from '@angular/forms';

export interface UserFormModel {
  email: FormControl<string>;
  password: FormControl<string>;
}
