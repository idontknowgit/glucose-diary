import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import ReactSVG from "react-inlinesvg";

const Loader = props => {
  const { loading, size, coverContent, className, ...otherProps } = props;

  if (!loading) {
    return null;
  }
  const wrapperClassName = classNames(
    "loader",
    { "loader--cover": coverContent },
    className
  );

  return (
    <div {...otherProps} className={wrapperClassName}>
      <ReactSVG
        className="loader__content"
        src="/assets/images/bars-loader.svg"
        style={{ width: size, height: size }}
      />
    </div>
  );
};

Loader.propTypes = {
  loading: PropTypes.bool,
  size: PropTypes.string,
  coverContent: PropTypes.bool
};

Loader.defaultProps = {
  size: "4rem"
};

export default Loader;
