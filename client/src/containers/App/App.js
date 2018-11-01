import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import uuid from "uuid/v4";
import PropTypes from "prop-types";

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
      <div className="main-wrapper">
        <Loader coverContent loading={!appReady} size="6rem" />
        <Loader
          loading={appReady && requestPending}
          className="request-loader"
        />
        {this.renderErrors()}
        Hello World
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
