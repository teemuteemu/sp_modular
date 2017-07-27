import React from 'react';

class Draggable extends React.Component {
  constructor (props) {
    super(props);

    const [x, y] = props.position || [0, 0];

    this.state = {
      x,
      y
    };
  }

  onMouseDown () {
    window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
    window.addEventListener('mousemove', this.onMouseMove.bind(this), false);

    this.setState({
      mouseDown: true
    });
  }

  onMouseUp () {
    window.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
    window.removeEventListener('mousemove', this.onMouseMove.bind(this), false);

    this.setState({
      mouseDown: false
    });
  }

  onMouseMove (evt) {
    if (this.state.mouseDown) {
      const {
        clientX,
        clientY
      } = evt;

      this.setState({
        x: clientX,
        y: clientY
      });
    }
  }
}

Draggable.propTypes = {
  position: React.PropTypes.array
};

export default Draggable;
