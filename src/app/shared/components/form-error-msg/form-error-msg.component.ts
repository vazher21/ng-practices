import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-error-msg',
  templateUrl: './form-error-msg.component.html',
  styleUrls: ['./form-error-msg.component.scss'],
})
export class FormErrorMsgComponent {
  @Input() control!: FormControl | FormGroup;
  @Input() showRegardless: boolean = false; // if we want to display error message based on custom condition.

  @Input() customError: string | undefined; // default error message for unhandled error.

  private errors: { [key: string]: string } = {
    required: 'Fill in required field',
    pattern: 'Invalid pattern',
  };

  public displayError() {
    const errors = this.control.errors;
    for (const err in errors) {
      if (err === 'minlength') {
        return 'min length must be ' + errors![err]!['requiredLength'];
      }
      if (this.errors[err]) {
        return this.errors[err];
      }
    }
    return this.customError ? this.customError : 'Invalid input'; // default;
  }
}
