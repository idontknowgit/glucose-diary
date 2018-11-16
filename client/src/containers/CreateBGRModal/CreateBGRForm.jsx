import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import PropTypes from "prop-types";
import "react-datetime/css/react-datetime.css";
import * as DateTime from "react-datetime";

import ReduxFormField from "components/ReduxFormField";
import Button from "components/Button";
import { createLoadingSelector } from "store/reducers/app";
import { createBGReading } from "store/actions/bGReading";
import { CREATE_BGREADING } from "store/constants";

class CreateBGRForm extends Component {
  state = {
    dateTaken: new Date().getTime()
  };

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    closeModal: PropTypes.func,
    requestPending: PropTypes.bool.isRequired,
    createBGReading: PropTypes.func.isRequired
  };

  changeDate = date => {
    this.setState({ dateTaken: date });
  };

  handleSubmit = vals => {
    const { requestPending, createBGReading, closeModal } = this.props;

    if (!requestPending) {
      createBGReading({ ...vals, dateTaken: this.state.dateTaken });
      closeModal && closeModal();
    }
  };

  render() {
    const { dateTaken } = this.state;
    const { handleSubmit } = this.props;

    return (
      <div className="create-reading">
        <h1 className="heading text--light">New reading</h1>
        <form
          className="create-reading__form"
          onSubmit={handleSubmit(this.handleSubmit)}
        >
          <ReduxFormField
            name="reading"
            type="number"
            placeholder="Reading"
            min="10"
            max="1000"
          />
          <DateTime
            className="create-reading__datepicker"
            onChange={this.changeDate}
            input={false}
            value={dateTaken}
          />
          <Button type="submit" fluid>
            Create
          </Button>
        </form>
      </div>
    );
  }
}

const validate = vals => {
  const { reading } = vals;
  const errors = {};

  if (!reading) {
    errors.reading = "This field is required.";
  } else if (reading <= 10) {
    errors.reading = "Reading must be greater than 10.";
  } else if (reading >= 1000) {
    errors.reading = "Reading must be less than 1000.";
  }

  return errors;
};

const loadingSelector = createLoadingSelector(CREATE_BGREADING);
const mapStateToProps = state => ({ requestPending: loadingSelector(state) });

export default reduxForm({ form: "new-reading", validate })(
  connect(
    mapStateToProps,
    { createBGReading }
  )(CreateBGRForm)
);
