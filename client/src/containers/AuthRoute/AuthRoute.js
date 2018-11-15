import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import PropTypes from "prop-types";

import { isAuthenticated } from "store/reducers/auth";

const AuthRoute = props => {
  const { authenticated, guestRoute, ...routeProps } = props;

  if (!guestRoute && !authenticated) {
    return <Redirect to="/" />;
  }

  if (guestRoute && authenticated) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...routeProps} />;
};

AuthRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  guestRoute: PropTypes.bool
};

const mapStateToProps = state => ({ authenticated: isAuthenticated(state) });

export default connect(mapStateToProps)(AuthRoute);
