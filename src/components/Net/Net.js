import React from 'react';

import Path from 'svg-path-generator';

import './net.scss';

class Net extends React.Component {
  constructor (props) {
    super(props);

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);

    this.state = {
      mouseOver: false
    };
  }

  onMouseDown () {
    const {
      net,
      disconnectLets
    } = this.props;

    disconnectLets(net);
  }

  onMouseOver () {
    this.setState({
      mouseOver: true
    });
  }

  onMouseOut () {
    this.setState({
      mouseOver: false
    });
  }

  componentDidMount () {
    const net = this.refs.net;
    net.addEventListener('mouseover', this.onMouseOver);
    net.addEventListener('mouseout', this.onMouseOut);
    net.addEventListener('mousedown', this.onMouseDown);
  }

  componentWillUnmount () {
    const net = this.refs.net;
    net.removeEventListener('mouseover', this.onMouseOver);
    net.removeEventListener('mouseout', this.onMouseOut);
    net.removeEventListener('mousedown', this.onMouseDown);
  }

  render () {
    const {
      mouseOver
    } = this.state;
    const {
      net,
      netToCoords
    } = this.props
    const coordinates = netToCoords(net);
    const className = [
      'net',
      mouseOver ? 'net--selected' : ''
    ].join(' ');

    const diffs = [coordinates[1][0] - coordinates[0][0], coordinates[1][1] - coordinates[1][0]];
    const bend_x = diffs[0] / 25;
    const bend_y = Math.abs(diffs[1]) / 7;

    const data = Path()
      .moveTo(coordinates[0][0], coordinates[0][1])
      .smoothCurveTo(coordinates[0][0] + bend_x, coordinates[0][1] + bend_y, (coordinates[0][0] + coordinates[1][0]) / 2, coordinates[0][1] + bend_y)
      .smoothCurveTo(coordinates[1][0] - bend_x, coordinates[1][1] + bend_y, coordinates[1][0], coordinates[1][1])
      .end();

    return (
      <path
        ref='net'
        className={className}
        d={data} />
    );
  }
};

Net.propTypes = {
  net: React.PropTypes.array.isRequired,
  netToCoords: React.PropTypes.func.isRequired,
  disconnectLets: React.PropTypes.func.isRequired
};

export default Net;
