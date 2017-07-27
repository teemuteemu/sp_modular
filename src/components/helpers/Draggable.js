import React from 'react';

export default class Draggable extends React.Component {
  constructor (props) {
    super(props);
    const {
      moduleDef
    } = props;

    this.state = {
      mouseDown: false,
      x: moduleDef.position[0],
      y: moduleDef.position[1]
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
