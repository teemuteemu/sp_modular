import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Module from 'components/Module';

import {
  refresh
} from 'store/reducers/patch';

import './patcher.scss';

class Patcher extends React.Component {
  componentDidMount () {
    this.props.refresh();
  }

  render () {
    const {
      patch
    } = this.props;

    return (
      <div className="patcher">
        { patch.modules.map(m => <Module key={m.name} moduleDef={m} />) }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    refresh: bindActionCreators(refresh, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Patcher);
