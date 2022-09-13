import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { withRouter, WithRouterProps } from "src/core/hoc/with-routes.hoc.js";
import { AppDispatch, RootState } from "src/redux/create-store.js";
import { LoginPayload } from "../auth.model.js";
import { login } from "../auth.redux.js";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { FormGroup } from "src/core/components/form/FormGroup.js";
import { FormVlidation } from "src/core/services/form-validation.service.js";

class Login extends Component<LoginProps, LoginState> {
  private loginSchema = Yup.object().shape({
    email: Yup.string().required().email(),
    password: Yup.string()
      .required()
      .matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, { name: "password" }),
  });

  private navigateToHomeIfLoggedIn() {
    if (this.props.isLoggedIn) {
      this.props.router.navigate("/");
    }
  }

  public componentDidMount() {
    this.navigateToHomeIfLoggedIn();
  }

  public componentDidUpdate() {
    this.navigateToHomeIfLoggedIn();
  }

  public login(data: LoginPayload) {
    this.props.login(data);
  }

  render(): ReactNode {
    return (
      <div className="d-flex flex-column align-items-center">
        <h1>Login</h1>
        {this.props.errorMessage && <h3 className="invalid-feedback">{this.props.errorMessage}</h3>}
        <Formik
          validationSchema={this.loginSchema}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(data) => this.login(data)}
          // FormVlidation.validateForm sets error message for FormGroup component
          // this line is required to use FormGroup component
          validate={(values) => FormVlidation.validateForm(this.loginSchema, values)}
        >
          {({ errors, touched }) => {
            return (
              <Form className="w-50">
                <FormGroup
                  name="email"
                  type="text"
                  errors={errors}
                  touched={touched}
                  labelText="Email Address"
                />
                <FormGroup
                  name="password"
                  type="password"
                  errors={errors}
                  touched={touched}
                  labelText="Password"
                />
                <button type="submit" className="btn btn-primary mt-4">
                  Login
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export interface LoginState {}

export interface LoginProps
  extends ReturnType<typeof mapDispatchToProps>,
    ReturnType<typeof mapStateToProps>,
    WithRouterProps {}

const mapStateToProps = (state: RootState) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    errorMessage: state.auth.login.errorMessage,
  };
};
const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    login: (payload: LoginPayload) => dispatch(login(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
