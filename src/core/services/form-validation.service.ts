import * as Yup from "yup";

export class FormValidation {
  private static error = new Map<string, string>();

  public static errorMapping: Record<string, string> = {
    required: "{labelText} is required",
    maxlength: "{labelText} can't be more than {requiredLength} characters",
    minlength: "{labelText} can't be less than {requiredLength} characters",
    email: "Email is not valid",
    emailAndPhone: "Email or Phone Number is not valid",
    password:
      "Password length should be minimum 8 and must contain 1 small letter, 1 capital letter, 1 number and 1 special character(@$!%*#?&)",
    maxNum: "{labelText} can't be more than {requiredNumber}",
    minNum: "{labelText} can't be less than {requiredNumber}",
    invalidNum: "Number is not valid",
    invalidUrl: "Url of {labelText} is not valid",
    emailExist: "Email already exist",
  };

  public static message(mappedErrorMessage: string, labelText: string) {

    let errorMessage = "";
    errorMessage = this.setErrorMessageWithPlaceholder(
      mappedErrorMessage,
      labelText
    );
    return errorMessage;
  }

  public static validateForm(schema: Yup.ObjectSchema<any>, formValue: any) {
    const errorObj: Record<string, string> = {};
    try {
      schema.validateSync(formValue, { abortEarly: false });
    } catch (error: any) {
      if (error.inner && Array.isArray(error.inner)) {
        (error.inner as Yup.ValidationError[]).forEach((validationError: Yup.ValidationError) => {
          if (errorObj[validationError.path || "default"]) {
            return;
          }
          let mappedErrorMessage = "";
          if (validationError.type === "oneOf") {
            mappedErrorMessage = typeof validationError?.errors[0] === "string" ? validationError?.errors[0] : this.getMappedErrorMessage((validationError?.errors[0] as { name: string }).name) || "";
          } else {
            mappedErrorMessage = this.getMappedErrorMessage(validationError?.type || "") || "";
          }
          if (!mappedErrorMessage) {
            console.error(`ValidationMessage: Error Mapping is not available with key: ${validationError.path}`);
            return "";
          }
          errorObj[validationError.path || "default"] = mappedErrorMessage;
        });
      }
    }
    return errorObj;
  }

  private static setErrorMessageWithPlaceholder(
    errorMessage: string,
    labelText: string
  ) {
    const pattern = /({labelText})/g;
    errorMessage = errorMessage.replace(pattern, labelText);
    return errorMessage;
  }

  private static getMappedErrorMessage(errorKey: string) {
    if (!this.error.keys.length) {
      Object.keys(this.errorMapping).forEach(key => {
        this.error.set(key, this.errorMapping[key]);
      })
    }
    return this.error.get(errorKey);
  }

}