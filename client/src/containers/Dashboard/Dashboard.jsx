import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import BGRScatterPlot from "./BGRScatterPlot";
import { getBGReadings } from "store/reducers/bGReadings";
import { fetchBGReadings } from "store/actions/bGReading";

class Dashboard extends Component {
  constructor(props) {
    super();

    this.state = {
      loaded: false,
      timePeriod: window.localStorage.getItem("timePeriod"),
      showStatus: {
        low: true,
        normal: true,
        high: true
      }
    };
  }

  static propTypes = {
    readings: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchBGReadings: PropTypes.func.isRequired
  };

  componentDidMount() {
    //this.props.fetchBGReadings({})
  }

  render() {
    const { readings } = this.props;

    if (!readings) {
      return null;
    }

    return (
      <section className="container dashboard">
        <div
          id="bgr-scatter"
          style={{ position: "relative", height: "50vw", width: "50vw" }}
        >
          <BGRScatterPlot
            readings={[
              {
                reading: 100,
                dateTaken: new Date().toISOString(),
                status: "normal"
              }
            ]}
            lowestReading={100}
            highestReading={200}
          />
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  readings: getBGReadings(state)
});

export default connect(
  mapStateToProps,
  { fetchBGReadings }
)(Dashboard);
