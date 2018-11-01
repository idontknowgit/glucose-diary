import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const Button = props => {
  const { styleType, fluid, children, className, ...otherProps } = props;
  const btnClassName = classNames("btn", `btn--${styleType}`, {
    fluid,
    className
  });

  return (
    <button {...otherProps} className={btnClassName}>
      {children}
    </button>
  );
};

Button.propTypes = {
  styleType: PropTypes.oneOf(["primary", "secondary"]),
  fluid: PropTypes.bool
};

Button.defaultProps = {
  styleType: "primary"
};

export default Button;
