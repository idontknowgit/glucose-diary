import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import ReactSVG from "react-inlinesvg";

const Notification = props => {
  const { type, close, className, children, ...otherProps } = props;
  const wrapperClassName = classNames(
    "notification",
    `text--${type}`,
    className
  );

  return (
    <div {...otherProps} className={wrapperClassName}>
      {close && (
        <span className="close" onClick={close}>
          &times;
        </span>
      )}
      <div className="notification__header">
        <ReactSVG
          className="notification__icon"
          src={`/assets/images/${type}-icon.svg`}
        />
        <span className="notification__type">{type}</span>
      </div>
      {children && <div className="notification__content">{children}</div>}
    </div>
  );
};

Notification.propTypes = {
  type: PropTypes.oneOf(["error", "success"]).isRequired,
  close: PropTypes.func
};

export default Notification;
