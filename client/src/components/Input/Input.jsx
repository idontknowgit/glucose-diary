import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const Input = props => {
  const { value, inputRef, placeholder, className, ...inputProps } = props;
  const wrapperClassName = classNames("input", {
    className,
    "input--with-value": value
  });

  return (
    <label htmlFor={inputRef} className={wrapperClassName}>
      <span className="input__placeholder">{placeholder} </span>
      <input
        {...inputProps}
        id={inputRef}
        className="input__value"
        value={value}
        autoComplete="off"
      />
    </label>
  );
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  inputRef: PropTypes.string.isRequired
};

export default Input;
