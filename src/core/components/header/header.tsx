import { Link } from "react-router-dom";
import { logout as logoutAction } from "pages/auth/auth.redux";
import { Component } from "react";
import { ROUTE_LOGIN } from "src/const.js";
import { AppDispatch, RootState } from "src/redux/create-store.js";
import { connect } from "react-redux";
import { withRouter, WithRouterProps } from "src/core/hoc/with-routes.hoc.js";

class HeaderComp extends Component<HeaderProps> {
  public logout() {
    this.props.logout();
    this.props.router.navigate(ROUTE_LOGIN);
  }

  public componentDidUpdate(prevProps: HeaderProps) {
    if (prevProps.isLoggedIn !== this.props.isLoggedIn && !prevProps.isLoggedIn) {
      this.props.router.navigate(ROUTE_LOGIN);
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/404">
                  404 page
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/500">
                  500 page
                </Link>
              </li>
              <li className="nav-item">
                {!this.props.isLoggedIn && (
                  <Link className="nav-link" to={ROUTE_LOGIN}>
                    Login
                  </Link>
                )}
                {this.props.isLoggedIn && (
                  <p className="nav-link" onClick={() => this.logout()}>
                    Logout
                  </p>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    logout: () => dispatch(logoutAction({})),
  };
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderComp));

export interface HeaderProps
  extends WithRouterProps,
    ReturnType<typeof mapDispatchToProps>,
    ReturnType<typeof mapStateToProps> {}
