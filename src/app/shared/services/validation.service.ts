import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  /**
   * @param  {FormGroup} form
   * @param  {string} formControlName
   * @returns string
   * Return class name for given form group's form control according to its validity.
   */
  public validate(form: FormGroup, formControlName: string): string {
    let control = form.get(formControlName)
    if (control?.valid) {
      return 'is-valid';
    } else if (control?.invalid && control.touched) {
      return 'is-invalid';
    } else {
      return '';
    }
  }
}
