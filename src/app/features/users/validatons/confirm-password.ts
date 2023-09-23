import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function passwordCompareValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordGroup = control as FormGroup;
    const pass1 = passwordGroup.get('pass1') as FormControl;
    const pass2 = passwordGroup.get('pass2') as FormControl;

    if (pass1.invalid || pass2.invalid) {
      return null;
    }

    return pass1.value !== pass2.value ? { samePassword: true } : null;
  };
}
