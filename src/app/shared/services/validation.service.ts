import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  validate(form: FormGroup, formControlName: string): string {
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
