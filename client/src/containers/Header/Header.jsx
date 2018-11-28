import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { isAuthenticated } from "store/reducers/auth";
import { logout } from "store/actions/auth";

class Header extends Component {
  static propTypes = {
    authenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
  };

  renderNav = () => {
    const { authenticated, logout } = this.props;
    const linkClassName = "header__link";
    let items = [];

    if (authenticated) {
      items = [
        ...items,
        <a key="logout" className={linkClassName} onClick={logout}>
          Log out
        </a>
      ];
    }

    return <nav className="header__nav">{items}</nav>;
  };

  render() {
    return (
      <header className="header">
        <div className="container header__content">
          <Link to="/" className="header__brand">
            Gluco
          </Link>
          {this.renderNav()}
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({ authenticated: isAuthenticated(state) });

export default connect(
  mapStateToProps,
  { logout }
)(Header);
