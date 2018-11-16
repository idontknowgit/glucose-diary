import React, { Component, cloneElement } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible
    };
    this.trigger = props.trigger
      ? cloneElement(props.trigger, { onClick: this.open })
      : null;
    this.modalContainerEl = document.body;
  }

  static propTypes = {
    visible: PropTypes.bool,
    trigger: PropTypes.node,
    childComponent: PropTypes.element
  };

  static defaultProps = {
    visible: false
  };

  open = () => {
    this.setState({ visible: true });
  };
  close = () => {
    this.setState({ visible: false });
  };

  createModalPortal = () => {
    if (!this.state.visible) {
      return null;
    }

    const modal = (
      <div className="modal">
        <span className="close" onClick={this.close}>
          &times;
        </span>
        <div className="modal__content">
          {cloneElement(this.props.childComponent, { closeModal: this.close })}
        </div>
      </div>
    );

    return createPortal(modal, this.modalContainerEl);
  };

  render() {
    return (
      <>
        {this.trigger}
        {this.createModalPortal()}
      </>
    );
  }
}

/*
const Modal = props => {
  const { visible, close, children } = props;

  if (!visible) {
    return null;
  }

  const modal = (
    <div className="modal">
      <span className="close" onClick={close}>
        &times;
      </span>
      <div className="modal__content">{children}</div>
    </div>
  );

  return createPortal(modal, document.querySelector(".main-wrapper"));
};

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.node,
  close: PropTypes.bool.isRequired
};

*/

export default Modal;
