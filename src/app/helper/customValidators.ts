import { AbstractControl } from "@angular/forms";

export class CustomValidators {
  static matchPassword(control: AbstractControl) {
    let password = control.get("password").value;
    let confirmPassword = control.get("confirmPassword").value;
    if (password !== confirmPassword) {
      control.get("confirmPassword").setErrors({ passwordnotmatch: true });
    } else {
      return null;
    }
  }
}
