import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { isEmail } from "validator";

import ReduxFormField from "components/ReduxFormField";
import Button from "components/Button";
import { createLoadingSelector } from "store/reducers/app";
import { isAuthenticated } from "store/reducers/auth";
import { login } from "store/actions/auth";
import { LOGIN } from "store/constants";

class AuthPage extends Component {
  constructor(props) {
    super(props);

    this.fields = [
      { name: "email", type: "text", placeholder: "Email" },
      { name: "password", type: "password", placeholder: "Password" }
    ];

    if (props.registering) {
      this.fields.push({
        name: "confirmPassword",
        type: "password",
        placeholder: "Confirm password"
      });
    }
  }

  static propTypes = {
    registering: PropTypes.bool,
    authenticated: PropTypes.bool.isRequired,
    requestPending: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
  };

  static defaultProps = {
    registering: false
  };

  handleSubmit = vals => {
    const { login, registering, requestPending, authenticated } = this.props;

    if (!requestPending && !authenticated) {
      login(vals, registering);
    }
  };

  render() {
    const { registering, handleSubmit } = this.props;

    return (
      <div className="auth-page">
        <div className="container--small">
          <div className="auth-form" onSubmit={handleSubmit(this.handleSubmit)}>
            <h2 className="heading text--light">
              {registering ? "Sign up" : "Login"}
            </h2>
            <form className="auth-form__form">
              {this.fields.map(field => (
                <ReduxFormField key={field.name} {...field} />
              ))}
              <Button type="submit" fluid>
                Continue
              </Button>
            </form>

            <div className="auth-form__cta">
              {registering ? (
                <p>
                  Already have an account? <Link to="/login">Log in</Link>
                </p>
              ) : (
                <p>
                  Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const validate = (vals, props) => {
  const { email, password, confirmPassword } = vals;
  const requiredErr = "This field is required.";
  const errors = {};

  if (!email) {
    errors.email = requiredErr;
  } else if (!isEmail(email)) {
    errors.email = "Please provide a valid email.";
  }

  if (!password) {
    errors.password = requiredErr;
  } else if (password.length < 6) {
    errors.password = "Password must be atleast 6 characters.";
  }

  if (props.registering) {
    if (!confirmPassword) {
      errors.confirmPassword = requiredErr;
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Your passwords do not match.";
    }
  }

  return errors;
};

const loadingSelector = createLoadingSelector(LOGIN.base);

const mapStateToProps = state => ({
  authenticated: isAuthenticated(state),
  requestPending: loadingSelector(state)
});

export default reduxForm({ form: "authForm", validate })(
  connect(
    mapStateToProps,
    { login }
  )(AuthPage)
);
