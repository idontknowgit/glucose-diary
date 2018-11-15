import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Field } from "redux-form";

import Input from "../Input";

const FormField = props => {
  const { input, meta, className, ...inputProps } = props;
  const wrapperClassName = classNames("form-field", { className });

  return (
    <div className={wrapperClassName}>
      <Input
        {...inputProps}
        {...input}
        inputRef={input.name + "-input"}
        className="form-field__input"
      />
      {meta.touched && meta.error && (
        <span className="form-field__error text--error">{meta.error}</span>
      )}
    </div>
  );
};

FormField.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired
};

export default props => <Field {...props} component={FormField} />;
