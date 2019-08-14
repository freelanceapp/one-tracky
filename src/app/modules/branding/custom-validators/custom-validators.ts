import { AbstractControl } from '@angular/forms';

export class CustomValidators {


    /**
     * Is int
     * @param control Control
     */
    public static isInt(control: AbstractControl) {
        if (control && control.value) {
            const value = control.value.toString().trim();
            if (/^-?\d*$/g.test(value)) {
                return null;
            }
            return { isInt: true };
        }
        return null;
    }

    /**
     * Is unsingned int
     * @param control Control
     */
    public static isUint(control: AbstractControl) {
        if (control && control.value) {
            const value = control.value.toString().trim();
            if (/^[0-9]\d*$/g.test(value)) {
                return null;
            }
            return { isUint: true };
        }
        return null;
    }


    /**
     * Is float
     * @param control Control
     */
    public static isFloat(control: AbstractControl) {
        if (control && control.value) {
            const value = control.value.toString().trim();
            if (/^-?\d+(\.\d+)?$/g.test(value)) {
                return null;
            }
            return { isFloat: true };
        }
        return null;
    }
    /**
     * Is unsigned float
     * @param control Control
     */
    public static isUFloat(control: AbstractControl) {
        if (control && control.value) {
            const value = control.value.toString().trim();
            if (/^\d+(\.\d+)?$/g.test(value)) {
                return null;
            }
            return { isUFloat: true };
        }
        return null;
    }

    /**
     * Is email
     * @param control Control
     */
    public static isEmail(control: AbstractControl) {
        if (control && control.value) {
            const value = control.value.toString().trim();
            if (/^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z][a-zA-Z]+)$/g.test(value)) {
                return null;
            }
            return { isEmail: true };
        }
        return null;
    }

    /**
     * Is alphabets without space
     * @param control Control
     */
    public static isAlphabetsWithOutSpace(control: AbstractControl) {
        if (control && control.value) {
            const value = control.value.toString().trim();
            if (!/[^a-zA-Z]/g.test(value)) {
                return null;
            }
            return { isAlphabetsWithOutSpace: true };
        }
        return null;
    }

    /**
     * Is alphabets with space
     * @param control Control
     */
    public static isAlphabetsWithSpace(control: AbstractControl) {
        if (control && control.value) {
            const value = control.value.toString().trim();
            if (!/[^a-zA-Z\s]/g.test(value)) {
                return null;
            }
            return { isAlphabetsWithSpace: true };
        }
        return null;
    }

    /**
     * Is Aplhanumeric with space
     * @param control Control
     */
    public static isAlphaNumericWithSpace(control: AbstractControl) {
        if (control && control.value) {
            const value = control.value.toString().trim();
            if (/^[a-zA-Z0-9\s]+$/.test(value)) {
                return null;
            }
            return { isAlphaNumericWithSpace: true };
        }
        return null;
    }

    /**
     * Is Aplhanumeric without space
     * @param control Control
     */
    public static isAlphaNumericWithOutSpace(control: AbstractControl) {
        if (control && control.value) {
            const value = control.value.toString().trim();
            if (/^[a-zA-Z0-9]+$/.test(value)) {
                return null;
            }
            return { isAlphaNumericWithOutSpace: true };
        }
        return null;
    }

    /**
     * Is valid url
     * @param control Control
     */
    public static isUrl(control: AbstractControl) {
        if (control && control.value) {
            const expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
            const regex = new RegExp(expression);
            const value = control.value.toString().trim();
            if (value.match(regex)) {
                return null;
            }
            return { isUrl: true };
        }
        return null;
    }


}
