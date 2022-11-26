import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";
/**
 * @returns ValidatorFn
 * Check if the input meets the conditions.
 * Used as a form control validator, input value comes from form.
 */
export function createPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;

        if (!value) {
            return null;
        }
        const hasUpperCase = /[A-Z]+/.test(value);
        const hasLowerCase = /[a-z]+/.test(value);
        const hasNumeric = /[0-9]+/.test(value);
        const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

        return !passwordValid ? { passwordStrength: true } : null;
    }
}