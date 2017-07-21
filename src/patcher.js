import React from 'react';
import { connect } from 'react-redux';

import Module from './components/common/Module';

import '../styles/index.scss';

const Patcher = ({ patch }) => {
  return (
    <div className="patcher">
      { patch.modules.map(m => <Module key={m.name} moduleDef={m} />) }
    </div>
  )
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    moveModule: null
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Patcher);
