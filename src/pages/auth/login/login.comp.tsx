import { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { withRouter, WithRouterProps } from "src/core/hoc/with-routes.hoc.js";
import { AppDispatch, RootState } from "src/redux/create-store.js";
import { LoginPayload } from "../auth.model.js";
import { login } from "../auth.redux.js";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";

class Login extends Component<LoginProps, LoginState> {
  private loginSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is not valid").default(""),
    password: Yup.string().required("Password is required").default(""),
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
      <div>
        <h1>Login</h1>
        {this.props.errorMessage && <h3 className="invalid-feedback">{this.props.errorMessage}</h3>}
        <Formik
          validationSchema={this.loginSchema}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(data) => this.login(data)}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <Field name="email" id="email" className="form-control" />
                {errors.email && touched.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" id="password" className="form-control" />
                {errors.password && touched.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <button type="submit" className="btn btn-primary mt-4">
                Login
              </button>
            </Form>
          )}
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
