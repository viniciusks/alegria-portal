export interface ValidationResult {
  [key: string]: boolean;
}

export class PasswordValidation {
  public static strong(password: string): ValidationResult {
    let hasNumber = /\d/.test(password);
    let hasUpper = /[A-Z]/.test(password);
    let hasLower = /[a-z]/.test(password);
    let hasLenght = /.{8,12}/.test(password);

    return {
      number: hasNumber,
      upper: hasUpper,
      lower: hasLower,
      len: hasLenght,
    };
  }
}
