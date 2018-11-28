import React, { Component } from "react";
import { Scatter } from "react-chartjs-2";
import PropTypes from "prop-types";
import shallowCompare from "react-addons-shallow-compare";
import memoize from "memoize-one";
import * as moment from "moment";

class BGRScatterPlot extends Component {
  constructor(props) {
    super(props);

    this.colorMap = {
      low: "blue",
      normal: "green",
      high: "red"
    };

    this.BUFFER_Y = 50;
    this.MIN_Y = 10;
    this.MAX_Y = 1000;
  }

  static propTypes = {
    readings: PropTypes.arrayOf(PropTypes.object),
    lowestReading: PropTypes.number,
    highestReading: PropTypes.number
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  generateData = memoize(readings => {
    const data = {
      datasets: []
    };
    const low = [],
      normal = [],
      high = [];

    for (let r of readings) {
      if (r.status === "low") {
        low.push(r);
      } else if (r.status === "high") {
        high.push(r);
      } else {
        normal.push(r);
      }
    }

    low.length && data.datasets.push(this.datasetFromReadings("low", low));
    normal.length &&
      data.datasets.push(this.datasetFromReadings("normal", normal));
    high.length && data.datasets.push(this.datasetFromReadings("high", high));
    data.labels = data.datasets.map(d => d.label);

    return data;
  });

  generateOptions = memoize((lowestReading, highestReading) => {
    let minY = lowestReading - this.BUFFER_Y;
    let maxY = highestReading + this.BUFFER_Y;

    minY = minY > this.MIN_Y ? minY : this.MIN_Y;
    maxY = maxY < this.MAX_Y ? maxY : this.MAX_Y;

    return {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        position: "bottom"
      },
      scales: {
        yAxes: [
          {
            type: "linear",
            ticks: {
              suggestedMax: maxY,
              suggestedMin: minY
            }
          }
        ],
        xAxes: [
          {
            type: "time",
            time: {
              min: "00:00",
              max: "23:59",
              unit: "minute",
              stepSize: 120,
              parser: "HH:mm",
              displayFormats: {
                minute: "h:mm a"
              },
              tooltipFormat: "h:mm a"
            }
          }
        ]
      }
    };
  });

  datasetFromReadings(label, readings) {
    return {
      label,
      data: readings.map(item => ({
        x: moment(item.dateTaken).format("HH:mm"),
        y: item.reading
      })),
      backgroundColor: this.colorMap[label]
    };
  }

  render() {
    const { readings, lowestReading, highestReading } = this.props;
    const data = this.generateData(readings);
    const options = this.generateOptions(lowestReading, highestReading);

    return <Scatter data={data} options={options} />;
  }
}

export default BGRScatterPlot;
