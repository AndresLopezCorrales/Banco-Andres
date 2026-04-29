import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export class CustomValidators {
  static passwordMatch(passwordField: string, confirmField: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get(passwordField)?.value;
      const confirm = group.get(confirmField)?.value;

      if (!password || !confirm) return null;

      return password === confirm ? null : { passwordMismatch: true };
    };
  }

  static minAge(minAge: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const birthDate = new Date(control.value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();

      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age >= minAge ? null : { minAge: { required: minAge, actual: age } };
    };
  }

  static emailTaken(): AsyncValidatorFn {
    const registeredEmails = ['admin@banco.com', 'usuario@banco.com', 'test@test.com'];

    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);

      return of(control.value).pipe(
        delay(800),
        map((email) => (registeredEmails.includes(email) ? { emailTaken: true } : null)),
      );
    };
  }
}
