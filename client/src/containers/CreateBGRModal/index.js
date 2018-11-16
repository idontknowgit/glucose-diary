import React from "react";

import "./CreateBGRModal.scss";
import CreateBGRForm from "./CreateBGRForm";
import Modal from "components/Modal";

export default () => {
  return (
    <Modal
      trigger={<div id="create-bgr-trigger">New reading</div>}
      childComponent={<CreateBGRForm />}
    />
  );
};
