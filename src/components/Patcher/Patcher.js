import React from 'react';
import ReactArt from 'react-art';

import './patcher.scss';

import Module from 'components/Module';

class Patcher extends React.Component {
  componentDidMount () {
    this.props.refresh();
  }

  render () {
    const {
      patch
    } = this.props;

    return (
      <div className='patcher'>
        { patch.modules.map(m => <Module key={m.id} moduleDef={m} />) }
      </div>
    );
  }
}

Patcher.propTypes = {
  refresh: React.PropTypes.func,
  patch: React.PropTypes.object
};

export default Patcher;
