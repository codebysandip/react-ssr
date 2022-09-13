import { Field, FormikErrors, FormikTouched } from "formik";
import { FormVlidation } from "src/core/services/form-validation.service.js";

export function FormGroup(props: FormGroupProps) {
  const { type, name, labelText, className, formGroupClass, errors, touched, ...inputProps } =
    props;

  const getErrorMessage = () => {
    const message = FormVlidation.message(errors[name] as string, labelText);
    return message;
  };
  return (
    <div className={`form-group ${formGroupClass || ""}`}>
      <label htmlFor="email">{labelText}</label>
      <Field
        type={type}
        name={name}
        className={`form-control ${className || ""}`}
        {...inputProps}
      />
      {errors[name] && touched[name] && <div className="invalid-feedback">{getErrorMessage()}</div>}
    </div>
  );
}

export interface FormGroupProps extends Partial<HTMLInputElement> {
  type: "text" | "password" | "email" | "number" | "date";
  /**
   * schema key
   */
  name: string;
  /**
   * text for label of input
   * labelText also used by ValidationMessage service to show error meesage
   */
  labelText: string;
  className?: string;
  formGroupClass?: string;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
}
