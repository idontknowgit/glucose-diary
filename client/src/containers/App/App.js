import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Switch, Route } from "react-router-dom";
import uuid from "uuid/v4";
import PropTypes from "prop-types";

import Header from "containers/Header";
import AuthRoute from "containers/AuthRoute";
import Dashboard from "containers/Dashboard";
import HomePage from "components/HomePage";
import AuthPage from "containers/AuthPage";
import Loader from "components/Loader";
import Notification from "components/Notification";
import { removeError } from "store/actions/app";
import { createLoadingSelector } from "store/reducers/app";

class App extends Component {
  static propTypes = {
    appReady: PropTypes.bool.isRequired,
    requestPending: PropTypes.bool.isRequired,
    errors: PropTypes.arrayOf(
      PropTypes.shape({
        statusCode: PropTypes.number,
        message: PropTypes.string
      })
    ),
    removeError: PropTypes.func.isRequired
  };

  renderErrors = () => {
    const { errors, removeError } = this.props;

    if (errors.length) {
      return (
        <div className="errors">
          {errors.map((item, i) => (
            <Notification
              key={uuid()}
              type="error"
              close={removeError.bind(this, i)}
            >
              <span>{item.message}</span>
            </Notification>
          ))}
        </div>
      );
    }
  };

  render() {
    const { appReady, requestPending } = this.props;

    return (
      <div id="main-wrapper" className="main-wrapper">
        <Header />
        <Loader coverContent loading={!appReady} size="6rem" />
        <Loader
          loading={appReady && requestPending}
          className="request-loader"
        />
        {this.renderErrors()}

        <main>
          <Switch>
            <AuthRoute
              guestRoute
              path="/signup"
              render={props => <AuthPage {...props} registering />}
            />
            <AuthRoute guestRoute path="/login" component={AuthPage} />
            <AuthRoute path="/dashboard" component={Dashboard} />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </div>
    );
  }
}

const loadingSelector = createLoadingSelector();
const mapStateToProps = state => ({
  appReady: state.app.appReady,
  requestPending: loadingSelector(state),
  errors: state.app.errors
});

export default withRouter(
  connect(
    mapStateToProps,
    { removeError }
  )(App)
);
